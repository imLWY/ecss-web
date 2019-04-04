import Vue from 'vue'
import NavigationManageComponent from './NavigationManage.vue'

const NavigationManage = {
  install: function(vue) {
    Vue.component('NavigationManage', NavigationManageComponent)
  }
}

export default NavigationManage
