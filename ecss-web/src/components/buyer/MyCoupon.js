import Vue from 'vue'
import MyCouponComponent from './MyCoupon.vue'

const MyCoupon = {
  install: function(vue) {
    Vue.component('MyCoupon', MyCouponComponent)
  }
}

export default MyCoupon
