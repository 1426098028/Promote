const { app, BrowserWindow } = require('electron')
app.on('ready', () => {
    const newWindow = new BrowserWindow({
        width: 800,
        height: 600,
    })
    newWindow.loadURL('http://localhost:5173/')
})