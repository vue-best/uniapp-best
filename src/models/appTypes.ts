import { LangTypes } from '@/locale'

export interface Lang {
  label: string
  value: LangTypes
}

export interface AppState {
  selectedTabbar: number
  isDark: boolean
  lang: string
  langs: Lang[]
}
