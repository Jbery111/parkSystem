import Layout from '@/layout'
import parkManageRouter from './modules/parkManage'
import incomeRouter from './modules/income'
import accountInfoRouter from './modules/accountInfo'
import parkconcessionRouter from './modules/parkconcession'
import carmanageRouter from './modules/carmanage'
import qrcodeChargeRouter from './modules/qrcodeCharge'
import statisticInfoRouter from './modules/statisticInfo'
import hardwareRouter from './modules/hardware'
// const dashboard = () => import('@/views/dashboard/index')
/* 需要权限判断的路由 */
const dynamicRoutes = [
  {
    path: '/dashboard',
    component: Layout,
    name: 'dashboard',
    meta: {
      title: '首页',
      icon: 'home3',
      isToken: true,
      auth_id: 1
    }
  },
  {
    path: '/charge',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'charge',
        component: () => import('@/views/Charge/index'),
        meta: {
          title: '物业收费',
          icon: 'wycharge3'
        }
      }
    ]
  },
  incomeRouter,
  {
    path: '/car',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'car',
        component: () => import('@/views/Car/index'),
        meta: {
          title: '车位信息',
          icon: 'car3'
        }
      }
    ]
  },
  // 合作企业
  parkManageRouter,
  // 账号分配
  parkconcessionRouter,
  // 车辆车位管理
  carmanageRouter,
  qrcodeChargeRouter,
  statisticInfoRouter,
  hardwareRouter,
  accountInfoRouter
]

export default dynamicRoutes
