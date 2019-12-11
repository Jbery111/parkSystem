import req from '@/utils/request_axios'

// 新增车位类型
export const addPark = params => req.post('/index/v1.Cartype/car_type_add', params)
// 车位类型列表
export const parkList = params => req.post('/index/v1.Cartype/car_type_list', params)
// 修改车位类型
export const modifyPark = params => req.post('/index/v1.Cartype/car_type_update', params)
// 操作记录
export const operatingRecord = params => req.post('/index/v1.Cartype/record_list', params)

//新增特殊车辆
export const addspecialcar = params => req.post('/index/v1.Cartype/vehicle_add', params)
//特殊车辆列表
export const specialcarlist = params => req.post('/index/v1.Cartype/vehicle_list', params)
//修改特殊车辆
export const amendcarlist = params => req.post('/index/v1.Cartype/vehicle_update', params)
//删除
export const deletecar = params => req.post('/index/v1.Cartype/vehicle_del', params)
//搜索
export const searchList = params => req.post('/index/v1.Cartype/vehicle_search', params)
//启用和禁用
export const startusing = params => req.post('/index/v1.Cartype/vehicle_state', params)

