const { BrowserWindow } = require('electron');
console.log('创建一个窗口');
function CreateWindow() {
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
}

module.exports = CreateWindow;