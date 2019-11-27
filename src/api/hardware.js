import request from '@/utils/request'
//硬件管理

// 查询门岗列表
export function postDoorList(data) {
  return request({
    url: '/index/v1.door/door_list',
    method: 'post',
    data
  })
}
//新增门岗
export function postDoorAdd(data) {
    return request({
    //   headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
      url: '/index/v1.door/door_add',
      method: 'post',
      data
    })
  }