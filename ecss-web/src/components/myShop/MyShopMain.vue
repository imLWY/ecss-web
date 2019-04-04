<template>
  <div class="main-content">
    <!-- {{ main_key }} -->
    <component :is="main_key" :store_id="store_id" :good_id="good_id" :gcategory_id="gcategory_id" :gcategory_name="gcategory_name" :search_content="search_content" @shop_detail_event="handleShopDetailEvent" />
    <!-- <h2>{{ main_key }}</h2> -->
  </div>
</template>

<style scoped>
.main-content {
  background: #fff;
  padding:20px;
  box-sizing:border-box;
}

.main-content h2 {
  font-size: 32px;
  color: #333333;
}
</style>

<script>
import MyShopList from '../myshopDetail/MyShopList.vue'
import MyShopOther01 from '../myshopDetail/MyShopOther01.vue'
import MyShopCredit from '../myshopDetail/MyShopCredit.vue'
import MyShoplistDetail from '../myshopDetail/MyShoplistDetail.vue'
import Goods_buy from '../myshopDetail/Goods_buy.vue'
import ShopGoodsList from '../myshopDetail/ShopGoodsList.vue'

export default {

  components: {
    MyShopList,
    MyShopOther01,
    MyShopCredit,
    MyShoplistDetail,
    Goods_buy,
    ShopGoodsList
  },
  props: {
    main_key: {
      type: String,
      default: 'MyShopList'
    },
    store_id: {
      type: Number,
      default: -1
    },
    good_id: {
      type: Number,
      default: -1
    },
    gcategory_id: {
      type: Number,
      default: -1
    },
    gcategory_name: {
      type: String,
      default: ''
    },
    search_content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  mounted() {

  },
  methods: {
    handleShopDetailEvent: function(param, goodId) {
      // this.main_key = param
      this.$emit('shop_detail_event', param, goodId)
    }
  }
}
</script>
