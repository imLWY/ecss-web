<template>
  <el-container>
    <el-header style="min-height:70px;min-width:100%;border-bottom:1px solid #e2e2e2;">
      <Header />
    </el-header>
    <el-container class="">
      <div class="myshop_content">
        <div class="shop_cover">
          <img :src="myStore.storeBanner">
        </div>
        <div class="shop_fixed">
          <ul>
            <li :class="selectedLi == -1 ? 'selectedLi' : ''" @click="handleSelectLi(-1, '')">店铺首页</li>
            <li :class="selectedLi == -2 ? 'selectedLi': ''" @click="handleSelectLi(-2, '')">信用评价</li>
          </ul>
        </div>
        <div class="myshop_select">
          <el-container>
            <el-input v-model="searchContent" placeholder="请输入关键字" class="home-search">
              <el-button slot="append" icon="el-icon-search" class="home-search-btn" @click="searchGoods"/>
            </el-input>
          </el-container>
        </div>
        <div class="myshop_main">
          <div class="myshopfix_left">
            <div class="myshop_left_sj">
              <h3>商家信息</h3>
              <ul class="myshopdetail">
                <li>店主：{{ myStore.storeName }}&nbsp;<a href="" target="_blank"><img src="../../../static/img/zn.png"></a></li>
                <li>信用度：{{ myStore.creditValue }}</li>
                <li>店铺等级: {{ myStore.sgrade }}</li>
                <li>商品数量: {{ goodsNum }}</li>
                <li>所在地区: {{ myStore.regionName }}</li>
                <li>创店时间: {{ myStore.createdTime }}</li>
                <li>认证：<a href="../../../static/img/cert_autonym.gif" target="_blank" /><a href="../../../static/img/cert_material.gif" target="_blank" /></li>
                <li>详细地址: {{ myStore.address }}</li>
                <li>联系电话: {{ myStore.tel }}</li>
                <li class="myshop_onlinechart"><a href="">在线聊天</a></li>
                <li class="myshop_enter">
                  <a href="javascript:void(0);" @click="gotoStoreHome">进入店铺>></a>
                  <a href="javascript:void(0);" @click="collectStore()">收藏该店铺</a>
                </li>
              </ul>
            </div>
            <div class="myshop_left_sj">
              <h3>商品分类</h3>
              <ul class="myshop_goodlist">
                <li><a href="javascript:void(0);" class="myShoplist_good" @click="handleSelectLi(-1, '')">全部商品</a></li>
                <li v-for="gcategory in myStoreGcategory" :key="gcategory.id">
                  <a href="javascript:void(0);" class="myShoplist_good" @click="handleSelectLi(gcategory.id, gcategory.cateName)">{{ gcategory.cateName }}</a>
                  <ul class="myshop_listSmall">
                    <li v-for="child in gcategory.children" :key="child.id">
                      <a href="javascript:void(0);" @click="handleSelectLi(child.id, child.cateName)">{{ child.cateName }}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="myshop_left_sj">
              <h3>友情链接</h3>
              <ul class="myshop_bro">
                <li v-for="item in partnerArr" :key="item.id"><a :href="item.link" target="_blank"> {{ item.title }} </a></li>
              </ul>
            </div>
          </div>
          <div class="myshopmain">
            <MyShopMain :main_key="shopmenuKey" :store_id="storeId" :good_id="goodId" :gcategory_id="gcategoryId" :gcategory_name="gcategoryName" :search_content="searchGoodsName" @shop_detail_event="handleShopDetailEvent" />
          </div>
        </div>
      </div>
    </el-container>
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>

<style scoped>
  .myshop_select{
    width:500px;
    margin-bottom:20px;
  }
</style>

<style>

.shop_fixed{
  width:1200px;
  margin-bottom:20px;
}
.shop_fixed ul{
  font-size:0;
  height:60px;
  text-align: left;
  line-height:60px;
  border-bottom:1px solid #f45408;
}
.shop_fixed ul li{
  margin: 0px 10px;
  display:inline-block;
  vertical-align:middle;
  text-align: left;
  font-size: 16px;
  font-weight: 700;
}

.shop_fixed ul li:hover {
  color: #f45408;
}

.selectedLi {
  color: #f45408;
}

ul,li{
  list-style:none;
  margin:0;
  padding:0;
}
input,button{
  outline:none;
}
  .myshop_content{
    margin:0 auto;
    width:1200px;
  }
  .shop_cover{
  margin-top:30px;
  width:1200px;
  height:120px;
  overflow:hidden;
}
.shop_cover img{
  width:100%;
  height:100%;
}
.myshop_main{
  font-size:0;
}
.myshopfix_left,.myshopmain{
  display:inline-block;
  vertical-align:top;
  font-size:14px;
}
.myshopfix_left{
  width:260px;
}
.myshopmain{
  width:940px;
  padding-left:40px;
  box-sizing:border-box;
}
.myshop_left_sj{
  margin-bottom:20px;
  border:1px solid #ddd;
}
.myshop_left_sj h3{
  width:100%;
  height:40px;
  line-height:40px;
  padding:0 20px;
  box-sizing:border-box;
  font-size:14px;
  color:#fff;
  background:#f6783d;
  margin:0;
}
.myshopdetail{
  padding:10px 20px;
  box-sizing:border-box;
  text-align:left;
}
.myshopdetail li{
  padding:10px 0;
}
.myshopdetail a{
  display:inline-block;
  vertical-align:middle;
}
.myshop_onlinechart a{
  display:block;
  width:140px;
  height:30px;
  line-height:30px;
  border-radius:5px;
  background:#ededed;
  color:#333;
  font-size:14px;
  text-align:center;
}
.myshop_enter a{
  display:block;
  text-align:center;
}
.myshop_enter a:first-child{
  width:200px;
  height:40px;
  line-height:40px;
  margin-bottom:10px;
  background:#ffdac8;
  color:#f6783d;
  font-weight:700;
}
.myshop_enter a:last-child{
  font-size:12px;
  color:#f6783d;
}
.myshopSelect{
  margin:15px 0;
  text-align:center;
}
.myshopSelect_s{
  margin:0 auto;
  width:90%;
  height:30px;
  line-height:30px;
  box-sizing:border-box;
  padding:0 10px;
  border:0;
  border:1px solid #ddd;
  border-radius:5px;
}
.myshopSelect_t{
  border:none;
  background:none;
  width:100px;
  height:30px;
  line-height:30px;
  text-align:center;
  background:#f7ccb7;
  color:#333;
  border-radius:5px;
  margin-top:10px;
  cursor:pointer;
}
.myshop_goodlist > li > a{
  display:block;
  text-align:center;
  height:40px;
  line-height:40px;
  font-size:14px;
  font-weight:700;
  background:#ffdac8;
  color:#333;
  margin-bottom:5px;
}
.myshop_goodlist > li > a:hover{
  color:#f6783d;
}
.myshop_listSmall li a{
  display:block;
  height:40px;
  line-height:40px;
  color:#333;
}
.myshop_listSmall li a:hover{
  color:#f6783d;
}
.myshop_bro li a{
  display:block;
  height:40px;
  line-height:40px;
  color:#f6783d;
}
</style>
<script>
import axios from 'axios'
import MyShopSide from './MyShopSide.vue'
import MyShopMain from './MyShopMain.vue'

export default {
  name: 'MyShop',
  metaInfo: {
    title: '我的店铺'
  },
  components: {
    MyShopSide,
    MyShopMain
  },
  data() {
    return {
      gcategoryId: -1,
      gcategoryName: '',
      shopmenuKey: 'MyShopList',
      searchContent: '',
      searchGoodsName: '',
      myStore: {},
      myStoreGcategory: [],
      selectedLi: -1,
      paramId: parseInt(this.$route.query.paramId),
      storeId: this.$route.query.paramType === 'store' ? parseInt(this.$route.query.paramId) : -1,
      goodId: this.$route.query.paramType === 'goods' ? parseInt(this.$route.query.paramId) : -1,
      paramType: this.$route.query.paramType,
      partnerArr: [],
      goodsNum: 0
    }
  },
  mounted() {
    this.getMyStore(this.$Lwy.getStoreBygoodId.type, this.$Lwy.getStoreBygoodId.target + '?id=' + this.paramId + '&type=' + this.paramType)
    this.showGoodDetail()
  },
  methods: {
    changeMenushopMain: function(data) {
      this.shopmenuKey = data
    },
    showGoodDetail: function() {
      if (this.paramType === 'goods') {
        this.shopmenuKey = 'MyShoplistDetail'
      }
    },
    // 显示商品数量
    showGoodNum: function() {
      return new Promise((resolve, reject) => {
        const type = this.$Api.getAllGoodsByStore.type
        const target = this.$Api.getAllGoodsByStore.target
        var param = {}
        param.storeId = this.myStore.id
        axios[type](target, param).then(response => {
          const code = response.data.code
          if (code === '2000') {
            this.goodsNum = response.data.data.length
          }
          console.log(response)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    getMyStore: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          console.log(response)
          this.myStore = response.data.data
          this.storeId = this.myStore.id
          console.log('myStore')
          console.log(this.myStore)
          this.getStoreGcategory(this.myStore.id, this.$Api.myStoreGcategory.type, this.$Api.myStoreGcategory.target)
          this.showPartnerList()
          this.showGoodNum()
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    getStoreGcategory: function(storeId, type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target, { 'storeId': storeId }).then(response => {
          this.myStoreGcategory = response.data.data
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.erorrs)
        })
      })
    },
    handleSelectLi: function(liIndex, liName) {
      this.selectedLi = liIndex
      if (liIndex === -1) {
        this.shopmenuKey = 'MyShopList'
        console.log('storeId:' + this.myStore.id)
        this.gcategoryId = -1
        this.gcategoryName = ''
      } else if (liIndex === -2) {
        this.shopmenuKey = 'MyShopCredit'
        this.gcategoryId = -2
        this.gcategoryName = ''
        this.storeId = this.myStore.id
      } else {
        this.shopmenuKey = 'MyShopOther01'
        this.gcategoryId = liIndex
        this.gcategoryName = liName
        this.storeId = this.myStore.id
      }
    },
    handleShopDetailEvent: function(param, goodId) {
      console.log('MyShop_goodId:' + goodId)
      this.shopmenuKey = param
      this.goodId = goodId
    },
    gotoStoreHome: function() {
      this.shopmenuKey = 'MyShopList'
    },
    searchGoods: function() {
      this.shopmenuKey = 'ShopGoodsList'
      this.storeId = this.myStore.id
      this.searchGoodsName = this.searchContent
    },
    collectStore: function() {
      const type = this.$Lwy.collectStoreByCurrent.type
      const target = this.$Lwy.collectStoreByCurrent.target
      var param = {}
      param.itemId = this.storeId
      return new Promise((resolve, reject) => {
        axios[type](target, param).then(response => {
          const code = response.data.code
          const msg = response.data.msg
          if (code === '2000') {
            this.$message({
              type: 'success',
              message: msg
            })
            this.initList()
          } else {
            this.$message({
              type: 'warning',
              message: msg
            })
          }
          console.log(this.shopCarGoodArr)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    showPartnerList: function() {
      const type = this.$Lwy.getPartnerByStorId.type
      const target = this.$Lwy.getPartnerByStorId.target
      var param = {}
      param.storeId = this.myStore.id
      return new Promise((resolve, reject) => {
        axios[type](target, param).then(response => {
          const code = response.data.code
          if (code === '2000') {
            this.partnerArr = response.data.data
          }
          console.log(this.shopCarGoodArr)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    }
  }
}
</script>
