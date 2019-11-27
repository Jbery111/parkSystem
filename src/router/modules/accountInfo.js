import Layout from '@/layout'
// import store from '@/store'
// console.log(store, '56565656565')
// 账号分配路由列表
var pathR = '/account/'
const userInfoDatas = JSON.parse(localStorage.getItem('userInfo'))
// console.log(userInfoDatas, 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq')
if (userInfoDatas) {
  // console.log(userInfoDatas, '路由')
  const routerLists = userInfoDatas.list
  if (routerLists) {
    routerLists.forEach(item => {
      if (item.auth_name === '账号分配') {
        if (item.zi.length) {
          const ziRoutes = item.zi
          pathR += ziRoutes[0].auth_a
        }
      }
    })
  }
}

const accountInfoRouter = {
  path: '/account',
  component: Layout,
  name: 'account',
  redirect: pathR,
  meta: {
    title: '账号分配',
    icon: 'account3',
    auth_id: 6
    // icon: 'user'
  },
  children: [
    {
      path: 'Jurisdiction',
      name: 'Jurisdiction',
      hidden: true,
      component: () => import('@/views/Account/Jurisdiction/EditAccount'),
      meta: { title: '权限管理', auth_id: 7 },
      // children: [
      //   {
      //     path: 'EditAccount/:id',
      //     component: () => import('@/views/Account/Jurisdiction/EditAccount'),
      //     name: 'EditAccount',
      //     meta: {
      //       title: '6666',
      //       isNoThreeShow: true,
      //       auth_id: 7
      //     }
      //   }
      // ]
      children: [{
        path: 'EditAccount',
        name: 'EditAccount',
        hidden: true,
        component: () => import('@/views/Account/Jurisdiction/EditAccount.vue'),
        meta: {
          title: '6666',
          isNoThreeShow: true,
          auth_id: 7
        }
      }]
    },
    {
      path: 'AccountManage',
      name: 'AccountManage',
      hidden: true,
      component: () => import('@/views/Account/AccountManage/index'),
      meta: { title: '账号管理', auth_id: 8 }
    },
    {
      path: 'AccountAudit',
      name: 'AccountAudit',
      hidden: true,
      component: () => import('@/views/Account/AccountAudit/index'),
      meta: { title: '账号审核', auth_id: 9 }
    }
  ]
}
export default accountInfoRouter
