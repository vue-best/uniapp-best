<!--
 * @Author: wjc
 * @Date: 2024-06-25 15:42:58
 * @LastEditors: wjc
 * @LastEditTime: 2024-06-25 16:22:04
 * @Description: 
-->
<template>
  <MPage>
    <slot></slot>
    <MFooter></MFooter>
  </MPage>
</template>

<script setup lang="ts">
  import MPage from '@/components/MPage'
  import MFooter from '@/components/MFooter'

  defineOptions({ name: 'DefaultLayout' })
</script>
