import Vue from 'vue'
import UsermainComponent from './Usermain.vue'

const Usermain = {
  install: function(vue) {
    Vue.component('Usermain', UsermainComponent)
  }
}

export default Usermain
