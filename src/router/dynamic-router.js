import Layout from '@/layout'
import cooperationRouter from './modules/cooperation'
import houseInfoRouter from './modules/houseInfo'
import accountInfoRouter from './modules/accountInfo'
import entranceRouter from './modules/entranceguard'
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
  houseInfoRouter,
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
  cooperationRouter,
  // 账号分配
  accountInfoRouter,
  entranceRouter
]

export default dynamicRoutes
