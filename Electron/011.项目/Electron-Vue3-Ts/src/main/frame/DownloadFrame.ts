import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { is } from '@electron-toolkit/utils';
import icon from '../../../resources/icon.png?asset';
class DownloadFrame {
    #width = 1400;
    #height = 700;
    #frame = null;
    create({ path }) {
        console.log('isDestroyed', this.#frame?.isDestroyed());
        if (this.#frame && !this.#frame?.isDestroyed()) return this.#frame.show();
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
            this.#frame.loadURL(`${process.env['ELECTRON_RENDERER_URL']}${path}`);
        } else {
            this.#frame.loadFile(join(__dirname, '../../renderer/index.html'), {
                hash: path
            });
        }
    }
    // 关闭下载任务窗口
    destroy() {
        console.log('关闭下载任务窗口');
        this.#frame.destroy();
    }
}
export default DownloadFrame;
