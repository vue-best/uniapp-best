import { defineStore } from 'pinia'

import { useAppStore } from './appStore'
import { UserState, ILogin, LoginRes, Employees } from '@/models/userTypes'
import { login, logout, getUserInfo, getContentList } from '@/api/userApi'

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      isPrivacyShowed: false,
      isInstall: false,
      token: '',
      userInfo: new Employees({}),
      storageLoginInfo: undefined,
      storageUserId: '',
      contentList: [],
    }
  },
  persist: {
    paths: ['isPrivacyShowed', 'isInstall', 'storageLoginInfo', 'storageUserId', 'userInfo'],
  },
  actions: {
    loginAction(data: ILogin): Promise<LoginRes> {
      return new Promise((resolve, reject) => {
        this.isPrivacyShowed = true
        this.isInstall = true
        this.storageLoginInfo = data
        this.storageUserId = '123456'
        resolve(data as any)
        // login(data)
        //   .then((res) => {
        //     if (res && res.data) {
        //       this.isPrivacyShowed = true
        //       this.isInstall = true
        //       this.storageLoginInfo = data
        //       this.storageUserId = res.data.id
        //       resolve(res.data)
        //     }
        //   })
        //   .catch((error) => {
        //     reject(error)
        //   })
      })
    },
    logoutAction(): Promise<string> {
      const appStore = useAppStore()
      return new Promise((resolve, reject) => {
        logout()
          .then((res) => {
            if (res && res.data) {
              appStore.setTabbar(0)
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
        this.userInfo = this.storageLoginInfo as any
        return resolve({})
        // if (this.storageUserId) {
        //   getUserInfo(this.storageUserId)
        //     .then((res) => {
        //       if (res && res.data) {
        //         this.userInfo = res.data
        //         resolve(res.data)
        //       }
        //     })
        //     .catch((error) => {
        //       reject(error)
        //     })
        // } else {
        //   reject(false)
        // }
      })
    },
    contentListAction(): Promise<string[]> {
      return new Promise((resolve, reject) => {
        getContentList()
          .then((res) => {
            if (res && res.data) {
              this.contentList = res.data
              resolve(res.data)
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
})
