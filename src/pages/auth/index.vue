<template>
  <wd-message-box />
</template>

<script setup lang="ts">
  import { useMessage } from 'wot-design-uni'

  defineOptions({ name: 'Auth' })

  const message = useMessage()

  function alert() {
    message
      .alert({
        msg: '暂无权限访问该页面，请先登录',
      })
      .then(() => {
        handleConfirm()
      })
  }

  const handleConfirm = () => {
    uni.reLaunch({ url: '/pages/login/index' })
  }

  onMounted(() => alert())
</script>
