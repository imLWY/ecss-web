import Vue from 'vue'
import PaymentComponent from './Payment.vue'

const Payment = {
  install: function(vue) {
    Vue.component('Payment', PaymentComponent)
  }
}

export default Payment
