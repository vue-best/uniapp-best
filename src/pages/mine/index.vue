<!--
 * @Author: wjc
 * @Date: 2024-06-17 16:02:59
 * @LastEditors: wjc
 * @LastEditTime: 2024-06-28 15:42:27
 * @Description: 
-->
<template>
  <MCard>
    <view>{{ userStore.userInfo.name }}</view>
  </MCard>
  <up-button type="primary" class="btn-primary" @click="handleConfirmLogout">退出登录</up-button>
  <up-modal :show="logoutShow">
    <view class="text-18px py-24px">确认退出登录？</view>
    <template #confirmButton>
      <view class="flex justify-between text-center gap-20px">
        <view class="btn-default flex-1" @click="handleCancel">取消</view>
        <view class="btn-primary flex-1" @click="handleConfirm">确定</view>
      </view>
    </template>
  </up-modal>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/stores/modules/userStore'
  import MCard from '@/components/MCard'

  defineOptions({ name: 'Mine' })

  const userStore = useUserStore()
  const logoutShow = ref(false)

  const handleCancel = () => {
    logoutShow.value = false
  }
  const handleConfirmLogout = () => {
    logoutShow.value = true
  }

  const handleConfirm = () => {
    onLogout()
  }

  const onLogout = () => {
    userStore.logoutAction().then((res) => {
      if (res) {
        uni.navigateTo({
          url: '/pages/login/index',
        })
      }
    })
  }
</script>
