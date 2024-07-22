<template>
  <MNavBar title="列表" :right-menu="rightMenu" @right-click="handleRightClick"></MNavBar>
  <view class="flex flex-col gap-16px">
    <template v-for="item in userStore.contentList" :key="item">
      <view>{{ item }}</view>
    </template>
  </view>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/stores/modules/userStore'

  defineOptions({ name: 'Auth' })

  const userStore = useUserStore()
  const rightMenu = ref([
    {
      icon: 'i-ep-link',
      text: '分享链接',
      command: 'qrcode',
    },
    {
      icon: 'i-ep-full-screen',
      text: '发起会议',
      command: 'view',
    },
    {
      icon: 'i-ep-credit-card',
      text: '收付款',
      command: 'money',
    },
  ])

  const handleRightClick = (val) => {
    console.log('点击了多功能菜单：', val)
  }

  onShow(() => {
    userStore.contentListAction()
  })
</script>
