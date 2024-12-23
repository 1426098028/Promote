import { useMenuStore } from '@/pinia/useMenuStore';
import { Parent } from '@/interface/user';
import { router } from '@/router';
import { CreateUserRouter } from '@/router/CreateUserRouter';
// 全局前置守卫
const beforeEach = async (to, from, next) => {
    console.log('全局前置守卫', to, from);
    // 返回 false 以取消当次跳转
    if (!localStorage.getItem("TOKEN")) return to.path === '/login' ? next() : next({ path: '/login' });

    if (to.path === '/login' && localStorage.getItem("TOKEN")) return next({ path: from.fullPath, });

    CreateUserRouter();

    //当前路由没有匹配到任何路由记录
    if (to.matched.length == 0) return next({ path: to.fullPath });

    next();
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
