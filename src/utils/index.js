import axios from 'axios'
export function getData (url, id) {
  return new Promise((resolve, reject) => {
    if (id) {
      url = url + `?id=${id}`
    }
    axios.get(url, { xhrFields: { withCredentials: true } }).then(res => {
      if (res.status === 200) {
        resolve(res.data)
      } else {
        reject(res)
      }
    })
  }).catch(err => {
    console.log(err)
  })
}

// 根据id获取歌曲的音乐url，专辑背景，歌手名称
export async function getSongDate (obj) {
  let songInfo = {}
  const result = await getData('/album', obj.al.id)
  if (result.code === 200) {
    songInfo.backImage = result.album.blurPicUrl
    songInfo.singer = result.album.artist.name
  }
  const data = await getData('/music/url', obj.id)
  if (data.code === 200) {
    songInfo.playUrl = data.data[0].url
  }
  return songInfo
}
// 添加class前缀
let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle (style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
