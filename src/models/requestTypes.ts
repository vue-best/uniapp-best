export type BasicRes<T = unknown> = {
  data: T
  code: string
  msg: string
  status: number
  statusText: string
}

export type IRequestOptions = UniApp.RequestOptions & {
  query?: Record<string, any>
  /**
   * 请求防抖时间，单位毫秒
   */
  debounceTime?: number
  /**
   * 是否禁用请求防抖，默认启用
   */
  disableDebounce?: boolean
  /**
   * 是否显示加载动画，默认不显示
   */
  loading?: boolean
}

/**
 * 定义请求缓存类型
 */
export interface RequestCache {
  timer: number
  task: UniApp.RequestTask | null
}
