import Vue from 'vue'
import GcategoryManageComponent from './GcategoryManage.vue'

const GcategoryManage = {
  install: function(vue) {
    Vue.component('GcategoryManage', GcategoryManageComponent)
  }
}

export default GcategoryManage
