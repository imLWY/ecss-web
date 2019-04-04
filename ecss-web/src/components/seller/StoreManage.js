import Vue from 'vue'
import StoreManageComponent from './StoreManage.vue'

const StoreManage = {
  install: function(vue) {
    Vue.component('StoreManage', StoreManageComponent)
  }
}

export default StoreManage
