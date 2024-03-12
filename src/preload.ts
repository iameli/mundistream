// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  message: (str: string) => ipcRenderer.send("message", str),
  onState: (callback: (value: any) => void) => {
    console.log("onState");
    ipcRenderer.on("state", (_event, value) => callback(value));
  },
});

contextBridge.exposeInMainWorld("electronAPI", {});
