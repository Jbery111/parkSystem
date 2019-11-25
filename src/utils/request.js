import axios from 'axios'
// import { Message } from 'element-ui'
import store from '@/store'
import Vue from 'vue'
import { getToken, removeToken } from '@/utils/auth'
import router from '../router/index'
// axios.defaults.headers.common['token'] = 'eyJ1aWQiOjEsImlwIjoiMjIwLjE2Ni4yMzguMjI5In0'
const service = axios.create({
  baseURL: 'http://2761m20f15.zicp.vip/', // url = base url + request url
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
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
    // const localItems = JSON.parse(localStorage.getItem('items'))
    // const id1 = localItems.id
    console.log(router,'1222222222222222222222222222')
    // console.log(id1,getToken(),'llllllllllllllllllllloooooocafdfds')
    if(getToken()) {
      const localItems = JSON.parse(localStorage.getItem('items'))
      if(localItems) {
        const id1 = localItems.id
        console.log(id1,'+++++++++++++++++++++++++++++++++++')
        config.headers['token'] = store.getters.token
        config.headers['park_id'] = id1
      }else {
        const LocalInfo = JSON.parse(localStorage.getItem('userInfo'))
        const id2 = LocalInfo.data.Communityid
        console.log(id2,'+++++++++++++++++++++++++++++++++++')
        config.headers['token'] = store.getters.token
        config.headers['park_id'] = id2
      }
    }else {
      const obj = {}
      for (const i in config.headers) {
        if (i !== 'token') {
          obj[i] = config.headers[i]
        }
      } // 这里没用
      config.headers = obj
    }
    // if (getToken()) {
    //   console.log(store.getters.token, 'store.getters.token')
    //   config.headers['token'] = store.getters.token
    //     //  config.header['park_id'] = 
    // } else {
    //   const obj = {}
    //   for (const i in config.headers) {
    //     if (i !== 'token') {
    //       obj[i] = config.headers[i]
    //     }
    //   } // 这里没用
    //   config.headers = obj
    // }
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
