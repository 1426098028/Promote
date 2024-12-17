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

export { beforeEach, beforeResolve, afterEach };
