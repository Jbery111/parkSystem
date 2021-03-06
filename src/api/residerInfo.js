import request from '@/utils/request'
// 门禁管理
// // 查询权限
// export function postAddto(data) {
//   const { Communityid, page = 1, sition } = data
//   return request.get(`http://test.txsqtech.com/index/Jurisdiction/addto?page=${page}&sition=${sition}&Communityid=${Communityid}`)
// }

// 查询查询房主信息
export function postHouseholdSelect(data) {
  return request({
    url: 'http://test.txsqtech.com/index/Household/HouseholdSelect',
    method: 'post',
    data
  })
}
// 添加
export function postHouseholdInsert(data) {
  return request({
    url: 'http://test.txsqtech.com/index/Household/HouseholdInsert',
    method: 'post',
    data
  })
}
// 查询Excel类容
export function postHouseExcel(data) {
  return request({
    url: 'http://test.txsqtech.com/index/Household/excel',
    method: 'post',
    data
  })
}
// 确认导入

export function postExcelImport(data) {
  return request({
    url: 'http://test.txsqtech.com/index/Household/excelImport',
    method: 'post',
    data
  })
}
// 上传人脸

export function postFace(data) {
  console.log(data, '上传人脸参数')
  return request({
    url: 'http://test.txsqtech.com/index/Household/Face',
    method: 'post',
    data
  })
}
// 历史住户
export function postHistory(data) {
  console.log(data, '上传人脸参数')
  return request({
    url: 'http://test.txsqtech.com/index/Household/history',
    method: 'post',
    data
  })
}
// 变更
export function postChange(data) {
  // console.log(data, '上传人脸参数')
  return request({
    url: 'http://test.txsqtech.com/index/Household/change',
    method: 'post',
    data
  })
}
// 查看人脸是否上传成功
export function postSelect(data) {
  console.log(data, '上传人脸参数')
  return request({
    url: 'http://test.txsqtech.com/index/Household/Select',
    method: 'post',
    data
  })
}
// 修改住户
export function postUpdete(data) {
  console.log(data, '修改住户参数')
  return request({
    url: 'http://test.txsqtech.com/index/Household/updete',
    method: 'post',
    data
  })
}
// 修改人脸

export function postFaces(data) {
  console.log(data, '修改住户参数')
  return request({
    url: 'http://test.txsqtech.com/index/Household/Faces',
    method: 'post',
    data
  })
}
