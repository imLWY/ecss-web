<template>
  <el-container>
    <el-header style="min-height:70px;min-width:100%;border-bottom:1px solid #e2e2e2;">
      <Header />
    </el-header>
    <el-container>
      <div class="mygoodsCar">
        <el-steps :active="0" process-status="process" finish-status="success" simple style="margin-top:20px;">
          <el-step title="确认购物清单" />
          <el-step title="确认收货人资料及配送方式" />
          <el-step title="支付" />
        </el-steps>
        <div class="mygoodscar_title">
          <h3>商品清单</h3>
        </div>
        <el-row :gutter="20" class="shopcarTh">
          <el-col :span="12">
            <h3>商品名称</h3>
          </el-col>
          <el-col :span="3">
            <h3>单价</h3>
          </el-col>
          <el-col :span="3">
            <h3>数量</h3>
          </el-col>
          <el-col :span="3">
            <h3>小计</h3>
          </el-col>
          <el-col :span="3">
            <h3>操作</h3>
          </el-col>
        </el-row>
        <el-row v-for="(item , index1) in shopCarGoodArr" :key="item.id" :gutter="20">
          <el-col :span="24">
            <p colspan="5" class="add_shopName">{{ item.storeName }}<!-- <a href=""><img src="../../../static/img/zn.png"></a> --></p>
          </el-col>
          <div v-for="(good , index2) in item.goodList" :key="good.id" style="border-bottom:1px solid #ededed;height:96px;clear:both;padding:10px 0;font-size:14px;">
            <el-col :span="12" class="addShoptitles" style="height:100%;max-height:96px;line-height:96px;vertical-align:middle;display:inline-block;">
              <p style="display:inline-block;height:100%;max-height:96px;line-height:96px;vertical-align:middle;margin:0;padding:0;">
                <img :src="good.goodsImage" alt="" style="height:100%;width:80px;">
              </p>
              <p :title="good.goodsName" style="display:inline-block;height:100%;max-height:96px;width:100%;max-width:300px;line-height:96px;vertical-align:middle;margin:0;padding:0;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;">
                {{ good.goodsName }}
              </p>
              <p :title="good.specification" style="display:inline-block;height:100%;max-height:96px;width:100%;max-width:200px;line-height:96px;vertical-align:middle;margin:0;padding:0;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;">
                <span style="color:#999999;">
                  {{ good.specification }}
                </span>
              </p>
            </el-col>
            <el-col :span="3" class="addShopprice" style="height:96px;line-height:96px;vertical-align:middle;">
              <span>￥{{ good.price }}</span>
            </el-col>
            <el-col :span="3" style="height:96px;line-height:96px;vertical-align:middle;">
              <el-input-number v-model="good.quantity" :min="0" :max="good.stock" size="mini" @change="handleChangeNum(index1, index2)"/>
            </el-col>
            <el-col :span="3" class="addShopprice_total" style="height:96px;line-height:96px;vertical-align:middle;">
              <span>￥{{ good.sumPrice }}</span>
            </el-col>
            <el-col :span="3" class="addShopbtn_ect" style="height:96px;line-height:96px;vertical-align:middle;">
              <a href="javascript:void(0);" @click="handleDelete(good.id)" >删除</a>
              <a href="javascript:void(0);" @click="handleCollect(good.goodsId)" >移入收藏夹</a>
            </el-col>
          </div>
          <el-col :span="24" style="margin-top:16px;">
            <div class="goodscar_price">
              <span class="goodscar_checked">已选择<b>{{ item.goodList.length }}</b>种规格的商品</span>
              <span class="goodscar_gopr">总价：<b>￥{{ item.totalPrice }}</b></span>
              <a href="javascript:;" class="goodscar_set" style="font-size:16px;" @click="settlement(item.storeId)">填写并确认订单</a>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-container>
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>

<style lang="scss" scoped>
/*  */
/deep/ .el-steps--simple {
  background: #ffffff;
}

/deep/ .el-step__head.is-process {
  color: #f45408;
}

/deep/ .el-step__title.is-process {
  color: #f45408;
}

/deep/ .el-step__head.is-process .el-step__icon.is-text {
  border-color: #f45408;
}
/*  */

ul,li{
  list-style:none;
}
button,input{
  border:none;
  outline:none;
  background:none;
}
.mygoodsCar{
  margin:0 auto;
  width:1200px;
  text-align:left;
  height:auto;
  min-height:800px;
}
.mygoodscar_title{
  height:60px;
  line-height:76px;
  border-bottom:1px solid #f45408;
}
.mygoodscar_title h3{
  font-size:16px;
  color:#f45408;
}
.mygoodscar_title h3 span{
  padding-left:5px;
}
.goodscarTable{
  width:100%;
}
.goodscarTable th{
  height:50px;
  line-height:50px;
  text-align:center;
  font-size:14px;
}
.goodscarTable th:first-child,.goodscarTable th:nth-child(2){
  text-align:left;
}
.goodscarTable .goodscar_shopname a{
  display:inline-block;
  vertical-align:middle;
  margin-left:5px;
}
.goodscarTable tbody tr td{
  padding:10px 0;
  font-size:14px;
  text-align:center;
  border-bottom:1px solid #ddd;
}
.goodscarTable .goodscar_shopname td{
  padding:15px 0;
  border-bottom:1px rgb(255, 120, 43) solid;
}
.goodscarTable tbody tr td:first-child,.goodscarTable tbody tr td:nth-child(2){
  text-align:left;
}
.goodscar_pic,.goodscar_tit,.goodscar_detail{
  float:left;
  margin-right:10px;
}
.goodscar_pic{
  width:80px;
  height:80px;
  overflow:hidden;
}
.goodscar_pic img{
  width:100%;
  height:100%;
}
.goodscar_tit{
  padding-top:20px;
  margin-right:20px;
  width:220px;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  color:#666;
}
.goodscar_detail{
  padding-top:20px;
  width:190px;
  font-weight:400;
  color:#999;
}
.goodscar_detail strong{
  font-weight:400;
}
.goodscarTable .pm{
  width:30px;
  height:30px;
  text-align:center;
  line-height:26px;
  font-size:16px;
  color:#333;
  cursor:pointer;
  border:1px solid #ddd;
  vertical-align:middle;
}
.goodscarTable .pms{
  vertical-align:middle;
  width:30px;
  height:28px;
  line-height:28px;
  border:1px solid #ddd;
  padding:0 10px;
}
.goodscar_price{
  width:100%;
  height:60px;
  line-height:60px;
  text-align:right;
  background:#eee;
  font-size:0;
}
.goodscar_checked,.goodscar_gopr,.goodscar_set{
  display:inline-block;
  vertical-align:middle;
  font-size:14px;
  margin-left:20px;
}
.goodscar_checked b{
  font-size:16px;
  color:#f45408;
  padding:0 5px;
}
.goodscar_gopr b{
  padding-left:5px;
  font-size:20px;
  color:#f45408;
}
.goodscar_set{
  width:160px;
  height:60px;
  line-height:60px;
  background:#f45408;
  color:#fff;
  font-size:20px;
  text-align:center;
  font-weight:400;
}
.shopcarTh h3{
  font-size:14px;
}
.add_shopName{
  border-top:1px solid #ddd;
  margin:0;
  padding:20px 0;
  font-size:14px;
  border-bottom:1px rgb(250, 209, 204) solid;
}
</style>

<script>
/* eslint-disable */
import axios from 'axios'

export default {
  name: 'myGoodscar',
  data() {
    return {
      shopCarGoodArr: []
    }
  },
  mounted() {
    this.initList()
  },
  methods: {
    initList: function() {
      this.getShopCarGoodArr(this.$Lwy.listShopCarGood.type, this.$Lwy.listShopCarGood.target)
    },
    // 初始化列表数据
    getShopCarGoodArr: function(type, target) {
      const param = {}
      return new Promise((resolve, reject) => {
        axios[type](target, param).then(response => {
          this.shopCarGoodArr = response.data.data
          console.log(this.partnerArr)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    // 手动改变数量
    handleChangeNum: function(index1, index2) {
      var shopCarGoodArr = this.shopCarGoodArr[index1].goodList
      var shopCarGoodItem = this.shopCarGoodArr[index1].goodList[index2];
      const type = this.$Lwy.updShopCarGoodNumById.type
      const target = this.$Lwy.updShopCarGoodNumById.target
      var param = {}
      param.id = shopCarGoodItem.id
      param.quantity = shopCarGoodItem.quantity
      return new Promise((resolve, reject) => {
          axios[type](target, param).then(response => {
            const code = response.data.code
            if (code === '2000') {
                this.shopCarGoodArr[index1].goodList[index2].sumPrice = (shopCarGoodItem.price*shopCarGoodItem.quantity).toFixed(2)
                var tt = 0.00
                console.log(shopCarGoodItem)
                for (var i = 0 ; i < shopCarGoodArr.length; i++) {
                  tt = (Number(tt)+Number(shopCarGoodArr[i].sumPrice)).toFixed(2)
                }
                this.shopCarGoodArr[index1].totalPrice = tt
            } else {
              this.$message({
                type: 'error',
                message: '操作失败!'
              })
            }
            console.log(this.partnerArr)
            resolve(response.data)
          }).catch(error => {
            reject(error.response.data.errors)
          })
        })
    },
    handleDelete: function(id){
      this.$confirm('确定从购物车中删除该商品吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        const type = this.$Lwy.delShopCarGoodById.type
        const target = this.$Lwy.delShopCarGoodById.target + '?id=' + id
        return new Promise((resolve, reject) => {
          axios[type](target).then(response => {
            const code = response.data.code
            if (code === '2000') {
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                })
                this.initList()
                this.initShopCarGoodsNum(this.$Lwy.getShopCarGoodsNum.type, this.$Lwy.getShopCarGoodsNum.target)
            } else {
              this.$message({
                type: 'error',
                message: '操作失败!'
              })
            }
            console.log(this.partnerArr)
            resolve(response.data)
          }).catch(error => {
            reject(error.response.data.errors)
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 收藏商品
    handleCollect: function(id) {
      const type = this.$Lwy.collectGoodByCurrent.type
      const target = this.$Lwy.collectGoodByCurrent.target
      var param = {}
      param.itemId = id
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
    settlement: function(storeId) {
      const type = this.$Lwy.checkGoods.type
      const target = this.$Lwy.checkGoods.target
      var param = {}
      param.storeId = storeId
      return new Promise((resolve, reject) => {
        axios[type](target, param).then(response => {
          const num = response.data.data
          const code = response.data.code
            const msg = response.data.msg
            if (code === '2000') {
                this.$router.push({
                  name: 'Goods_buy',
                  query: {
                    storeId: storeId
                    // isShopCar: 1
                  }
                })
            } else {
              this.$message({
                type: 'warning',
                message: msg
              })
            }
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
    }
  }
}
</script>
