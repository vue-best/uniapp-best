import type { App } from 'vue'
import qs from 'qs'
import { useUserStore } from '@/stores/modules/userStore'

import { pages } from '@/pages.json'

// 需要拦截的页面
const loginBlacklist = pages
  .filter((p) => p.actions && p.actions.includes('login'))
  .map((p) => `/${p.path}`)

const interceptor = {
  invoke({ url }) {
    const userStore = useUserStore()
    const token = userStore.storageUserId
    const path = url.split('?')[0]

    const isNeedLogin = loginBlacklist.includes(path)
    console.log('244-', path, loginBlacklist, isNeedLogin)
    // 不需要登录权限的，直接跳转
    if (!isNeedLogin) {
      return true
    }
    // 已经登录的，直接跳转
    if (token) {
      return true
    }

    // 访问的是需要登录权限才能查看的页面，先跳转到提示页面提醒用户
    const redirectRoute = `/pages/auth/index?redirect=${encodeURIComponent(url)}`
    uni.navigateTo({ url: redirectRoute })
    return false
  },
}

export function setupRouterInterceptor(app: App) {
  app.use({
    install() {
      uni.addInterceptor('navigateTo', interceptor)
      uni.addInterceptor('reLaunch', interceptor)
      uni.addInterceptor('redirectTo', interceptor)
    },
  })
}
