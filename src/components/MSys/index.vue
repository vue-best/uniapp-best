<template>
  <page-meta>
    <!-- 微信小程序非自定义组件不支持 v-bind(2025-1-16)，兼容处理 -->
    <!-- <navigation-bar v-bind="originNavBarStyle" /> -->
    <navigation-bar
      :front-color="originNavBarStyle.frontColor"
      :background-color="originNavBarStyle.backgroundColor"
      :animation="originNavBarStyle.animation"
    />
  </page-meta>
  <view
    class="safe-area-inset-top bg-transparent"
    :style="{ height: safeAreaInsetTop + 'px' }"
  ></view>
  <wd-config-provider :theme="theme">
    <slot></slot>
  </wd-config-provider>
</template>

<script setup lang="ts">
  import { useSafeAreaInsetTop } from '@/hooks/useSafeAreaInsetTop'
  import { onLaunch, onShow } from '@dcloudio/uni-app'
  import { useAppStore } from '@/stores/modules/appStore'

  defineOptions({ name: 'MSys' })

  const { safeAreaInsetTop } = useSafeAreaInsetTop()
  const appStore = useAppStore()
  const theme = computed(() => (appStore.isDark ? 'dark' : 'light'))

  const setBarStyle = () => {
    if (appStore.isDark) {
      const styles: UniApp.SetNavigationbarColorOptions = {
        frontColor: '#ffffff',
        backgroundColor: '#1a1a1a',
        animation: {
          duration: 0,
          timingFunc: 'easeIn',
        },
      }
      uni.setNavigationBarColor(styles)
      return styles
    } else {
      const styles: UniApp.SetNavigationbarColorOptions = {
        frontColor: '#000000',
        backgroundColor: '#f8f8f8',
        animation: {
          duration: 0,
          timingFunc: 'easeIn',
        },
      }
      uni.setNavigationBarColor(styles)
      return styles
    }
  }

  const originNavBarStyle = computed(setBarStyle)

  onLaunch(() => {
    setBarStyle()
    uni.hideTabBar()
  })
  onShow(() => {
    setBarStyle()
    uni.hideTabBar()
  })
</script>
