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
    uni.navigateTo({ url: '/pages/login/index' })
  }
</script>

<style scoped lang="scss"></style>
