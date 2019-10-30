import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'http://test.txsqtech.com/table/list',
    method: 'get',
    params
  })
}

// 优惠套餐
export function setmeal(data) {
  return request({
    url: 'http://test.txsqtech.com/index/index/setmeal',
    method: 'post',
    data
  })
}

// 获取套餐里的年数
export function getYears(data) {
  return request({
    url: 'http://test.txsqtech.com/index/index/year',
    method: 'post',
    data
  })
}
// 微信生成二维码支付
export function payMent(data) {
  // console.log('payment该传递的参数')
  // console.log(data)
  return request({
    url: 'http://test.txsqtech.com/index/index/payment',
    method: 'post',
    data
  })
}

// 获取支付状态
export function setmeals(data) {
  return request({
    url: 'http://test.txsqtech.com/index/index/setmeals',
    method: 'post',
    data
  })
}
