import request from '@/until/request'
export const loginAdress = data => request({
  method: 'POST',
  url: '/login',
  data: {
    username: data.username,
    password: data.password
  }
}).then(res => res.data)
