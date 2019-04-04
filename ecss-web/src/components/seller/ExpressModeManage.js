import Vue from 'vue'
import ExpressModeManageComponent from './ExpressModeManage.vue'

const ExpressModeManage = {
  install: function(vue) {
    Vue.component('ExpressModeManage', ExpressModeManageComponent)
  }
}

export default ExpressModeManage
