<template>
    <div>生命周期</div>
    <div>{{ updatedText }}</div>
    <button @click="updatedText = 'updatedText'">更新</button>
</template>
<script lang="ts">
import { defineComponent, ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

export default defineComponent({
    name: 'ChildName',




    /**
     * Vue2 写法的生命周期
     */

    beforeCreate() {
        console.log('2.x--beforeCreate--创建前')
    },
    created() {
        console.log('2.x--created--创建后')
    },
    beforeMount() {
        console.log('2.x--beforeMount--挂载前')
    },
    mounted() {
        console.log('2.x--mounted--挂载后')
    },
    beforeUpdate() {
        console.log('2.x--beforeUpdate--更新前')
    },
    updated() {
        console.log('2.x--updated--更新后')
    },
    // Vue2.x中的beforeDestroy和destroyed这两个生命周期在Vue3中改名字了，所以不能使用了，改为beforeUnmount和unmounted
    // beforeDestroy() {
    //     console.log('2.x--beforeDestroy--销毁前')
    // },
    // destroyed() {
    //     console.log('2.x--destroyed--销毁后')
    // },

    beforeUnmount() {
        console.log('2.x--beforeUnmount--卸载前')
    },
    unmounted() {
        console.log('2.x--unmounted--卸载后')
    },

    // Vue3 写法的生命周期

    setup() {
        console.log('3.x--setup--创建')

        const updatedText = ref('更新')

        onBeforeMount(() => {
            console.log('3.x--onBeforeMount--挂载前')
        })
        onMounted(() => {
            console.log(`3.x--onMounted--挂载后`)
        })
        onBeforeUpdate(() => {
            console.log('3.x--onBeforeUpdate--更新前')
        })
        onUpdated(() => {
            console.log(`3.x--onUpdated--更新后`)
        })
        onBeforeUnmount(() => {
            console.log('3.x--onBeforeUnmount--卸载前')
        })
        onUnmounted(() => {
            console.log('3.x--onUnmounted--卸载后')
        })
        return {
            updatedText
        }
    }

    // 总结: Vu3写法的生命周期(组合Api)比Vue2写法的生命周期快，同时beforeDestroy和destroyed这两个生命周期在Vue3中改名字了，改为beforeUnmount和unmounted
    //       setup执行比beforeCreate早

})
</script>