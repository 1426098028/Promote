<template>
  <h2>计算属性和监视</h2>
  <fieldset>
    <legend>名字操作</legend>
    姓名:<input type="tetx" v-model="user.firstname" />
    <br />
    名字:<input type="tetx" v-model="user.lastname" />
  </fieldset>
  <fieldset>
    <legend>计算属性和监视的演示</legend>
    姓名:<input type="tetx" v-model="FirstName" />
    <br />
    名字:<input type="tetx" v-model="FirstName1" />
    <br />
    名字:<input type="tetx" v-model="FirstName2" />
  </fieldset>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, watchEffect } from 'vue'
export default defineComponent({
  name: 'AppName',
  setup() {
    const user = reactive({
      firstname: 'Y',
      lastname: 'lm'
    })




    // 需求通过计算属性的方式，实现第一个名字的显示
    /**
     * Vue3   computed   计算属性  数据类型是 Ref 有两个参数 get set get是默认参数
     *        get  计算属性的函数中如果只传入一个回调函数，默认表示是只读取数据get方法
     *        set  
     *        返回的是一个Ref类型的对象
     * 
     * 
     * 
     */
    //  计算属性的函数中如果只传入一个回调函数，默认表示是只读取数据get方法     默认get
    const FirstName = computed(() => {
      return user.firstname + user.lastname
    })

    const FirstName1 = computed({
      get: () => {
        return `${user.firstname}_${user.lastname}`
      },
      set: (val) => {
        const na = val.split('_')
        user.firstname = na[0]
        user.lastname = na[1]
      }
    })



    /**
     *  Vue2 Vue3都可以用的
     *  watch 监视    ---监视指定的数据
     *          语法:监视单个数据     watch(监视数据,(变化的数据)=>{},{immediate:是否页面进来就监视,deep:是否深度监视,等等})
     *          语法:监视多个数据响应式     watch([监视数据,监视数据,监视数据],()=>{},{immediate:是否页面进来就监视,deep:是否深度监视,等等})
     *          语法:监视多个数据非响应式     watch([()=>监视数据,()=>监视数据,()=>监视数据],()=>{},{immediate:是否页面进来就监视,deep:是否深度监视,等等})
     * 
     * Vue3 独有的
     * watchEffect 监视 ，和watch的差异是默认执行一次
     *            语法: watchEffect(()=>{})
     * 
     */
    const FirstName2 = ref('')
    // watch(user, ({ firstname, lastname }) => {
    //   console.log(firstname, lastname)
    //   FirstName2.value = `${firstname}_${lastname}`
    // }, { immediate: true, deep: true })


    watchEffect(() => {
      FirstName2.value = `${user.firstname}_${user.lastname}`
    })



    // watch 可以监视多个数据响应式 
    // watch([user.firstname, user.lastname], () => {
    //   FirstName2.value = `${user.firstname}_${user.lastname}`
    // }, { immediate: true, deep: true })
    // 或者
    watch([user.firstname, user.lastname, FirstName2], () => {
      FirstName2.value = `${user.firstname}_${user.lastname}`
    }, { immediate: true, })

    // watch 可以监视多个数据非响应式
    // watch([() => user.firstname, () => user.lastname], () => {
    //   FirstName2.value = `${user.firstname}_${user.lastname}`
    // }, { immediate: true, deep: true })



    return {
      FirstName, FirstName1, FirstName2,
      user
    }
  },


})
</script>



















