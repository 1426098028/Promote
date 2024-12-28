import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  // Create the browser window.
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
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // 实现窗口拖拽移动
  ipcMain.handle('custom-adsorption', (event, { appX, appY }) => {
    // console.log(event, res);
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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
