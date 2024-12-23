import { useMenuStore } from '@/pinia/useMenuStore';
import { Parent } from '@/interface/user';
import { router } from '@/router';

let ParentRouterMenu = {
    path: '/',
    name: 'layout',
    redirect: '/dashboard',
    component: () => import('@/layout/index.vue'),
};

const CreateUserRouter = async (Menu) => {
    const FileModulesMap = await FormatComponent();
    const RouterMenu = await Menu || useMenuStore().menu;
    const NewRouterMenu = await FormatRouterMenu(RouterMenu, true, FileModulesMap,);
    await AddRoute(NewRouterMenu);
    return NewRouterMenu;
};
const FormatRouterMenu = (RouterMenu, Parent = false, FileModulesMap, ParentPath = '/') => {
    return RouterMenu.flatMap(items => {
        const { path, children, component } = items;
        const IsPath = FileModulesMap[component] || FileModulesMap[path];
        const breadcrumb = children;
        // return IsPath ?
        //     { ...items, Parent, meta: { ...items.meta, breadcrumb, ParentPath }, component: FileModulesMap[component], children: children ? FormatRouterMenu(children, false, FileModulesMap, path) : null }
        //     : [];
        return { ...items, Parent, meta: { ...items.meta, breadcrumb, ParentPath }, component: FileModulesMap[component], children: children ? FormatRouterMenu(children, false, FileModulesMap, path) : null };
    });
};
// 根据 FileModulesMap[key] 返回对应的value值
const FormatComponent = () => {
    const FileModules = import.meta.glob('@renderer/views/**/*.vue');
    let FileModulesMap = {};
    let FileModulesMapPath = {};
    for (const key in FileModules) {
        const NewName = FileModules[key].name.replace('/src/views/', '').replace('.vue', '');
        FileModulesMap[`/${NewName.split('/')[0]}`] = FileModules[key];
        FileModulesMap[NewName.split('/')[0]] = FileModules[key];
        FileModulesMap[`/${NewName}`] = FileModules[key];
        FileModulesMap[`${NewName}`] = FileModules[key];
        FileModulesMap[key.includes('/index') ? NewName.replace('/index', '') : NewName] = FileModules[key];
    }
    return FileModulesMap;
};
// 进行动态添加路由
const AddRoute = (RouterMenu) => {
    console.log('动态路由表', RouterMenu);
    // for (let index = 0; index < RouterMenu.length; index++) {
    //     const MenuItemRouter = RouterMenu[index];
    //     router.addRoute('layout', MenuItemRouter);
    // }
    router.addRoute({ ...ParentRouterMenu, children: RouterMenu });
};

const FlattenRoutes = (RouterMenu, Flatten = []) => {
    let NewFlatten = Flatten;
    return RouterMenu.flatMap(items => {
        // console.log(items.children);
        items.children && FlattenRoutes(items.children, NewFlatten);
        NewFlatten.push({ ...items, children: null });
        console.log('Flatten', NewFlatten);
        // router.addRoute('layout', items);
        return items;
    });
    return NewFlatten;
};



export { CreateUserRouter, FormatRouterMenu, FormatComponent, FlattenRoutes };
