console.log('主进程')// 调试在cmd上看
const { app, BrowserWindow } = require('electron');

// 引入热加载
const reloader = require('electron-reloader')
reloader(module) // 调用热加载模块

// 监听初始化完成得到生命周期
app.on('ready', () => {
    // 创建一个窗口BrowserWindow
    //  BrowserWindow 会返回一个实例对象
    let mainWindow = new BrowserWindow({
        width: 700,
        height: 500,
    })
    // loadFile 可以加载一个文件(任意文件)
    mainWindow.loadFile('./src/index.html')

    // 打开渲染进程调试窗口   也可以通过快捷键CTRL+shift+i
    mainWindow.webContents.openDevTools()
})
