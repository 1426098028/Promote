<template>
    <div>Child {{ msg }}</div>
    <div>{{ count }}</div>
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

    /**
     *  setup 返回值
     *              setup返回值是一个对象,内部的属性和方法是给HTML模板使用的
     *              setup中的对象内部属性和data函数中的return对象属性都是可以在HTML模板中使用
     *              setup中的对象的属性和data函数中的属性会合并为组件对象的属性,并且setup优先级高于data函数
     *              setup中的对象中的方法会和methods对象中的方法进行合并为组件中对象的方法
     *              如果有属性或方法重名了,setup优先
     *              在methods中可以访问到setup中的属性和方法,但是在setup中是不能访问到data和methods中的属性和方法
     *              setup是不可以为sayn函数,因为返回值不再是return的对象,而是promise对象,html模板中是看不到相关的数据
     * 
     * 
     *        注意:在Vue3中尽量不要混合使用data和setup以及methods
     * 
     * 
     * 
     */





    setup(props, ctx) {
        console.log('setup执行了', this)
        function showMsg1() {
            console.log('setup中的showMsg1方法');
        }

        return { showMsg1 }
    },


    data() {
        return {
            count: 10
        }
    },



    /**
     * beforeCreate
     *                  在组件实例初始化完成之后立即调用。
     *                  数据初始化的生命周期回调
     */
    beforeCreate() {
        console.log('beforeCreate执行了')

    },
    // 在组件被挂载之后调用 (界面渲染后的生命周期回调)
    mounted() {
        // 在Vue3中this是代理对象Proxy,在Vue2中this是普通对象
        console.log('mounted执行了', this)

    },
    // 方法
    methods: {
        showMsg2() {
            console.log('methods中的showMsg2方法');
        }
    }

})
</script>