<template>
  <div>reactive</div>

  <div>{{ user }}</div>
  <button @click="onUpdata">更新</button>
</template>
<script lang='ts'>
import { defineComponent, reactive } from 'vue'



/**
 * reactive
 *         reactive原理：内部是基于Es6的Proxy实现，通过代理对象操作原对象内部数据都是响应式的
 *         作用：定义多个数据的响应式，接受一个普通对象然后返回改对象的响应式代理对象(Proxy)
 *              reactive是深度的响应式，会影响对象内部所有嵌套的属性
 * 
 *        数据读取:直接读取  变量.属性
 * 
 *        总结:操作代理对象,目标对象的数据也会变化,同时界面也会重新渲染
 * 
 */


export default defineComponent({

  // 需求：显示用户信息,点击按钮，更新信息

  setup() {


    const Obj = {
      name: 'YLM',
      agr: 20,
      wife: {
        name: 'ylm',
        agr: 20,
        cars: ['efwfe', 'wef', 'wef']

      }
    }

    // 返回的是一个Proxy的代理对象,被代理的目标对象就是Obj对象
    // user是代理对象,Obj是被代理的目标对象    
    // 注意:不可以直接修改(新增)属性目标对象,是不会引起页面重新渲染的,需要通过代理对象修改(新增)数据(user)
    // user类型是:Proxy类型
    const user = reactive(Obj)

    // 接受一个普通对象然后返回改对象的响应式代理对象(Proxy)
    console.log(user)


    // 方法写发一
    // function onUpdata() {}
    // 方法写发二
    const onUpdata = () => {
      // 注意:不可以直接修改目标对象,是不会引起页面重新渲染的,需要通过代理对象修改数据(user)
      // Obj.agr = 33     //不会引起页面重新渲染




      user.agr = 33
      user.wife.cars[0] = '234234'
    }
    return {
      user, onUpdata
    }
  }
})
</script>
































