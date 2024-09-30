import { ElectronAPI } from '@electron-toolkit/preload'
// 声明全局类型(ElectronAPI)注解
declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown,
    ipcRenderer: Electron.ipcRenderer,
  }
}
