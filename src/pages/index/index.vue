<template>
  <MNavBar title="首页" :not-back="true"></MNavBar>
  <view class="content">
    <view :class="`i-custom-${icon}`" class="wh-160px"></view>
    <view class="text-area">
      <view class="title">{{ $tt('index.lang.params', { appName }) }}</view>
    </view>
    <wd-button>确定</wd-button>
    <wd-button @click="onTest">前往 Auth 页面</wd-button>
  </view>
  <MTabBar></MTabBar>
</template>

<script setup lang="ts">
  const icon = ref('logo')
  const appName = ref('uniapp-best')

  const onTest = () => {
    uni.navigateTo({
      url: '/pages/test/index',
    })
  }

  onLaunch(() => {
    // 测试
    uni.setLocale('en')
  })
</script>

<style lang="scss">
  .content {
    @apply flex flex-col gap-16px items-center justify-center;
  }
</style>
