import Vue from 'vue'
import MyShopCreditComponent from './MyShopCredit.vue'

const MyShopCredit = {
  install: function(vue) {
    Vue.component('MyShopCredit', MyShopCreditComponent)
  }
}

export default MyShopCredit
