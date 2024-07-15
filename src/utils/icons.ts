/*
 * @Author: wjc
 * @Date: 2024-05-29 09:55:14
 * @LastEditors: wjc
 * @LastEditTime: 2024-05-29 15:59:22
 * @Description:
 */
import fs from 'fs'
import ep from '@iconify-json/ep/icons.json'

const epList = Object.keys(ep.icons).map((i) => `i-ep-${i}`)
let custom: string[] = []

const files = fs.readdirSync('./src/static/icons/')
custom = files.map((item: string) => `i-custom-${item.replace('.svg', '')}`)

const iconList = [...epList, ...custom]

export default iconList
