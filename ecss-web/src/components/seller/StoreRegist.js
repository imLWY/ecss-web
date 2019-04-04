import Vue from 'vue'
import StoreRegistComponent from './StoreRegist.vue'

const StoreRegist = {
  install: function(vue) {
    Vue.component('StoreRegist', StoreRegistComponent)
  }
}

export default StoreRegist
