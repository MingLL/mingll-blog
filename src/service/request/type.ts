import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig  } from "axios"

/**
 * 每一个请求可以添加相关的拦截器
 */
export interface MLRequestInterceptores<T = AxiosResponse> {
  successRequestFn?: (config: AxiosRequestConfig) => AxiosRequestConfig
  successResponseFn?: (res: T) => T
  failResponseFn?: (err: T) => T
}

/**
 * 初始化每一个Axios添加相关的拦截器
 */
export interface MLInstanceInterceptores<T = AxiosResponse> {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface MLRequestConfig<T  = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: T
}