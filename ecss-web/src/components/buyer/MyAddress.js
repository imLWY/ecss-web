import Vue from 'vue'
import MyAddressComponent from './MyAddress'

const MyAddress = {
  install: function(vue) {
    Vue.component('MyAddress', MyAddressComponent)
  }
}

export default MyAddress
