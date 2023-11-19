import router, { asyncRoutes, resetRouter } from "@/router";
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import store from './store'

const whiteList = ['/login', '/404'] // 白名单


// 前
router.beforeEach(async (to, from, next) => {
  NProgress.start()

  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
        const { menus } = store.getters.roles
        const newMenus = [...menus.map(item => `/${item}`), `*`]
        const newRouter = asyncRoutes.filter(item => newMenus.includes(item.path))
        await store.commit('user/setRoutes', newRouter)
        router.addRoutes(newRouter) // 动态添加路由
        next(to.path)   // 修复动态路由在刷新时404 bug
      } else {
        next()
      }
    }
  } else {
    resetRouter()  //重置路由
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

// 后
router.afterEach(() => {
  NProgress.done()
})