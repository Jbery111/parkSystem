import request from '@/utils/request'
// 账号分配
// 查询权限
export function postAddto(data) {
  const { Communityid, page = 1, sition } = data
  return request.get(`/index/Jurisdiction/addto?page=${page}&sition=${sition}&Communityid=${Communityid}`)
}

// 查询权限组
export function postQuerysa(data) {
  return request({
    url: '/index/Jurisdiction/querysa',
    method: 'post',
    data
  })
}
// 添加权限
export function postQuerys(data) {
  return request({
    url: '/index/Jurisdiction/querys',
    method: 'post',
    data
  })
}
// 修改权限名
export function postUpdate(data) {
  return request({
    url: '/index/Jurisdiction/updete',
    method: 'post',
    data
  })
}

// 删除权限
export function postDelete(data) {
  return request({
    url: '/index/Jurisdiction/delete',
    method: 'post',
    data
  })
}
// 获取权限按钮
export function postButton(data) {
  return request({
    url: '/index/index/button',
    method: 'post',
    data
  })
}

// 账号管理模块(模块二)
// 查询用户
export function postAccount(data) {
  const { Communityid, page = 1, sition } = data
  // console.log(data, '查询用户需要的参数')
  return request.get(`/index/account/account?page=${page}&sition=${sition}&Communityid=${Communityid}`)
}
// 添加用户
export function postAccaddto(data) {
  return request({
    url: '/index/account/addto',
    method: 'post',
    data
  })
}
// 查询职位名
export function postJurisdiction(data) {
  // console.log(data, '62222')
  return request({
    url: '/index/account/Jurisdiction',
    method: 'post',
    data
  })
}
// 搜索
export function postSearch(data) {
  // console.log(data, '62222')
  return request({
    url: '/index/account/search',
    method: 'post',
    data
  })
}
// export function postSearch (data) {
//   console.log(data, '搜索的请求的参数')
//   const { page = 1, name, Communityid, sition } = data
//   return request.get(`/index/account/account?page=${page}&sition=${sition}&Communityid=${Communityid}&name=${name}`)
// }
// 修改用户
export function postupdatas(data) {
  // console.log(data, '898989')
  return request({
    url: '/index/account/updetes',
    method: 'post',
    data
  })
}
// 删除
export function postDeletes(data) {
  // console.log(data, '898989')
  return request({
    url: '/index/account/delete',
    method: 'post',
    data
  })
}
// 冻结用户
export function postDongjie(data) {
  // console.log(data, '898989')
  return request({
    url: '/index/account/deletes',
    method: 'post',
    data
  })
}
// 模块三
// 查询审核账号
export function postToexamine(data) {
  // console.log(data, '898989')
  return request({
    url: '/index/account/toexamine',
    method: 'post',
    data
  })
}
// 同意审核
export function postTongyi(data) {
  // console.log(data, '898989')
  return request({
    url: '/index/account/toexamines',
    method: 'post',
    data
  })
}
// 拒绝审核
export function postJujue(data) {
  // console.log(data, '898989')
  return request({
    url: '/index/account/toexamineNo',
    method: 'post',
    data
  })
}
