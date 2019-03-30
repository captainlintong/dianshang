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

// 添加角色
export const addRoles = (roleName, roleDesc) => request({
  method: 'post',
  url: '/roles',
  data: {
    roleName,
    roleDesc
  }
}).then(res => res.data)

// 根据id查询角色
export const getRoles = (id) => request({
  url: `roles/${id}`,
  method: 'get'
}).then(res => res.data)

// 提交编辑角色
export const sureEdit = (id, roleName, roleDesc) => request({
  url: `roles/${id}`,
  method: 'put',
  data: {
    roleName,
    roleDesc
  }
}).then(res => res.data)

// 删除角色
export const delRoles = (id) => request({
  url: `roles/${id}`,
  method: 'delete'
}).then(res => res.data)

// 角色授权
export const updataRoles = (roleid, rids) => request({
  method: 'post',
  url: `roles/${roleid}/rights`,
  data: {
    rids
  }
}).then(res => res.data)
// 删除角色
export const delRolesRights = (roleid, rightid) => request({
  method: 'delete',
  url: `roles/${roleid}/rights/${rightid}`
}).then(res => res.data)
