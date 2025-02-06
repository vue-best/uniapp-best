<template>
  <view
    class="m-card"
    :style="{
      padding: `${padding}px`,
      background: `${bgColor}`,
    }"
    :class="[`${rounded ? 'rounded-10px' : ''}`, `${spaceClass}`]"
  >
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'MCard',
    options: {
      styleIsolation: 'shared',
      // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，可以去掉微信小程序自定义组件多出的最外层标签
      virtualHost: true,
    },
  })

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
      let cls = `flex gap-16px items-${props.align}`
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
  .m-card {
    @apply my-12px;
    .m-card-item {
      @apply w-full;
    }
    .m-card-spacer {
      @apply h-1px w-full bg-border-1 my-4px;
    }
    .m-card-spacer-horiz {
      @apply h-20px w-1px bg-border-1 my-4px;
    }
  }
</style>
