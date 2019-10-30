// eslint-disable-next-line no-unused-vars
const state = {
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || '',
  userInfoData: JSON.parse(localStorage.getItem('replcaeData')) || '',
  isWyCover2: false,
  hasWyCover1: false,
  isWyCoverAll: false,
  setMealInfo: {},
  setYearInfo: {},
  setQrInfo: {},
  // 提示小区还有多久到期
  dueToTheTime: null,
  secondRouterLists: []
}
export default state
