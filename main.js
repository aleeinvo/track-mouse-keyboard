const { app, BrowserWindow, dialog } = require('electron')
const path = require('path');

const { uIOhook, UiohookKey } = require('uiohook-napi');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    show: false
  })

  mainWindow.loadFile('index.html')

  // mainWindow.minimize();

  return mainWindow;

  // mainWindow.webContents.openDevTools()
}

async function showMessage(mainWindow) {
  mainWindow.setAlwaysOnTop(true);
  const response = await dialog.showMessageBox(mainWindow, {
    title: 'Application is not responding',
    buttons: ['Yes', 'No'],
    type: 'question',
    message: 'Application is not responding…',
  });

  mainWindow.setAlwaysOnTop(false);
  mainWindow.minimize();

  console.log('Dialogue response', response);
}

const logKey = e => {
  console.log('Click or Key', e);
}

function handleClicks(e, mainWindow) {
  console.log('Click or Key', e);

  mainWindow.webContents.send('update-clicks', 1);
}

function handleKeys(e, mainWindow) {
  console.log('Click or Key', e);

  mainWindow.webContents.send('update-keys', 1);
}

app.whenReady().then(() => {
  const mainWindow = createWindow();

  uIOhook.on('click', (e) => {
    handleClicks(e, mainWindow);
  });
  // uIOhook.on('input', logKey);
  uIOhook.on('keyup', (e) => {
    handleKeys(e, mainWindow);
  });

  uIOhook.start();

  setTimeout(() => {
    showMessage(mainWindow);
  }, 5000);

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
