<template>
  <el-container>
    <div class="shop_fixed">
      <el-menu
        default-active="MyShopList"
        class="el-menu-vertical-demo"
        active-text-color="#f45408"
        text-color="#333333"
        unique-opened
        @open="handleOpen_shop"
        @close="handleClose_shop"
        @select="handleSelect_shop">
        <el-menu-item index="MyShopList">店铺首页</el-menu-item>
        <!-- <el-menu-item index="MyShopOther01">裤子</el-menu-item> -->
        <el-menu-item v-for="gcategory in mainGcategory" :key="gcategory.id" index="MyShopOther01">
          {{ gcategory.cateName }}
        </el-menu-item>
        <el-menu-item index="MyShopCredit">信用评价</el-menu-item>
      </el-menu>
    </div>
  </el-container>
</template>

<style>
.fonts {
  font-size: 16px;
  color: #333333;
  padding-right: 5px;
  font-weight: bold;
}
.el-col {
  width: 100%;
}
.side-title {
  height: 56px;
  width: 100%;
  line-height: 56px;
  padding-left: 20px;
  box-sizing: border-box;
  background: #f45408;
  text-align: left;
  color: #ffffff;
  font-size: 16px;
}
.el-menu {
  text-align: left;
}
.shop_fixed{
  width:1200px;
  margin-bottom:20px;
}
.shop_fixed ul{
  font-size:0;
  height:60px;
  line-height:60px;
  border-bottom:1px solid #f45408;
}
.shop_fixed ul li{
  display:inline-block;
  vertical-align:middle;
  font-size:14px;
  font-weight:700;
}
</style>

<script>
import axios from 'axios'

export default {
  name: 'MyShopSide',
  props: {
    store_id: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      mainGcategory: []
    }
  },
  mounted() {
    console.log(this.store_id)
    this.getStoreMainGcategory(this.store_id, this.$Api.storeMainGcategory.type, this.$Api.storeMainGcategory.target)
  },
  methods: {
    handleOpen_shop: function(key, keyPath) {
      // console.log('key' + key)
      // this.$emit('change_shopmenu_event', key)
    },
    handleClose_shop(key, keyPath) {
    },
    handleSelect_shop(key, keyPath) {
      this.$emit('change_shopmenu_event', key)
    },
    getStoreMainGcategory: function(storeId, type, target) {
      return new Promise((resolve, reject) => {
        console.log('storeId:' + storeId)
        axios[type](target, { 'storeId': storeId }).then(response => {
          this.mainGcategory = response.data.data
          console.log(this.mainGcategory)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    }
  }
}

</script>
