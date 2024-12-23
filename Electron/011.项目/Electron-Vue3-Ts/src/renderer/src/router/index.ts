import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { beforeEach, beforeResolve, afterEach } from '@/router/guard';
import { AppRoutes } from '@/router/routes';

const router = createRouter({
    history: createWebHistory(),
    // history: createWebHashHistory(),
    routes: AppRoutes
});

// 全局前置守卫
router.beforeEach(beforeEach);
// 全局解析守卫
router.beforeResolve(beforeResolve);
// 全局后置钩子 
router.afterEach(afterEach);

export { router, AppRoutes };
