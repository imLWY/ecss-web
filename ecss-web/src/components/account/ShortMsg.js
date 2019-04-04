import Vue from 'vue'
import ShortMsgComponent from './ShortMsg'

const ShortMsg = {
  install: function(vue) {
    Vue.component('ShortMsg', ShortMsgComponent)
  }
}

export default ShortMsg
