<template>
  <div class="todo-container">
    <CompilerMacro foo='sdfkjnsdf' @onChange='onUp' />
    {{ F }}
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import CompilerMacro from './components/CompilerMacro.vue'
const F = ref('')
const onUp = (data: string) => {
  console.log('接收子数据', data)
  F.value = data
}
</script>
<style scoped></style>