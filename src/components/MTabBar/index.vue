<template>
  <wd-tabbar
    :model-value="appStore.selectedTabbar"
    custom-class="m-tabbar"
    :fixed="true"
    :z-index="99"
    :placeholder="true"
    :safe-area-inset-bottom="true"
    @change="handleChange"
  >
    <wd-tabbar-item v-for="(item, index) in tabbarList" :key="index" :title="item.text">
      <template #icon>
        <image
          v-if="appStore.selectedTabbar === index"
          class="tabbar-icon"
          :src="`/${item.selectedIconPath}`"
        ></image>
        <image v-else class="tabbar-icon" :src="`/${item.iconPath}`"></image>
      </template>
    </wd-tabbar-item>
  </wd-tabbar>
</template>

<script setup lang="ts">
  import { tabBar } from '@/pages.json'
  import { useAppStore } from '@/stores/modules/appStore'

  defineOptions({
    name: 'MTabBar',
    options: {
      styleIsolation: 'shared',
    },
  })

  const appStore = useAppStore()
  const tabbarList = ref(tabBar.list)

  const handleChange = (data: any) => {
    appStore.setTabbar(data.value)
    uni.switchTab({
      url: `/${tabbarList.value[data.value].pagePath}`,
    })
  }
</script>

<style scoped lang="scss">
  .m-tabbar {
    @apply h-50px bg-bg-card;
    border-color: var(--border-color-1) !important;
    .tabbar-icon {
      @apply wh-20px;
    }
  }
</style>
