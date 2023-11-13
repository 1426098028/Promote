<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header />
      <List />
      <Suspense>
        <Footer />
      </Suspense>
    </div>
  </div>
</template>
<script lang="ts" >
import { defineComponent, defineAsyncComponent } from 'vue'
// 引入直接的子级组件
// import Header from './components/Header.vue'
// import List from './components/List.vue'
// import Footer from './components/Footer.vue'
import Loading from './components/Loading.vue'





/**
 * 异步引入组件    defineAsyncComponent 语法    支持局部组件使用和全局组件使用
 *                会返回一个Promise
 * 基础语法
 *            defineAsyncComponent(()=>返回异步组件)
 *            defineAsyncComponent(()=>import('./components/Header.vue'))
 * 
 *            defineAsyncComponent(()=>返回一个Promise)
 * 
 * 高级语法
 *            defineAsyncComponent({
 *                                      最终显示的异步组件
 *                                      loader: Component
 *                                      加载异步组件时使用的组件
 *                                      loadingComponent: Component
 *                                      加载异步组件失败后展示的组件
 *                                      errorComponent: Component
 *                                      展示加载组件前的延迟时间，默认为 200ms
 *                                      delay: 200,
 *                                      提供了一个 timeout 时间限制,异步组件需要在时间限制内容加载完毕，不然会显示errorComponent设置的组件
 *                                      timeout:300,
 *                                      开启是否支持Suspense组件特性
 *                                      suspensible:true,
 *                                      发生错误时，将错误信息交给用户处理判断
 *                                      @patam error 错误信息对象
 *                                      @patam retry 一个函数，用于指示当 promise 加载器 reject 时，加载器是否应该重试
 *                                      @patam fail 一个函数，指示加载程序结束退出
 *                                      @patam attempts 允许的最大重试次数
 *                                      onError:(error, retry, fail, attempts)=>{},
 *                                 })
 *
 * 
 * 
 * 
 */


// 异步引入组件
const Header = defineAsyncComponent(() =>
  import('./components/Header.vue')
)
const List = defineAsyncComponent(async () => import('./components/List.vue'))

const Footer = defineAsyncComponent({
  // 加载函数
  loader: () => import('./components/Footer.vue'),
  // 加载异步组件时使用的组件
  // import Loading from './components/Loading.vue'
  loadingComponent: Loading,
  // 展示加载组件前的延迟时间，默认为 200ms
  // delay: 100,
  //  开启是否支持Suspense组件特性
  suspensible: false,
  // 加载失败后展示的组件   
  errorComponent: () => import('./components/Error.vue'),
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  // timeout: ,
  onError: (error, retry, fail, attempts) => {
    console.log(error, retry, fail, attempts)
  }
})





// 引入接口

export default defineComponent({
  name: 'AppName',
  // 注册组件
  components: {
    Header,
    List,
    Footer,
    Loading
  },
  setup() {


    // 定义一个数组数据
    // const state = reactive<{ todos: Todo[] }>({
    //   todos: [
    //     { id: 1, title: '奔驰', isCompleted: false },
    //     { id: 2, title: '宝马', isCompleted: true },
    //     { id: 3, title: '奥迪', isCompleted: false },
    //   ],
    // })




    return {

    }
  },
})
</script>
<style scoped>
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}

.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>