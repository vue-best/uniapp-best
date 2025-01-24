import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import 'virtual:uno.css'
import 'virtual:svg-icons-register'

import { setupI18n } from '@/locale'
import { setupStores } from '@/stores'
import setupInterceptors from '@/interceptors'
import '@/static/styles/index.scss'

import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)

  setupI18n(app)
  setupStores(app)
  setupInterceptors(app)

  return {
    app,
    Pinia,
  }
}
