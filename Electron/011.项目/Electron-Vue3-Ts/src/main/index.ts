import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { electronApp, optimizer, } from '@electron-toolkit/utils';
import MainFrame from './frame/MainFrame';
import DownloadFrame from './frame/DownloadFrame';
import Router from './router';
import EventRouter from './router/EventRouter';
const mainFrame = new MainFrame();
const downloadFrame = new DownloadFrame();
const eventRouter = new EventRouter();
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  mainFrame.create()
  eventRouter.addApi('app', app);
  eventRouter.addApi('dialog', dialog);
  eventRouter.addApi('mainFrame', mainFrame);
  eventRouter.addApi('downloadFrame', downloadFrame);
  eventRouter.addRouters(Router);
  // 渲染进行 向 主进程 通信
  ipcMain.handle('renderer-to-main', (event, data) => {
    eventRouter.TriggerRoute(data);
  });
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) mainFrame.create() 
  })
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
