/*
 * @Author: wjc
 * @Date: 2024-06-05 11:22:45
 * @LastEditors: wjc
 * @LastEditTime: 2024-06-05 17:16:15
 * @Description:
 */
import { defineStore } from 'pinia'

import type { AppState } from '@/models/appTypes'

export const useAppStore = defineStore('app', {
  state: (): AppState => {
    return {}
  },
  actions: {},
})
