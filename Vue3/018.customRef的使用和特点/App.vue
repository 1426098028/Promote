<template>
  <div>customRef的使用和特点</div>

  <input type="text" v-model="Keyword">
  <div>{{ Keyword }}</div>
</template>
<script lang="ts">
import { customRef, defineComponent, } from 'vue'


/**
 * 
 *   customRef  
 *              语法:customRef((track, trigger)=>{return{get(){track()},set(newValue){trigger()}}})
 *              理解:一般来说，track() 应该在 get() 方法中调用，而 trigger() 应该在 set() 中调用
 *                   回调函数接受 track 和 trigger 两个函数作为参数，并返回一个带有 get 和 set 方法的对象
 * 
 * 
 * 
 *              应用场景,要频繁修改数据----输入框
 * 
 */

function useDebouncedRef<T>(value: T, delay = 50) {
  let Time: number
  return customRef((track, trigger) => ({
    get() {
      console.log(value)
      track()
      return value
    },
    set(newValue: T) {
      clearTimeout(Time)
      Time = setTimeout(() => {
        value = newValue
        trigger()
      }, delay)
    }
  }))


}



export default defineComponent({
  name: 'AppName',
  setup() {


    const Keyword = useDebouncedRef('', 20)
    console.log(Keyword)

    return {
      Keyword
    }
  },


})
</script>