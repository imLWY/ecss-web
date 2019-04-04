import Vue from 'vue'
import MyShoplistDetailComponent from './MyShoplistDetail.vue'

const MyShoplistDetail = {
  install: function(vue) {
    Vue.component('MyShoplistDetail', MyShoplistDetailComponent)
  }
}

export default MyShoplistDetail
