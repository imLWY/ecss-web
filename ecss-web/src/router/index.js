import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import HelloWorld from '@/components/HelloWorld'
import LoginMall from '@/components/login/Login'
import LoginInterface from '@/components/login/LoginInterface'
import Home from '@/components/home/Home'
import LoadingPage from '@/components/common/LoadingPage'
import User from '@/components/user/User'
import MyShop from '@/components/myShop/MyShop'
import Goods_buy from '@/components/myshopDetail/Goods_buy'
import BuyOrder from '@/components/myshopDetail/BuyOrder'
import SearchResult from '@/components/home/SearchResult'
import VideoDetail from '@/components/home/VideoDetail'
import MyOrderDetail from '@/components/seller/MyOrderDetail'
import myGoodscar from '@/components/myshopDetail/myGoodscar'
import SearchStore from '@/components/home/SearchStore'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      components: {
        hello: HelloWorld
      },
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/home',
      name: 'Home',
      components: {
        home: Home
      },
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/loginMall',
      name: 'LoginMall',
      components: {
        loginMall: LoginMall
      },
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/login',
      name: 'LoginInterface',
      components: {
        logininterface: LoginInterface
      },
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/loading',
      name: 'LoadingPage',
      components: {
        loading: LoadingPage
      },
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/user',
      name: 'User',
      components: {
        user: User
      },
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/myShop',
      name: 'MyShop',
      components: {
        myShop: MyShop
      },
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/buy',
      name: 'Goods_buy',
      components: {
        goods_buy: Goods_buy
      },
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/buyOrder',
      name: 'BuyOrder',
      components: {
        buyOrder: BuyOrder
      },
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/search',
      name: 'SearchResult',
      components: {
        searchResult: SearchResult
      },
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/searchStore',
      name: 'SearchStore',
      components: {
        searchStore: SearchStore
      },
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/video',
      name: 'VideoDetail',
      components: {
        videoDetail: VideoDetail
      },
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/orderDetail',
      name: 'MyOrderDetail',
      components: {
        myOrderDetail: MyOrderDetail
      },
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/myShopCar',
      name: 'myGoodscar',
      components: {
        myGoodscar: myGoodscar
      },
      meta: {
        requireAuth: false
      }
    }
  ]
})
