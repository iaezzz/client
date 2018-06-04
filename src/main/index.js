import { app, protocol, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import path from 'path';
import url from 'url';

import registerNosProtocol from './util/registerNosProtocol';
import registerAboutProtocol from './util/registerAboutProtocol';

protocol.registerStandardSchemes(['nos']);

function registerProtocol() {
  registerNosProtocol();
  registerAboutProtocol();
}

function installExtensions() {
  const {
    default: installer,
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS
  } = require('electron-devtools-installer'); // eslint-disable-line global-require

  const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];

  return Promise.all(extensions.map((extension) => installer(extension)));
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let splashWindow;

const isMac = process.platform === 'darwin';

function createWindow() {
  const framelessConfig = isMac ? { titleBarStyle: 'hidden' } : { frame: false };

  const iconPath = path.join(
    app.getAppPath(),
    '/public/icons/icon1024x1024.png'
  );

  mainWindow = new BrowserWindow(
    Object.assign({ width: 1250, height: 700, show: false, icon: iconPath }, framelessConfig)
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // splashWindow is shown while mainWindow is loading hidden
  // As it is light weight it will load almost instantly and before mainWindow
  splashWindow = new BrowserWindow({ width: 275, height: 330, show: true, titleBarStyle: 'customButtonsOnHover', frame: false, icon: iconPath });

  splashWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'splash.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  mainWindow.loadURL(
    isDev ?
      `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}` :
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      })
  );

  // When mainWindow finishes loading, then show
  // the mainWindow and destroy the splashWindow.
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    splashWindow.destroy();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  registerProtocol();

  if (isDev) {
    installExtensions().then(createWindow);
  } else {
    createWindow();
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
