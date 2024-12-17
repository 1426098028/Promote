const AppRoutes = [
    {
        path: '/', name: '首页', component: () => import('@/views/Home.vue')
    },
    {
        path: '/login', name: '登录', component: () => import('@/views/login/Login.vue')
    }
];
export { AppRoutes };
