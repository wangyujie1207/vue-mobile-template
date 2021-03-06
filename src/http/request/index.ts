import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { CHRequestInterceptors, CHRequestConfig } from './type'

import { showLoading } from '@/utils/toast'
import { ComponentInstance } from 'vant/lib/utils'

const DEFAULT_LOADING = true

class CHRequest {
  instance: AxiosInstance
  interceptors?: CHRequestInterceptors
  showLoading: boolean
  loading?: ComponentInstance

  constructor (config: CHRequestConfig) {
    this.instance = axios.create(config)

    // 保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 总拦截
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = showLoading()
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // loading移除
        // eslint-disable-next-line no-unused-expressions
        this.loading?.clear()
        const data = res.data
        if (data.code === '-1001') {
          console.log('请求失败~, 错误信息')
        } else {
          return data
        }
      },
      (err) => {
        // loading移除
        // eslint-disable-next-line no-unused-expressions
        this.loading?.close()
        if (err.response.status === 404) {
          console.log('404的错误~')
        }
        return err
      }
    )
  }

  request<T = any> (config: CHRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 2.将showLoading设置true, 不影响下一个请求
          this.showLoading = DEFAULT_LOADING

          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置true, 不影响下一个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T = any> (config: CHRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'GET'
    })
  }

  post<T = any> (config: CHRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'POST'
    })
  }

  delete<T = any> (config: CHRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'DELETE'
    })
  }

  patch<T = any> (config: CHRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'PATCH'
    })
  }
}

export default CHRequest
