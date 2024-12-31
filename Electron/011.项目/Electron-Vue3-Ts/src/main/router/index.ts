import EventRoute from './EventRoute';
const router = [];

// 关闭登录窗口
router.push(
    new EventRoute('close-login', (Api, data) => {
        console.log('关闭登录窗口', Api, data);
        Api.mainFrame.close();
    })
);
export default router;
