const { globalShortcut } = require('electron');
function Quick(main) {
    console.log(main)
    // 注册一个'CommandOrControl+W' 快捷键监听器   作用开启全屏
    globalShortcut.register('CommandOrControl+w', () => {
        console.log('CommandOrControl+X is 作用开启全屏')
        main.maximize()
    })
    // 注册一个'CommandOrControl+R' 快捷键监听器   作用窗口缩小
    globalShortcut.register('CommandOrControl+r', () => {
        console.log('CommandOrControl+R is 作用窗口缩小')
        main.unmaximize()
    })
    // 注册一个'CommandOrControl+T' 快捷键监听器   作用窗口最小化
    globalShortcut.register('CommandOrControl+t', () => {
        console.log('CommandOrControl+T is 作用窗口最小化')
        main.minimize()
    })
    // 注册一个'CommandOrControl+X' 快捷键监听器   作用关闭程序
    globalShortcut.register('CommandOrControl+x', () => {
        console.log('CommandOrControl+T is 作用窗口最小化')
        main.close()
    })
}
module.exports = Quick;