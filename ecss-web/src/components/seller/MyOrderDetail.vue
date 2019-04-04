<template>
  <el-container>
    <el-header style="min-height:70px;min-width:100%;border-bottom:1px solid #e2e2e2;">
      <Header />
    </el-header>
    <el-container>
      <div class="myorderDetail">
        <div class="search-keyword">
          <div class="inner-1200">
            <div class="checkorder">
              <h2>订单详情</h2>
              <div class="checkorder_state">
                <span>订单状态：<b>{{ orderInfo.orderStatusName }}</b></span>
                <span>订单号：<i>{{ orderInfo.orderNumber }}</i></span>
                <span>下单时间：{{ orderInfo.createdTime }}</span>
              </div>
              <div class="checkorder_detail">
                <h3>订单信息</h3>
                <div v-if="showType === 'showSeller'" class="checkorder_seller_detail">
                  <div class="checkorder_seller_title">卖家信息</div>
                  <div class="checkorder_seller_content">
                    <span>店铺名：{{ storeInfo.storeName }}</span>
                    <span>电话号码：{{ storeInfo.tel }}</span>
                    <span>所在地区：{{ storeInfo.address }}</span>
                    <span>电子邮件：{{ sellerInfo.email }}</span>
                  </div>
                </div>
                <div v-if="showType === 'showBuyer'" class="checkorder_seller_detail">
                  <div class="checkorder_seller_title">买家信息</div>
                  <div class="checkorder_seller_content">
                    <span>买家姓名：{{ orderExt.consignee }}</span>
                    <span>电话号码：{{ orderExt.phoneTel }}</span>
                    <span>手机号码：{{ orderExt.phoneMob }}</span>
                    <span>所在地区：{{ orderExt.regionName }}</span>
                    <span>详细地址：{{ orderExt.address }}</span>
                    <span>邮政编码：{{ orderExt.zipcode }}</span>
                  </div>
                </div>
                <div v-for="item in goodsList" :key="item.id" class="order_list_content checkorder_list_content">
                  <div class="orderContent_left">
                    <div class="orderCleft_img"><img :src="item.goodsImage" alt=""></div>
                    <div class="orderCleft_name">
                      <a :title="item.goodsName" href="javascript:void(0);" target="_blank"><span class="orderCleft_named">{{ item.goodsName }}</span></a>
                      <span class="orderCleft_namex">{{ item.specification }}</span>
                    </div>
                  </div>
                  <span class="orderContent_center">价格：{{ item.price }}</span>
                  <span class="orderContent_right">数量：{{ item.quantity }}</span>
                </div>
                <div class="checkorder_money">
                  <span>运费：¥{{ orderExt.shippingFee }}({{ orderExt.shippingName }})</span>
                  <span>优惠打折：¥{{ orderInfo.discount }}</span>
                  <span>总价：<i>¥{{ orderInfo.totalPrice }}</i></span>
                </div>
                <ul class="checkorder_qt">
                  <li>支付方式：{{ orderInfo.paymentName }}</li>
                  <li>下单时间：{{ orderInfo.createdTime }}</li>
                  <li>发货时间：{{ sendGoodsTime }}</li>
                </ul>
              </div>
              <div class="checkorder_detail">
                <h3>物流信息</h3>
                <ul class="checkorder_wl">
                  <li>收货地址：{{ orderExt.address }}</li>
                  <li>配送方式：{{ orderExt.shippingName }}</li>
                  <li>物流单号：{{ orderInfo.invoiceNo }}</li>
                </ul>
              </div>
              <div class="checkorder_detail">
                <h3>订单信息</h3>
                <ul class="checkorder_wl">
                  <li v-for="logItem in orderLog" :key="logItem.id">{{ logItem.operator }}&nbsp;&nbsp;在&nbsp;&nbsp;{{ logItem.createdTime }}&nbsp;&nbsp;将订单状态由&nbsp;&nbsp;{{ logItem.orderStatus }}&nbsp;&nbsp;改为&nbsp;&nbsp;{{ logItem.changedStatus }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-container>
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>

<style>
ul,li{
    list-style:none;
}
button,input{
  border:none;
  outline:none;
  background:none;
}
.myorderDetail{
  margin:0 auto;
  width:1200px;
  text-align:left;
  height:auto;
  min-height:800px;
}
.order_list_content{
	padding:20px 0;
	font-size:0;
	box-sizing:border-box;
	border-bottom:1px solid #ffb491;
}
.orderContent_left,.orderContent_center,.orderContent_right{
	display:inline-block;
	vertical-align:middle;
	font-size:14px;
}
.orderContent_left{
	width:60%;
	font-size:0;
}
.orderContent_center,.orderContent_right{
	width:20%;
}
.orderContent_right{
	text-align:right;
}
.orderCleft_img,.orderCleft_name{
	display:inline-block;
	vertical-align:middle;
	font-size:14px;
}
.orderCleft_img{
	width:100px;
	height:80px;
	overflow:hidden;
	text-align:center;
}
.orderCleft_img img{
	width:100%;
	height:100%;
}
.orderCleft_name{
	padding:0 20px;
	box-sizing:border-box;
}
.orderCleft_name span{
	display:block;
	margin:10px 0;
}
.orderCleft_name .orderCleft_namex{
	color:#999;
	font-size:12px;
}
.checkorder{
	background:#fff;
	padding:20px;
	box-sizing:border-box;
}
.checkorder h2{
	margin-bottom:20px;
	font-size:16px;
	font-weight:700;
	border-bottom:1px solid #ff854b;
	padding:0 20px;
	color:#333;
	line-height:40px;
}
.checkorder_state{
	padding:0 20px;
	margin-bottom:20px;
}
.checkorder_state span{
	padding-right:30px;
	font-size:14px;
	color:#333;
}
.checkorder_state span i{
	color:#4b9d01;
	font-weight:700;
	font-style:normal;
}
.checkorder_state span b{
	color:#ff854b;
	font-weight:700;
}
.checkorder_detail h3{
	width:100%;
	height:40px;
	line-height:40px;
	padding:0 20px;
	box-sizing:border-box;
	font-size:14px;
	color:#333;
	background:#ffe7dc;
	font-weight:700;
}
.checkorder_seller_detail{
	padding:0 20px;
	box-sizing:border-box;
	border-bottom:1px solid #ddd;
}
.checkorder_seller_title{
	line-height:40px;
	color:#333;
	font-size:14px;
}
.checkorder_seller_content{
	font-size:0;
}
.checkorder_seller_content span{
	width:25%;
	display:inline-block;
	vertical-align:top;
	font-size:14px;
	color:#999;
	margin:5px 0;
	line-height:22px;
}
.checkorder_list_content{
	padding:20px;
	box-sizing:border-box;
	border-bottom:1px solid #ddd;
}
.checkorder_money{
	padding:20px;
	border-bottom:1px solid #ddd;
}
.checkorder_money span{
	padding-right:30px;
	font-size:16px;
	font-weight:700;
	color:#333;
}
.checkorder_money span i{
	color:red;
	font-style:normal;
	font-weight:700;
}
.checkorder_qt{
	margin:20px 0;
	padding:0 20px;
	box-sizing:border-box;
}
.checkorder_qt li{
	height:30px;
	line-height:30px;
	font-size:14px;
	color:#666;
}
.checkorder_wl{
	padding:20px;
	box-sizing:border-box;
}
.checkorder_wl li{
	height:30px;
	line-height:30px;
	font-size:14px;
	color:#333;
}
</style>

<script>
import axios from 'axios'

export default {
  name: 'MyOrderDetail',
  data() {
    return {
      showType: this.$route.query.type,
      orderId: this.$route.query.orderId,
      orderInfo: {},
      sellerInfo: {},
      buyerInfo: {},
      goodsList: [],
      orderExt: {},
      storeInfo: {},
      sendGoodsTime: '',
      orderLog: []
    }
  },
  mounted() {
    this.getOrderInfo(this.$Lwy.getOrderInfo.type, this.$Lwy.getOrderInfo.target)
  },
  methods: {
    getOrderInfo: function(type, target) {
      var param = {}
      param.id = this.orderId
      return new Promise((resolve, reject) => {
        axios[type](target, param).then(response => {
          this.orderInfo = response.data.data
          this.goodsList = response.data.data.goodsList
          this.orderExt = response.data.data.orderExtmData
          this.orderLog = response.data.data.logList
          this.buyer = response.data.data.buyer
          this.sellerInfo = response.data.data.seller
          this.storeInfo = response.data.data.storeData
          this.sendGoodsTime = response.data.data.sendGoodTime
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    }
  }
}

</script>
