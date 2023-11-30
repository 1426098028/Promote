let total = 0
for (let index = 0; index < 9999999; index++) {
    total += index
}
console.log('Worker.js', total)
// Worker 适合做大量的数据处理，同时不可以操作DOM和BOM
// 发送信息给主线程   self 或 this
self.postMessage({
    total
})