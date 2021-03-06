import Layout from '@/layout'
// 停车场管理路由表
var pathR = '/parkmanage/'
const userInfoDatas = JSON.parse(localStorage.getItem('userInfo'))
if (userInfoDatas) {
  const routerLists = userInfoDatas.list
  if (routerLists) {
    routerLists.forEach(item => {
      if (item.auth_name === '停车场管理') {
        if (item.zi.length) {
          const ziRoutes = item.zi
          pathR += ziRoutes[0].auth_a
        }
      }
    })
  }
}

const parkManageRouter = {
  path: '/parkmanage',
  component: Layout,
  hidden: false,
  name: 'parkmanage',
  redirect: pathR,
  meta: {
    title: '停车场管理',
    icon: 'tccgl',
    auth_id: 53
  },
  children: [
    {
      path: 'SetParams',
      hidden: true,
      name: 'SetParams',
      component: () => import('@/views/ParkManage/SetParams/index'),
      meta: { title: '参数设置', auth_id: 60 }
    },
    {
      path: 'PastSet',
      hidden: true,
      name: 'PastSet',
      component: () => import('@/views/ParkManage/PastSet/index'),
      meta: { title: '门岗设置', auth_id: 61 }
    },
    {
      path: 'CameraManage',
      hidden: true,
      name: 'CameraManage',
      component: () => import('@/views/ParkManage/CameraManage/index'),
      meta: { title: '摄像头管理', auth_id: 62 }
    },
    {
      path: 'MonthList',
      hidden: true,
      name: 'MonthList',
      component: () => import('@/views/ParkManage/MonthList/index'),
      meta: { title: '包月列表', auth_id: 63 }
    },
    {
      path: 'carType',
      hidden: true,
      name: 'carType',
      component: () => import('@/views/ParkManage/CarType/Index'),
      meta: { title: '车位类型', auth_id: 77 }
    },
    {
      path: 'specialVehicle',
      hidden: true,
      name: 'specialVehicle',
      component: () => import('@/views/ParkManage/specialVehicle/Index'),
      meta: { title: '特殊车辆', auth_id: 78 }
    },
    {
      path: 'Parklists',
      hidden: true,
      name: 'Parklists',
      component: () => import('@/views/ParkManage/Parklists/index'),
      meta: { title: '车位列表', auth_id: 82 }
    }
  ]
}
export default parkManageRouter
