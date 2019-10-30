import Layout from '@/layout'
// 门禁路由表
var pathR = '/entranceGuard/'
const userInfoDatas = JSON.parse(localStorage.getItem('userInfo'))
// console.log(userInfoDatas, 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq')
if (userInfoDatas) {
  // console.log(userInfoDatas, '路由')
  const routerLists = userInfoDatas.list
  if (routerLists) {
    routerLists.forEach(item => {
      if (item.auth_name === '门禁管理') {
        if (item.zi.length) {
          const ziRoutes = item.zi
          // console.log(ziRoutes[0].auth_a, '账号分配路由')
          pathR += ziRoutes[0].auth_a
        }
      }
    })
  }
}
const entranceRouter = {
  path: '/entranceGuard',
  component: Layout,
  name: 'entranceGuard',
  redirect: pathR,
  meta: {
    title: '门禁管理',
    icon: 'door1',
    auth_id: 50
  },
  children: [{
    path: 'communitygate',
    name: 'communitygate',
    hidden: true,
    // component:() => import('@/views/Account/Jurisdiction/EditAccount'),
    component: () => import('@/views/EntranceGuard/CommunityGate/index'),
    meta: { title: '小区大门', auth_id: 51 }
  },
  {
    path: 'BuildDoor',
    name: 'BuildDoor',
    hidden: true,
    component: () => import('@/views/EntranceGuard/BuildDoor/index'),
    meta: { title: '楼栋单元门', auth_id: 51 }
  }
  ]
}
export default entranceRouter
