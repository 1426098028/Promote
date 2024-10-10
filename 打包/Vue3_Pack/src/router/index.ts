import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const ElementPlus = () => import('../views/Element-Plus.vue');
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/Element-Plus',
      name: 'ElementPlus',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ElementPlus
    },
    {
      path: '/Echarts',
      name: 'Echarts',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Echarts.vue')
    }
  ]
})

export default router
