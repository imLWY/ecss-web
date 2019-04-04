import Vue from 'vue'
import MyConsultComponent from './MyConsult.vue'

const MyConsult = {
  install: function(vue) {
    Vue.component('MyConsult', MyConsultComponent)
  }
}

export default MyConsult
