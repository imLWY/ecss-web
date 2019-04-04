<template>
  <el-container>
    <el-header style="min-height:70px;min-width:100%;border-bottom:1px solid #e2e2e2;">
      <Header />
    </el-header>
    <el-container>
      <div class="goodsBuy">
        <el-steps :active="1" process-status="process" finish-status="success" simple style="margin-top:20px;">
          <el-step title="确认购物清单" />
          <el-step title="确认收货人资料及配送方式" />
          <el-step title="支付" />
        </el-steps>
        <div class="goodsBuyform">
          <div class="mygoodscar_title">
            <h3>确认收货地址</h3>
          </div>
          <!-- <h3 class="goodsBuytitle"><span>确认收货地址</span><a href="">管理地址</a></h3> -->
          <ul class="goodsBuy_address">
            <li v-for="(addr, index) in addressData" :key="addr.id" :class="index === addrSelected ? 'goodsBuyCurrent' : ''">
              <div class="goodsAdd_left"><input :checked="index==addrSelected" name="address" type="radio" @click="selectAdd(index, addr.id, addr.consignee, addr.regionName, addr.address)">{{ addr.regionName }}{{ addr.address }} &emsp;{{ addr.consignee }} &emsp;{{ addr.phoneMob }} </div>
              <!-- <a href="javascript:;" class="goodsAdd_right">修改本地址</a> -->
            </li>
          </ul>
          <div class="mygoodscar_title">
            <h3>确认配送方式</h3>
          </div>
          <ul class="goodsBuy_address">
            <li v-for="(ship, index) in shippings" :key="ship.id" :class="index === shipSelected ? 'goodsBuyCurrent' : ''">
              <div class="goodsAdd_left">
                <input :checked="index === shipSelected" name="shipping" type="radio" @click="selectShipping(index, ship)">{{ ship.shippingName }} &emsp; 邮费: ￥{{ ship.firstPrice + ship.stepPrice }}
              </div>
            </li>
          </ul>
          <div class="mygoodscar_title">
            <h3>确认订单信息</h3>
          </div>
          <!-- <h3 class="goodsBuytitle"><span>确认信息订单</span></h3> -->
          <div class="goodsBuy_order">
            <table class="goodsBuy_ordertable">
              <thead>
                <tr>
                  <th style="width:35%;">店铺宝贝</th>
                  <th style="width:35%;">商品描述</th>
                  <th style="width:10%;">单价</th>
                  <th style="width:20%;">数量</th>
                  <th style="width:10%;">小计</th>
                </tr>
              </thead>
              <!-- <tbody v-if="isShopCar === 0">
                <tr>
                  <td><a href="" class="goodstImg"><img :src="goodsData.previewFix + goodsData.goodsPhoto"></a><a href="" class="goodstTtile">{{ goodsData.goodsName }}</a></td>
                  <td>{{ goodsData.tags }}</td>
                  <td>￥{{ goodsData.goodsPrice }}</td>
                  <td><button @click="cuts()">-</button><input v-model="buyNumber" type="text" ><button @click="add()">+</button></td>
                  <td>￥{{ price }}</td>
                </tr>
              </tbody> -->
              <!-- <tbody v-if="isShopCar === 1"> -->
              <tbody>
                <tr v-for="(all , index) in cartListData" :key="all.id">
                  <td><a href="" class="goodstImg"><img :src="all.previewFix + all.goodsImage"></a><a href="" class="goodstTtile after_gooName">{{ all.goodsName }}</a></td>
                  <td><p class="after_gooDetal">{{ all.tags }}</p></td>
                  <td>￥{{ all.price }}</td>
                  <td><el-input-number v-model="all.quantity" :min="0" :max="all.stock" size="mini" @change="handleChangeNum(index)"/></td>
                  <td>￥{{ all.sumPrice }}</td>
                </tr>
              </tbody>
            </table>
            <ul class="goodsBuyfk">
              <li><strong>实付款：</strong><b>￥{{ price }}</b></li>
              <li><strong>寄送至：</strong>{{ detailAddress }}</li>
              <li><strong>收货人：</strong>{{ receiver }}</li>
            </ul>
          </div>
          <a href="javascript:void(0);" class="goodsBuy_submit" style="font-size:14px;" @click="addOrder()">下单完成并支付</a>
        </div>
      </div>
    </el-container>
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>

<style lang="scss">
@import "../../../static/css/custom-ui.scss";
/*
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
*/

ul,li{
  list-style:none;
}
button,input{
  border:none;
  outline:none;
  background:none;
}
.goodsBuy{
  margin:0 auto;
  width:1200px;
  text-align:left;
  height:auto;
  min-height:800px;
}
.goodsBuytitle{
  height:30px;
  line-height:30px;
  border-bottom:1px solid #ddd;
}
.goodsBuytitle span{
  font-size:16px;
  font-weight:700;
  color:#333;
}
.goodsBuytitle a{
  float:right;
  font-size:14px;
  color:#666;
  font-weight:400;
}
.goodsBuytitle a:hover{
  color:#f45408;
}
.goodsBuy_address{
  margin:10px 0;
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
.goodsBuy_address li{
  font-size:0;
  color:#333;
  padding:8px 0;
}
.goodsBuyCurrent{
  background:#ffeee6;
  // border:1px solid #f45408;
}
.goodsAdd_left,.goodsAdd_right{
  display:inline-block;
  vertical-align:middle;
  font-size:14px;
}
.goodsAdd_left{
  width:90%;
}
.goodsAdd_right{
  float:right;
  width:10%;
  color:rgb(65, 142, 243);
  display:none;
}
.goodsBuyCurrent .goodsAdd_right{
  display:block;
}
.goodsAdd_left input{
  margin-right:10px;
}
.goodsBuy_ordertable{
  width:100%;
}
.goodsBuy_ordertable th{
  height:50px;
  line-height:50px;
  text-align:center;
  font-size:14px;
  color:#333;
}
.goodsBuy_ordertable td{
  padding:10px 0;
  font-size:12px;
  color:#666;
  text-align:center;
  border-bottom:1px solid #eee;
}
.goodsBuy_ordertable tbody tr td:first-child{
  text-align:left;
}
.goodstImg{
  display:inline-block;
  vertical-align:middle;
  width:70px;
  height:70px;
  overflow:hidden;
  margin-right:10px;
}
.goodstImg img{
  width:100%;
  height:100%;
}
.goodstTitle{
  display:inline-block;
  vertical-align:middle;
  color:#666;
}
.goodsBuy_ordertable button{
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
.goodsBuy_ordertable input{
  vertical-align:middle;
  // width:30px;
  // height:28px;
  line-height:28px;
  border:1px solid #ddd;
  padding:0 10px;
}
.goodsBuyfk{
  margin:10px 0;
  text-align:right;
}
.goodsBuyfk li{
  font-size:14px;
  color:#333;
  padding: 5px 0;
}
.goodsBuyfk li b{
  color:red;
  font-size:20px;
}
.goodsBuy_submit{
  display:block;
  width:120px;
  height:40px;
  line-height:40px;
  background:#f45408;
  color:#fff;
  text-align:center;
  border-radius:5px;
  float:right;
}
.goodsBuy_ordertable td .after_gooName{
  word-break: break-all;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  display:inline-block;
  vertical-align:middle;
  width:320px;
}
.goodsBuy_ordertable td .after_gooDetal{
  word-break: break-all;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  display:inline-block;
  vertical-align:middle;
  width:320px;
}
</style>

<script>
import axios from 'axios'
/* eslint-disable */

export default {
  name: 'Goods_buy',
  data() {
    return {
      searchParam: {

      },
      cartListData: [],
      addParam: {
        specId: this.$route.query.specId,
        goodsId: this.$route.query.goodId,
        goodsAmount: this.$route.query.buyNumber,
        addrId: 0,
        quantity: this.$route.query.buyNumber,
        shippingFee: null,
        storeId: parseInt(this.$route.query.storeId),
        shippingId: null,
        shippingName: null
      },
      addOrderParam: {
        addrId: '',
        shippingFee: '',
        storeId: '',
        goodsAmount: '',
        orderGoods: [
          {
            specId: '',
            goodsId: '',
            quantity: ''
          }
        ],
        shippingId: null,
        shippingName: null
      },
      param: 1,
      selectItem: 0,
      addressData: [],
      goodId: this.$route.query.goodId,
      specId: this.$route.query.specId,
      storeId: this.$route.query.storeId,
      isShopCar: this.$route.query.isShopCar,
      buyNumber: this.$route.query.buyNumber,
      detailAddress: '',
      receiver: '',
      goodsData: {},
      specData: {},
      price: 0,
      orderPrice: 0,
      goodsPrice: 0,
      shippings: [],
      shipSelected: null
    }
  },
  mounted() {
    this.getMyAddressList(this.$Yjj.getAddress.type, this.$Yjj.getAddress.target)
    this.getShippings()
    this.addrSelected(0)
    // if (this.$route.query.isShopCar === 0) {
    //   this.getGoods(this.$Yjj.getGoodsAndSpec.type, this.$Yjj.getGoodsAndSpec.target + '?goodId=' + this.$route.query.goodId + '&specId=' + this.$route.query.specId)
    // } else {
    // this.getCartList(this.$Yjj.getCartList.type, this.$Yjj.getCartList.target + '?storeId=' + this.$route.query.storeId)
    this.getCartList()
    // }
  },
  methods: {
    getMyAddressList: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target,this.searchParam).then(response => {
          this.addressData = response.data.data
          if(this.addressData.length>0){
            this.selectAdd(0,this.addressData[0].id, this.addressData[0].consignee, this.addressData[0].regionName, this.addressData[0].address)
            this.addParam.addrId = this.addressData[0].id
          }

          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    getShippings: function() {
      return new Promise((resolve, reject) => {
        axios[this.$Api.shippingByStore.type](this.$Api.shippingByStore.target, { 'storeId': this.storeId }).then(response => {
          console.log(response.data)
          this.shippings = response.data.data
          if (this.shippings.length > 0) {
            this.selectShipping(0, this.shippings[0])
          }
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data)
        })
      })
    },
    getGoods: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target,this.goodId, this.specId).then(response => {
          this.goodsData = response.data.data
          if(response.data.data.specArr.length>0){
            this.specData = response.data.data.specArr[0]
          }
          this.price = this.$route.query.buyNumber*response.data.data.goodsPrice
          this.goodsPrice = response.data.data.goodsPrice
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    getCartList: function() {
      return new Promise((resolve, reject) => {
        axios[this.$Api.getGoodsInCartByStore.type](this.$Api.getGoodsInCartByStore.target, { storeId: this.storeId }).then(response => {
          var tt = 0.00;
          this.cartListData = response.data.data[0].goodList
          console.log(this.cartListData)
          for (var i = 0;i < this.cartListData.length;i++) {
            this.cartListData[i].sumPrice = Number(this.cartListData[i].price*this.cartListData[i].quantity).toFixed(2)
            tt = (Number(tt)+Number(this.cartListData[i].price*this.cartListData[i].quantity)).toFixed(2)
          }
          this.price = tt
          this.orderPrice = tt
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    handleSizeChange: function(val) {

    },
    handleCurrentChange: function(val) {

    },
    addrSelected: function(val) {
      this.addrSelected = val
    },
    selectAdd: function(index,addressId, val, val2, val3) {
      this.addrSelected = index
      this.detailAddress = val2 + val3
      this.receiver = val
      this.addParam.addrId = addressId
    },
    cuts: function() {
      if(this.buyNumber>0){
        this.buyNumber --
        this.price = this.buyNumber * this.goodsPrice
        this.addParam.goodsAmount = this.buyNumber
        this.addParam.quantity = this.buyNumber
      }
    },
    add: function() {
      this.buyNumber ++
      this.price = this.buyNumber * this.goodsPrice
      this.addParam.goodsAmount = this.buyNumber
      this.addParam.quantity = this.buyNumber
    },
    addOrder: function() {
      // if (this.isShopCar === 0) {
      // this.addGoodsOrder(this.$Yjj.addGoodsOrder.type, this.$Yjj.addGoodsOrder.target)
      // } else {

      // }
      if (this.addressData.length === 0) {
        this.$message({
          type: 'warning',
          message: '请维护个人收货地址'
        })
        return
      }
      if (this.shippings .length === 0) {
        this.$message({
          type: 'warning',
          message: '请联系卖家提供配送方式'
        })
        return
      }
      this.addGoodsOrder()
    },
    // 手动改变数量
    handleChangeNum: function(index) {
      var tt = 0.00;
      for (var i = 0;i < this.cartListData.length;i++) {
        this.cartListData[i].sumPrice = Number(this.cartListData[i].price*this.cartListData[i].quantity).toFixed(2)
        tt = (Number(tt)+Number(this.cartListData[i].price*this.cartListData[i].quantity)).toFixed(2)
      }
      this.price = tt
    },
    addGoodsOrder: function() {
      return new Promise((resolve, reject) => {
        axios[this.$Api.createOrderByCart.type](this.$Api.createOrderByCart.target, this.addParam).then(response => {
          console.log('test goods_buy')
          console.log(response)
          if (response.data.code === '2000') {
            this.$router.push({
              name: 'BuyOrder',
              query: {
                orderId: response.data.data.orderId,
                goodsAmount: response.data.data.goodsAmount
              }
            })
          }
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    selectShipping: function(index, shipping) {
      this.shipSelected = index
      this.addParam.shippingId = shipping.id
      this.addParam.shippingName = shipping.shippingName
      this.addParam.shippingFee = shipping.firstPrice + shipping.stepPrice
      this.price = parseFloat(this.orderPrice) + this.addParam.shippingFee
    }
  }
}
</script>
