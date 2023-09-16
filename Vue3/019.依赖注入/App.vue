<template>
  <div>依赖注入</div>
  <div>当前选择的颜色:{{ color }}</div>
  <button @click="color = 'red'">红</button>
  <button @click="color = 'yellow'">黄</button>
  <button @click="color = 'green'">绿</button>
  <hr>
  <son />
</template>
<script lang="ts">
import { defineComponent, provide, ref } from 'vue'
import son from './components/son.vue'
export default defineComponent({
  name: 'AppName',
  components: {
    son
  },
  setup() {
    const color = ref('red')
    provide('color', color)
    return {
      color
    }
  },


})
</script>