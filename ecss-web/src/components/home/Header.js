import HeaderComponent from './Header.vue'
import Vue from 'vue'

const Header = {
  install: function(vue) {
    Vue.component('Header', HeaderComponent)
  }
}

export default Header
