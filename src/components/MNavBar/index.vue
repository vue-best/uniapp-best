<template>
  <wd-navbar
    ref="mNavBarRef"
    placeholder
    :bordered="false"
    :custom-style="`background:
    ${bgColor}`"
    custom-class="m-navbar"
    :safe-area-inset-top="true"
    v-bind="$attrs"
  >
    <!-- <template #left>
      <view v-if="!notBack" class="i-ep-arrow-left wh-20px cursor-pointer" @click="goBack"></view>
    </template> -->
    <template #capsule>
      <wd-navbar-capsule v-if="!notBack" @back="goBack" @back-home="goHome" />
    </template>
    <template #title>
      <view class="m-navbar-title">{{ title }}</view>
    </template>
    <template #right>
      <slot name="right">
        <view v-if="rightMenu && rightMenu.length > 0" class="right-box">
          <view class="i-ep-more-filled wh-24px cursor-pointer" @click="triggerMore"></view>
          <view v-if="showMore" class="overlay" @click="() => (showMore = false)"></view>
          <view v-if="showMore" class="menu-box">
            <view
              v-for="menu in rightMenu"
              :key="menu.command"
              class="menu-item"
              hover-class="menu-item-hover"
              @click="handleMenuClick(menu.command)"
            >
              <view v-if="menu.icon" :class="menu.icon" class="menu-item-icon"></view>
              <view class="menu-item-text">{{ menu.text }}</view>
            </view>
          </view>
        </view>
      </slot>
    </template>
  </wd-navbar>
</template>

<script setup lang="ts">
  export interface RightMenuItem {
    icon?: string
    text: string
    command: string
  }

  defineOptions({
    name: 'MNavBar',
    // 小程序开启覆盖组件库样式
    options: {
      styleIsolation: 'shared',
      // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，可以去掉微信小程序自定义组件多出的最外层标签
      virtualHost: true,
    },
  })

  withDefaults(
    defineProps<{
      title?: string
      placeholder?: boolean
      notBack?: boolean
      bgColor?: string
      rightMenu?: RightMenuItem[]
    }>(),
    {
      title: '',
      notBack: false,
      bgColor: 'var(--bg-card)',
      rightMenu: () => [],
    }
  )
  const emits = defineEmits<{
    (e: 'right-click', command: string): void
  }>()

  const mNavBarRef = ref()
  const showMore = ref(false)

  const goBack = () => {
    uni.navigateBack()
  }

  const goHome = () => {
    uni.reLaunch({ url: '/pages/index/index' })
  }

  const triggerMore = () => {
    showMore.value = !showMore.value
  }

  const handleMenuClick = (command: string) => {
    emits('right-click', command)
    showMore.value = false
  }
</script>

<style lang="scss">
  .m-navbar {
    .wd-navbar__left {
      view {
        @apply flex items-center;
      }
    }
    .m-navbar-title {
      @apply text-14px color-#213547;
    }
    .right-box {
      @apply relative w-full z-1;
      .overlay {
        @apply fixed inset-0px opacity-100;
        background: rgba(0, 0, 0, 0);
      }
      .menu-box {
        @apply absolute right-0px z-10 flex flex-col gap-6px w-auto whitespace-nowrap rounded-6px bg-bg-card;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 20%);
        .menu-item {
          @apply flex items-center gap-8px h-full flex-1 px-16px py-8px text-left;
          .menu-item-icon {
            @apply wh-30px;
          }
          .menu-item-text {
            @apply w-full text-left;
          }
        }
        .menu-item-hover {
          @apply bg-gray-100;
        }
      }
    }
  }
</style>
