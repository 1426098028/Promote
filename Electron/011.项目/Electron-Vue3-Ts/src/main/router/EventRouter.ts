class EventRouter {
    #Api = {};
    RouterArr = [];
    // 添加 electron Api方法
    addApi(key, Api) {
        this.#Api[key] = Api;
    }
    // 添加多个操作
    addRouters(RouterArr) {
        this.RouterArr = this.RouterArr?.concat(RouterArr);
    }
    // 触发指定名称的操作回调;
    TriggerRoute(RouteData) {
        this.RouterArr?.forEach(item => {
            item.TypeName == RouteData.TypeName && item.callback && item.callback(this.#Api, RouteData);
        });
    };
}
export default EventRouter;
