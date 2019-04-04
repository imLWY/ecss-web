import Vue from 'vue'
import MyShopMainComponent from './MyShopMain.vue'

const MyShopMain = {
  install: function(vue) {
    Vue.component('MyShopMain', MyShopMainComponent)
  }
}

export default MyShopMain
