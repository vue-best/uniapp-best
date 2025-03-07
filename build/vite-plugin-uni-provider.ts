import path from 'path'
import c from 'picocolors'
import normallize from 'normalize-path'

import { pages, subPackages } from '../src/pages.json'

export interface Options {
  pagesRE: RegExp
  name: string
  configFile: string
  pagesBasePath: string
  configPath: string
  pluginName: string
  DEBUG: boolean
}

// 处理分包路由
const subPages = []
subPackages.forEach((item) => {
  if (item.pages && Array.isArray(item.pages)) {
    item.pages.forEach((p) => {
      subPages.push(`${item.root}/${p.path}.vue`)
    })
  }
})
// 需要拦截的页面
const pageRouter = [...pages.map((item) => `${item.path}.vue`), ...subPages]

export default function (options: Partial<Options> = {}) {
  let {
    pagesRE = /src[\/\\]pages[\/\\]((?!.+(component(s)?|static).+).)*\.vue$/,
    name = 'MConfigProvider',
    pluginName = 'uni-provider',
    DEBUG = process.env.DEBUG,
  } = options

  return {
    name: 'vite-plugin-' + pluginName,
    enforce: 'pre',
    transform(code, id) {
      id = normalizePagePathFromBase(id)
      if (pageRouter.includes(normalizePagePathFromBase(id))) {
        // 三种情况:
        // 1. 前后都存在页面根级组件 => 不做操作
        // 2. 页面根级组件只存在于第一行 => 第一行修正结束符,最后一行添加结束符
        // 3. 前后都不存在页面根级组件 => 第一行添加开始符,最后一行添加结束符
        // 其他情况直接语法报错,不需要处理
        let startTag = new RegExp(`\<${name}`).test(code)
        let endTag = new RegExp(`\<\/${name}`).test(code)
        if (startTag && !endTag)
          code = code
            .replace(new RegExp(`(?<=\<${name}.*?)(\/\>|>.*?\<\/${name}\>)`), '>')
            .replace(/([\s\S]*)(\<\/template\>)/, `$1</${name}>\n</template>`)
        if (!startTag && !endTag)
          code = code
            .replace('<template>', `<template>\n<${name}>`)
            .replace(/([\s\S]*)(\<\/template\>)/, `$1</${name}>\n</template>`)
        debug(c.yellow(id), `startTag: ${startTag}`, `endTag: ${endTag}`)
      }
      return { code, map: null }
    },
  }

  function normalizePagePathFromBase(file) {
    return normallize(path.relative(process.cwd(), file.replace('src/', '')))
  }

  function debug(...args) {
    DEBUG &&
      console.log(
        c.dim(new Date().toLocaleTimeString()),
        c.bold(c.red(`[debug:${pluginName}]`)),
        ...args
      )
  }
}
