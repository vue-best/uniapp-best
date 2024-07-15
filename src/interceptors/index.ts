/*
 * @Author: wjc
 * @Date: 2024-07-02 10:26:06
 * @LastEditors: wjc
 * @LastEditTime: 2024-07-02 11:34:05
 * @Description: 
 */
import type { App } from 'vue'

import { setupRequestInterceptor } from './request'
import { setupRouterInterceptor } from './router'

export default function setupInterceptors(app: App) {
  setupRequestInterceptor(app)
  setupRouterInterceptor(app)
}