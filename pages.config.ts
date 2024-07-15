/*
 * @Author: wjc
 * @Date: 2024-06-25 15:45:01
 * @LastEditors: wjc
 * @LastEditTime: 2024-06-25 15:45:27
 * @Description:
 */
import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  easycom: {
    autoscan: true,
    custom: {
      '^u--(.*)': 'uview-plus/components/u-$1/u-$1.vue',
      '^up-(.*)': 'uview-plus/components/u-$1/u-$1.vue',
      '^u-([^-].*)': 'uview-plus/components/u-$1/u-$1.vue',
      '^uni-(.*)': '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue',
    },
  },
  tabBar: {
    height: '56px',
    fontSize: '12px',
    iconWidth: '36px',
    color: '#7A7E83',
    selectedColor: '#3cc51f',
    borderStyle: 'black',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/index/index',
        iconPath: 'static/images/main/work.png',
        selectedIconPath: 'static/images/main/work_1.png',
        text: '工作台',
      },
      {
        pagePath: 'pages/mine/index',
        iconPath: 'static/images/main/mine.png',
        selectedIconPath: 'static/images/main/mine_1.png',
        text: '我的',
      },
    ],
  },
  globalStyle: {
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'uni-app',
    navigationBarBackgroundColor: '#F8F8F8',
    backgroundColor: '#F8F8F8',
  },
  pages: [],
})
