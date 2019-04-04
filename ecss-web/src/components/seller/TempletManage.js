import Vue from 'vue'
import TempletManageComponent from './TempletManage.vue'

const TempletManage = {
  install: function(vue) {
    Vue.component('TempletManage', TempletManageComponent)
  }
}

export default TempletManage
