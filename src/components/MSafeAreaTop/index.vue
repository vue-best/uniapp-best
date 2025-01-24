<template>
  <view
    class="safe-area-inset-top bg-transparent"
    :style="{ height: safeAreaInsetTop + 'px' }"
  ></view>
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
  import { useSafeAreaInsetTop } from '@/hooks/useSafeAreaInsetTop'

  defineOptions({ name: 'MSafeAreaTop' })

  const { safeAreaInsetTop } = useSafeAreaInsetTop()
</script>
