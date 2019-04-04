import Vue from 'vue'
import UsersideComponent from './Userside.vue'

const Userside = {
  install: function() {
    Vue.component('Userside', UsersideComponent)
  }
}

export default Userside
