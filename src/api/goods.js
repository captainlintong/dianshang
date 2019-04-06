import request from '@/until/request'
export const getGoodsList = ({ pagenum = 1, pagesize = 5, query = '' }) => request({ // 加载商品列表数据
  method: 'get',
  url: '/goods',
  params: {
    pagenum,
    pagesize,
    query
  }
}).then(res => res.data)

export const delShop = id => request({ // 删除商品
  method: 'delete',
  url: `goods/${id}`
}).then(res => res.data)
// 添加商品
export const addGoods = ({ goods_name, goods_price, goods_weight, goods_number, goods_cat, attrs = [], pics = [], goods_introduce = '' }) => request({
  method: 'post',
  url: '/goods',
  data: {
    goods_name,
    goods_price,
    goods_weight,
    goods_number,
    goods_cat,
    attrs,
    pics,
    goods_introduce
  }
}).then(res => res.data)
