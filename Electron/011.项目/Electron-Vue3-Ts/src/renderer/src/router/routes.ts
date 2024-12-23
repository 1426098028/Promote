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
    // {
    //     path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/notfound/index.vue'),
    // },
];
export { AppRoutes };
