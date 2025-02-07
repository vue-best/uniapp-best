<!-- keepalive效果：先用if来控制是否渲染组件，后用show来控制组件的显示和隐藏，每个页面的if控制只修改一次，首页的if默认是true -->
<template>
  <view v-if="tabbarList[0].show" v-show="curTabBar === 'home'">
    <Home :scroll-page="scrollPage"></Home>
  </view>
  <view v-if="tabbarList[1].show" v-show="curTabBar === 'mine'">
    <Mine :scroll-page="scrollPage"></Mine>
  </view>
</template>

<script lang="ts">
  // 主动声明 onPageScroll ,通知小程序该页面需要 onPageScroll
  export default {
    onPageScroll() {},
  }
</script>

<script setup lang="ts">
  import { onPageScroll } from '@dcloudio/uni-app'

  import { useUserStore } from '@/stores/modules/userStore'
  import Home from '@/pages/index/home/index.vue'
  import Mine from '@/pages/index/mine/index.vue'

  const userStore = useUserStore()
  const tabbarList = ref(userStore.tabbar)
  const curTabBar = computed(() => userStore.curTabBar)
  console.log('214234-', curTabBar.value)
  const scrollPage = ref(false)

  onPageScroll((e) => {
    if (e.scrollTop < 44) {
      scrollPage.value = false
    } else if (e.scrollTop > 44) {
      scrollPage.value = true
    }
  })

  onLaunch(() => {
    // 测试
    // uni.setLocale('zh-Hans')
  })
</script>

<style lang="scss">
  .content {
    @apply flex flex-col gap-16px items-center justify-center;
  }
</style>
