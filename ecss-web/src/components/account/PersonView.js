import Vue from 'vue'
import PersonViewComponent from './PersonView.vue'

const PersonView = {
  install: function(vue) {
    Vue.component('PersonView', PersonViewComponent)
  }
}

export default PersonView
