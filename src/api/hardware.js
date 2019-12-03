import request from '@/utils/request'
import QS from 'qs'
//硬件管理
// ++++++++++++++++++++++++++++++++++
// 查询门岗列表
export function postDoorList (data) {
  // console.log(data,'doorlist需要的参数')
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/index/v1.door/door_list',
    method: 'post',
    data: QS.stringify(data)
  })
}
//新增门岗
export function postDoorAdd (data) {
  return request({
    url: '/index/v1.door/door_add',
    method: 'post',
    data
  })
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//参数设置
export function postSettingadd (data) {
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: 'index/v1.setting/setting_add',
    method: 'post',
    data: QS.stringify(data)
  })
}
// 修改++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//主副停车场参数输出
export function postSetInfo (data) {
  // console.log(data, '修改摄像头状态小串的参数')
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/index/v1.setting/setInfo',
    method: 'post',
    data: QS.stringify(data)
  })
}
//包月入口提示语言
export function postMonthly (data) {
  // console.log(data, '修改摄像头状态小串的参数')
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/index/v1.setting/monthly',
    method: 'post',
    data: QS.stringify(data)
  })
}
//包月出口提示语言
export function postMonthlyOut (data) {
  // console.log(data, '修改摄像头状态小串的参数')
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/index/v1.setting/monthly_out',
    method: 'post',
    data: QS.stringify(data)
  })
}
//非包月车辆入口
export function postNonMonthly (data) {
  // console.log(data, '修改摄像头状态小串的参数')
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/index/v1.setting/non_monthly',
    method: 'post',
    data: QS.stringify(data)
  })
}
// 非包月车辆出口
export function postNonMonthlyOut (data) {
  // console.log(data, '修改摄像头状态小串的参数')
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/index/v1.setting/non_monthly_out',
    method: 'post',
    data: QS.stringify(data)
  })
}
//修改停车场(修改全部)
export function postSetupdateAll (data) {
  // console.log(data, '修改摄像头状态小串的参数')
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/index/v1.setting/setting_update',
    method: 'post',
    data: QS.stringify(data)
  })
}
//基础设置修改
export function postSetupdateBasis (data) {
  // console.log(data, '修改摄像头状态小串的参数')
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/index/v1.setting/basis',
    method: 'post',
    data: QS.stringify(data)
  })
}
//开闸管理修改
export function postSetupdateBrake (data) {
  // console.log(data, '修改摄像头状态小串的参数')
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/index/v1.setting/brake',
    method: 'post',
    data: QS.stringify(data)
  })
}
// 收费修改
export function postSetupdatePrice (data) {
  // console.log(data, '修改摄像头状态小串的参数')
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/index/v1.setting/park_priceset',
    method: 'post',
    data: QS.stringify(data)
  })
}
//led设置修改
export function postSetupdateLed (data) {
  // console.log(data, '修改摄像头状态小串的参数')
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/index/v1.setting/led_update',
    method: 'post',
    data: QS.stringify(data)
  })
}
// 以上为参数修改修改++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//摄像头列表
export function postCameraList (data) {
  // console.log(data, '摄像头列表response的参数')
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/index/v1.door/camera_list',
    method: 'post',
    data: QS.stringify(data)
  })
}
//添加摄像头里面的门岗数据
export function postDoorListId (data) {
  // console.log(data, 'postDoorListId')
  return request({
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    url: '/index/v1.door/door_list_info',
    method: 'post',
    data
  })
}
//新增摄像头
export function postCamerAdd (data) {
  // console.log(data, '添加摄像头的参数')
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/index/v1.door/camer_add',
    method: 'post',
    data: QS.stringify(data)
  })
}
//启用摄像头
//禁用摄像头
export function postCamerType (data) {
  // console.log(data, '修改摄像头状态小串的参数')
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/index/v1.door/camera_type',
    method: 'post',
    data: QS.stringify(data)
  })
}
//修改摄像头
export function postCameraUpdate (data) {
  // console.log(data, '修改摄像头状态小串的参数')
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/index/v1.door/camera_update',
    method: 'post',
    data: QS.stringify(data)
  })
}
//传入二维码
export function postCameraCode (data) {
  // console.log(data, '修改摄像头状态小串的参数')
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/index/v1.door/camer_code',
    method: 'post',
    data: QS.stringify(data)
  })
}
//副参数列表输出
export function postBindingCar (data) {
  // console.log(data, '修改摄像头状态小串的参数')
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/index/v1.setting/binding_car',
    method: 'post',
    data: QS.stringify(data)
  })
}