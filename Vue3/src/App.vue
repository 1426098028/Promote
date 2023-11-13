<template>
  <div>
    <button v-for="(item, key) in tabs" :key="key" @click="onTab(key as string)">{{ key }}</button>
    <div>
      普通动态组件
    </div>
    <component :is="tabs[TKey]"></component>
    <div>
      有缓存动态组件
      KeepAlive组件
      强制被切换掉的组件仍然保持“存活”的状态
    </div>
    <KeepAlive>
      <component :is="tabs[TKey]"></component>
    </KeepAlive>
  </div>
</template>
<script lang="ts" setup>
import Archive from './components/Archive.vue'
import CompilerMacro from './components/CompilerMacro.vue'
import { ref, Ref } from 'vue'
interface Tabs {
  [key: string]: any;
}

const tabs: Tabs = { 'Archive': Archive, 'CompilerMacro': CompilerMacro }
const TKey: Ref<string> = ref('Archive')
const onTab = (tab: string) => {
  console.log(tab)
  TKey.value = tab
}
</script>
<style scoped></style>












