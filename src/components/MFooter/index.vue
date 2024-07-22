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
