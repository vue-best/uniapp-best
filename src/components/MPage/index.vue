<!--
 * @Author: wjc
 * @Date: 2024-06-18 11:40:55
 * @LastEditors: wjc
 * @LastEditTime: 2024-06-18 11:53:36
 * @Description: 
-->
<template>
  <view class="m-page">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
  defineOptions({ name: 'MPage' })

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
  .m-page {
    @apply h-full bg-white p-12px;
    background: linear-gradient(180deg, #c5e6ff 0%, #ffffff 100%);
    backdrop-filter: blur(57px);
  }
</style>
