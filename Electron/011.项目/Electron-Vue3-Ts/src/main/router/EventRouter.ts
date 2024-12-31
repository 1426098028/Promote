class EventRouter {
    #Api = {};
    RouterArr = [];
    addApi(key, Api) {
        this.#Api[key] = Api;
    }
    addRouters(RouterArr) {
        this.RouterArr = this.RouterArr?.concat(RouterArr);
    }
    TriggerRoute(RouteData) {
        this.RouterArr?.forEach(item => {
            item.TypeName == RouteData.TypeName && item.callback && item.callback(this.#Api, RouteData);
        });
    };
}
export default EventRouter;
