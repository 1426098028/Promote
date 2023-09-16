<template>
  <div>响应式数据类型判断</div>
</template>
<script lang="ts">
import { defineComponent, isRef, ref, reactive, isProxy, readonly, isReactive, isReadonly } from 'vue'
export default defineComponent({
  name: 'AppName',
  setup(props, ctx) {

    // isRef    检查某个值是否为 ref。
    const IsRef = ref(123)
    console.log(isRef(IsRef))

    // isProxy    检查一个对象是否是由 reactive()、readonly()、shallowReactive() 或 shallowReadonly() 创建的代理
    // console.log(isProxy(IsRef))

    const IsProxy = reactive({ name: 'YLM' })
    console.log(isProxy(IsProxy))
    // isReactive     检查一个对象是否是由 reactive() 或 shallowReactive() 创建的代理


    console.log(isReactive(IsProxy))

    // isReadonly    检查传入的值是否为只读对象。只读对象的属性可以更改，但他们不能通过传入的对象直接赋值
    const IsReadonly = readonly({ name: 'YLM' })
    console.log(isReadonly(IsReadonly))


    return {

    }
  },
})
</script>