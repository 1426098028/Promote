const { Menu } = require('electron');
const CreateWindow = require('./CreateWindow');

console.log('自定义菜单')

// 创建自定义菜单     菜单结构  具体属性查看MenuItem    template是一个options类型的数组
const template = [
    {
        label: '文件',
        // submenu 是创建子菜单，属性和主菜单一样
        submenu: [
            {
                label: '新建窗口',
                // click 点击事件 和web一样
                click: () => {
                    console.log('CreateWindow')
                    // 执行创建新建窗口
                    CreateWindow()
                }
            }
        ]
    },
    {
        label: '关于'
    }
]

// 编译菜单
// 创建菜单项属性(MenuItem), 构建Menu.buildFromTemplate(template) 返回 Menu
const menu = Menu.buildFromTemplate(template)
// 设置菜单
// 将 menu 设置成应用内菜单
Menu.setApplicationMenu(menu)