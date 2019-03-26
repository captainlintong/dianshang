import request from '@/until/request'
// 请求角色信息
export const rolesList = () => request({
  url: 'roles',
  method: 'get'
}).then(res => res.data)
// 设置角色
export const setUserRoles = (id, rid) => request({
  url: `users/${id}/role`,
  method: 'put',
  data: {
    rid
  }
}).then(res => res.data)
