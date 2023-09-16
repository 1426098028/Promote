<template>
  <div>App {{ msg }}</div>
  <hr />
  <button @click="msg += '子'">更新</button>
  <Child :msg="msg" @onCustomizeEmit="onCustomize" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import Child from './components/Child.vue'
export default defineComponent({
  name: 'AppName',
  components: {
    Child
  },
  setup() {
    let msg = ref<string>('父')
    function onCustomize(value: string) {
      console.log(value)
      msg.value += value
    }
    return { msg, onCustomize }
  },


})
</script>