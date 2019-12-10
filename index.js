
/** 
 * electron 启动原理：
 * electron . ： 表示在package中寻找main字段，读取其中的入口文件地址
 * 入口文件中 loadURL 字段表示获取web项目index.html地址
 * 
 */
const { app, BrowserWindow, globalShortcut, Menu } = require('electron')

// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let win

function createWindow () {
  // 创建浏览器窗口。
  win = new BrowserWindow({
    width: 1460,
    height: 1000,
    minWidth: 1300,
    minHeight: 800,
    icon: 'assets/favicon.icns',
    webPreferences: {
      nodeIntegration: true // 是否集成Node：默认不开启。不开启的话，node有关系的代码无法识别。
    }
  })
  // new BuildMenu(win)
  Menu.setApplicationMenu(null)

  // 加载index.html文件
  // win.loadURL('https://www.tingkelai.com/tingkelai/')
  win.loadURL('http://127.0.0.1:90/tingkelai/login')

  // 当 window 被关闭，这个事件会被触发。
  win.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null
  })

}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', () => {
  createWindow()
  registerShortcut()
  setTheLock()
  behindInstanceJavaScript(win.webContents)
})



// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 注销所有快捷键
    globalShortcut.unregisterAll()

  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow()
  }
})

/** 当运行第二个实例时 */
function setTheLock() {
  const gotTheLock = app.requestSingleInstanceLock() // 此方法的返回值表示你的应用程序实例是否成功取得了锁。 return Boolean
  if (!gotTheLock) {
    // 关闭第二实例
    app.quit()
  } else {
    app.on('second-instance', () => {
      // 当运行第二个实例时,则打开第一个实例
      if (win) {
        win.focus()
      }
    })
  } 
}

/** 在实例加载成功后，执行的脚本 */
function behindInstanceJavaScript(win) {
  win.executeJavaScript(`
    console.log(321)
    const os = require('os')
    const networkInterfaces = os.networkInterfaces();
    const list = networkInterfaces.WLAN
    if (list && list.length > 0) window.localStorage.setItem('mac', list[0].mac)

    fetch('https://api.imjad.cn/cloudmusic/?type=lyric&id=32785674', {
      method: 'Get',
    }).then((res) => {
      console.log(res)
    })
    console.log(document.querySelector('#app'));
  `)
}

/** 注册快捷键 */
function registerShortcut() {
  globalShortcut.register('CommandOrControl+D', () => {
    // 打开开发者工具
    win.webContents.openDevTools()
  })

  if (!globalShortcut.isRegistered('CommandOrControl+D')) {
    globalShortcut.register('CommandOrControl+P', () => {
      // 打开开发者工具
      win.webContents.openDevTools()
    })
  }
}
