import axios from 'axios'
// import { Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import router from '../router/index'
// axios.defaults.headers.common['token'] = 'eyJ1aWQiOjEsImlwIjoiMjIwLjE2Ni4yMzguMjI5In0'
const service = axios.create({
  // baseURL: 'http://test.txsqtech.com', // url = base url + request url
  // headers: {
  //   'Content-Type': 'application/json;charset=UTF-8'
  // },
  timeout: 5000 // request timeout
})

// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// request interceptor
service.interceptors.request.use(
  // if (window.history && window.history.pushState) {
  //   $(window).on('popstate', function () {
  //     // 当点击浏览器的 后退和前进按钮 时才会被触发，
  //     window.history.pushState('forward', null, '');
  //     window.history.forward(1);
  //   })
  // }
  // window.history.pushState('forward', null, '')
  // window.history.forward(1)
  config => {
    if (getToken()) {
      config.headers['token'] = store.getters.token
    } else {
      const obj = {}
      for (const i in config.headers) {
        if (i !== 'token') {
          obj[i] = config.headers[i]
        }
      } // 这里没用
      config.headers = obj
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    // res.code  ===  xxx mas
    window.history.forward(1)
    window.history.forward(-1)
    const res = response.data
    if (res.code === 10000) {
      console.log('删掉token')
      // localStorage.removeItem('userInfo')
      localStorage.removeItem('userInfo')
      removeToken()
      store.commit('removeUserInfo')
      window.location.href = '/'
      router.push('/')
    }
    // Message(res.mag ? res.mag : res.msg)
    return res
  }
)

export default service
