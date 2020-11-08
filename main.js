const {app,BrowserWindow} = require('electron');
const GAME_CONFIG=require('./src/config/config');
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function createWindow() {
    let win = new BrowserWindow({
        resizable: false,
        width: GAME_CONFIG.winWidth,
        height: GAME_CONFIG.winHeight,
        show : false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule : true
        }
    });

    win.loadFile('index.html').then(function () {
        win.webContents.send('size', JSON.stringify(win.getSize()));
    });

    win.once('ready-to-show', () => {
        win.show();
        win.webContents.openDevTools();
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})