import Vue from 'vue'
import FriendsComponent from './Friends.vue'

const Friends = {
  install: function(vue) {
    Vue.component('Friends', FriendsComponent)
  }
}

export default Friends
