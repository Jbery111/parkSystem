import axios from 'axios'
// import { Message } from 'element-ui'
import store from '@/store'
import qs from 'qs'
import { getToken, removeToken } from '@/utils/auth'
import router from '../router/index'
axios.create({
  baseURL: 'http://www.parking.com', // url = base url + request url
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  // },

  timeout: 5000 // request timeout
})
// const _post = (url, params) => {
//   return service.post(url, QS.stringify(params))
// }
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// request interceptor
axios.interceptors.request.use(
  config => {
    // config.data = QS.stringify(config.data)
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
    // console.log(config, 'config')
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
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

// 导出两个方法
export default {
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, { params })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  post(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, qs.stringify(params))
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
