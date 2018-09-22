import axios from 'axios'
export function getData (url, id) {
  return new Promise((resolve, reject) => {
    if (id) {
      url = url + `?id=${id}`
    }
    axios.get(url, {xhrFields: { withCredentials: true }})
      .then(res => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      })
  }).catch((err) => {
    console.log(err)
  })
}
