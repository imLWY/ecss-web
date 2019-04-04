import Vue from 'vue'
import ParterManageComponent from './ParterManage.vue'

const ParterManage = {
  install: function(vue) {
    Vue.component('ParterManage', ParterManageComponent)
  }
}

export default ParterManage
