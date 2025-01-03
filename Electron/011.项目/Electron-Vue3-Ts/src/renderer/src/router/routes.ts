const AppRoutes = [
    {
        path: '/login', name: '登录', component: () => import('@/views/login/Login.vue')
    },
    {
        path: '/',
        name: 'layout',
        redirect: '/dashboard',
        component: () => import('@/layout/index.vue'),
    },
    {
        path: '/Task/Download',
        name: '下载任务',
        component: () => import('@/views/Task/index.vue')
    },
    // {
    //     path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/notfound/index.vue'),
    // },
];
export { AppRoutes };
