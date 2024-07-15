<!--
 * @Author: wjc
 * @Date: 2024-07-02 15:15:41
 * @LastEditors: wjc
 * @LastEditTime: 2024-07-15 10:43:58
 * @Description: 
-->
<template>
  <view>
    <up-modal :show="true">
      <view class="text-18px py-24px">暂无权限访问该页面，请先登录</view>
      <template #confirmButton>
        <view class="flex justify-between text-center gap-20px">
          <view class="btn-primary flex-1" @click="handleConfirm">确定</view>
        </view>
      </template>
    </up-modal>
  </view>
</template>

<script setup lang="ts">
  defineOptions({ name: 'Auth' })

  const handleConfirm = () => {
    uni.reLaunch({ url: '/pages/login/index' })
  }
</script>
