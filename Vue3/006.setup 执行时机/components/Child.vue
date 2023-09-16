<template>
    <div>Child {{ msg }}</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ChildName',
    props: ['msg'],

    /**
     * setup 执行时机
     *              在beforeCreate生命周期执行之前就执行了,而且只执行一次
     *              推理出来:setup执行的时候,当前的组件还没有创建出来,意味着:组件实例对象this根本不能用的原因
     *              此时this为undefined,说明,不能再通过this去调用 data/computed/methods/props中相关的方法或者属性了
     *              同时所有的composition Api 相关的回调函数中也都不能用了
     * 
     * 
     */

    setup(props, ctx) {
        console.log('setup执行了', this)


        return {}
    },
    /**
     * beforeCreate
     *                  在组件实例初始化完成之后立即调用。
     *                  数据初始化的生命周期回调
     */
    beforeCreate() {
        console.log('beforeCreate执行了')

    },
})
</script>