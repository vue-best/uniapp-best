<!--
 * @Author: wjc
 * @Date: 2024-06-18 10:17:32
 * @LastEditors: wjc
 * @LastEditTime: 2024-06-28 10:25:01
 * @Description: 
-->
<template>
  <view class="m-footer">
    <view>UniApp Best</view>
    <view>2024-{{ new Date().getFullYear() }} Ⓒ Vue Best</view>
  </view>
</template>

<script setup lang="ts">
  defineOptions({ name: 'MFooter' })
</script>

<style scoped lang="scss">
  .m-footer {
    @apply text-12px text-center color-gray my-24px;
  }
</style>
