<template>
  <svg v-bind="$attrs" aria-hidden="true" class="m-icon">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'MIcon',
  })

  const props = withDefaults(
    defineProps<{
      prefix?: string
      name: string
      color?: string
      size?: number | string
    }>(),
    {
      prefix: 'icon',
      name: '',
      color: '#333',
      size: 24,
    }
  )

  const symbolId = computed(() => `#${props.prefix}-${props.name}`)
  const sizeStyle = computed(() => `${props.size}px`)
</script>

<style scoped lang="scss">
  .m-icon {
    width: v-bind(sizeStyle);
    height: v-bind(sizeStyle);
  }
</style>
