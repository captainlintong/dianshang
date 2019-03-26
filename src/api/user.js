import request from '@/until/request'

// 请求用户列表
export const getUserList = ({ pagenum = 1, pagesize = 5 }) => request({
  method: 'get',
  url: '/users',
  params: {
    pagenum,
    pagesize
  }
}).then(res => res.data)

// 请求添加用户
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

// 请求用户状态
export const getUsermsg = (uld, type) => request({
  method: 'put',
  url: `users/${uld}/state/${type}`
}).then(res => res.data)

// 请求删除用户
export const delUser = id => request({
  method: 'delete',
  url: `users/${id}`
}).then(res => res.data)

// 根据id查询用户信息
export const setEdit = id => request({
  method: 'get',
  url: `users/${id}`
}).then(res => res.data)

// 发送编辑请求
export const updataEdit = (id, email, mobile) => request({
  method: 'put',
  url: `users/${id}`,
  data: {
    email,
    mobile
  }
}).then(res => res.data)
