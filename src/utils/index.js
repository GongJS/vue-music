import axios from 'axios'
// 请求数据
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

// 根据id获取歌曲的音乐url，专辑背景，歌手名称， 歌词
export async function getSongDate (obj) {
  let songInfo = {}
  let albumData = null
  songInfo.playUrl = `http://music.163.com/song/media/outer/url?id=${
    obj.id
  }.mp3`
  if (obj.al === undefined) {
    albumData = await getData('/album', obj.album.id)
  } else {
    albumData = await getData('/album', obj.al.id)
  }
  if (albumData.code === 200) {
    songInfo.backImage = albumData.album.blurPicUrl
    songInfo.singer = albumData.album.artist.name
  }
  const lyricData = await getData('/lyric', obj.id)
  if (lyricData.code === 200) {
    songInfo.lyric = lyricData.lrc.lyric
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

// 数组重新排列(歌曲随机播放)
function getRandomInt (max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export function shuffle (arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
