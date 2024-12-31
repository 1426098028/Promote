import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { is } from '@electron-toolkit/utils';
import icon from '../../../resources/icon.png?asset';
class MainFrame {
    create() {
        const mainWindow = new BrowserWindow({
            width: 900,
            height: 670,
            show: false,
            autoHideMenuBar: true,
            // titleBarStyle: 'hidden', // 隐藏标题栏
            frame: false, // 无边框
            resizable: false, // 决定窗口是否可被用户手动调整大小
            ...(process.platform === 'linux' ? { icon } : {}),
            webPreferences: {
                preload: join(__dirname, '../preload/index.js'),
                sandbox: false
            }
        });

        mainWindow.on('ready-to-show', () => {
            mainWindow.show();
        });

        mainWindow.webContents.setWindowOpenHandler((details) => {
            shell.openExternal(details.url);
            return { action: 'deny' };
        });
        if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
            mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
        } else {
            mainWindow.loadFile(join(__dirname, '../../renderer/index.html'));
        }

        // 实现窗口拖拽移动
        ipcMain.handle('custom-adsorption', (event, { appX, appY }) => {
            mainWindow.setPosition(appX, appY);
        });

        // 窗口最小化
        ipcMain.handle('min-win', () => {
            console.log('窗口最小化');
            mainWindow.minimize();
        });

        // 窗口最大化
        ipcMain.handle('max-win', () => {
            console.log('窗口最大化');
            mainWindow.setFullScreen(!mainWindow.isFullScreen());
        });

        // 关闭登录窗口
        ipcMain.handle('close-login', () => {
            console.log('关闭登录窗口');
            mainWindow.close();
        });

        // 关闭应用
        ipcMain.handle('win-close', () => {
            console.log('关闭应用');
            app.exit();
        });

        // 登录成功后调整窗口大小(进入后台管理系统)
        ipcMain.handle('resize-window', () => {
            console.log('调整窗口大小');
            // 调整窗口大小
            mainWindow.setSize(1600, 720);
            // 调整窗口最小值
            mainWindow.setMinimumSize(1000, 500);
            // 调整窗口居中
            mainWindow.center();
            // 支持窗口大小可以修改
            mainWindow.setResizable(true);
        });
        // 退出登录成功后调整窗口大小(进入后台管理系统)
        ipcMain.handle('out-login', () => {
            console.log('调整窗口大小');
            // 调整窗口大小
            mainWindow.setSize(900, 670);
            // 调整窗口居中
            mainWindow.center();
            // 支持窗口大小可以修改
            mainWindow.setResizable(false);
        });
    }
}
export default MainFrame;
