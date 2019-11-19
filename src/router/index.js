/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import parkManageRouter from './modules/parkManage'
import incomeRouter from './modules/income'
import accountInfoRouter from './modules/accountInfo'
import parkconcessionRouter from './modules/parkconcession'
import carmanageRouter from './modules/carmanage'
import qrcodeChargeRouter from './modules/qrcodeCharge'
import statisticInfoRouter from './modules/statisticInfo'
import hardwareRouter from './modules/hardware'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
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
      component: dashboard
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
  //设置参数
  {
    path: '/setparams',
    name: 'setparams',
    component: () => import('@/views/SetParams/index'),
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
  // {
  //   path: '/parkmanage',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'parkmanage',
  //       component: () => import('@/views/ParkManage/index'),
  //       meta: {
  //         title: '停车场管理',
  //         icon: 'cooper3',
  //         auth_id: 53
  //       }
  //     }
  //   ]
  // },
  {
    path: '/incomestatic',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'incomestatic',
        component: () => import('@/views/IncomeStatistics/index'),
        meta: {
          title: '收入统计',
          icon: 'cooper3',
          auth_id: 54
        }
      }
    ]
  },
  {
    path: '/parkconcession',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'parkconcession',
        component: () => import('@/views/ParkConcession/index'),
        meta: {
          title: '停车场优惠',
          icon: 'cooper3',
          auth_id: 55
        }
      }
    ]
  },
  {
    path: '/qrcodeCharge',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'qrcodeCharge',
        component: () => import('@/views/QrcodeCharge/index'),
        meta: {
          title: '二维码收费管理',
          icon: 'cooper3',
          auth_id: 57
        }
      }
    ]
  },
  {
    path: '/carmanage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'carmanage',
        component: () => import('@/views/CarManage/index'),
        meta: {
          title: '车辆车位管理',
          icon: 'cooper3',
          auth_id: 56
        }
      }
    ]
  },
  {
    path: '/statisticInfo',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'statisticInfo',
        component: () => import('@/views/statisticInfo/index'),
        meta: {
          title: '信息统计',
          icon: 'cooper3',
          auth_id: 58
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
  // 停车场管理
  parkManageRouter,
  // 账号分配
  parkconcessionRouter,
  //车辆车位管理
  carmanageRouter,
  qrcodeChargeRouter,
  statisticInfoRouter,
  hardwareRouter,
  accountInfoRouter,
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
