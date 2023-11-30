console.log("渲染进程");
const { remote: { BrowserWindow }, shell } = require('electron');
// 新建窗口
document.querySelector('.new-Window').onclick = () => {
    console.log('新建窗口')
    // 创建一个窗口BrowserWindow
    //  BrowserWindow 会返回一个实例对象
    new BrowserWindow({
        width: 700,// 窗口宽度
        height: 500,// 窗口高度
    })
}

// 点击a标签在浏览器中打开
document.querySelector('.open-link').onclick = (e) => {
    // 关闭标签默认事件
    e.preventDefault()
    console.log('打开链接')
    // 打开浏览器并且，打开网页
    shell.openExternal('https://www.electronjs.org/zh/')
}