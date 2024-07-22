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
