<!--
 * @Author: wjc
 * @Date: 2019-08-22 19:41:20
 * @LastEditors: wjc
 * @LastEditTime: 2024-07-02 15:19:28
 * @Description: 
-->
<template>
  <view class="content">
    <image class="logo" src="/static/images/logo.svg"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view :class="`i-custom-${icon}`" class="wh-32px text-32px"></view>
    <u-button type="primary" text="确定"></u-button>
    <u-button @click="onTest">前往 Auth 页面</u-button>
  </view>
</template>

<script setup lang="ts">
  import MIcon from '@/components/MIcon/index.vue'

  const title = ref('自定义图标')
  const icon = ref('logo')

  const onTest = () => {
    uni.navigateTo({
      url: '/pages/test/index'
    })
  }
</script>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    grid-gap: 8px;
    align-items: center;
    justify-content: center;
  }

  .logo {
    width: 200rpx;
    height: 200rpx;
    margin-top: 200rpx;
    margin-right: auto;
    margin-bottom: 50rpx;
    margin-left: auto;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>
