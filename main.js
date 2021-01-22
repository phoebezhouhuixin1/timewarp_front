// Load and cache the app and BrowserWindow modules of the electron package
const { app, BrowserWindow, dialog } = require("electron")
const ipc = require("electron").ipcMain;
const os = require("os");
const execSync = require('child_process').execSync;


mainWindow = null;
vidpath = null;
// Create a new browser window once the electron app is initialized
app.whenReady().then(createWindow) // same as 'app.on('ready', function())'

ipc.on("close-main-window", function(){
    app.quit();
})

function createWindow() {
    mainWindow = new BrowserWindow({
        resizable: true, 
        width: 800,
        height: 600, 
        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.maximize();
    mainWindow.loadFile(__dirname + "/src/index.html");

    // Open the DevTools. 
    mainWindow.webContents.openDevTools();

    mainWindow.on("closed", function () {
        mainWindow = null;
    })
}

// In this file, you can include the rest of your  
// app's specific main process code. You can also  
// put them in separate files and require them here.

ipc.on("open-file-dialog", function(event) {
    //checking the os of the user
    if (os.platform() === 'linux' || os.platform() === 'win32') {
        dialog.showOpenDialog({
            properties: ["openFile"] // vs open directory
        }).then((data) => {
            if (data) {
                event.sender.send("selected-file", data.filePaths[0])
                vidpath = data.filePaths[0]
                console.log("In main.js: " + data.filePaths[0])
                // files is an array of filepaths chosen by the user
            }
        })
    }
    else {
        // this is mac
        dialog.showOpenDialog({
           properties:["openFile", "openDirectory"] 
        }).then((data) => {
            if (data) {
                console.log("In main.js: " + data.filePaths[0])
                vidpath = data.filePaths[0]
                event.sender.send("selected-file", data.filePaths[0])
                
            }
        })
    }
})

ipc.on("detect-objects", function (event) {
    const cmd = 'python src/engine.py --vidpath "' + vidpath + '"';
    const output = execSync(cmd, { encoding: 'utf-8' });  // the default is 'buffer'
    console.log('Output was:', output);
})