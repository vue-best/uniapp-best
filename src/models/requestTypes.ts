/*
 * @Author: wjc
 * @Date: 2024-06-12 11:46:30
 * @LastEditors: wjc
 * @LastEditTime: 2024-07-02 15:15:35
 * @Description:
 */
export type BasicRes<T = unknown> = {
  data: T
  code: string
  msg: string
  status: number
  statusText: string
}

export type IRequestOptions = UniApp.RequestOptions & {
  query?: Record<string, any>
}
