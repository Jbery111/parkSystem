import request from '@/utils/request'
import QS from 'qs' // 引入qs模块，用来序列化post类型的数据
export function postLogin(data) {
  console.log(data,'登录的参数参数')
  return request({
    url: '/index/logins/login',
    method: 'post',
    data
  })
}

export function postLogout(data) {
  return request({
    url: '/index/index/Signout',
    method: 'post',
    data
  })
}
// 获取验证码
export function postGetCode(data) {
  console.log(data, '获取找回密码的验证码1111')
  return request({
    url: '/index/logins/Code',
    method: 'post',
    data
  })
}
// 重置获取验证码
export function postGetCodes(data) {
  // console.log('重置获取验证码的参数111')
  return request({
    url: '/index/logins/codes',
    method: 'get',
    params: data
  })
}
// 找回密码
export function postRetrieve(data) {
  console.log(data, '11111112222222222333333333333')
  return request({
    url: '/index/logins/Retrieve',
    method: 'post',
    data
  })
}

// 重置密码
export function postResetPwd(data) {
  return request({
    url: '/index/logins/Retrievea',
    method: 'post',
    data
  })
}
// 输入新密码
export function postnewPwd(data) {
  return request({
    url: '/index/logins/Retrieves',
    method: 'post',
    data
  })
}
// 选择小区
export function postHighest(data) {
  return request({
    url: '/index/index/Highest',
    method: 'post',
    // headers: {  },
    // headers: {
    //   'token': 'eyJ1aWQiOjEsImlwIjoiMjIwLjE2Ni4yMzguMjI5In0',
    //   'Content-Type': 'application/json;charset=UTF-8'
    // },
    // credientials: false,
    // emulateJSON: true,
    // headers: {
    //   'token': 'eyJ1aWQiOjEsImlwIjoiMjIwLjE2Ni4yMzguMjI5In0',
    //   'Content-Type': 'application/json'
    // },
    // data: qs.stringify(data),
    // withCredentials: true,
    // // credentials: 'same-origin',
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   'Content-Type': 'application/json'
    // },
    // withCredentials: false,
    data
  })
}
// 按小区首字母搜索小区
export function postHighests(data) {
  return request({
    url: '/index/index/Highests',
    method: 'post',
    data
  })
}
// 查询小区
export function postHighes(data) {
  console.log(data,'请求小区数据的data参数')
  return request({
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    url: '/index/index/Highes',
    method: 'post',
    data
  })
}
// 查询小区分页
export function postget(data) {
  // console.log(data)
  const { page, Communityid, propertyId } = data
  return request.get(`/index/index/Highes?page=${page}&Communityid=${Communityid}&propertyId=${propertyId}`)
}
// 按小区首字母搜索小区
export function getLetter(data) {
  const { page, name, Communityid, propertyId } = data
  return request.get(`/index/index/Highests?page=${page}&Communityid=${Communityid}&propertyId=${propertyId}&name=${name}`)
}
// 查询开票
// export function postInvoices(data) {
//   const { propertyId } = data
//   return request.get(`/index/index/Invoices?propertyId=${propertyId}`)
// }
export function postInvoices(data) {
  return request({
    url: '/index/index/Invoices',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}
// 开票

export function postInvoicesSuccess(data) {
  // console.log(data)
  return request({
    url: '/index/index/Invoice',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}
