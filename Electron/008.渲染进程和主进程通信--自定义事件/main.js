console.log('主进程')// 调试在cmd上看
const { app, ipcMain } = require('electron');
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



    //   渲染进程和主进程通信--自定义事件
    // 实现窗口全屏  窗口缩小
    //   ipcMain   从主进程到渲染进程的异步通信。
    ipcMain.on('window-operations', (event, args) => {
        console.log(args)
        mainWindow[args]()       // 操作窗口大小
    })

})
