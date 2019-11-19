
import router, { asyncRouterMap } from '@/router/index'
import { recursionRouter } from '@/utils/recursion-router'
import dynamicRouter from '@/router/dynamic-router'
import state1 from '../state'
export default {
  namespaced: true,
  state: {
    permissionList: null /** 所有路由 */,
    sidebarMenu: null /** 导航菜单 */,
    currentMenu: '' /** 当前active导航菜单 */
  },
  getters: {},
  mutations: {
    SET_PERMISSION(state, routes) {
      state.permissionList = routes
    },
    CLEAR_PERMISSION(state) {
      state.permissionList = null
    },
    // 生成左侧导航栏菜单
    SET_MENU(state, menu) {
      state.sidebarMenu = menu
    },
    CLEAR_MENU(state) {
      state.sidebarMenu = []
    },
    SET_CURRENT_MENU(state, currentMenu) {
      state.currentMenu = currentMenu
    }
    // FETCH_PERMISSION(state,)
  },
  actions: {
    FETCH_PERMISSION({ commit, state }) {
      // 获取后台给的权限数组
      commit('CLEAR_PERMISSION')
      console.log(state1.userInfo.Jurisdiction)
      var permissionList = []
      permissionList = state1.userInfo.list
      /*  根据权限筛选出我们设置好的路由并加入到path=''的children */
      /*  根据后台权限跟我们定义好的权限对比，筛选出对应的路由并加入到path=''的children */
      const routes = recursionRouter(permissionList, dynamicRouter)
      const MainContainer = asyncRouterMap.find(v => v.path === '')
      const mainChildren = MainContainer.children
      // console.log(mainChildren, '+++++++')
      mainChildren.filter(item => {
        console.log(item.name)
        item.name === 'dashboard'
      }
      )
      // console.log(mainChildren, '+++++++')
      const children = JSON.parse(JSON.stringify(mainChildren))

      children.push(...routes)
      console.log(MainContainer.children, children, '__________________________________------_______________')
      // children.shift()
      // // // /* 生成左侧导航菜单 */
      // commit('CLEAR_MENU')
      commit('SET_MENU', children)
      // console.log(state.sidebarMenu, 'plmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
      // setDefaultRoute([children])
      // console.log(children, 'pppppppp')

      // 二
      // const routes = recursionRouter(permissionList, dynamicRouter)
      // const MainContainer = asyncRouterMap.find(v => v.path === '')
      // const children = MainContainer.children
      // children.push(...routes)
      // console.log(children, routes, '__________________________________------_______________')
      // /* 生成左侧导航菜单 */
      // commit('CLEAR_MENU')
      // commit('SET_MENU', children)
      // console.log(children, permissionList, '/* 生成左侧导航菜单 */')
      /*
为所有有children的菜单路由设置第一个children为默认路由
主要是供面包屑用，防止点击面包屑后进入某个路由下的 '' 路由,比如/manage/
而我们的路由是
[
/manage/menu1,
/manage/menu2
]
*/
      // setDefaultRoute([children])

      /*  初始路由 */
      const initialRoutes = router.options.routes

      /*  动态添加路由 */
      // router.match = createRouter1(constantRoutes).match
      // router.addRoutes(children)
      // console.log(initialRoutes, children, '完整的路由表')
      /* 完整的路由表 */
      commit('SET_PERMISSION', [...initialRoutes, ...asyncRouterMap])
    }
  }
}
