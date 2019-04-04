import Vue from 'vue'
import MyShopSideComponent from './MyShopSide.vue'

const MyShopSide = {
  install: function(vue) {
    Vue.component('MyShopSide', MyShopSideComponent)
  }
}

export default MyShopSide
