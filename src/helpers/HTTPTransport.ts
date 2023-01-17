const enum METHODS  {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
};

interface OptionsType {
    headers?: Record<string, string>
    data?: Record<string, string>
    method: METHODS
    timeout?: number
    body?: Document | XMLHttpRequestBodyInit | null;
}

type OptionsTypeGET = Omit<OptionsType, 'method' | 'body'>;
type OptionsTypeNotGET = Omit<OptionsType, 'method' | 'data'>;


function queryStringify(data: Record<string, string>) {
    return '?' + Object
      .entries(data)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
}

export class HTTPTransport {
    get = (url:string, options:OptionsTypeGET = {}) => {
        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };

    put = (url:string, options:OptionsTypeNotGET = {}) => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    post = (url:string, options:OptionsTypeNotGET = {}) => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    delete = (url:string, options:OptionsTypeNotGET = {}) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    // PUT, POST, DELETE

    // options:
    // headers — obj
    // data — obj
    request = (url:string, options:OptionsType , timeout = 5000) => {
        const {headers, data, body, method} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            if (method === METHODS.GET && data) {
                xhr.open(method, url + queryStringify(data));
            } else {
                xhr.open(method!, url);
            }

            xhr.timeout = timeout;

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !body) {
                xhr.send();
            } else {
                if (headers) {
                    (Object.keys(headers) as string[]).forEach(key => {
                        xhr.setRequestHeader(key, headers[key as any] );
                    });
                }
                xhr.send(body);
            }
        })
    };
}
