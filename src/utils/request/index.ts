import type { IRequestOptions, RequestCache } from '@/models/requestTypes'
import { checkStatus } from './checkStatus'

/**
 * 按请求Key存储不同请求的防抖状态
 */
const requestCacheMap = new Map<string, RequestCache>()

/**
 * 生成唯一请求 Key（根据 URL、Method、排序后的参数）
 * @param options 请求配置
 * @returns string 请求唯一标识
 */
function generateRequestKey(options: IRequestOptions): string {
  const { url, method = 'GET', data } = options
  const sortedParams = data
    ? JSON.stringify(
        Object.keys(data)
          .sort()
          .reduce((acc: any, key) => {
            acc[key] = data[key]
            return acc
          }, {})
      )
    : ''
  return `${method}_${url}_${sortedParams}`
}

/**
 * 网络请求防抖，区分不同请求
 * @param options 请求配置
 * @param debounceTime 防抖时长，默认 1000ms
 * @returns Promise
 */
export const request = <T = any>(options: IRequestOptions): Promise<T> => {
  const key = generateRequestKey(options)

  return new Promise((resolve, reject) => {
    if (options.loading) {
      uni.showLoading()
    }

    if (!options.disableDebounce) {
      // 获取当前请求的缓存状态
      const cache = requestCacheMap.get(key) || { timer: 0, task: null }
      // 清除旧定时器和请求
      if (cache.timer) clearTimeout(cache.timer)
      // 当前一个请求还在进行中，响应时间过长时，后续发起的请求要中断
      if (cache.task) cache.task.abort()
      // 设置新定时器
      const newTimer = setTimeout(() => {
        const task = uni.request({
          header: {
            'content-type': 'application/json',
          },
          ...options,
          success(res) {
            if (res.statusCode === 200 || res.statusCode === 201) {
              resolve(res.data as T)
            } else {
              checkStatus(res)
              reject(res)
            }
          },
          fail: (err) => reject(err),
          complete: () => {
            if (options.loading) {
              uni.hideLoading()
            }
            requestCacheMap.delete(key) // 请求完成后清理缓存
          },
        })
        requestCacheMap.set(key, { timer: 0, task })
      }, options.debounceTime || 1000) as unknown as number
      // 更新缓存
      requestCacheMap.set(key, { timer: newTimer, task: null })
    } else {
      uniRequest(options, resolve, reject)
    }
  })
}

export const uniRequest = <T>(options: IRequestOptions, resolve, reject) => {
  // return new Promise<T>((resolve, reject) => {
  uni.request({
    header: {
      'content-type': 'application/json',
    },
    ...options,
    success(res) {
      if (res.statusCode === 200 || res.statusCode === 201) {
        resolve(res.data as T)
      } else {
        checkStatus(res)
        reject(res)
      }
    },
    fail: (err) => reject(err),
    complete: () => {
      if (options.loading) {
        uni.hideLoading()
      }
    },
  })
  // })
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
