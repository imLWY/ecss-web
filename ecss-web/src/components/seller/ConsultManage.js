import Vue from 'vue'
import ConsultManageComponent from './ConsultManage.vue'

const ConsultManage = {
  install: function(vue) {
    Vue.component('ConsultManage', ConsultManageComponent)
  }
}

export default ConsultManage
