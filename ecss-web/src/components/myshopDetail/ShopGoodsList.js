import Vue from 'vue'
import ShopGoodsListComponent from './ShopGoodsList.vue'

const ShopGoodsList = {
  install: function(vue) {
    Vue.component('ShopGoodsList', ShopGoodsListComponent)
  }
}

export default ShopGoodsList
