<template>
  <wd-image v-bind="$attrs" :src="src" @click="onPreview"></wd-image>
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
  defineOptions({
    name: 'MIcon',
  })
  const props = defineProps<{
    src: string
  }>()

  const onPreview = () => {
    uni.previewImage({
      urls: [props.src], //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
    })
  }
</script>
