/*
 * @Author: wjc
 * @Date: 2024-06-05 10:21:23
 * @LastEditors: wjc
 * @LastEditTime: 2024-07-02 15:17:32
 * @Description:
 */
import type { IRequestOptions } from '@/models/requestTypes'
import { checkStatus } from './checkStatus'

export const request = <T>(options: IRequestOptions) => {
  return new Promise<T>((resolve, reject) => {
    uni.request({
      responseType: 'json',
      ...options,
      success(res) {
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve(res.data as T)
        } else {
          checkStatus(res)
          reject(res)
        }
      },
    })
  })
}

request.get = <T>(url: string, options: Omit<IRequestOptions, 'url'> = {}) => {
  return request<T>({
    method: 'GET',
    url,
    ...options,
  })
}

request.post = <T>(url: string, data = {}, options: Omit<IRequestOptions, 'url'> = {}) => {
  return request<T>({
    method: 'POST',
    url,
    data,
    ...options,
  })
}

request.put = <T>(url: string, data = {}, options: Omit<IRequestOptions, 'url'> = {}) => {
  return request<T>({
    method: 'PUT',
    url,
    data,
    ...options,
  })
}

request.del = <T>(url: string, data = {}, options: Omit<IRequestOptions, 'url'> = {}) => {
  return request<T>({
    method: 'DELETE',
    url,
    data,
    ...options,
  })
}

export const uploadFile = <T>({ tempFilePath, formData, loading, error, data }) => {
  uni.uploadFile({
    url: import.meta.env.VITE_APP_UPLOAD_API,
    filePath: tempFilePath,
    name: 'file',
    formData,
    success: (uploadFileRes) => {
      data.value = uploadFileRes.data as T
    },
    fail: (err) => {
      error.value = true
    },
    complete: () => {
      loading.value = false
    },
  })
}

request.uploadFile = <T>(formData: Record<string, any> = {}, count = 1) => {
  const loading = ref(false)
  const error = ref(false)
  const data = ref<T>()

  // #ifdef MP-WEIXIN
  // 微信小程序从基础库 2.21.0 开始， wx.chooseImage 停止维护，请使用 uni.chooseMedia 代替。
  uni.chooseMedia({
    count: 1,
    mediaType: ['image'],
    success: (res) => {
      loading.value = true
      const tempFilePath = res.tempFiles[0].tempFilePath
      uploadFile<T>({ tempFilePath, formData, data, error, loading })
    },
    fail: (err) => {
      console.error('uni.chooseMedia err->', err)
      error.value = true
    },
  })
  // #endif
  // #ifndef MP-WEIXIN
  uni.chooseImage({
    count,
    success: (res) => {
      loading.value = true
      const tempFilePath = res.tempFilePaths[0]
      uploadFile<T>({ tempFilePath, formData, data, error, loading })
    },
    fail: (err) => {
      console.error('uni.chooseImage err->', err)
      error.value = true
    },
  })
  // #endif

  return { loading, error, data }
}
