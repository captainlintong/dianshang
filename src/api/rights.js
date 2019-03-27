import request from '@/until/request'

export const getRithts = (type) => request({
  method: 'get',
  url: `rights/${type}`
}).then(res => res.data)
