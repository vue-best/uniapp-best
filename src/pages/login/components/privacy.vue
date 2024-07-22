<template>
  <up-modal :show="show" class="" :z-index="0">
    <view class="relative w-full h-450px">
      <view class="text-16px font-600 text-center mb-30px">UniApp Best 个人信息保护政策</view>
      <web-view src="https://zh.uniapp.dcloud.io/" class="relative mt-30px h-400px"></web-view>
    </view>
    <template #confirmButton>
      <view class="flex justify-between text-center gap-20px">
        <view class="btn-default flex-1" @click="onNotAgree">不同意</view>
        <view class="btn-primary flex-1" @click="onAgree">同意</view>
      </view>
    </template>
  </up-modal>
</template>

<script setup lang="ts">
  defineOptions({ name: 'PrivacyModal' })

  const emit = defineEmits<{
    (e: 'privacy', data: boolean): void
  }>()
  const show = ref(true)

  const onNotAgree = () => {
    emit('privacy', false)
    show.value = false
  }
  const onAgree = () => {
    emit('privacy', true)
    show.value = false
  }

  onMounted(() => {})
</script>
