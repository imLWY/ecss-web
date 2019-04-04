import Vue from 'vue'
import AccountViewComponent from './AccountView.vue'

const AccountView = {
  install: function(vue) {
    Vue.component('AccountView', AccountViewComponent)
  }
}

export default AccountView
