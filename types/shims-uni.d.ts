/*
 * @Author: wjc
 * @Date: 2024-06-05 15:57:41
 * @LastEditors: wjc
 * @LastEditTime: 2024-06-05 17:42:44
 * @Description:
 */
/// <reference types='@dcloudio/types' />
import 'vue'

declare module '@vue/runtime-core' {
  type Hooks = App.AppInstance & Page.PageInstance
  interface ComponentCustomOptions extends Hooks {}
}
