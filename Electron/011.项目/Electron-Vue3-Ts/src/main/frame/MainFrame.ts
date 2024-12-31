import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { is } from '@electron-toolkit/utils';
import icon from '../../../resources/icon.png?asset';
class MainFrame {
    #width = 1000;
    #height = 800;
    #frame = null;

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
    }
    // 实现窗口拖拽移动
    setPosition(appX, appY) {
        console.log('实现窗口拖拽移动');
        this.#frame.setPosition(appX, appY);
    }

    // 窗口最大化
    setFullScreen() {
        console.log('窗口最大化');
        this.#frame.setFullScreen(!this.#frame.isFullScreen());
    }
    // 窗口最小化
    minimize() {
        console.log('窗口最小化');
        this.#frame.minimize();
    }

    // 登录成功后调整窗口大小(进入后台管理系统)
    LoginSuccess() {
        console.log('登录成功后调整窗口大小(进入后台管理系统)');
        // 调整窗口大小
        this.#frame.setSize(1600, 720);
        // 调整窗口最小值;
        this.#frame.setMinimumSize(this.#width, this.#height);
        // 调整窗口居中
        this.#frame.center();
        // 支持窗口大小可以修改
        this.#frame.setResizable(true);
    }
    // 退出登录成功后调整窗口大小(进入后台管理系统)
    OutLogin() {
        console.log('退出登录成功后调整窗口大小(进入后台管理系统)');
        // 调整窗口大小;
        this.#frame.setSize(this.#width, this.#height);
        // 调整窗口居中
        this.#frame.center();
        // 支持窗口大小可以修改
        this.#frame.setResizable(false);
    }

    // 关闭登录窗口
    close() {
        console.log('关闭登录窗口');
        this.#frame.close();
    }
    // 关闭应用
    exit() {
        console.log('关闭应用');
        app.exit();
    }

}
export default MainFrame;
