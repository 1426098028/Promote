<template>
  <div>App </div>
  <div>{{ name }}</div>
  <div>{{ age }}</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'


export default defineComponent({
  name: 'AppName',
  setup() {
    /**
     * toRefs
     *  可以把一个响应式对象转换成普通对象,该普通对象的每一个 property 都是一个ref
     * 
     */
    const state = reactive({
      name: 'YLM',
      age: 47
    })
    console.log(toRefs(state))
    setInterval(() => {
      state.age += 1
    }, 100)
    return {
      // ...state  // 不是取得的name,age不是响应式的,  应该如下
      ...toRefs(state)
    }
  },
})
</script>