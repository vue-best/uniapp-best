import type { App } from 'vue'
import { createI18n } from 'vue-i18n'

import en from './en.json' // 英文
import zhHans from './zh-Hans.json' // 简体中文

const messages = {
  en,
  'zh-Hans': zhHans,
}

export type LangTypes = keyof typeof messages

const i18n = createI18n({
  locale: uni.getLocale(), // 获取已设置的语言
  messages,
})

/**
 * 可以拿到原始的语言模板，非 vue 文件使用这个方法，
 * @param { string } key 多语言的key，eg: "app.name"
 * @returns {string} 返回原始的多语言模板，eg: "{heavy}KG"
 */
export const getTemplateByKey = (key: string) => {
  if (!key) {
    console.error(`[i18n] Function getTemplateByKey(), key param is required`)
    return ''
  }
  const locale = uni.getLocale()

  const message = messages[locale] // 拿到某个多语言的所有模板（是一个对象)
  if (Object.keys(message).includes(key)) {
    return message[key]
  }
  console.error(`[i18n] Function getTemplateByKey(), key param ${key} is not existed.`)
  return ''
}

/**
 * 处理非 h5 端多语言传参无效问题
 * formatI18n('我是{name},身高{detail.height},体重{detail.weight}',{name:'张三',detail:{height:178,weight:'75kg'}})
 * 暂不支持数组
 * @param template 多语言模板字符串，eg: `我是{name}`
 * @param {Object|undefined} data 需要传递的数据对象，里面的key与多语言字符串对应，eg: `{name:'菲鸽'}`
 * @returns
 */
export function formatI18n(template: string, data?: any) {
  return template.replace(/\{([^}]+)\}/g, function (match, key: string) {
    const arr = key.trim().split('.')
    let result = data
    while (arr.length) {
      const first = arr.shift()
      result = result[first]
    }
    return result
  })
}

export function t(key, data?) {
  return formatI18n(getTemplateByKey(key), data)
}

export function setupI18n(app: App<Element>) {
  app.use(i18n)
  // 注册全局的多语言函数
  app.config.globalProperties.$tt = t
}

export default i18n
