const CACHES_NAME = 'cache_v1'
self.addEventListener("install", async e => {
    // 使用 caches.open(),开启一个caches对象
    const cache = await caches.open(CACHES_NAME)
    // 使用caches.addAll()或者caches.add() 对数据进行缓存
    await cache.addAll([
        './index.html',// 其他文件相同操作
        'index.css',// 其他文件相同操作
        'manifest.json',// 其他文件相同操作
        '总结.md',// 其他文件相同操作
        './images/logo.png',// 其他文件相同操作
    ])
    await self.skipWaiting()
})
self.addEventListener("activate", async e => {

    // 清除全部旧的缓存
    // 通过caches.keys() 获取全部通过caches storage缓存资源的key值
    const keysArr = await caches.keys()

    // 判断是否为旧资源，通过 caches.delete(key名字)删除
    keysArr.forEach(item => {
        if (item !== CACHES_NAME) {
            caches.delete(item)
        }
    })
    await self.clients.claim()
})
self.addEventListener("fetch", async event => {
    // 实现只缓存同源数据
    const req = event.request
    const url = new URL(req.url)
    if (url.origin !== self.origin) return

    // respondWith() 方法阻止浏览器默认的 fetch 操作，并且允许由你自己为 Response 提供一个 promise
    //网络优先
    event.respondWith(networkFirst(req)) //https://developer.mozilla.org/zh-CN/docs/Web/API/Response
    //缓存优先
    // event.respondWith(cacheFirst(req)) //https://developer.mozilla.org/zh-CN/docs/Web/API/Response
})




// 缓存优先 一般应用在静态资源
async function cacheFirst(req) {
    // 连接缓存，并且读取
    const cache = await caches.open(CACHES_NAME)
    const cached = await cache.match(req)
    if (cached) {
        // 从缓存中获取
        return cached
    } else {
        // 从网络中获取
        return await fetch(req)
    }

}


// 网络优先
async function networkFirst(req) {
    const cache = await caches.open(CACHES_NAME)
    try {
        // 先从网络获取
        // 请求成功并且获取资源成功
        const fresh = await fetch(req)   // 去看这个https://developer.mozilla.org/zh-CN/docs/Web/API/ServiceWorker    https://developer.mozilla.org/zh-CN/docs/Web/API/Response
        // 获取到数据后，需要再次更新到缓存中
        cache.put(req, fresh.clone())
        return fresh
    } catch (err) {
        // 去缓存中获取 ,连接缓存
        return cache.match(req)
    }
}