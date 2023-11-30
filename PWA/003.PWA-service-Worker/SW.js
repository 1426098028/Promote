console.log('serviceWorker')
/**
 * 生命周期
 *
 *        install  事件会在注册成功时触发，主要用于缓存资源 ， 注意资源发生变化就会触发，注意install触发后，如果已经存在serviceWorker，activate状态是处于等待中，直到当前serviceWorker终止
 *                  一般是希望马上触发,可以通过  self.skipWaitng 跳过等待 ， 注意self.skipWaiting会返会一个promise ，可以通过install.waitUntil处理
 *        activate 事件会在serviceWworker激活成功时触发，主要用于删除缓存资源， 
 *                  注意activate 会在页面下次刷新时才触发，如果希望马上触发，可以通过  self.clients.claim() 马上触发    self.clients.claim()会返会一个promise ，可以通过install.waitUntil处理
 *        fetch    事件会在发送请求(包括资源)时触发，主要用于操作缓存资源或者读取网络资源
 *
 */


self.addEventListener('install', (install) => {
    // 更新
    console.log('install', install)
    // 跳过 activate等待状态 直接进入  注意self.skipWaiting会返会一个promise,可以通过install.waitUntil处理
    install.waitUntil(self.skipWaiting())
})
self.addEventListener('activate', (activate) => {
    console.log('activate', activate)
    // 表示在service Worker激活后，马上获取控制权
    activate.waitUntil(self.clients.claim())
})
self.addEventListener('fetch', (fetch) => {
    console.log('fetch', fetch)
}) 