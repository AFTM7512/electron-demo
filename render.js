exports.behindJavaScript = function behindJavaScript() {
  console.log(321)
  const os = require('os')
  const networkInterfaces = os.networkInterfaces();
  const list = networkInterfaces.WLAN
  // if (list && list.length > 0) window.localStorage.setItem('mac', list[0].mac)

  fetch('https://api.imjad.cn/cloudmusic/?type=lyric&id=32785674', {
    method: 'Get',
  }).then((res) => {
    console.log(res)
  })
  // console.log(document.querySelector('#app'));
}