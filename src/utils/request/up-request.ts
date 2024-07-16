import { App } from 'vue'
import { http, toast } from 'uview-plus'

import type { ILogin } from '@/models/userTypes'
import { useUserStore } from '@/stores/modules/userStore'
import { checkStatus } from './checkStatus'

const requestInterceptors = () => {
  /**
   * 请求拦截
   * @param {Object} http
   */
  http.interceptors.request.use(
    (config) => {
      // 可使用async await 做异步操作
      // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
      config.data = config.data || {}
      return config
    },
    (
      config // 可使用async await 做异步操作
    ) => Promise.reject(config)
  )
}
const responseInterceptors = () => {
  /**
   * 响应拦截
   * @param {Object} http
   */
  http.interceptors.response.use(
    (response) => {
      /* 对响应成功做点什么 可使用async await 做异步操作*/
      const data = response.data
      // 自定义参数
      const custom = response.config?.custom
      if (data.code !== 200 && data.code !== 201) {
        // 服务端返回的状态码不等于200，则reject()
        // 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
        if (custom.toast !== false) {
          toast(data.msg)
        }
        // 如果需要catch返回，则进行reject
        if (custom?.catch) {
          return Promise.reject(data)
        } else {
          // 否则返回一个pending中的promise
          return Promise.resolve(data)
        }
      }
      return data || {}
    },
    (response) => {
      checkStatus(response)
      /*  对响应错误做点什么 （statusCode !== 200）*/
      return Promise.reject(response)
    }
  )
}

export function setupRequest(app: App) {
  const userStore = useUserStore()
  http.setConfig((config) => {
    const sysInfo = uni.getSystemInfoSync()
    const storageLoginInfo: ILogin = userStore.storageLoginInfo

    config.baseURL = import.meta.env.VITE_APP_BASE_API
    config.timeout = 10000
    config.custom = {
      toast: false,
    }
    config.header = {
      version: sysInfo.appVersion, // 版本号
      platform: sysInfo.osName ?? 'app', // 所用系统
    }
    // token
    if (userStore.token) {
      config.header.Authorization = `Bearer ${userStore.token}`
    }

    return config
  })
  requestInterceptors()
  responseInterceptors()
}
