import { app, BrowserWindow, ipcMain } from 'electron';
import { electronApp, optimizer, } from '@electron-toolkit/utils';
import MainFrame from './frame/MainFrame';
const mainFrame = new MainFrame();
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  ipcMain.on('ping', () => console.log('pong'))
  mainFrame.create()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) mainFrame.create() 
  })
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
