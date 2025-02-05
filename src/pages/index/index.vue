<template>
  <Home v-if="curTabBar === 'home'"></Home>
  <Mine v-else-if="curTabBar === 'mine'"></Mine>
</template>

<script setup lang="ts">
  import { onPageScroll } from '@dcloudio/uni-app'

  import { useUserStore } from '@/stores/modules/userStore'
  import Home from '@/pages/index/home/index.vue'
  import Mine from '@/pages/index/mine/index.vue'

  const userStore = useUserStore()
  const curTabBar = computed(() => userStore.curTabBar)

  onPageScroll((e) => {
    console.log('-----page----', 1)
    if (e.scrollTop < 44) {
      // this.bgColorOpacity = (e.scrollTop / 44) * 1
    } else if (e.scrollTop > 44) {
      // this.bgColorOpacity = 1
      console.log('-----page----', 2)
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
