import request from '@/until/request'
export const getUserList = ({ pagenum = 1, pagesize = 5 }) => request({
  method: 'get',
  url: '/users',
  params: {
    pagenum,
    pagesize
  }
}).then(res => res.data)
export const addUser = ({ username, password, email, mobile }) => request({
  method: 'post',
  url: '/users',
  data: {
    username,
    password,
    email,
    mobile
  }
}).then(res => res.data)
