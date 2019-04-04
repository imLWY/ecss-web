<template>
  <el-row class="tac">
    <el-col :span="12">
      <h2 class="side-title">用户中心</h2>
      <el-menu
        :default-active="main_key"
        class="el-menu-vertical-demo userSubnav"
        active-text-color="#f45408"
        background-color="#ffe1d3"
        text-color="#333333"
        unique-opened
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect">
        <el-submenu index="1">
          <template slot="title">
            <img src="../../../static/img/zh.png" >
            <span>我的账户</span>
          </template>
          <el-menu-item index="AccountView"><i class="fonts icon-zh_01" /><span>账户概览</span></el-menu-item>
          <el-menu-item index="PersonView"><i class="fonts icon-zh_02" /><span>个人资料</span></el-menu-item>
          <el-menu-item index="ShortMsg"><i class="fonts icon-zh_03"/><span>短信息</span></el-menu-item>
          <el-menu-item index="Friends"><i class="fonts icon-zh_04"/><span>好友</span></el-menu-item>
          <el-menu-item index="Payment"><i class="fonts icon-zh_05"/><span>我的支付通</span></el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <img src="../../../static/img/buy.png" >
            <span>我是买家</span>
          </template>
          <el-menu-item index="MyOrder"><i class="fonts icon-buy_01"/><span>我的订单</span></el-menu-item>
          <el-menu-item index="MyConsult"><i class="fonts icon-buy_02"/><span>我的咨询</span></el-menu-item>
          <el-menu-item index="MyCollect"><i class="fonts icon-buy_03"/><span>我的收藏</span></el-menu-item>
          <el-menu-item index="MyAddress"><i class="fonts icon-buy_04"/><span>我的地址</span></el-menu-item>
          <el-menu-item index="MyCoupon"><i class="fonts icon-buy_05"/><span>我的优惠卷</span></el-menu-item>
        </el-submenu>
        <el-submenu v-if="isSeller === '1'" index="3">
          <template slot="title">
            <img src="../../../static/img/sell.png" >
            <span>我是卖家</span>
          </template>
          <el-menu-item index="GoodsManage"><i class="fonts icon-sell_01" /><span>商品管理</span></el-menu-item>
          <el-menu-item index="ConsultManage"><i class="fonts icon-buy_02" /><span>咨询管理</span></el-menu-item>
          <el-menu-item index="GcategoryManage"><i class="fonts icon-sell_03" /><span>分类管理</span></el-menu-item>
          <el-menu-item index="OrderManage"><i class="fonts icon-sell_04" /><span>订单管理</span></el-menu-item>
          <el-menu-item index="StoreManage"><i class="fonts icon-sell_05" /><span>店铺设置</span></el-menu-item>
          <!-- <el-menu-item index="TempletManage"><i class="fonts icon-sell_06" /><span>我的模板</span></el-menu-item> -->
          <el-menu-item index="PayModeManage"><i class="fonts icon-zh_05" /><span>支付方式管理</span></el-menu-item>
          <el-menu-item index="ExpressModeManage"><i class="fonts icon-sell_08" /><span>配送方式管理</span></el-menu-item>
          <!-- <el-menu-item index="NavigationManage"><i class="fonts icon-sell_09" /><span>导航管理</span></el-menu-item> -->
          <el-menu-item index="ParterManage"><i class="fonts icon-sell_10" /><span>合作伙伴管理</span></el-menu-item>
          <el-menu-item index="CouponManage"><i class="fonts icon-buy_05" /><span>优惠卷管理</span></el-menu-item>
        </el-submenu>
        <el-submenu v-if="isSeller === '0' || isSeller === '2'" index="3">
          <template slot="title">
            <img src="../../../static/img/sell.png" >
            <span>我要开店</span>
          </template>
          <el-menu-item index="StoreRegist"><i class="fonts icon-buy_01" /><span>注册店铺</span></el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<style scoped>
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
.userSubnav{
  background:#fff!important;
}
.userSubnav li{
  background:#fff!important;
}
</style>

<script>
export default {
  name: 'Userside',
  props: {
    main_key: {
      type: String,
      default: 'AccountView'
    }
    // is_seller: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      isSeller: this.$store.state.isSeller
    }
  },
  mounted() {

  },
  methods: {
    /** 导航菜单控制 */
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    handleSelect(key, keyPath) {
      this.$emit('change_menu_event', key)
    }
  }
}

</script>
