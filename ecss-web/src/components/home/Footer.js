import FooterComponent from './Footer.vue'
import Vue from 'vue'

const Footer = {
  install: function(vue) {
    Vue.component('Footer', FooterComponent)
  }
}

export default Footer
