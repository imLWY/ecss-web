<template>
  <el-collapse>
    <div class="myshoplist">
      <div class="myshop_recommend">
        <!-- <h3>{{ goodsName }}</h3> -->
        <ul class="myshop_recommendList">
          <li v-for="good in categoryGoods" :key="good.id">
            <a href="javascript:void(0);" class="myshop_recommendList_img" @click="gotoShopDetail(good.id)">
              <img :src="good.goodsPhoto">
            </a>
            <a href="javascript:void(0);" class="myshop_recommendList_title" @click="gotoShopDetail(good.id)">{{ good.goodsName }}</a>
            <span class="myshop_recommendList_price">￥ {{ good.goodsPrice }}</span>
          </li>
        </ul>
      </div>
    </div>
    <!--分页-->
    <div style="height:24px;"/>
    <el-pagination
      :current-page="searchParam.page"
      :page-sizes="[12, 24, 48, 96]"
      :page-size="searchParam.pageSize"
      :total="searchParam.total"
      layout="total, sizes, prev, pager, next, jumper"
      style="text-align:center;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
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
  name: 'ShopGoodsList',
  props: {
    good_id: {
      type: Number,
      default: -1
    },
    search_content: {
      type: String,
      default: ''
    },
    store_id: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      searchParam: {
        page: 1,
        pageSize: 12
      },
      categoryGoods: []
    }
  },
  watch: {
    search_content(search_content) {
      this.getGoodsList(search_content, this.$Api.goodsByGcategoryId.type, this.$Api.goodsByGcategoryId.target)
    }
  },
  mounted() {
    this.getGoodsList(this.search_content, this.$Api.goodsByGcategoryId.type, this.$Api.goodsByGcategoryId.target)
  },
  methods: {
    getGoodsList: function(searchContent, type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target, { 'goodNameLike': searchContent, 'storeId': this.store_id, 'page': this.searchParam.page, 'pageSize': this.searchParam.pageSize }).then(response => {
          this.categoryGoods = response.data.data.dataList
          this.searchParam.total = response.data.data.total
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    handleSizeChange: function(val) {
      console.log('每页${val}条')
    },
    handleCurrentChange: function(val) {
      this.searchParam.page = val
      this.getGoodsList(this.search_content, this.$Api.goodsByGcategoryId.type, this.$Api.goodsByGcategoryId.target)
    },
    gotoShopDetail: function(goodId) {
      this.$emit('shop_detail_event', 'MyShoplistDetail', goodId)
      this.$router.push({
        name: 'MyShop',
        query: {
          // goodId: goodId
          paramId: goodId,
          paramType: 'goods'
        }
      })
    }
  }
}
</script>
