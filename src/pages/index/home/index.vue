<template>
  <MNavBar title="首页" fixed :not-back="true"></MNavBar>
  <view class="content">
    <view :class="`i-custom-${icon}`" class="wh-160px"></view>
    <view class="text-area">
      <view class="title">{{ $tt('index.lang.params', { appName }) }}</view>
    </view>
    <wd-button>确定</wd-button>
    <wd-button @click="onTest">查看权限页面</wd-button>
  </view>
  <MTabBar></MTabBar>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'Home',
    options: {
      // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，可以去掉微信小程序自定义组件多出的最外层标签
      virtualHost: true,
    },
  })

  const icon = ref('logo')
  const appName = ref('uniapp-best')

  const onTest = () => {
    uni.navigateTo({
      url: '/subPages/test/index',
    })
  }

  onMounted(() => {
    console.log('home mounted----')
  })
</script>

<style lang="scss">
  .content {
    @apply flex flex-col gap-16px items-center justify-center;
  }
</style>
