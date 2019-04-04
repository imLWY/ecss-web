import NavigationComponents from './Navigation.vue'
import Vue from 'vue'

const Navigation = {
  install: function() {
    Vue.component('Navigation', NavigationComponents)
  }
}

export default Navigation
