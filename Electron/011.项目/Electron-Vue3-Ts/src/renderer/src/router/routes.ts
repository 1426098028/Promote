const AppRoutes = [
    {
        path: '/',
        name: 'layout',
        redirect: '/dashboard',
        component: () => import('@/layout/index.vue'),
        // children: [
        //     {
        //         path: '/dashboard',
        //         name: '首页',
        //         component: () => import('@/views/home/index.vue'),
        //     },
        //     {
        //         path: "/system/role",
        //         name: 'system',

        //         component: () => import('@/views/system/role/index.vue'),
        //     }
        // ]
    },
    // {
    //     path: "/system",
    //     component: () => import('@/layout/index.vue'),
    //     children: [
    //         {
    //             path: "/system/role",
    //             component: () => import('@/views/system/role/index.vue'),
    //         }
    //     ]
    // },
    {
        path: '/login', name: '登录', component: () => import('@/views/login/Login.vue')
    }
];
export { AppRoutes };
