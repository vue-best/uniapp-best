/*
 * @Author: wjc
 * @Date: 2024-06-05 10:36:43
 * @LastEditors: wjc
 * @LastEditTime: 2024-07-02 15:24:59
 * @Description:
 */
import { useUserStore } from '@/stores/modules/userStore'

export function checkStatus(err: any) {
  let errMessage = err.data.responseJSON.message
  const userStore = useUserStore()

  switch (err.statusCode) {
    case 400:
      errMessage = `${errMessage}`
      break
    case 401:
      userStore.logoutAction()
      uni.navigateTo({
        url: '/pages/login/index',
      })
      errMessage = '登录超时，请重新登录'
      break
    case 403:
      errMessage = '暂无权限查看'
      break
    case 404:
      errMessage = '网络请求错误，未找到该资源'
      break
    case 500:
      errMessage = '服务器错误，请联系管理员'
      break
    case 503:
      errMessage = '服务不可用，请稍候再试'
      break
    default:
      errMessage = `${errMessage}`
  }

  if (errMessage) {
    uni.showToast({
      icon: 'none',
      title: errMessage,
    })
    return false
  }
  return true
}
