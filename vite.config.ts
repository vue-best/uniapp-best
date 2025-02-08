import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import UnoCSS from 'unocss/vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'

import UniProvider from './build/vite-plugin-uni-provider'

const root = process.cwd()

function pathResolve(dir: string) {
  return path.resolve(root, '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    resolve: {
      alias: {
        '@': pathResolve('src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_APP_BASE_API, // 对应自己的接口
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      UniLayouts(),
      uni(),
      // UniPages(),
      //自动注册页面全局组件
      UniProvider(),
      UnoCSS(),
      vueJsx(),
      createSvgIconsPlugin({
        iconDirs: [pathResolve('src/static/icons')],
        symbolId: 'icon-[dir]-[name]',
        svgoOptions: true,
      }),
      Components({
        // 按需导入组件，相关组件声明放置于 components.d.ts
        dts: './types/components.d.ts',
        dirs: ['src/components'],
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
        ],
        dirs: ['./src'],
        imports: ['vue', 'uni-app'], // 限定范围为 vue, uni-app
        dts: 'types/auto-import.d.ts', // 自动生成 'auto-import.d.ts'全局声明
      }),
    ],
    // build: {
    //   // 方便非h5端调试
    //   sourcemap: env.VITE_SHOW_SOURCEMAP === 'true', // 默认是false
    //   target: 'es6',
    //   // 开发环境不用压缩
    //   minify: mode === 'development' ? false : 'terser',
    //   terserOptions: {
    //     compress: {
    //       drop_console: env.VITE_DELETE_CONSOLE === 'true',
    //       drop_debugger: true,
    //     },
    //   },
    // },
  }
})
