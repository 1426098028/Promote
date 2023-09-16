<template>
  <div>App 生命周期</div>
  <hr />
  <button @click="isChild = !isChild">Child更新</button>
  <Child v-if="isChild" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import Child from './components/Child.vue'
export default defineComponent({
  name: 'AppName',
  components: { Child },
  setup(props, ctx) {
    const isChild = ref(true)
    return { isChild }

  },

})
</script>