<template>
  <view class="login-container">
    <view class="header">
      <image :src="logo" class="logo"></image>
      <view class="title">欢迎使用 UniApp Best</view>
      <view class="desc">可使用账号密码登录</view>
    </view>
    <view class="form">
      <wd-form ref="formRef" :model="formState" :rules="rules" error-type="toast">
        <wd-input
          v-model="formState.account"
          prop="account"
          clearable
          no-border
          custom-class="rounded-24px mb-24px px-24px"
          custom-input-class="h-40px!"
          placeholder="请输入账号，任意账号"
        ></wd-input>
        <wd-input
          v-model="formState.password"
          prop="password"
          type="password"
          clearable
          no-border
          custom-class="rounded-24px mb-24px px-24px"
          custom-input-class="h-40px!"
          placeholder="请输入密码，任意密码"
        ></wd-input>
      </wd-form>
      <view class="flex items-center color-gray text-14px mt-24px mb-24px">
        <wd-checkbox v-model="isChecks" name="isCheck" :label-size="14">我已阅读同意</wd-checkbox>
        <text class="font-500 color-black" @click="goPrivacy">《个人信息保护政策》</text>
      </view>
      <view class="flex flex-col">
        <wd-button type="primary" class="btn-primary" @click="onSubmit">登录</wd-button>
        <wd-button type="text" class="mt-24px" @click="onTest">查看权限页面</wd-button>
      </view>
    </view>
    <MFooter></MFooter>
    <!-- <PrivacyModal @privacy="handlePrivacy"></PrivacyModal> -->
  </view>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/stores/modules/userStore'
  import logo from '@/static/images/logo.svg'
  // import PrivacyModal from './components/privacy.vue'

  defineOptions({ name: 'Login' })

  const userStore = useUserStore()
  const formRef = ref(null)
  const formState = ref({
    account: '',
    password: '',
  })
  const isChecks = ref([])
  const rules = ref({
    account: [
      {
        type: 'number',
        required: true,
        message: '请输入账号',
        trigger: ['blur', 'change'],
      },
    ],
    password: [
      {
        type: 'string',
        required: true,
        message: '请输入密码',
        trigger: ['blur', 'change'],
      },
    ],
  })

  const goPrivacy = () => {
    uni.navigateTo({ url: '/subPages/privacy/index' })
  }

  const onTest = () => {
    uni.navigateTo({ url: '/subPages/test/index' })
  }

  const onSubmit = () => {
    formRef.value
      .validate()
      .then(({ valid }) => {
        if (valid) {
          if (isChecks.value.length === 0) {
            uni.showToast({
              icon: 'none',
              title: '请先阅读并勾选个人信息保护政策',
            })
          } else {
            // userStore.isInstall = true
            // 调用登录接口
            userStore.loginAction(formState.value).then((res) => {
              if (res) {
                // 登录成功后调用获取用户信息的接口
                userStore.getUserInfoAction().then((res) => {
                  if (res) {
                    uni.reLaunch({
                      url: '/pages/index/index',
                    })
                  }
                })
              }
            })
          }
        }
      })
      .catch(() => {
        // 处理验证错误
      })
  }

  const handlePrivacy = (data: boolean) => {
    if (data) {
      isChecks.value = ['isCheck']
    }
  }
</script>

<style scoped lang="scss">
  .login-container {
    @apply wh-full p-24px box-border;
    background: linear-gradient(200deg, #88bcf0 0%, #fff 100%);
    .header {
      @apply mt-120px;
      .logo {
        @apply wh-60px;
      }
      .title {
        @apply text-30px mt-20px mb-10px;
      }
      .desc {
        @apply text-16px color-gray;
      }
    }
    .form {
      @apply my-24px;
    }
  }
</style>
