import EventRoute from './EventRoute';
const router = [];
// 添加多个操作



// 窗口最大化
router.push(
    new EventRoute('max-win', (Api, data) => {
        console.log('窗口最大化', Api, data);
        Api.mainFrame.setFullScreen();
    })
);


// 窗口最小化
router.push(
    new EventRoute('min-win', (Api, data) => {
        console.log('窗口最小化', Api, data);
        Api.mainFrame.minimize();
    })
);


// 实现窗口拖拽移动
router.push(
    new EventRoute('custom-adsorption', (Api, { data: { appX, appY } }) => {
        console.log('实现窗口拖拽移动', Api, appX, appY);
        Api.mainFrame.setPosition(appX, appY);
    })
);

// 登录成功后调整窗口大小(进入后台管理系统)
router.push(
    new EventRoute('resize-window', (Api, data) => {
        console.log('登录成功后调整窗口大小(进入后台管理系统)', Api, data);
        Api.mainFrame.LoginSuccess();
    })
);

// 退出登录成功后调整窗口大小(进入后台管理系统)
router.push(
    new EventRoute('out-login', (Api, data) => {
        console.log('退出登录成功后调整窗口大小(进入后台管理系统)', Api, data);
        Api.mainFrame.OutLogin();
    })
);

// 关闭登录窗口
router.push(
    new EventRoute('close-login', (Api, data) => {
        console.log('关闭登录窗口', Api, data);
        Api.mainFrame.close();
    })
);
// 关闭应用
router.push(
    new EventRoute('win-close', (Api, data) => {
        console.log('关闭应用', Api, data);
        Api.mainFrame.exit();
        // Api.app.exit(); // 教程上的办法 , 不需要在 MainFrame.ts 文件中添加指定的方法
    })
);
export default router;
