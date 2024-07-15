/*
 * @Author: wjc
 * @Date: 2024-06-05 17:13:30
 * @LastEditors: wjc
 * @LastEditTime: 2024-06-28 16:00:24
 * @Description:
 */
import { defineStore } from 'pinia'

import { UserState, ILogin, LoginRes, Employees } from '@/models/userTypes'
import { login, logout, getUserInfo } from '@/api/userApi'

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      isPrivacyShowed: false,
      isInstall: false,
      token: '',
      userInfo: new Employees({}),
      storageLoginInfo: undefined,
      storageUserId: '',
    }
  },
  persist: true,
  getters: {},
  actions: {
    loginAction(data: ILogin): Promise<LoginRes> {
      return new Promise((resolve, reject) => {
        login(data)
          .then((res) => {
            if (res && res.data) {
              this.isPrivacyShowed = true
              this.isInstall = true
              this.storageLoginInfo = data
              this.storageUserId = res.data.id
              resolve(res.data)
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    logoutAction(): Promise<string> {
      return new Promise((resolve, reject) => {
        logout()
          .then((res) => {
            if (res && res.data) {
              this.$reset()
              resolve(res.data)
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getUserInfoAction(): Promise<Employees> {
      return new Promise((resolve, reject) => {
        if (this.storageUserId) {
          getUserInfo(this.storageUserId)
            .then((res) => {
              if (res && res.data) {
                this.userInfo = res.data
                resolve(res.data)
              }
            })
            .catch((error) => {
              reject(error)
            })
        } else {
          reject(false)
        }
      })
    },
  },
})