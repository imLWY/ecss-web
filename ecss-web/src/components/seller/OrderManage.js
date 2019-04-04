import Vue from 'vue'
import OrderManageComponent from './OrderManage.vue'

const OrderManage = {
  install: function(vue) {
    Vue.component('OrderManage', OrderManageComponent)
  }
}

export default OrderManage
