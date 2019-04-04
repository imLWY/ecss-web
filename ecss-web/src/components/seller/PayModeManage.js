import Vue from 'vue'
import PayModeManageComponent from './PayModeManage.vue'

const PayModeManage = {
  install: function(vue) {
    Vue.component('PayModeManage', PayModeManageComponent)
  }
}

export default PayModeManage
