import { request } from '@/utils/request'
import { BasicRes } from '@/models/requestTypes'
import { ILogin, LoginRes, Employees } from '@/models/userTypes'

export function login(data: ILogin) {
  return request.post<BasicRes<LoginRes>>('188758498', {
    header: {},
    data: {
      account: data.account,
      password: data.password,
    },
  })
}

export function logout() {
  return request.get<BasicRes<string>>('188797064')
}

export function getUserInfo(data: string) {
  return request<BasicRes<Employees>>({
    url: `188788509`,
    method: 'GET',
  })
}

/**
 * 获取内容列表数据
 * @returns 字符串列表
 */
export function getContentList() {
  return request<BasicRes<string[]>>({
    url: `194000864`,
    method: 'GET',
  })
}
