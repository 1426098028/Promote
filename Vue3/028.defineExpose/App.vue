<template>
  <div>
    <CompilerMacro ref="child" />


    <button v-if="child" @click="child.Add">Add--A</button>

    {{ A }}
    {{ B }}

    <button @click="getAB">获取A和B</button>

  </div>
</template>
<script lang="ts" setup>
import CompilerMacro from './components/CompilerMacro.vue'

import { onMounted, ref, nextTick } from 'vue';
const child = ref()

const A = ref(0)
const B = ref('')


const getAB = () => {
  console.log(child?.value?.A)
  console.log(child?.value?.B)
  A.value = child?.value?.A
  B.value = child?.value?.B
}

</script>
<style scoped></style>