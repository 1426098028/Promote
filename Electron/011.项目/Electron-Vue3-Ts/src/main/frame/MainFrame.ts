import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { is } from '@electron-toolkit/utils';
import icon from '../../../resources/icon.png?asset';
class MainFrame {
    #width = 1000;
    #height = 800;
    #frame = null

    create() {
        this.#frame = new BrowserWindow({
            width: this.#width,
            height: this.#height,
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

        this.#frame.on('ready-to-show', () => {
            this.#frame.show();
        });

        this.#frame.webContents.setWindowOpenHandler((details) => {
            shell.openExternal(details.url);
            return { action: 'deny' };
        });
        if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
            this.#frame.loadURL(process.env['ELECTRON_RENDERER_URL']);
        } else {
            this.#frame.loadFile(join(__dirname, '../../renderer/index.html'));
        }

        // 实现窗口拖拽移动
        ipcMain.handle('custom-adsorption', (event, { appX, appY }) => {
            this.#frame.setPosition(appX, appY);
        });

        // 窗口最小化
        ipcMain.handle('min-win', () => {
            console.log('窗口最小化');
            this.#frame.minimize();
        });

        // 窗口最大化
        ipcMain.handle('max-win', () => {
            console.log('窗口最大化');
            this.#frame.setFullScreen(!this.#frame.isFullScreen());
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
            this.#frame.setSize(1600, 720);
            // 调整窗口最小值
            this.#frame.setMinimumSize(1000, 500);
            // 调整窗口居中
            this.#frame.center();
            // 支持窗口大小可以修改
            this.#frame.setResizable(true);
        });
        // 退出登录成功后调整窗口大小(进入后台管理系统)
        ipcMain.handle('out-login', () => {
            console.log('调整窗口大小');
            // 调整窗口大小
            this.#frame.setSize(900, 670);
            // 调整窗口居中
            this.#frame.center();
            // 支持窗口大小可以修改
            this.#frame.setResizable(false);
        });
    }
    // 关闭登录窗口
    close() {
        console.log('关闭登录窗口');
        this.#frame.close();
    }
}
export default MainFrame;
