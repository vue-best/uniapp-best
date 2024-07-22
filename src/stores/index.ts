import type { App } from 'vue'
import * as Pinia from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const store = Pinia.createPinia()
store.use(createStorage())

/**
 * 使用 uniapp 的持久化 api
 * @returns
 */
function createStorage() {
  return createPersistedState({
    storage: {
      getItem(key: string) {
        return uni.getStorageSync(key)
      },
      setItem(key: string, value: any) {
        uni.setStorageSync(key, value)
      },
    },
  })
}

export function setupStores(app: App<Element>) {
  app.use(store)
}

export { store }
