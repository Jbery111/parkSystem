const mutations = {
  setUserInfo: (state, info) => {
    state.userInfo = info
  },
  removeUserInfo: (state) => {
    state.userInfo = ''
    console.log(state, 'removeUserInforemoveUserInfo')
  },
  isWyCover1: (state) => {
    state.hasWyCover1 = !state.hasWyCover1
  },
  isWyCover2: (state) => {
    state.hasWyCover2 = !state.hasWyCover2
  },
  isWyCoverAll: (state) => {
    state.hasWyCoverAll = !state.hasWyCoverAll
  },
  replaceUserInfoData: (state, dataInfo) => {
    state.userInfo.data = dataInfo
    // console.log('state.userInfo.data is' + JSON.stringify(state.userInfo.data))
  },
  replaceUserInfoList: (state, listInfo) => {
    state.userInfo.list = listInfo
    // console.log('state.userInfo.data is' + JSON.stringify(state.userInfo.data))
  },
  setMealInfoHandler: (state, mealInfo) => {
    state.setMealInfo = mealInfo
  },
  setYearInfo: (state, yearInfo) => {
    state.setYearInfo = yearInfo
  },
  // 存储二维码
  setQrInfoHandler: (state, qrInfo) => {
    // console.log(qrInfo)
    state.setQrInfo = qrInfo
  },
  // 到期时间存储
  setDueToTheTime: (state, timeInfo) => {
    state.dueToTheTime = timeInfo
  },
  // 生成二级路由
  setRouterAsync: (state, routerInfo) => {
    state.secondRouterLists = routerInfo
  },
  // 清空二级路由
  clearRouterAsync: (state) => {
    state.secondRouterLists = null
  }
}
export default mutations
