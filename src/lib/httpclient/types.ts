export interface HttpResponse<D> {
  status: number;
  data: D;
}

export interface IHttpClient {
    get<T>(url: string, params?: any): Promise<HttpResponse<T>>;
    post<T>(url: string, data?: any, headers?: Record<string, string>): Promise<HttpResponse<T>>;
    put<T>(url: string, data?: any, headers?: Record<string, string>): Promise<HttpResponse<T>>;
    delete<T>(url: string, data?: any, headers?: Record<string, string>): Promise<HttpResponse<T>>;
}