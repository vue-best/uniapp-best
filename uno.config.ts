/*
 * @Author: wjc
 * @Date: 2023-05-07 20:59:28
 * @LastEditors: wjc
 * @LastEditTime: 2024-07-15 10:40:16
 * @Description:
 */
import {
  defineConfig,
  presetUno,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import iconList from './src/utils/icons'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        display: 'inline-block',
      },
      // cdn: 'https://esm.sh/'
      collections: {
        custom: FileSystemIconLoader('./src/static/icons/'),
        ep: () => import('@iconify-json/ep/icons.json').then((i) => i.default),
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  rules: [
    [/^m-h-(.+)$/, ([, d]) => ({ 'margin-left': `${d}`, 'margin-right': `${d}` })],
    [/^m-v-(.+)$/, ([, d]) => ({ 'margin-top': `${d}`, 'margin-bottom': `${d}` })],
    [/^p-h-(.+)$/, ([, d]) => ({ 'padding-left': `${d}`, 'padding-right': `${d}` })],
    [/^p-v-(.+)$/, ([, d]) => ({ 'padding-top': `${d}`, 'padding-bottom': `${d}` })],
    [/^max-w-(\s+)$/, ([, d]) => ({ 'max-width': `${d}` })],
    [/^min-w-(\s+)$/, ([, d]) => ({ 'min-width': `${d}` })],
    [/^max-h-[(\s+)]$/, ([, d]) => ({ 'max-height': `${d}` })],
    [/^min-h-[(\s+)]$/, ([, d]) => ({ 'min-height': `${d}` })],
    [/^font-s-(\d+(\.\d+)?\w+)$/, ([, d]) => ({ 'font-size': `${d}` })],
    [/^wh-(.+)$/, ([, d]) => ({ width: `${d}`, height: `${d}` })],
    [/^bg-color-(\d+)$/, ([, d]) => ({ 'background-color': `${d}` })],
  ],
  safelist: iconList,
  shortcuts: {
    'wh-full': 'w-full h-full',
    'mp-0': 'm-0 p-0',
    'ma-x': 'mt-0 mb-0 ml-auto mr-auto',
    'inline-flex-center': 'inline-flex justify-center items-center',
    'flex-center': 'flex justify-center items-center',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    // 文本溢出显示省略号
    'text-overflow': 'overflow-hidden whitespace-nowrap text-ellipsis',
    // 文本溢出换行
    'text-break': 'whitespace-normal break-all break-words',
  },
  theme: {
    breakpoints: {
      xs: '480px',
      sm: '768px',
      md: '992px',
      lg: '1200px',
      xl: '1920px',
    },
    colors: {
      primary: 'var(--color-primary)',
      success: 'var(--color-success)',
      warning: 'var(--color-warning)',
      danger: 'var(--color-danger)',
      error: 'var(--color-error)',
      info: 'var(--color-info)',
      text: {
        '1': 'var(--text-color-1)',
        '2': 'var(--text-color-2)',
        '3': 'var(--text-color-3)',
        4: 'var(--bg-color-4)',
        place: 'var(--text-color-place)',
        disabled: 'var(--text-color-disabled)',
        whiter: 'var(--text-color-whiter)',
      },
      bg: {
        color: 'var(--bg-color)',
        1: 'var(--bg-color-1)',
        2: 'var(--bg-color-2)',
        3: 'var(--bg-color-3)',
        4: 'var(--bg-color-4)',
        page: 'var(--bg-page)',
        card: 'var(--bg-card)',
        place: 'var(--text-color-place)',
        divider: 'var(--bg-divider)',
        overlay: 'var(--bg-overlay)',
        primary: 'var(--color-primary)',
      },
      border: {
        1: 'var(--border-color-1)',
      },
    },
  },
})
