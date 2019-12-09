const { winTemplate } = require('./winTemplate')

const { Menu } = require('electron')

exports.BuildMenu = class BuildMenu {
  constructor(mainWin) {
    // 暂时用不到 mainWin
    this.mainWin = mainWin
    
    // 创建菜单
    const menu = Menu.buildFromTemplate(winTemplate)
    Menu.setApplicationMenu(menu)
  }
}