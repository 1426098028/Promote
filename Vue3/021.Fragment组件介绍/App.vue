<template>
  <div>Fragment组件介绍</div>
  <!-- 在Vue3中:组件可以没有根标签,内部会将多个标签包含在一个Fragment虚拟元素中(隐性) -->
  <!-- 好处:减少标签层级,减少内存占用 -->
</template>
<script lang="ts">
import { defineComponent, } from 'vue'
export default defineComponent({
  name: 'AppName',
})
</script>