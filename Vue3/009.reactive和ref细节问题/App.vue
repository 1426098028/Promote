<template>
  <div>reactive和ref细节</div>
  <div>{{ m1 }}</div>
  <div>{{ m2 }}</div>
  <div>{{ m3 }}</div>
  <button @click="onUp">更新</button>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
export default defineComponent({
  name: 'AppName',

  /**
   * 在Vue3中Composition API 中 两个最重要的响应式API(reactive和ref)
   * ref是用来处理基本类型数据，reactive是用来处理对象(递归深度响应)
   * 如果用ref来处理对象/数组，其内部会自动将对象/数组转换为reactive代理对象
   * ref内部会通过给value属性添加getter/setter来实现数据劫持
   * reactive内部会通过proxy来实现对对象内部所有数据劫持，并且通过Reflect操作对象内部数据
   * ref的数据操作是在js中.value。在模板中不需要(内部在解析模板中自动加上.value)
   * 
   * 
   * 
   * 
   */




  setup() {
    const m1 = ref('abc')
    const m2 = reactive({ name: 'reactive', wife: { name: 'wife' } })
    // ref中放入的是一个对象，那么是会经过reactive的处理，形成了一个Proxy类型的对象
    const m3 = ref({ name: 'ref', wife: { name: 'wife' } })
    const onUp = () => {
      console.log(m3)
      m1.value += `==`
      m2.wife.name += `==`
      m3.value.wife.name += `==`
      console.log(m3.value.wife)
    }
    return {
      m1, m2, m3, onUp
    }
  },


})
</script>