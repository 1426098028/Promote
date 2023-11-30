console.log('主进程')// 调试在cmd上看
const { app, BrowserWindow, globalShortcut } = require('electron');
const CreateWindow = require('./CreateWindow');
const Quick = require('./Quick');

// 引入热加载
const reloader = require('electron-reloader')
reloader(module) // 调用热加载模块

// 监听初始化完成得到生命周期
app.on('ready', () => {
    // 执行创建窗口
    const mainWindow = CreateWindow()
    // 执行自定义菜单
    require(`./menu`)
    // 执行自定义快捷键
    Quick(mainWindow)
})
