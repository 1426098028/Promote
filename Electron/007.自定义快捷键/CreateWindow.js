const { BrowserWindow } = require('electron');
console.log('创建一个窗口');
function CreateWindow() {
    // 创建一个窗口BrowserWindow
    //  BrowserWindow 会返回一个实例对象
    let mainWindow = new BrowserWindow({
        width: 700,// 窗口宽度
        height: 500,// 窗口高度
        frame: false,// 是否显示边框     顶部操作栏    可以通过 HTML 重写顶部操作栏样式
        // 为(js)渲染进程扩展 node 能力
        webPreferences: {
            contextIsolation: false, // 关闭在独立 JavaScript 环境中
            nodeIntegration: true, // 允许在渲染进程中使用 Node.js
            enableRemoteModule: true, // 开启 remote 模块
        }
    })
    // loadFile 可以加载一个文件(任意文件)
    mainWindow.loadFile('./src/index.html')
    // 打开渲染进程调试窗口   也可以通过快捷键CTRL+shift+i
    mainWindow.webContents.openDevTools()


    return mainWindow;
}

module.exports = CreateWindow;