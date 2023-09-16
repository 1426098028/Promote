<template>
  <div>{{ res }}</div>
  <div>{{ num }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'App',
  // 新的option，所有的组合式 API函数到在这使用，只在初始化时执行一次
  setup() {
    // 函数如果返回是对象，对象中的属性或方法，可以直接在模板中使用
    const res = `认识setup函数`
    return {
      res, num: 10
    }
  }
});
</script>

