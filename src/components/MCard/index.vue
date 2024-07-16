<template>
  <view
    class="m-card"
    :style="{
      padding: `${padding}px`,
      background: `${bgColor}`,
    }"
    :class="[`${rounded ? 'rounded-12px' : ''}`, `${spaceClass}`]"
  >
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
  defineOptions({ name: 'MCard' })

  const props = withDefaults(
    defineProps<{
      bgColor?: string
      rounded?: boolean
      padding?: number | string
      border?: boolean
      space?: boolean
      justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
      direction?: 'vertical' | 'horizontal'
      align?: 'center'
    }>(),
    {
      bgColor: 'var(--bg-card)',
      padding: 16,
      rounded: true,
      border: false,
      space: false,
      direction: 'vertical',
      align: 'center',
      justify: 'start',
    }
  )

  const spaceClass = computed(() => {
    if (props.space) {
      let cls = `flex gap-8px items-${props.align}`
      if (props.direction === 'vertical') {
        cls = cls + ' flex-col'
      }
      if (props.justify) {
        cls = cls + ` justify-${props.justify}`
      }
      return cls
    } else {
      return ''
    }
  })
</script>

<style scoped lang="scss">
  @import './styles';
</style>
