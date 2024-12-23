import { useMenuStore } from '@/pinia/useMenuStore';
import { Parent } from '@/interface/user';
import { router } from '@/router';
import { CreateUserRouter } from '@/router/CreateUserRouter';
// 全局前置守卫
const beforeEach = (to, from) => {
    console.log('全局前置守卫', to.meta);
    // 返回 false 以取消当次跳转

    if (to.path === '/login') return;

    if (!localStorage.getItem("TOKEN")) return '/login';

    CreateUserRouter();

    //当前路由没有匹配到任何路由记录
    if (to.matched.length == 0) return to.fullPath

    return true;
};
// 全局解析守卫
const beforeResolve = (to, from) => {
    console.log('全局解析守卫');
    // 返回 false 以取消当次跳转，
    return true;
};

// 全局后置钩子 
const afterEach = (to, from) => {
    console.log('全局后置钩子');
};

interface Child {
    parentView: string,
    path: string,
    name: string,
    meta: any,
    redirect: string,
    component: Function | null,
    children: Child[] | null;
}
interface Child extends Omit<Parent, 'children'> {
    children?: Child[] | null;
}
export { beforeEach, beforeResolve, afterEach };
