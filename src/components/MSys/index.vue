<template>
  <page-meta>
    <navigation-bar v-bind="originNavBarStyle" />
  </page-meta>
  <slot></slot>
</template>

<script setup lang="ts">
  import { onLaunch, onShow } from '@dcloudio/uni-app'
  import { useAppStore } from '@/stores/modules/appStore'

  defineOptions({ name: 'MSys' })

  const appStore = useAppStore()

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
  })
  onShow(() => {
    setBarStyle()
  })
</script>
