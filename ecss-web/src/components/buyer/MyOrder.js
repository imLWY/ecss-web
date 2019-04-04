import Vue from 'vue'
import MyOrderComponent from './MyOrder.vue'

const MyOrder = {
  install: function(vue) {
    Vue.component('MyOrder', MyOrderComponent)
  }
}

export default MyOrder
