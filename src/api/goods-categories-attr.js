import request from '@/until/request'
export const getGoodsCategoryAttrs = (catId, sel = 'many') => request({ // 获取商品分类参数列表
  method: 'get',
  url: `categories/${catId}/attributes`,
  params: {
    sel
  }
}).then(res => res.data)
