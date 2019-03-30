import request from '@/until/request'
export const getShopList = ({ pagenum = 1, pagesize = 5, query = '' }) => request({
  method: 'get',
  url: '/goods',
  params: {
    pagenum,
    pagesize,
    query
  }
}).then(res => res.data)
// 删除商品
export const delShop = id => request({
  method: 'delete',
  url: `goods/${id}`
}).then(res => res.data)
