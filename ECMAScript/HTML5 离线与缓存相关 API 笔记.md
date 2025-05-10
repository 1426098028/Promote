# 📦 HTML5 离线与缓存相关 API 笔记

---

## ✅ 1. 注册 Service Worker

```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => console.log('✅ Service Worker 注册成功'))
    .catch((err) => console.error('❌ 注册失败', err));
}
```

---

## ✅ 2. Service Worker 安装与激活（sw.js）

```js
self.addEventListener('install', (event) => {
  console.log('📦 安装 Service Worker');
  event.waitUntil(caches.open('v1').then((cache) => cache.addAll(['/', '/index.html', '/style.css', '/script.js'])));
});

self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker 已激活');
});
```

---

## ✅ 3. 拦截请求并使用缓存

```js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

---

## ✅ 4. 使用 Cache API 手动缓存资源

```js
async function cacheImage() {
  const cache = await caches.open('images');
  await cache.put('/logo.png', await fetch('/logo.png'));
  console.log('📁 图片已缓存');
}

cacheImage();
```

---

## ✅ 5. Background Sync（断网补单）

**主线程：**

```js
navigator.serviceWorker.ready.then((registration) => {
  return registration.sync.register('sync-submit-order');
});
```

**sw.js 中：**

```js
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-submit-order') {
    event.waitUntil(
      fetch('/submit-order', {
        method: 'POST',
        body: JSON.stringify({ orderId: 123 }),
        headers: { 'Content-Type': 'application/json' },
      }).then(() => console.log('🛒 自动补单成功'))
    );
  }
});
```

---

## ✅ 6. Background Fetch（后台下载大文件）

**主线程：**

```js
const registration = await navigator.serviceWorker.ready;
await registration.backgroundFetch.fetch('big-video-download', ['/big.mp4'], {
  title: '下载视频',
  icons: [{ sizes: '192x192', src: '/icon.png', type: 'image/png' }],
  totalDownloadSize: 50 * 1024 * 1024,
});
```

**sw.js 中：**

```js
self.addEventListener('backgroundfetchsuccess', (event) => {
  console.log('✅ 文件下载成功');
});
```

---

## 📌 小结表格

| 功能点       | API/事件名                         | 通俗解释         | 主要用途                   |
| ------------ | ---------------------------------- | ---------------- | -------------------------- |
| 注册 SW      | `navigator.serviceWorker.register` | 注册离线处理脚本 | 初始化 Service Worker 支持 |
| 缓存静态资源 | `caches.open().addAll()`           | 存 HTML/CSS/JS   | 离线访问支持               |
| 请求拦截     | `fetch` 事件                       | 捕获网络请求     | 缓存优先或离线兜底         |
| 手动缓存     | `caches.put()`                     | 程序主动添加缓存 | 精细控制缓存               |
| 离线补单     | Background Sync                    | 离线时延后重试   | 确保提交成功               |
| 后台下载     | Background Fetch                   | 下载不中断       | 用于大文件、离线内容预下载 |
