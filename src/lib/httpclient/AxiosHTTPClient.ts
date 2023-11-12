import axios, {AxiosInstance, AxiosError} from "axios"
import type { HttpResponse, IHttpClient } from "./types"

export default class AxiosHTTPClient implements IHttpClient {
    private api: AxiosInstance 

    constructor(token?: string, onUnauthorizedResponse?: () => void, customRegularError?: (error: AxiosError) => void) {
        this.api = axios.create({
          validateStatus: function (status: number) {
            return status >= 200 && status < 400; // Throw an error for status codes outside this range
          },
        })
        this.api.defaults.headers.common["Accept"] = "application/json"
        this.api.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
        this.api.defaults.headers.common["Content-Type"] = "application/json"
        this.api.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"
        this.api.interceptors.request.use(
          (config: any) => {
            if (!config) {
              config = {}
            }
            if (!config.headers) {
              config.headers = {}
            }
            if (token) {
              config.headers["x-api-key"] = `${token}`
              if (token) {
                config.headers["Authorization"] = `Bearer ${token}`
              }
            }
      
            return config
          },
          (error: any) => Promise.reject(error)
        )

        this.api.interceptors.response.use(
          (response: any) => response,
          (error: AxiosError) => {
            if (onUnauthorizedResponse && error.response && (error.response.status === 403 || error.response.status === 401)) {
              onUnauthorizedResponse();
            }
            
            if (customRegularError) {
              return Promise.reject(customRegularError(error));
            }
            return Promise.reject(error);
          }
        );
    }

    async get<T>(url: string, params: any): Promise<HttpResponse<T>> {
        const res = await this.api.get(url, {params})
        return {
            status: res.status,
            data: res.data,
        }
    }

    async post<T>(url: string, data?: any, headers?: Record<string, string>): Promise<HttpResponse<T>> {
      const res = await this.api.post(url, data, {headers})
      return {
          status: res.status,
          data: res.data,
      }
    }

    async put<T>(url: string, data?: any, headers?: Record<string, string>): Promise<HttpResponse<T>> {
      const res = await this.api.put(url, data, {headers})
      return {
          status: res.status,
          data: res.data,
      }
    }

    async delete<T>(url: string, data?: any, headers?: Record<string, string>): Promise<HttpResponse<T>> {
      const res = await this.api.delete(url, {data, headers})
      return {
          status: res.status,
          data: res.data,
      }
    }
}