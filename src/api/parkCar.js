import req from '@/utils/request_axios'

//新增车位类型
export const addPark = params => req.post('/index/v1.Cartype/car_type_add', params);
//车位类型列表
export const parkList = params => req.post('/index/v1.Cartype/car_type_list', params);
//修改车位类型
export const modifyPark = params => req.post('/index/v1.Cartype/car_type_update', params);
//操作记录
export const operatingRecord = params => req.post('/index/v1.Cartype/record_list', params);