export interface UserState {
  isPrivacyShowed: boolean
  isInstall: boolean
  token: string
  userInfo: Employees
  storageLoginInfo: ILogin
  storageUserId: string
  contentList: string[]
}

export interface ILogin {
  account: string
  password: string
}

export interface LoginData {
  id: string
  account: string
  entName: string
  name: string
  imgUrl: string
  positionName: string
}

export class LoginRes implements LoginData {
  id: string
  account: string
  entName: string
  name: string
  imgUrl: string
  positionName: string

  constructor(json: LoginData) {
    this.id = json.id
    this.account = json.account
    this.entName = json.entName
    this.imgUrl = json.imgUrl
    this.positionName = json.positionName
  }
}

export interface Roles {
  roleId: string
  roleName: string
}

export interface IEmployees {
  id?: string
  name?: string
}

export class Employees implements IEmployees {
  id?: string
  name?: string

  constructor(data: Partial<IEmployees> = {}) {
    this.id = data.id
    this.name = data.name
  }
}
