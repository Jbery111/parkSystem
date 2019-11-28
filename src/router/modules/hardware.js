import Layout from '@/layout'
// 硬件管理路由表
var pathR = '/hardware/'
const userInfoDatas = JSON.parse(localStorage.getItem('userInfo'))
if (userInfoDatas) {
  const routerLists = userInfoDatas.list
  if (routerLists) {
    // console.log(routerLists)
    routerLists.forEach(item => {
      if (item.auth_name === '硬件管理') {
        if (item.zi.length) {
          const ziRoutes = item.zi
          pathR += ziRoutes[2].auth_a
        }
      }
    })
  }
}

const hardwareRouter = {
  path: '/hardware',
  component: Layout,
  hidden: false,
  name: 'hardware',
  redirect: pathR,
  meta: {
    title: '硬件管理',
    icon: 'yjgl',
    auth_id: 63
  },
  children: [
    {
      path: 'SetParamss',
      hidden: true,
      name: 'SetParamss',
      component: () => import('@/views/HardWare/SetParamss/index'),
      meta: { title: '参数设置', auth_id: 66 }
    },
    {
      path: 'PastSets',
      hidden: true,
      name: 'PastSets',
      component: () => import('@/views/HardWare/PastSets/index'),
      meta: { title: '门岗管理', auth_id: 64 }
    },

    {
      path: 'CameraManages',
      hidden: true,
      name: 'CameraManages',
      component: () => import('@/views/HardWare/CameraManages/index'),
      meta: { title: '摄像头管理', auth_id: 65 }
    },
    {
      path: 'InSet',
      hidden: true,
      name: 'InSet',
      component: () => import('@/views/HardWare/InSet/index'),
      meta: { title: '内场参数设置', auth_id: 67 }
    },

  ]
}
export default hardwareRouter
