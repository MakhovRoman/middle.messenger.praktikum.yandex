const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE'
};

interface OptionsType {
    header?: string
    data?: string
    method?: string
    timeout?: number
}

function queryStringify(data: string) {
    const result = [];
    for(let [key, value] of Object.entries(data)) {
        result.push(`${key}=${value.toString()}`);
    }
    return '?' + result.join('&');
}

export class HTTPTransport {
    get = (url:string, options:OptionsType = {}) => {
        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };

    put = (url:string, options:OptionsType = {}) => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    post = (url:string, options:OptionsType = {}) => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    delete = (url:string, options:OptionsType = {}) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    // PUT, POST, DELETE

    // options:
    // headers — obj
    // data — obj
    request = (url:string, options:OptionsType , timeout = 5000) => {
        const {header, data, method} = options;

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

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                if (header) {
                    (Object.keys(header) as string[]).forEach(key => {
                        xhr.setRequestHeader(key, header[key as any] );
                    });
                }
                xhr.send(data);
            }
        })
    };
}
