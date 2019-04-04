import Vue from 'vue'
import GoodsManageComponent from './GoodsManage.vue'

const GoodsManage = {
  install: function(vue) {
    Vue.component('GoodsManage', GoodsManageComponent)
  }
}

export default GoodsManage
