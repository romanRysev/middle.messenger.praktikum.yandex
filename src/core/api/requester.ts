enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

type RequestOptions = { headers?: Record<string, string> | null; method?: METHODS; data?: Record<string, unknown> | FormData | null; timeout?: number; withCredentials?: boolean; file?: boolean };

function queryStringify(data: Record<string, unknown> | FormData): string {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

export class HTTPTransport {
  get = (url: string, options: RequestOptions = { timeout: 5000 }) => {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  post = (url: string, options: RequestOptions = { timeout: 5000 }) => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  put = (url: string, options: RequestOptions = { timeout: 5000 }) => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  delete = (url: string, options: RequestOptions = { timeout: 5000 }) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request = (url: string, options: RequestOptions = { headers: null, method: METHODS.GET, data: null }, timeout = 5000) => {
    const { headers, method = METHODS.GET, data } = options;

    return new Promise<XMLHttpRequest>(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      if (headers) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.onload = function () {
        resolve(xhr);
      };

      if (options.withCredentials) {
        xhr.withCredentials = options.withCredentials;
      }

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else if (options.file) {
        xhr.send(data as FormData);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
