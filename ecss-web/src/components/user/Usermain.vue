<template>
  <div class="main-content">
    <component
      :is="main_key"
      @edit_account_event="handleEditAccountEvent"
      @my_order_event="handleMyOrderEvent"
      @order_manage_event="handleOrderManageEvent"
      @store_regist_success="storeRegistSuccess"/>
      <!-- <h2>{{ main_key }}</h2> -->
  </div>
</template>

<style scoped>
.main-content {
  background: #ffffff;
  padding:20px;
  box-sizing:border-box;
}

.main-content h2 {
  font-size: 32px;
  color: #333333;
}
</style>

<script>
import AccountView from '../account/AccountView.vue'
import PersonView from '../account/PersonView.vue'
import ShortMsg from '../account/ShortMsg.vue'
import Friends from '../account/Friends.vue'
import Payment from '../account/Payment.vue'

import MyOrder from '../buyer/MyOrder.vue'
import MyConsult from '../buyer/MyConsult.vue'
import MyCollect from '../buyer/MyCollect.vue'
import MyAddress from '../buyer/MyAddress.vue'
import MyCoupon from '../buyer/MyCoupon.vue'

import GoodsManage from '../seller/GoodsManage.vue'
import ConsultManage from '../seller/ConsultManage.vue'
import GcategoryManage from '../seller/GcategoryManage.vue'
import OrderManage from '../seller/OrderManage.vue'
import StoreManage from '../seller/StoreManage.vue'
import TempletManage from '../seller/TempletManage.vue'
import PayModeManage from '../seller/PayModeManage.vue'
import ExpressModeManage from '../seller/ExpressModeManage.vue'
import NavigationManage from '../seller/NavigationManage.vue'
import ParterManage from '../seller/ParterManage.vue'
import CouponManage from '../seller/CouponManage.vue'

import StoreRegist from '../seller/StoreRegist.vue'

export default {
  name: 'Usermain',
  components: {
    AccountView,
    PersonView,
    ShortMsg,
    Friends,
    Payment,
    MyOrder,
    MyConsult,
    MyCollect,
    MyAddress,
    MyCoupon,
    GoodsManage,
    ConsultManage,
    GcategoryManage,
    OrderManage,
    StoreManage,
    TempletManage,
    PayModeManage,
    ExpressModeManage,
    NavigationManage,
    ParterManage,
    CouponManage,
    StoreRegist
  },
  props: {
    main_key: {
      type: String,
      default: 'AccountView'
    }
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    storeRegistSuccess: function(data) {
      this.$emit('store_regist_success', data)
    },
    handleEditAccountEvent: function(param) {
      console.log('usermain: ' + param)
      this.$emit('edit_account_event', param)
    },
    handleMyOrderEvent: function(param) {
      this.$emit('my_order_event', param)
    },
    handleOrderManageEvent: function(param) {
      this.$emit('order_manage_event', param)
    }
  }
}
</script>
