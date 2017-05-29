'use strict';

const {app,BrowserWindow,Menu,Tray,ipcMain,shell} = require('electron');

var myWindow = null;
var shouldQuit = app.makeSingleInstance(function(commandLine, workingDirectory) {
  // Someone tried to run a second instance, we should focus our window
  if (myWindow) {
    if (myWindow.isMinimized()) myWindow.restore();
    myWindow.focus();
  }
  return true;
});

if (shouldQuit) {
  app.quit();
  return;
}

require('./server.js');
var path = require('path');

//let tray = null;
app.on('ready', function(){
    const win = new BrowserWindow({	
        show : false,
        frame : false,
        width : 600,
        height : 500,
        icon: __dirname + '/favicon.png',
        resizable : false,
        title : "우주주주!"
    });
    /*
    const trayTemplate = [
        {
            label: '열기',
            type: 'normal',
            click : function(){
                showWin();
            }
        },{
            label : '감추기',
            type : 'normal',
            click : function(){
                hideWin();
            }
        },{
            type: 'separator'
        },{
            label: '종료',
            type: 'normal',
            click: function(){
                app.exit();
            }
        }
    ];
    tray = new Tray( path.join(__dirname, "/favicon.png") );    
    const trayMenu = Menu.buildFromTemplate(trayTemplate);
    tray.setContextMenu(trayMenu);
    */
    win.loadURL('http://localhost:3000/index.html');

    win.on('ready-to-show', function(){
		win.show();
        win.focus();
	});

    /*
    tray.on('double-click', function(){
        showWin();
    });
    
    

    win.on('close', function( event ){      
        event.preventDefault();
        hideWin();
        return false;
    });
    

    
    function showWin() {
        if (win !== null) {
            win.show();
        }
    }
    function hideWin() {
        if (win !== null) {
            win.hide();
        }
    }
    */
});

/*
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
*/

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})

app.on('quit', function(){
});

app.once('window-all-closed', app.quit);
app.once('before-quit', () => {
    window.removeAllListeners('close');
});
