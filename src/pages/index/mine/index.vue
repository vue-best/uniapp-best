<template>
  <MNavBar
    :title="scrollPage ? '我的' : ''"
    :fixed="scrollPage"
    bg-color="#e8fff2"
    :not-back="true"
  ></MNavBar>
  <view class="mine-content">
    <view class="user">
      <view class="user-avatar">
        <view class="i-custom-avatar wh-54px rounded-50%"></view>
      </view>
      <view class="user-name">
        <view class="font-500">{{ userStore.userInfo.name }}</view>
        <view>12345678901</view>
      </view>
    </view>
    <MCard>
      <view class="flex items-center justify-between">
        <text class="font-500">我的订单</text>
        <view class="flex items-center">
          <text class="color-text-place text-13px">全部</text>
          <text class="i-ep-arrow-right wh-14px color-text-place"></text>
        </view>
      </view>
      <view class="flex justify-between mt-20px">
        <view class="text-center">
          <view class="i-custom-zhifu wh-36px"></view>
          <view>待支付</view>
        </view>
        <view class="text-center">
          <view class="i-custom-fahuo wh-36px"></view>
          <view>待发货</view>
        </view>
        <view class="text-center">
          <view class="i-custom-shouhuo wh-36px"></view>
          <view>待收货</view>
        </view>
        <view class="text-center">
          <view class="i-custom-shouhou wh-36px"></view>
          <view>售后</view>
        </view>
      </view>
    </MCard>
    <view class="ticket-info">
      <view class="font-700 mb-12px text-16px color-#333">分享优惠给好友</view>
      <text
        class="bg-white rounded-30px px-16px py-4px font-500 text-13px border-1px border-solid border-#333 w-auto color-#333"
      >
        立即分享
      </text>
    </view>
    <MCard space direction="vertical">
      <view class="flex justify-between items-center w-full text-14px">
        <view class="flex items-center gap-6px">
          <view class="i-ep-ticket wh-20px color-#09AB4F"></view>
          <text>优惠券</text>
        </view>
        <view class="i-ep-arrow-right wh-16px color-text-place"></view>
      </view>
      <view class="flex justify-between items-center w-full text-14px">
        <view class="flex items-center gap-6px">
          <view class="i-ep-setting wh-20px color-#09AB4F"></view>
          <text>基本设置</text>
        </view>
        <view class="i-ep-arrow-right wh-16px color-text-place"></view>
      </view>
      <view class="flex justify-between items-center w-full text-14px">
        <view class="flex items-center gap-6px">
          <view class="i-ep-phone wh-20px color-#09AB4F"></view>
          <text>联系客服</text>
        </view>
        <view class="i-ep-arrow-right wh-16px color-text-place"></view>
      </view>
    </MCard>
    <MCard space direction="vertical">
      <view class="flex justify-between items-center w-full text-14px">
        <view class="flex items-center gap-6px">
          <view class="i-ep-open wh-20px color-#09AB4F"></view>
          <view>{{ $tt('index.dark') }}</view>
        </view>
        <wd-switch v-model="appStore.isDark"></wd-switch>
      </view>
      <view class="flex justify-between items-center w-full text-14px">
        <view class="flex items-center gap-6px">
          <view class="i-ep-info-filled wh-20px color-#09AB4F"></view>
          <view>{{ $tt('index.language') }}</view>
        </view>
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
      <view class="flex justify-between items-center w-full text-14px" @click="handleConfirmLogout">
        <view class="flex items-center gap-6px">
          <view class="i-ep-switch-button wh-20px color-#09AB4F"></view>
          <text>{{ $tt('index.logout') }}</text>
        </view>
        <view class="i-ep-arrow-right wh-16px color-text-place"></view>
      </view>
    </MCard>
    <MDialog :visible="logoutShow" @cancel="handleCancel" @confirm="handleConfirm">
      <view class="text-18px py-24px color-text-1">确认退出登录？</view>
    </MDialog>
  </view>
  <MTabBar></MTabBar>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/stores/modules/userStore'
  import { useAppStore } from '@/stores/modules/appStore'

  defineOptions({
    name: 'Mine',
    options: {
      // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，可以去掉微信小程序自定义组件多出的最外层标签
      virtualHost: true,
    },
  })
  withDefaults(defineProps<{ scrollPage: boolean }>(), { scrollPage: false })

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
          url: '/subPages/login/index',
        })
      }
    })
  }

  onMounted(() => {
    console.log('mine mounted----')
  })
</script>

<style scoped lang="scss">
  .mine-content {
    @apply p-12px h-full;
    background: linear-gradient(180deg, #e8fff2 0%, var(--bg-page) 30%);
  }
  .user {
    @apply flex items-center gap-16px mb-24px;
    .user-avatar {
      @apply flex-center wh-54px rounded-50% bg-bg-card;
    }
  }
  .ticket-info {
    @apply h-60px rounded-10px p-16px;
    background-image: url('@/static/images/ticket-bg.svg');
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
</style>
