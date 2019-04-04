import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

import axios from 'axios'
import VueAxios from 'vue-axios'
import global_ from './components/config/Global.js'
import Api from './components/config/Api.js'
import Lwy from './components/config/Lwy.js'
import Yjj from './components/config/Yjj.js'
import Lxy from './components/config/Lxy.js'
import Jcx from './components/config/Jcx.js'
import Zxy from './components/config/Zxy.js'
// 生产环境删除
// import MockData from '../mock/mock.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Header from './components/home/Header.js'
import Footer from './components/home/Footer.js'
import Navigation from './components/user/Navigation.js'

Vue.config.productionTip = false
Vue.use(Vuex)

Vue.prototype.GLOBAL = global_
Vue.prototype.$Api = Api
Vue.prototype.$Lwy = Lwy
Vue.prototype.$Yjj = Yjj
Vue.prototype.$Lxy = Lxy
Vue.prototype.$Jcx = Jcx
Vue.prototype.$Zxy = Zxy
// 生产环境启用
axios.defaults.baseURL = global_.BASE_URL
axios.interceptors.request.use(config => {
  config.headers['Authentication'] = sessionStorage.getItem('token')
  return config
}, error => {
  return Promise.reject(error)
})

Vue.use(VueAxios, axios)
// 生产环境删除
// Vue.use(MockData)

Vue.use(ElementUI)

// Vue.use(HomeFrame);
Vue.use(Header)
// Vue.use(Userside)
// Vue.use(Usermain)
Vue.use(Footer)
Vue.use(Navigation)

var store = new Vuex.Store({
  state: {
    token: '',
    userId: -1,
    isSeller: 0,
    shopCarGoodsNumber: 0
  },
  mutations: {
    saveToken(state, token) {
      sessionStorage.setItem('token', token)
      state.token = token
    },
    removeToken(state, token) {
      sessionStorage.removeItem('token', token)
      state.token = ''
    },
    saveUserId(state, userId) {
      sessionStorage.setItem('userId', userId)
      state.userId = userId
    },
    removeUserId(state, userId) {
      sessionStorage.removeItem('userId', userId)
      state.userId = userId
    },
    saveIsSeller(state, isSeller) {
      sessionStorage.setItem('isSeller', isSeller)
      state.isSeller = isSeller
    },
    removeIsSeller(state, isSeller) {
      sessionStorage.removeItem('isSeller', isSeller)
      state.isSeller = isSeller
    },
    saveShopCarGoodsNumber(state, shopCarGoodsNumber) {
      sessionStorage.setItem('shopCarGoodsNumber', shopCarGoodsNumber)
      state.shopCarGoodsNumber = shopCarGoodsNumber
    },
    removeShopCarGoodsNumber(state, shopCarGoodsNumber) {
      sessionStorage.removeItem('shopCarGoodsNumber', shopCarGoodsNumber)
      state.shopCarGoodsNumber = 0
    }
  }
})

router.beforeEach((to, from, next) => {
  store.state.token = sessionStorage.getItem('token')
  store.state.isSeller = sessionStorage.getItem('isSeller')
  store.state.userId = sessionStorage.getItem('userId')

  if (to.meta.requireAuth) {
    if (store.state.token != null && store.state.token !== '') {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

const ecss = new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})

Vue.use({
  ecss
})
