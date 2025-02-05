<template>
  <Home v-if="curTabBar === 'home'" :scroll-page="scrollPage"></Home>
  <Mine v-else-if="curTabBar === 'mine'" :scroll-page="scrollPage"></Mine>
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
  const curTabBar = computed(() => userStore.curTabBar)
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
    uni.setLocale('en')
  })
</script>

<style lang="scss">
  .content {
    @apply flex flex-col gap-16px items-center justify-center;
  }
</style>
