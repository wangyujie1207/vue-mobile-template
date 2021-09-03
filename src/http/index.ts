import CHRequest from './request'
import Config from '@/config/config'
import storage from 'good-storage'

const requestInstance = new CHRequest({
  baseURL: Config.BASE_URL,
  timeout: 10000,
  interceptors: {
    requestInterceptor: (config) => {
      const token = storage.get(Config.TOKEN)
      if (token) {
        config.headers.token = token
      }
      // config.headers.token = '21cd13bf-8baf-4a10-b7cf-29fb6b1ec486'
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default requestInstance
