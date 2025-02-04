import { defineStore } from 'pinia'

import i18n, { LangTypes } from '@/locale'
import type { AppState } from '@/models/appTypes'

export const useAppStore = defineStore('app', {
  state: (): AppState => {
    return {
      isDark: false,
      lang: 'zh-Hans',
      langs: [
        {
          label: '中文',
          value: 'zh-Hans',
        },
        {
          label: 'English',
          value: 'en',
        },
      ],
    }
  },
  persist: true,
  actions: {
    setLang(val: LangTypes) {
      uni.setLocale(val)
      i18n.global.locale = val
      this.lang = val
    },
  },
})
