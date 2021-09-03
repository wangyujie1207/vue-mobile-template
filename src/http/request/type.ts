import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface CHRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface CHRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: CHRequestInterceptors<T>
  showLoading?: boolean
}

export interface BaseRequest<T> {
  code: number;
  status: string;
  message?: string;
  data: T
}
