import { useMenuStore } from '@/pinia/useMenuStore';
import { Parent } from '@/interface/user';
import { router } from '@/router';
// 处理深度复制对象问题，并且处理循环引用
import clone from 'rfdc';

// 动态添加路由 router.addRoute('', {})

// 全局前置守卫
const beforeEach = (to, from) => {
    console.log('全局前置守卫');
    // 返回 false 以取消当次跳转

    if (to.path === '/login') {
        return;
    }
    if (!localStorage.getItem("TOKEN")) {
        return '/login';
    }
    //动态添加路由
    initRouter();

    //当前路由没有匹配到任何路由记录
    if (to.matched.length == 0) {
        router.push(to.fullPath);
    }
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

//1. 动态添加路由 => 整个过程
const initRouter = () => {
    const menu: Parent[] = useMenuStore().menu;
    const menuRouter: Child[] = filterRouter(menu);
    const RouterList = flatRouter(menuRouter);
    RouterList.forEach((item: any) => {
        router.addRoute(item.parentView == 'layout' ? 'layout' : '', item);
    });
};

//2. 把component 重构成 箭头函数的形式

const filterRouter = (menu: Parent[]) => {
    let ArrRouter: Child[] = [];
    menu.forEach((item) => {
        const { parentView, path, name, meta, redirect, component, children } = item;
        const Route: Child = {
            parentView,
            path,
            name,
            meta,
            redirect,
            children: children ? filterRouter(children) : null,
            component: LoadComponent(component),
        };
        ArrRouter.push(Route);
    });
    return ArrRouter;
};

//3. 对于 component 的调整  值需要类似这样：()=>import('@layout/index.vue')
const FileModules = import.meta.glob('@renderer/views/**/*.vue');
console.log(FileModules);
let FileModulesMap = {};
Object.keys(FileModules).forEach(key => {
    const ComponentKeyName = key.replace('/src/views', '').replace('.vue', '').replace('/index', '').replace('/', '');
    if (key.includes('index')) {
        FileModulesMap[`${ComponentKeyName}/index`] = FileModules[key];
    }
    FileModulesMap[ComponentKeyName] = FileModules[key];
});


//4. 根据 FileModulesMap[key] 返回对应的value值
const LoadComponent = (component: string | null) => component ? FileModulesMap[component] : null;

//5. 路由扁平化 
const flatRouter = (routes: Child[], breadcrumb: Child[] = []): Child[] => {
    let res: Child[] = [];
    //深度复制对象，并处理循环引用
    let cloneRoutes = clone()(routes);
    cloneRoutes.forEach((route: Child) => {
        const tmp = { ...route };
        if (tmp.children) {
            let childrenBreadcrumb: Child[] = [...breadcrumb];
            childrenBreadcrumb.push(route);
            let tmpRoute = { ...route };
            tmp.meta.breadcrumb = childrenBreadcrumb;
            delete tmpRoute.children;
            res.push(tmpRoute);
            let childrenRoutes = flatRouter(tmp.children, childrenBreadcrumb);
            childrenRoutes.map((item) => {
                res.push(item);
            });
        } else {
            let tmpBreadcrumb = [...breadcrumb];
            tmp.meta.breadcrumb = tmpBreadcrumb;
            tmpBreadcrumb.push(tmp);
            res.push(tmp);
        }
    });
    return res;
};


export { beforeEach, beforeResolve, afterEach };
