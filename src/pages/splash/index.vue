<template>
  <view class="splash-container">
    <template v-if="isInstall">
      <view class="splash-mask">
        <image src="@/static/images/logo.svg" class="splash-logo"></image>
        <view class="text">
          <view>发现好用的</view>
          <view class="vue">VUE</view>
          <view>生态资源</view>
        </view>
      </view>
    </template>
    <wd-swiper
      v-else
      :list="list"
      height="100vh"
      :autoplay="false"
      @click="onTapSwiper"
    ></wd-swiper>
  </view>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/stores/modules/userStore'

  import guide1 from '@/static/images/guide1.png'
  import guide2 from '@/static/images/guide2.png'
  import guide3 from '@/static/images/guide3.png'

  defineOptions({ name: 'Splash' })

  const userStore = useUserStore()
  const isInstall = computed(() => userStore.isInstall)
  const list = ref([guide1, guide2, guide3])

  const onTapSwiper = (index: number) => {
    if (index === 2) {
      uni.navigateTo({
        url: '/pages/login/index',
      })
    }
  }

  onMounted(() => {
    userStore
      .getUserInfoAction()
      .then((res) => {
        if (res) {
          // setTimeout(() => {
          // uni.switchTab({
          //   url: '/pages/index/index',
          // })
          // }, 2000)
        } else {
          uni.reLaunch({
            url: '/pages/login/index',
          })
        }
      })
      .catch((err) => {
        uni.reLaunch({
          url: '/pages/login/index',
        })
      })
  })
</script>

<style scoped lang="scss">
  .splash-container {
    .splash-mask {
      @apply flex flex-col  items-center text-center;
      .text {
        @apply flex items-center color-text-1 text-32px text-center mt-36px;
        letter-spacing: 10px;
        writing-mode: vertical-rl;
        .vue {
          @apply text-48px font-700 bg-bg-primary;
          letter-spacing: 0px;
          background: linear-gradient(315deg, #42d392 25%, #647eff);
          background-clip: text;
          writing-mode: horizontal-tb;
          -webkit-text-fill-color: transparent;
        }
      }
    }
    :deep(.wd-swiper__track) {
      @apply rounded-0px;
    }
  }
</style>
