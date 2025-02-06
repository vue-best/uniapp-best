<template>
  <view :class="`m-content ${props.customClass}`">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'MContent',
    options: {
      styleIsolation: 'shared',
      // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，可以去掉微信小程序自定义组件多出的最外层标签
      virtualHost: true,
    },
  })

  const props = withDefaults(
    defineProps<{
      bg?: boolean
      customClass?: string
    }>(),
    {
      bg: true,
      customClass: '',
    }
  )
</script>

<style scoped lang="scss">
  .m-content {
    @apply relative flex-1 p-12px;
    &:has(.m-tabbar) {
      :deep(.m-footer) {
        padding-bottom: 25px;
      }
    }
  }
</style>
