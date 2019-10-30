/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import cooperationRouter from './modules/cooperation'
import houseInfoRouter from './modules/houseInfo'
import accountInfoRouter from './modules/accountInfo'
import entranceRouter from './modules/entranceguard'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'
// import cooperationRouter from './modules/cooperation'
// import houseInfoRouter from './modules/houseInfo'
// import accountInfoRouter from './modules/accountInfo'

const dashboard = () => import('@/views/dashboard/index')
//首页和登录和一些不用权限的公共页面
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/login',
    hidden: true,
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      hidden: true,
      component: dashboard,
      // meta: { title: '', icon: 'logo' }
      meta: {
        title: '首页111',
        icon: 'home3',
        isToken: true
      }
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: {
      toClearLocalStorage: true
    }
  },
  {
    path: '/loginretripwd',
    component: () => import('@/views/loginretripwd/index'),
    hidden: true,
    meta: {
      toClearLocalStorage: true
    }
  },
  {
    path: '/loginresetpwd',
    component: () => import('@/views/loginresetpwd/index'),
    hidden: true,
    meta: {
      toClearLocalStorage: true
    }
  },
  {
    path: '/loginenternewpwd',
    component: () => import('@/views/loginenternewpwd/index'),
    hidden: true,
    meta: {
      toClearLocalStorage: true
    }
  },
  {
    path: '/loginentermore',
    component: () => import('@/views/loginentermore/index'),
    hidden: true,
    meta: {
      toClearLocalStorage: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/views/Pay/index'),
    hidden: true,
    meta: {
      isToken: true
    },
  },
  {
    path: '/wyinvoice',
    name: 'wyinvoice',
    component: () => import('@/views/WyInvoice.vue/index'),
    hidden: true,
    meta: {
      isToken: true
    }
  },
  {
    path: '/community',
    component: () => import('@/views/community/index'),
    hidden: true,
    meta: {
      isToken: true
    }
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/login', hidden: true },
  //asyncRouterMap————————————————————————————————————————
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
  entranceRouter,
  {
    path: '/account/Jurisdiction',
    name: 'Jurisdiction',
    hidden: true,
    component: () => import('@/views/Account/Jurisdiction/index'),
    meta: { title: '权限管理', auth_id: 7 },
    redirect: '/account/Jurisdiction/EditAccount',
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
    path: '/account/Jurisdiction/AccountManage',
    name: 'AccountManage',
    hidden: true,
    component: () => import('@/views/Account/AccountManage/index'),
    meta: { title: '账号管理', auth_id: 8 }
  },
  {
    path: '/account/Jurisdiction/AccountAudit',
    name: 'AccountAudit',
    hidden: true,
    component: () => import('@/views/Account/AccountAudit/index'),
    meta: { title: '账号审核', auth_id: 9 }
  }
]
// 需要权限的动态路由
export const asyncRouterMap = [
  {
    path: '',
    component: Layout,
    name: 'container',
    redirect: '/login',
    children: [
      // {
      //   path: 'dashboard',
      //   component: () => import('@/views/dashboard/index'),
      //   name: 'dashboard',
      //   redirect: '/dashboard',
      //   meta: {
      //     title: '首页',
      //     icon: 'home3',
      //     auth_id: 1
      //   }
      // },
      // houseInfoRouter
      // {
      //   path: '/car',
      //   component: Layout,
      //   // hidden: true,
      //   children: [
      //     {
      //       path: 'index',
      //       name: 'car',
      //       component: () => import('@/views/Car/index'),
      //       meta: {
      //         title: '车位信息',
      //         icon: 'car3'
      //       }
      //     }
      //   ]
      // },

    ]
  }
];


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
// router.beforeEach((to, from, next) => {
//   console.log(to, 'to')
//   console.log(from, 'from')
//   next()
// })
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
