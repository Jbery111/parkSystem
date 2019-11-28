import request from '@/utils/request'
//硬件管理
// ++++++++++++++++++++++++++++++++++
// 查询门岗列表
export function postDoorList(data) {
  console.log(data,'doorlist需要的参数')
  
  return request({
  //     headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // },
    url: '/index/v1.door/door_list',
    method: 'post',
    data
  })
}
//新增门岗
export function postDoorAdd(data) {
    return request({
      url: '/index/v1.door/door_add',
      method: 'post',
      data
    })
  }

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//参数设置
export function postSettingadd(data) {
  return request({
  //   headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // },
    url: 'index/v1.setting/setting_add',
    method: 'post',
    data
  })
}