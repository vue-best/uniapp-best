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
      curTabBar: 'home',
      tabbar: [
        {
          pagePath: 'pages/index/index',
          iconPath: 'static/images/main/work.png',
          selectedIconPath: 'static/images/main/work_1.png',
          text: '首页',
          code: 'home',
          show: true,
        },
        {
          pagePath: 'pages/mine/index',
          iconPath: 'static/images/main/mine.png',
          selectedIconPath: 'static/images/main/mine_1.png',
          text: '我的',
          code: 'mine',
          show: false,
        },
      ],
      userInfo: new Employees({
        name: '薛定谔的猫',
      }),
      storageLoginInfo: undefined,
      storageUserId: '',
      contentList: [],
    }
  },
  persist: {
    paths: ['isPrivacyShowed', 'isInstall', 'storageLoginInfo', 'storageUserId', 'userInfo'],
  },
  actions: {
    setTabBar(val: string) {
      this.curTabBar = val
      // 将当前tabbar的show设置为true
      this.tabbar.forEach((item) => {
        if (item.code === val && !item.show) {
          item.show = true
        }
      })
    },
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
    logoutAction(): Promise<boolean> {
      return new Promise((resolve, reject) => {
        this.setTabBar('index')
        uni.clearStorageSync()
        this.$reset()
        resolve(true)
        // logout()
        //   .then((res) => {
        //     if (res && res.data) {
        //       this.setTabBar('index')
        //       this.$reset()
        //       resolve(res.data)
        //     }
        //   })
        //   .catch((error) => {
        //     reject(error)
        //   })
      })
    },
    getUserInfoAction(): Promise<Employees> {
      return new Promise((resolve, reject) => {
        // this.userInfo = this.storageLoginInfo as any
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
            if (res) {
              this.contentList = res
              resolve(res)
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
      // return new Promise((resolve, reject) => {
      //   this.contentList = [
      //     '1',
      //     '2',
      //     '3',
      //     '4',
      //     '5',
      //     '6',
      //     '7',
      //     '8',
      //     '9',
      //     '10',
      //     '11',
      //     '12',
      //     '13',
      //     '14',
      //     '15',
      //     '16',
      //     '17',
      //     '18',
      //     '19',
      //     '20',
      //   ]
      // })
    },
  },
})
