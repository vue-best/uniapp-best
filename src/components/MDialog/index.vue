<template>
  <wd-message-box>
    <slot></slot>
  </wd-message-box>
</template>

<script setup lang="ts">
  import { useMessage } from 'wot-design-uni'

  defineOptions({ name: 'Auth' })
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
      })
      .then(() => {
        emits('confirm')
      })
      .catch(() => {
        emits('cancel')
      })
  }
</script>
