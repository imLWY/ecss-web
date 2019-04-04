<template>
  <el-collapse>
    <div class="myshoplist">
      <div class="myshop_recommend">
        <h3>推荐商品</h3>
        <ul class="myshop_recommendList">
          <li v-for="good in recommendGoods" :key="good.id">
            <a href="javascript:void(0);" class="myshop_recommendList_img" @click="gotoShopDetail(good.id)">
              <img :src="good.goodsPhoto">
            </a>
            <a href="javascript:void(0);" class="myshop_recommendList_title" @click="gotoShopDetail(good.id)">{{ good.goodsName }}</a>
            <span class="myshop_recommendList_price">￥ {{ good.goodsPrice }}</span>
          </li>
        </ul>
      </div>
      <!-- <div class="myshop_recommend">
        <h3>新品</h3>
        <ul class="myshop_recommendList">
          <li v-for="good in newGoods" :key="good.id">
            <a href="javascript:void(0);" class="myshop_recommendList_img" @click="gotoShopDetail(good.id)">
              <img :src="good.goodsPhoto">
            </a>
            <a href="javascript:void(0);" class="myshop_recommendList_title" @click="gotoShopDetail(good.id)">{{ good.goodsName }}</a>
            <span class="myshop_recommendList_price">￥ {{ good.goodsPrice }}</span>
          </li>
        </ul>
      </div>
    </div> -->
  </el-collapse>
</template>

<style>
  ul,li{
    list-style:none;
  }
  input,button{
    border:none;
    background:none;
    outline:none;
  }
  .el-collapse{
    border:none;
  }
  .myshop_recommend{
    margin-bottom:20px;
  }
  .myshop_recommend h3{
    height:50px;
    line-height:50px;
    border-bottom:1px solid #f6783d;
    color:#333;
    font-weight:700;
    text-align:left;
    margin:0;
  }
  .myshop_recommendList{
    text-align:left;
    font-size:0;
    margin:10px 0;
  }
  .myshop_recommendList li{
    display:inline-block;
    width:25%;
    vertical-align:top;
    padding:20px;
    box-sizing:border-box;
  }
  .myshop_recommendList li a,.myshop_recommendList li span{
    display:block;
    font-size:14px;
  }
  .myshop_recommendList_img{
    width:175px;
    height:175px;
    overflow:hidden;
  }
  .myshop_recommendList_img img{
    width:100%;
    height:100%;
  }
  .myshop_recommendList_title{
    margin:10px 0;
    text-align:center;
    color:#333;
  }
  .myshop_recommendList_title:hover{
    color:#f6783d;
  }
  .myshop_recommendList_price{
    color:red;
  }
</style>

<script>
import axios from 'axios'

export default {
  name: 'MyShopGcategory',
  props: {
    store_id: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      storeGoods: [],
      recommendGoods: [],
      newGoods: []
    }
  },
  // watch: {
  //   store_id(storeId) {
  //     console.log('new:' + storeId)
  //     console.log('old:' + storeId)
  //     this.storeId = storeId
  //     return storeId
  //   }
  // },
  mounted() {
    this.getStoreGoods({ 'storeId': this.store_id }, this.$Api.storeGoods.type, this.$Api.storeGoods.target)
  },
  methods: {
    getStoreGoods: function(searchParam, type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target, searchParam).then(response => {
          this.storeGoods = response.data.data.dataList
          console.log(this.storeGoods)
          for (var i = 0; i < this.storeGoods.length; i++) {
            var isRecommended = this.storeGoods[i].recommended
            if (isRecommended === 1) {
              this.recommendGoods.push(this.storeGoods[i])
            } else {
              this.newGoods.push(this.storeGoods[i])
            }
          }
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    gotoShopDetail: function(goodId) {
      this.$emit('shop_detail_event', 'MyShoplistDetail', goodId)
      console.log('goodId_id:' + goodId)
      this.$router.push({
        name: 'MyShop',
        query: {
          goodId: goodId
        }
      })
    }
  }
}
</script>
