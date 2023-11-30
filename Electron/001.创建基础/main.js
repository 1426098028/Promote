const { app, BrowserWindow } = require('electron');
console.log('app', app);

// 监听初始化完成得到生命周期
app.on('ready', () => {
    // 创建一个窗口BrowserWindow
    //  BrowserWindow 会返回一个实例对象
    let mainWindow = new BrowserWindow({
        width: 800,
        height: 500,
    })
    console.log(mainWindow)

    // loadFile 可以加载一个文件(任意文件)
    mainWindow.loadFile('./src/index.html')
})
