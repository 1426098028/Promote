<template>
  <div>Suspense组件介绍</div>
  <Suspense>
    <template #default>
      <!-- 异步组件 -->
      <AsyncComponent />
    </template>
    <template v-slot:fallback>
      <div>异步组件没有加载时显示</div>
    </template>
  </Suspense>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
// 动态组件引入
// const AsyncComponent = defineAsyncComponent(() => import('./AsyncComponent.vue'))


// 静态组件引入
import AsyncComponent from './AsyncComponent.vue'

export default defineComponent({
  name: 'AppName',
  components: {
    AsyncComponent
  }
})
</script>