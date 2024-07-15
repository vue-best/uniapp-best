/*
 * @Author: wjc
 * @Date: 2024-06-05 11:22:45
 * @LastEditors: wjc
 * @LastEditTime: 2024-06-05 17:16:15
 * @Description:
 */
import { defineStore } from 'pinia'

import i18n, { LangTypes } from '@/locale'
import type { AppState } from '@/models/appTypes'

export const useAppStore = defineStore('app', {
  state: (): AppState => {
    return {
      selectedTabbar: 0,
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
    setTabbar(val: number) {
      this.selectedTabbar = val
    },
    setLang(val: LangTypes) {
      uni.setLocale(val)
      i18n.global.locale = val
      this.lang = val
    },
  },
})
