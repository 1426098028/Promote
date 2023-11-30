console.log("渲染进程");
const { remote: { BrowserWindow, dialog }, shell } = require('electron');
const fs = require('fs')
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

// 点击打开文件
document.querySelector('.open-file').onclick = async () => {
    console.log('打开文件')
    // 打开文件对话框     
    const { filePaths } = await dialog.showOpenDialog({
        title: '读取文件',
        buttonLabel: '读取',
        properties: ['openFile'],
        filters: [
            { name: 'js', extensions: ['js'] },
        ]
    })

    // node    fs.readFileSync    读取文件内容
    const htmlText = fs.readFileSync(filePaths[0]).toString()
    document.querySelector('.file').innerText = htmlText
}





// 点击a标签在浏览器中打开
document.querySelector('.open-link').onclick = (e) => {
    // 关闭标签默认事件
    e.preventDefault()
    console.log('打开链接')
    // 打开浏览器并且，打开网页
    shell.openExternal('https://www.electronjs.org/zh/')
}

// 保存文件
document.querySelector('.save-file').onclick = async () => {
    // 打开保存文件对话框   
    const filePath = await dialog.showSaveDialogSync({
        title: '保存文件',
        buttonLabel: '保存',
        properties: ['openFile'],
        filters: [
            { name: 'js', extensions: ['js'] },
        ]
    })
    // node    fs.readFileSync    保存文件内容
    fs.writeFileSync(filePath, document.querySelector('.file').innerText)
    console.log(filePath, document.querySelector('.file').innerText)
}