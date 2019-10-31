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
