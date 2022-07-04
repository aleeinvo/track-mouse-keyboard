const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    handleClicks: (callback) => ipcRenderer.on('update-clicks', callback),
    handleKeys: (callback) => ipcRenderer.on('update-keys', callback),
})