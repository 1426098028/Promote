import router from "./router";
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
      }
      next()
    }
  } else {
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