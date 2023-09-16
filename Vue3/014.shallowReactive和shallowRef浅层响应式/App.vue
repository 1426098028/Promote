<template>
  <div>shallowReactive和shallowRef浅层响应式</div>
  <div>{{ m1 }}</div>
  <div>{{ m2 }}</div>
  <div>{{ m3 }}</div>
  <div>{{ m4 }}</div>
  <button @click="onUp">更新</button>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, shallowReactive, shallowRef } from 'vue'
export default defineComponent({
  name: 'AppName',
  setup() {


    /**
     *   shallowReactive   
     *                  理解 只处理对象最外层属性的响应,也叫浅层响应式
     *                  
     *                  应用场景 一个对象数据,结构比较深,但是变化时只是外层属性变化
     */
    /**
     *  shallowRef 
     *            理解  只处理value的响应式,不进行对象reactive处理
     * 
     *            应用场景  一个对象数据,后面会产生新的对象来代替
     */



    // 一般使用ref和reactive即可




    // 深度响应式
    const m1 = reactive({ name: 'reactive', wife: { name: 'wife' } })
    // 浅层响应式
    const m2 = shallowReactive({ name: 'shallowReactive', wife: { name: 'wife' } })
    // 深度响应式 值是对象时,会转换为reactive
    const m3 = ref({ name: 'ref', wife: { name: 'wife' } })
    // 浅层响应式
    const m4 = shallowRef({ name: 'shallowRef', wife: { name: 'wife' } })
    const onUp = () => {
      console.log({ m1, m2, m3, m4 })
      // 更新reactive
      // m1.name = '更新'
      // m1.wife.name = 'reactive'
      // 更新shallowReactive
      // m2.name = '更新'
      m2.wife.name = 'shallowReactive'
      // 更新ref
      // m3.value.name = '更新'
      // m3.value.wife.name = 'ref'
      // 更新shallowRef
      // m4.value.name = '更新'
      m4.value.wife.name = 'shallowRef'
    }
    return {
      m1, m2, m3, m4, onUp
    }
  },


})
</script>