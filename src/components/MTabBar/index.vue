<!--
 * @Author: wjc
 * @Date: 2024-07-08 16:31:21
 * @LastEditors: wjc
 * @LastEditTime: 2024-07-12 17:03:13
 * @Description: 
-->
<template>
  <up-tabbar
    :value="appStore.selectedTabbar"
    class="m-tabbar"
    :fixed="true"
    :z-index="99"
    :placeholder="true"
    :safe-area-inset-bottom="true"
    @change="handleChange"
  >
    <up-tabbar-item v-for="(item, index) in tabbarList" :key="index" :text="item.text">
      <template #active-icon>
        <image class="tabbar-icon" :src="`/${item.selectedIconPath}`"></image>
      </template>
      <template #inactive-icon>
        <image class="tabbar-icon" :src="`/${item.iconPath}`"></image>
      </template>
    </up-tabbar-item>
  </up-tabbar>
</template>

<script setup lang="ts">
  import { tabBar } from '@/pages.json'
  import { useAppStore } from '@/stores/modules/appStore'

  defineOptions({ name: 'MTabBar' })

  const appStore = useAppStore()
  const tabbarList = ref(tabBar.list)

  const handleChange = (val: number) => {
    appStore.setTabbar(val)
    uni.switchTab({
      url: `/${tabbarList.value[val].pagePath}`,
    })
  }
</script>

<style scoped lang="scss">
  .m-tabbar {
    @apply h-50px;
    :deep(.u-tabbar__content) {
      @apply bg-bg-card;
      border-color: var(--border-color-1) !important;
    }
    .tabbar-icon {
      @apply wh-32px;
    }
  }
</style>
