import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import { removeToken } from '@/utils/auth'
import '@/icons' // icon

export const eventBus = new Vue()
// import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import * as mock from '../mock'
if (process.env.NODE_ENV === 'production') {
  mock.mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, {
  locale
})

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  console.log('进入beforeEach')
  if (to.meta.toClearLocalStorage) {
    removeToken()
    localStorage.clear()
  }
  if (to.meta.isToken) {
    if (store.state.userInfo) {
      // if (JSON.parse(localStorage.getItem('replaceRouteList'))) {
      //   store.commit('permission/CLEAR_MENU')
      //   store.commit('permission/CLEAR_PERMISSION')
      //   console.log('FETCH_PERMISSION111', store.state.permission.permissionList)
      // if (!store.state.permission.permissionList) {
      //   // 如果没有permissionList
      //   console.log('opopop')
      //   console.log(store.state.permission.permissionList)
      //   store.dispatch('permission/FETCH_PERMISSION').then(() => {
      //     next({ path: to.path })
      //   })
      // } else {
      //   if (to.path !== '/login') {
      //     next()
      //   } else {
      //     next(from.fullPath)
      //   }
      // }
      // }

      next()
    } else {
      next(
        '/login')
      // params: {
      //   from: to.path
      // })
    }
  } else {
    next()
  }
})
router.afterEach((to, from, next) => {
  // var routerList = to.matched
  // store.commit('setCrumbList', routerList)
  store.commit('permission/SET_CURRENT_MENU', to.name)
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
