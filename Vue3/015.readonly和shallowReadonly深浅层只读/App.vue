<template>
  <div>readonly和shallowReadonly深浅层只读</div>
  <div>{{ m1 }}</div>
  <div>{{ m2 }}</div>
  <button @click="onUp">更新</button>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, readonly, shallowReadonly } from 'vue'
export default defineComponent({
  name: 'AppName',
  setup() {
    /**
     *   readonly   
     *                  理解 获取对象(响应式或者普通对象)或者ref，只返回原始的只读代理,同时访问任何嵌套property也是只读
     *                  
     *                  应用场景 在某些情况下，不希望对数据进行更新时使用
     */
    /**
     *  shallowReadonly 
     *            理解  获取对象(响应式或者普通对象)或者ref，只返回原始的只读代理,但是嵌套对象中是可以读写
     * 
     *            应用场景  在某些情况下，不希望对数据进行更新时使用
     */
    const m1 = reactive({ name: 'reactive', wife: { name: 'wife' } })

    // 深度只读
    // const m2 = readonly(m1)

    // 浅层只读
    const m2 = shallowReadonly(m1)

    const onUp = () => {
      console.log(m2)
      // m2.name = '更新'                 // shallowReadonly和readonly 都不可以进行响应
      m2.wife.name = 'shallowReadonly'   //  使用shallowReadonly时,是可以响应的,如果使用readonly不可以
    }
    return {
      m1, m2, onUp
    }
  },


})
</script>