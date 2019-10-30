const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => {
    return state.userInfo ? state.userInfo.token : null
  }
  // avatar: state => state.user.avatar,
  // name: state => state.user.name
}
export default getters
