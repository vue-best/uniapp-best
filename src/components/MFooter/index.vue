<template>
  <view class="m-footer">
    <view>uniapp best</view>
    <view>2024-{{ new Date().getFullYear() }} Ⓒ vue best</view>
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
  defineOptions({
    name: 'MFooter',
    options: {
      styleIsolation: 'shared',
    },
  })
</script>

<style scoped lang="scss">
  .m-footer {
    @apply text-12px text-center color-gray my-24px;
  }
</style>
