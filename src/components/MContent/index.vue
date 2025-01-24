<template>
  <view class="m-content">
    <slot></slot>
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
  defineOptions({ name: 'MContent' })

  withDefaults(
    defineProps<{
      bg?: boolean
    }>(),
    {
      bg: true,
    }
  )
</script>

<style scoped lang="scss">
  .m-content {
    @apply relative flex-1 h-full p-12px overflow-y-auto;
    background: linear-gradient(180deg, var(--color-primary-2) 0%, var(--bg-page) 100%);
    &:has(.m-tabbar) {
      :deep(.m-footer) {
        padding-bottom: 25px;
      }
    }
  }
</style>
