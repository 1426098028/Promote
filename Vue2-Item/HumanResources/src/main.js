import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
Vue.use(ElementUI,)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

// 创建权限功能指令(自定义指令) v-permission ="'内容'"
Vue.directive('permission', {
  inserted(el, binding) {
    console.log('当前绑定的标签', el, 'inserted相关的属性和参数值', binding)
    const { points } = store.getters.roles  //  是否有权限显示某个功能或者按钮
    !points.includes(binding.value) && el.remove() // 没有权限删除某个功能或者按钮
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
