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
    @apply relative flex-1 h-full p-12px overflow-y-auto;
    background: linear-gradient(180deg, var(--color-primary-2) 0%, var(--bg-page) 100%);
    &:has(.m-tabbar) {
      :deep(.m-footer) {
        padding-bottom: 25px;
      }
    }
  }
</style>
