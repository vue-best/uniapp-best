<!--
 * @Author: wjc
 * @Date: 2024-05-27 11:50:13
 * @LastEditors: wjc
 * @LastEditTime: 2024-06-28 17:23:49
 * @Description: 
-->
<script setup lang="ts">
  import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

  onLaunch(() => {
    console.log('App Launch')
  })
  onShow(() => {
    console.log('App Show')
  })
  onHide(() => {
    console.log('App Hide')
  })
</script>

<style lang="scss">
  /* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
  @import 'uview-plus/index';

  page {
    @apply h-full;
  }
</style>
