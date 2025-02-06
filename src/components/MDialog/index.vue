<template>
  <wd-message-box>
    <slot></slot>
  </wd-message-box>
</template>

<script setup lang="ts">
  import { useMessage } from 'wot-design-uni'

  defineOptions({
    name: 'Auth',
    options: {
      // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，可以去掉微信小程序自定义组件多出的最外层标签
      virtualHost: true,
    },
  })
  const emits = defineEmits<{
    (e: 'confirm'): void
    (e: 'cancel'): void
  }>()
  const props = withDefaults(
    defineProps<{
      title: string
      visible: boolean
    }>(),
    {
      title: '提示',
      visible: false,
    }
  )

  watchEffect(() => {
    if (props.visible) {
      alert()
    }
  })

  const message = useMessage()

  function alert() {
    message
      .confirm({
        title: props.title,
        closeOnClickModal: false,
      })
      .then(() => {
        emits('confirm')
      })
      .catch(() => {
        emits('cancel')
      })
  }
</script>
