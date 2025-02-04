<template>
  <wd-tabbar
    :model-value="userStore.curTabBar"
    custom-class="m-tabbar"
    shape="round"
    :fixed="true"
    :z-index="11"
    :placeholder="true"
    :safe-area-inset-bottom="true"
    @change="handleChange"
  >
    <wd-tabbar-item
      v-for="item in tabbarList"
      :key="item.code"
      :name="item.code"
      :title="item.text"
    >
      <template #icon>
        <image
          v-if="userStore.curTabBar === item.code"
          class="tabbar-icon"
          :src="`/${item.selectedIconPath}`"
        ></image>
        <image v-else class="tabbar-icon" :src="`/${item.iconPath}`"></image>
      </template>
    </wd-tabbar-item>
  </wd-tabbar>
</template>

<script lang="ts">
  export default {
    // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，可以去掉微信小程序自定义组件多出的最外层标签
    options: {
      virtualHost: true,
    },
  }
</script>
<script setup lang="ts">
  import { useUserStore } from '@/stores/modules/userStore'

  defineOptions({
    name: 'MTabBar',
    options: {
      styleIsolation: 'shared',
    },
  })

  const userStore = useUserStore()
  const tabbarList = ref(userStore.tabbar)

  const handleChange = (data: any) => {
    userStore.setTabBar(data.value)
  }
</script>

<style scoped lang="scss">
  .m-tabbar {
    @apply h-50px bg-bg-card mb-10px;
    border-color: var(--border-color-1) !important;
    .tabbar-icon {
      @apply wh-20px;
    }
  }
</style>
