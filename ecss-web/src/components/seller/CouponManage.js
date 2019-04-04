import Vue from 'vue'
import CouponManageComponent from './CouponManage.vue'

const CouponManage = {
  install: function(vue) {
    Vue.component('CouponManage', CouponManageComponent)
  }
}

export default CouponManage
