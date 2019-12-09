
const winTemplate = [
  {
    label: '编辑',
    submenu: [
      {
        label: '撤销',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      }, 
      { type: 'separator' },
      {
        label: '重做',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
      }, 
      { type: 'separator' }, 
      {
        label: '复制',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      }, 
      { type: 'separator' },
      {
        label: '粘贴',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      }
    ]
  },
  {
    label: '帮助',
    role: 'help',
    submenu: [
      {
        label: '学习更多',
        click: function () {
        }
      }
    ]
  }
]

exports.winTemplate = winTemplate
