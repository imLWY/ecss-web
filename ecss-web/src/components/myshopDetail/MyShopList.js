import Vue from 'vue'
import MyShopListComponent from './MyShopList.vue'

const MyShopList = {
  install: function(vue) {
    Vue.component('MyShopList', MyShopListComponent)
  }
}

export default MyShopList
