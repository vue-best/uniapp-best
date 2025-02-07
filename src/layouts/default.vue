<template>
  <view class="default-layout" :class="[appStore.isDark ? 'dark' : 'light']">
    <slot></slot>
    <MFooter></MFooter>
  </view>
</template>

<script lang="ts">
  export default {
    // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，可以去掉微信小程序自定义组件多出的最外层标签
    options: {
      virtualHost: true,
    },
  }
</script>
<script setup lang="ts">
  import { useAppStore } from '@/stores/modules/appStore'

  defineOptions({ name: 'DefaultLayout' })

  const appStore = useAppStore()
</script>

<style scoped lang="scss">
  .default-layout {
    @apply relative h-full color-text-1 bg-bg-page;
  }
</style>
