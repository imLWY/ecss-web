import Vue from 'vue'
import MyCollectComponent from './MyCollect.vue'

const MyCollect = {
  install: function(vue) {
    Vue.component('MyCollect', MyCollectComponent)
  }
}

export default MyCollect
