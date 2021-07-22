export declare type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export declare type HttpUrlParams = Record<string, unknown> | undefined | null;
export declare type HttpBodyData = Record<string, unknown> | undefined | null;
export declare type HttpResult<T> = {
    statusCode: number;
    data: T | null;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string | null;
};
export declare function doApiCall<T>(method: HttpMethod, url: string, params?: HttpUrlParams, data?: HttpBodyData): Promise<HttpResult<T>>;
export declare function get<T>(url: string, params?: HttpUrlParams): Promise<HttpResult<T>>;
export declare function post<T>(url: string, params?: HttpUrlParams, data?: HttpBodyData): Promise<HttpResult<T>>;
declare const _default: {
    doApiCall: typeof doApiCall;
    post: typeof post;
    get: typeof get;
};
export default _default;
