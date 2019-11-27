import axios from 'axios'
// import { Message } from 'element-ui'
import store from '@/store'
import Vue from 'vue'
import { getToken, removeToken } from '@/utils/auth'
import router from '../router/index'
import QS from 'qs' // 引入qs模块，用来序列化post类型的数据

const service = axios.create({
  baseURL: 'http://park.txsqtech.com', // url = base url + request url
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // },

  timeout: 5000 // request timeout
})
// const _post = (url, params) => {
//   return service.post(url, QS.stringify(params))
// }
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
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
    
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if (getToken()) {
      config.headers['token'] = store.getters.token
        // config.headers['token'] = 'eyJ1aWQiOjM1NCwiaXAiOjE1NzQ4NDczNDd9'
        config.headers['parkid'] = 15
    } else {
      const obj = {}
      for (const i in config.headers) {
        if (i !== 'token') {
          obj[i] = config.headers[i]
        }
      } // 这里没用
      config.headers = obj
    }
    console.log(config,'config')
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
      alert(res.code)
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
