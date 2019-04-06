import request from '@/until/request'
export const loginAdress = data => request({
  method: 'POST',
  url: '/login',
  data: {
    username: data.username,
    password: data.password
  }
}).then(res => res.data)

export const upload = files => {
  const formData = new FormData()
  formData.append('file', files[0])
  return request({
    method: 'POST',
    url: '/upload',
    data: formData
  }).then(res => res.data)
}
