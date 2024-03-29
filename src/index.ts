import { app, BrowserWindow, ipcMain } from "electron";
import { selfbot } from "./selfbot-server";
import {
  Action,
  BLUESKY_POST,
  DEFAULT_STATE,
  DISCORD_BLAST,
  dispatcher,
  reducer,
  SELFBOT_START,
  SELFBOT_STOP,
} from "./state";
import discordBlast from "./discord";
import blueskyPost from "./bluesky";
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    x: 2560,
    y: 38,
    width: 1728,
    height: 1079,
  });

  let state = DEFAULT_STATE;

  const dispatch = dispatcher((action) => {
    state = reducer(state, action);
    mainWindow.webContents.send("state", state);
  });

  const bot = selfbot(dispatch);

  ipcMain.on("message", (e, str: string) => {
    const action: Action = JSON.parse(str);
    state = reducer(state, action);
    if (action.type === SELFBOT_START) {
      bot.start(state.postText);
    } else if (action.type === SELFBOT_STOP) {
      bot.stop();
    } else if (action.type === DISCORD_BLAST) {
      discordBlast(state.postText, action.time);
    } else if (action.type === BLUESKY_POST) {
      blueskyPost(state.postText, action.time);
    }
    mainWindow.webContents.send("state", state);
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.webContents.send("state", state);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
