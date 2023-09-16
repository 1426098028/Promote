<template>
  <div>子组件</div>
  <button @click="modelOpen = true">打开</button>


  <Teleport to="body">
    <div v-if="modelOpen">

      hisefawuhiwef
      <button @click="modelOpen = false">关闭</button>

    </div>
  </Teleport>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'AppName',
  setup(props, ctx) {
    const modelOpen = ref(false)
    return {
      modelOpen
    }
  },
})
</script>