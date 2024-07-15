/*
 * @Author: wjc
 * @Date: 2024-06-12 10:05:12
 * @LastEditors: wjc
 * @LastEditTime: 2024-06-28 15:44:13
 * @Description:
 */
import { request } from '@/utils/request'
import { BasicRes } from '@/models/requestTypes'
import { ILogin, LoginRes, Employees } from '@/models/userTypes'

export function login(data: ILogin) {
  return request<BasicRes<LoginRes>>({
    url: '188758498',
    method: 'POST',
    header: {},
    data: {
      account: data.account,
      password: data.password,
    },
  })
}

export function logout() {
  return request<BasicRes<string>>({
    url: '188797064',
    method: 'GET',
  })
}

export function getUserInfo(data: string) {
  return request<BasicRes<Employees>>({
    url: `188788509`,
    method: 'GET',
  })
}