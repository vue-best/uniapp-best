<template>
  <view class="login-container">
    <view class="header">
      <image :src="logo" class="logo"></image>
      <view class="title">欢迎使用 UniApp Best</view>
      <view class="desc">可使用账号密码登录</view>
    </view>
    <view class="form">
      <up-form ref="formRef" :model="formState" :rules="rules" error-type="toast">
        <up-form-item prop="account">
          <up-input
            v-model="formState.account"
            border="none"
            placeholder="请输入账号，任意账号"
          ></up-input>
        </up-form-item>
        <up-form-item prop="password">
          <up-input
            v-model="formState.password"
            border="none"
            type="password"
            placeholder="请输入密码，任意密码"
          ></up-input>
        </up-form-item>
      </up-form>
      <view class="flex items-center color-gray text-14px mt-24px mb-24px">
        <up-checkbox-group v-model="isChecks">
          <up-checkbox
            shape="circle"
            name="isCheck"
            label="我已阅读同意"
            :label-size="14"
          ></up-checkbox>
        </up-checkbox-group>
        <text class="font-500 color-black" @click="goPrivacy">
          《UniApp Best 个人信息保护政策》
        </text>
      </view>
      <up-button type="primary" class="btn-primary" @click="onSubmit">登录</up-button>
      <up-button type="text" class="mt-24px" @click="onTest">查看 Auth 页面</up-button>
    </view>
    <MFooter></MFooter>
    <PrivacyModal @privacy="handlePrivacy"></PrivacyModal>
  </view>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/stores/modules/userStore'
  import logo from '@/static/images/logo.svg'
  import PrivacyModal from './components/privacy.vue'

  defineOptions({ name: 'Login' })

  const userStore = useUserStore()
  const formRef = ref(null)
  const formState = ref({
    account: '',
    password: '',
  })
  const isChecks = ref([])
  const rules = ref({
    account: {
      type: 'number',
      required: true,
      message: '请输入账号',
      trigger: ['blur', 'change'],
    },
    password: {
      type: 'string',
      required: true,
      message: '请输入密码',
      trigger: ['blur', 'change'],
    },
  })

  const goPrivacy = () => {
    uni.navigateTo({ url: '/pages/privacy/index' })
  }

  const onTest = () => {
    uni.navigateTo({ url: '/pages/test/index' })
  }

  const onSubmit = () => {
    formRef.value
      .validate()
      .then((valid) => {
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
      @apply mt-140px;
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
      .u-form {
        @apply flex flex-col gap-18px;
        .u-form-item {
          @apply bg-bg-page rounded-20px px-16px;
        }
      }
    }
  }
</style>
