import request from '@/until/request'

export const getRithts = type => request({ // 获取权限列表
  method: 'get',
  url: `rights/${type}`
}).then(res => res.data)

// 获取当前登录用户的权限菜单
export const getRithtMenus = () => request({ // 获取权限列表
  method: 'get',
  url: '/menus'
}).then(res => res.data)
