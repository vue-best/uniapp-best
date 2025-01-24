import type { App } from 'vue'
import { useUserStore } from '@/stores/modules/userStore'

import { pages, subPackages } from '@/pages.json'
// 处理分包路由
const subPages = []
subPackages.forEach((item) => {
  if (item.pages && Array.isArray(item.pages)) {
    item.pages.forEach((p) => {
      subPages.push({
        actions: p.actions,
        path: `${item.root}/${p.path}`,
      })
    })
  }
})
// 需要拦截的页面
const loginBlacklist = [...pages, ...subPages]
  .filter((p) => p.actions && p.actions.includes('login'))
  .map((p) => `/${p.path}`)

const interceptor = {
  invoke({ url }) {
    const userStore = useUserStore()
    const token = userStore.storageUserId
    const path = url.split('?')[0]

    const isNeedLogin = loginBlacklist.includes(path)
    // 不需要登录权限的，直接跳转
    if (!isNeedLogin) {
      return true
    }
    // 已经登录的，直接跳转
    if (token) {
      return true
    }

    // 访问的是需要登录权限才能查看的页面，先跳转到提示页面提醒用户
    const redirectRoute = `/subPages/auth/index?redirect=${encodeURIComponent(url)}`
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
