export const enum METHODS  {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
};

interface OptionsType {
    headers?: {[x:string]: string}
    data?: Record<string, unknown>
    method?: METHODS
    timeout?: 5000,
    withCredentials?: boolean;
    responseType?: XMLHttpRequestResponseType;
    body?: Document | XMLHttpRequestBodyInit | null;
}

// type OptionsTypeGET = Omit<OptionsType, 'method' | 'body'>;
// type OptionsTypeNotGET = Omit<OptionsType, 'method' | 'data'>;

type HTTPMethodType = (url: string, options?: OptionsType) => Promise<unknown>


function queryStringify(data: Record<string, unknown>) {
    return '?' + Object
      .entries(data)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
}

export class HTTPTransport {
    get: HTTPMethodType = (url, options = {}) => {
        return this.request(
                url,
                {...options, method: METHODS.GET},
                options.timeout
            );
    };

    put: HTTPMethodType = (url, options = {}) => {
        return this.request(
                url,
                {...options, method: METHODS.PUT},
                options.timeout
            );
    };

    post: HTTPMethodType = (url, options = {}) => {
        return this.request(
                url,
                {...options, method: METHODS.POST},
                options.timeout
            );
    };

    delete: HTTPMethodType = (url, options = {}) => {
        return this.request(
                url,
                {...options, method: METHODS.DELETE},
                options.timeout
            );
    };

    // PUT, POST, DELETE

    // options:
    // headers — obj
    // data — obj
    request = (url:string, options:OptionsType , timeout = 5000) => {
        const {headers = {}, data, responseType = 'json', method} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            if (method === METHODS.GET && data) {
                xhr.open(method, `${url}${queryStringify(data)}`);
            } else {
                xhr.open(method!, url);
            }

            (Object.keys(headers)).forEach((key) => {
                xhr.setRequestHeader(key, headers[key] );
            });

            xhr.withCredentials = true;
            xhr.responseType = responseType;

            xhr.timeout = timeout;

            xhr.onload = () => {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        })
    };
}
