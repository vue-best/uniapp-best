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
      bgColor: 'var(--bg-card)',
      padding: 16,
      rounded: true,
    }
  )
</script>

<style scoped lang="scss">
  @import './styles';
</style>
