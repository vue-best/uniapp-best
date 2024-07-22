import fs from 'fs'
import ep from '@iconify-json/ep/icons.json'

const epList = Object.keys(ep.icons).map((i) => `i-ep-${i}`)
let custom: string[] = []

const files = fs.readdirSync('./src/static/icons/')
custom = files.map((item: string) => `i-custom-${item.replace('.svg', '')}`)

const iconList = [...epList, ...custom]

export default iconList
