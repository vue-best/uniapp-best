<template>
  <MNavBar title="我的" :not-back="true"></MNavBar>
  <MContent>
    <view class="user">
      <view class="user-avatar">
        <view class="i-ep-user wh-32px"></view>
      </view>
      <view class="user-name">
        <view>{{ userStore.userInfo.name }}</view>
        <view>12345678901</view>
      </view>
    </view>
    <MCard :space="true" direction="horizontal" justify="between" align="center">
      <view class="text-center">
        <view class="i-ep-star-filled wh-36px"></view>
        <view>{{ $tt('mine.star') }}</view>
      </view>
      <view class="text-center">
        <view class="i-ep-picture-filled wh-36px"></view>
        <view>{{ $tt('mine.image') }}</view>
      </view>
      <view class="text-center">
        <view class="i-ep-comment wh-36px"></view>
        <view>{{ $tt('mine.message') }}</view>
      </view>
    </MCard>
    <MCard space direction="vertical">
      <view class="flex justify-between items-center w-full">
        <view>{{ $tt('index.dark') }}</view>
        <wd-switch v-model="appStore.isDark"></wd-switch>
      </view>
      <view class="flex justify-between items-center w-full">
        <view>{{ $tt('index.language') }}</view>
        <wd-picker
          v-model="appStore.lang"
          :show="showLang"
          :columns="langs"
          custom-view-class="px-0"
          key-name="label"
          @cancel="cancel"
          @confirm="confirm"
        ></wd-picker>
      </view>
    </MCard>
    <wd-button type="primary" class="btn-primary" @click="handleConfirmLogout">
      {{ $tt('index.logout') }}
    </wd-button>
    <wd-message-box />
    <!-- <up-modal :show="logoutShow">
      <view class="text-18px py-24px color-text-1">确认退出登录？</view>
      <template #confirmButton>
        <view class="flex justify-between text-center gap-20px">
          <view class="btn-default flex-1" @click="handleCancel">取消</view>
          <view class="btn-primary flex-1" @click="handleConfirm">确定</view>
        </view>
      </template>
    </up-modal> -->
  </MContent>
  <MTabBar></MTabBar>
</template>

<script setup lang="ts">
  import { useMessage } from 'wot-design-uni'
  import { useUserStore } from '@/stores/modules/userStore'
  import { useAppStore } from '@/stores/modules/appStore'

  defineOptions({ name: 'Mine' })

  const userStore = useUserStore()
  const appStore = useAppStore()

  const showLang = ref(false)
  const langs = ref([appStore.langs])
  const confirm = (e) => {
    appStore.setLang(e.value[0].value)
    showLang.value = false
  }
  const cancel = (e) => {
    showLang.value = false
  }

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
        uni.reLaunch({
          url: '/pages/login/index',
        })
      }
    })
  }
</script>

<style scoped lang="scss">
  .user {
    @apply flex items-center gap-8px;
    .user-avatar {
      @apply flex-center wh-54px rounded-50% bg-bg-card;
    }
  }
</style>
