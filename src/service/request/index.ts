import type { AxiosInstance } from "axios"
import type {  MLRequestConfig, MLInstanceInterceptores, MLRequestInterceptores } from "./type"
import axios from "axios"


class MLRequest {
  instance: AxiosInstance
  interceptors?: MLInstanceInterceptores

  constructor(config: MLRequestConfig<MLInstanceInterceptores>) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor, //请求成功拦截
      this.interceptors?.requestInterceptorCatch //请求失败拦截
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor, // 响应成功拦截
      this.interceptors?.responseInterceptorCatch //响应失败拦截
    )
  }
  request<T>(config: MLRequestConfig<MLRequestInterceptores<T>>): Promise<T> {
    if (config.interceptors?.successRequestFn) {
      config = config.interceptors.successRequestFn(config)
    }
    return new Promise((resolve, reject) => {
      this.instance.request<any, T>(config).then( (res) => {
        if (config.interceptors?.successResponseFn) {
          res = config.interceptors.successResponseFn(res)
        }
        resolve(res)
      }, (err) => {
        if (config.interceptors?.failResponseFn) {
          err = config.interceptors.failResponseFn(err)
        }
        reject(err)
      }
      )
    })
  }
}

export default MLRequest