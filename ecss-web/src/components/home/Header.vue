<template>
  <el-row :gutter="20">
    <el-col :span="16">
      <div class="grid-content bg-white">
        <div class="logo-wrap">
          <img class="logo" src="../../../static/img/logo.png" @click="gotoHome">
        </div>
        <div class="user-wrap">
          <div class="user">
            <div class="logout-icon">
              <a :title="$store.state.shopCarGoodsNumber" href="javascript:void(0);" class="shop_goodscar" @click="toShopCar">
                <!-- 购物车 -->
                <i class="fonts el-icon-goods" /><span>购物车<b>({{ $store.state.shopCarGoodsNumber }})</b></span>
              </a>
              <a href="javascript:void(0);" title="退出" class="shop_goodsout" @click="handleLogout">
                <i class="fonts icon-out" /><span>退出</span>
              </a>
            </div>
            <!-- <img class="user-photo" src="../../../static/img/person.png"> -->
            <img :src="currentUser.photo" class="user-photo">
            <el-dropdown @command="handleCommand">
              <span class="user-name">{{ currentUser.name }}<i class="el-icon-arrow-down el-icon--right"/></span>
              <el-dropdown-menu slot="dropdown" style="width:120px;text-align:center;">
                <el-dropdown-item command="1">用户中心</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <span class="user-name">{{ currentUser.name }}</span> -->
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
@import '../../../static/css/element-ui.css';

.logout-icon {
  float: left;
  height: 100%;
  padding-right: 15px;
  line-height: 80px;
  vertical-align: middle;
}

.fonts {
  font-size: 24px;
  color: #333333;
  font-weight: bold;
}

.el-row {
  margin: 0px!important;
}

.el-col {
  border-radius: 5px;
  width: 100%;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-white {
  background: #ffffff;
}

.grid-content {
  width:1200px;
  margin:0 auto;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.logo-wrap {
  height: 100%;
  line-height: 70px;
  float: left;
  vertical-align: middle;
}

.logo {
  margin-left: 5px;
  line-height: 70px;
  vertical-align: middle;
}

.logo:hover {
  cursor: pointer;
}

.user-wrap {
  height: 100%;
  float: right;
}

.user {
  margin: 0;
  height: 70px;
  display: inline-block;
}

.iconfont.icon-dengchu {
  font-size: 32px;
  color: black;
  line-height: 70px;
  vertical-align: middle;
  margin-right: 5px;
}

.user-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  line-height: 70px;
  vertical-align: middle;
}

span {
  font-size: 14px;
  color: black;
  line-height: 70px;
  vertical-align: middle;
  margin-left: 5px;
}

.search-content {
  height: 96px;
  margin: 0;
  padding: 0;
}

.el-dropdown-menu.el-popper .el-dropdown-menu__item:hover {
  color: #ff854b;
  background-color: rgb(255, 225, 211);
}
.shop_goodscar,.shop_goodsout{
  padding-left:20px;
  display:inline-block;
  vertical-align:middle;
  height:70px;
  line-height:70px;
  margin-top:-10px;
}
.shop_goodscar i,.shop_goodsout i{
  color:#ff854b;
  font-size:20px;
  font-weight:400;
}
.shop_goodsout i{
  color:#666;
}
.shop_goodscar i,.shop_goodscar span{
  vertical-align:middle;
}
.shop_goodsout i,.shop_goodsout span{
  vertical-align:middle;
}
.shop_goodscar span{
  font-size:14px;
  color:#666;
}
.shop_goodscar span b{
  color:#ff854b;
  padding:0 5px;
}
</style>

<script>
import axios from 'axios'

export default {
  name: 'Header',
  data() {
    return {
      logoutInfo: {},
      currentUser: {},
      httpHeaders: {
        headers: {
          'Authentication': this.$store.state.token
        }
      }
    }
  },
  mounted() {
    this.getAccountByCurrent(this.$Api.getAccountByCurrent.type, this.$Api.getAccountByCurrent.target)
    this.initShopCarGoodsNum(this.$Lwy.getShopCarGoodsNum.type, this.$Lwy.getShopCarGoodsNum.target)
  },
  methods: {
    getAccountByCurrent: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.currentUser = response.data.data
          this.$store.commit('saveUserId', this.currentUser.id)
          this.$store.commit('saveIsSeller', this.currentUser.isSeller)
          console.log('this.currentUser.isSeller: ' + this.currentUser.isSeller)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    initShopCarGoodsNum: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          const num = response.data.data
          this.$store.commit('saveShopCarGoodsNumber', num)
          console.log('this.currentUser.isSeller: ' + this.currentUser.isSeller)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    handleCommand: function(command) {
      if (command === '1') {
        this.$router.push({
          name: 'User',
          query: {
            userId: this.currentUser.id
          }
        })
      }
    },
    handleLogout: function() {
      const token = this.$store.state.token
      console.log(token)
      this.$store.commit('removeToken', token)
      this.$message({
        message: '退成成功！',
        type: 'success'
      })
      this.$router.push({
        name: 'LoginMall'
      })
      // window.location.href = 'http://47.93.16.173:10010/admin/loginOut'
      // this.$router.push({
      //   name: 'Home',
      //   query: {
      //     menuId: 0
      //   }
      // })
    },
    gotoHome: function() {
      this.$router.push({
        name: 'Home'
      })
    },
    toShopCar: function() {
      this.$router.push({
        name: 'myGoodscar'
      })
    }
  }
}
</script>
