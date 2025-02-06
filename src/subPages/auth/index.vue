<template>
  <wd-message-box />
</template>

<script setup lang="ts">
  import { useMessage } from 'wot-design-uni'

  defineOptions({ name: 'Auth' })

  const message = useMessage()

  function alert() {
    message
      .confirm({
        title: '暂无权限访问该页面，请先登录',
        closeOnClickModal: false,
      })
      .then(() => {
        handleConfirm()
      })
      .catch(() => {
        uni.navigateBack()
      })
  }

  const handleConfirm = () => {
    uni.reLaunch({ url: '/subPages/login/index' })
  }

  onMounted(() => alert())
</script>
