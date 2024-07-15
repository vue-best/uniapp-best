<template>
  <view
    class="m-card"
    :style="{
      padding: `${padding}px`,
      background: `${bgColor}`,
    }"
    :class="[`${rounded ? 'rounded-12px' : ''}`]"
  >
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
  defineOptions({ name: 'MCard' })

  withDefaults(
    defineProps<{
      bgColor?: string
      rounded?: boolean
      padding?: number | string
    }>(),
    {
      bgColor: 'white',
      padding: 16,
      rounded: true,
    }
  )
</script>

<style scoped lang="scss">
  .m-card {
    @apply my-12px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 20%);
  }
</style>
