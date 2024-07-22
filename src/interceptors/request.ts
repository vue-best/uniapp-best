import type { App } from 'vue'
import qs from 'qs'
import type { IRequestOptions } from '@/models/requestTypes'
import { useUserStore } from '@/stores/modules/userStore'

const interceptor = {
  //  请求前拦截
  invoke(options: IRequestOptions) {
    const userStore = useUserStore()
    // api 处理
    options.url = `${import.meta.env.VITE_APP_BASE_API}${options.url}`
    // 查询参数处理
    if (options.query) {
      const query = qs.stringify(Object.assign({}, options.query), {
        addQueryPrefix: true,
      })
      options.url += query
    }
    // 10 秒请求超时
    options.timeout = 100000
    // 请求头标识符
    const sysInfo = uni.getSystemInfoSync()
    options.header = {
      ...options.header,
      version: sysInfo.appVersion, // 版本号
      platform: sysInfo.osName ?? 'app', // 所用系统
    }
    // token
    if (userStore.token) {
      options.header.Authorization = `Bearer ${userStore.token}`
    }
  },
}

export function setupRequestInterceptor(app: App) {
  app.use({
    install() {
      uni.addInterceptor('request', interceptor)
    },
  })
}
