import type { App } from 'vue'

import { setupRequestInterceptor } from './request'
import { setupRouterInterceptor } from './router'

export default function setupInterceptors(app: App) {
  setupRequestInterceptor(app)
  setupRouterInterceptor(app)
}
