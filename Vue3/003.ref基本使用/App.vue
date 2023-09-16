<template>
  <div>{{ count }}</div>
  <button @click="updataCount">count++</button>
  <fieldset>
    <legend>
      自动获取焦点
    </legend>
    <input type="text" ref="InputRef">
  </fieldset>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
  name: 'App',

  // 需求：页面直接返回一个数据，点击按钮，数据发生变化


  // Vue2实现

  // data() { return { count: 0 } },
  // methods: { updataCount() { this.count++ } }




  // Vue3实现
  // 新的option，所有的组合式 API函数到在这使用，只在初始化时执行一次
  setup() {
    // 函数如果返回是对象，对象中的属性或方法，可以直接在模板中使用
    // let count = 0 // 此时count不是响应式数据，从而页面不会发生渲染更新变化，需要使用ref函数


    /**
     * ref 是一个函数
     *              作用：定义一个响应式的数据
     *              应用场景：一般用在一个基本类型的响应式数据
     *              注意：在模板(html)中操作数据时不需要value属性
     * 
     *      返回是一个Ref对象,对象中有一个value属性，如果需要对于数据进行修改，请调用value属性进行操作
     */
    //  count 类型是:Ref类型
    let count = ref(0)
    // 获取标签
    let InputRef = ref<HTMLElement | null>(null)
    console.log(InputRef)
    function updataCount(): void {
      count.value++
    }
    onMounted(() => {
      console.log(InputRef, InputRef?.value?.focus)
      InputRef.value && InputRef.value.focus()
    })
    return {
      count, updataCount
    }
  }
});
</script>

