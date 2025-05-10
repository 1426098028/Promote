# HTML5 并发与多线程 API 笔记

## 📌 方法与属性通俗解释

| 功能点             | 方法/属性                       | 通俗解释                             | 主要用途                     |
| ------------------ | ------------------------------- | ------------------------------------ | ---------------------------- |
| 创建 Web Worker    | `new Worker('worker.js')`       | 创建一个“打工仔”后台线程             | 执行耗时任务不阻塞主线程     |
| 向 Worker 发送消息 | `worker.postMessage(data)`      | 给“打工仔”发任务                     | 主线程向子线程传数据         |
| 接收 Worker 消息   | `worker.onmessage`              | 接收“打工仔”做完的结果               | 子线程处理完后告诉主线程结果 |
| Worker 接收消息    | `onmessage = function(e)`       | “打工仔”收到任务                     | 子线程监听主线程发来的消息   |
| Worker 发消息      | `postMessage(data)`             | “打工仔”告诉主线程：我干完了         | 子线程向主线程回传数据       |
| 销毁 Worker        | `worker.terminate()`            | 解雇“打工仔”                         | 停止线程，释放资源           |
| 共享 Worker 创建   | `new SharedWorker('worker.js')` | 多个窗口共用一个“打工仔”             | 多标签页共享后台线程         |
| 结构化克隆         | 自动使用                        | 自动打包对象（递归地）跨线程传输     | 支持传输对象、数组等复杂结构 |
| 可转移对象         | `postMessage(data, [transfer])` | 高速搬数据（如 ArrayBuffer）不用复制 | 提高性能，尤其是处理大数据   |

---

## ✅ 示例代码

### 🔧 创建并使用 Web Worker

**main.js：**

```js
const worker = new Worker('worker.js'); // 创建后台线程

worker.postMessage({ a: 1, b: 2 }); // 主线程发任务

worker.onmessage = function (e) {
  console.log('主线程收到结果：', e.data);
};
```

**worker.js：**

```js
onmessage = function (e) {
  const { a, b } = e.data;
  const result = a + b;
  postMessage(result); // 子线程把结果返回
};
```

---

### 🧪 使用 SharedWorker（多个标签页共享线程）

**shared.js：**

```js
onconnect = function (e) {
  const port = e.ports[0];

  port.onmessage = function (e) {
    console.log('共享线程收到消息：', e.data);
    port.postMessage('你好，来自共享线程！');
  };
};
```

**main.js：**

```js
const shared = new SharedWorker('shared.js');
shared.port.start();
shared.port.postMessage('Hello');
shared.port.onmessage = (e) => console.log(e.data);
```

---

### ⚡ 可转移对象

```js
const buffer = new ArrayBuffer(1024 * 1024); // 1MB

worker.postMessage(buffer, [buffer]); // 转移而不是复制
// 此时 buffer 在主线程中已变为不可用
```

---

## 📌 使用场景小结表格

| 使用场景           | 适用 API             | 说明                                     |
| ------------------ | -------------------- | ---------------------------------------- |
| 后台异步处理       | Web Worker           | 耗时逻辑丢给子线程，主线程不阻塞         |
| 多标签页共享数据   | SharedWorker         | 多个页面共用一个后台线程处理数据         |
| 高性能数据传输     | Transferable Objects | 大量数据直接转移所有权，不进行深拷贝     |
| 对象传递（深结构） | 结构化克隆           | 支持数组、对象等结构复杂数据的线程间传递 |
