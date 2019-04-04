<template>
  <el-container>
    <el-header style="min-height:70px;min-width:100%;border-bottom:1px solid #e2e2e2;">
      <Header />
    </el-header>
    <el-container>
      <div class="goodsBuy">
        <el-steps :active="2" process-status="process" finish-status="success" simple style="margin-top:20px;">
          <el-step title="确认购物清单" />
          <el-step title="确认收货人资料及配送方式" />
          <el-step title="确认支付" />
        </el-steps>
        <div class="mygoodscar_title">
          <h3>确认支付</h3>
        </div>
        <div style="margin-top:16px;">
          <el-row :gutter="20">
            <el-col :span="24">
              <div style="border: 1px solid #BBDDAA;padding:48px;">
                <p style="font-weight:bold;font-size:16px;">订单提交成功！订单总价 <span style="font-size:24px;color:red;">￥{{ order.totalPrice }}</span></p>
                <p style="font-size:14px;margin-left:16px;">*您的订单已经成功生成，选择您想用的支付方式进行支付。订单号 {{ order.orderNumber }}</p>
                <p style="font-size:14px;margin-left:16px;">*<a href="javascript:void(0);" @click="gotoMyOrder">您可以在用户中心中我的订单查看该订单</a></p>
              </div>
            </el-col>
            <el-col :span="24" style="margin:16px 0;">
              <div style="border:1px solid #dddddd;padding:48px;">
                <p style="font-weight:bold;font-size:16px;">选择支付方式并付款</p>
                <p style="font-size:14px;">在线支付</p>
                <p style="padding-left:16px;display:inline;">
                  <el-radio-group v-model="payMode">
                    <el-radio v-for="item in payMethods" :label="item.id" :key="item.id">
                      <!-- <img src="../../../static/img/cell-my.jpg" style="height:48px;width:128px;margin-left:12px;"> -->
                      {{ item.paymentName }}
                    </el-radio>
                  </el-radio-group>
                </p>
              </div>
            </el-col>
          </el-row>
          <a href="javascript:void(0);" class="goodsBuy_submit" @click="beforePay">确认支付</a>
        </div>
      </div>
    </el-container>
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>

<style lang="scss" scoped>
@import "../../../static/css/custom-ui.scss";
</style>

<style>
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
</style>

<script>
import axios from 'axios'

export default {
  name: 'BuyOrder',
  data() {
    return {
      payMode: 0,
      orderId: parseInt(this.$route.query.orderId),
      order: {},
      payMethods: []
    }
  },
  mounted() {
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail: function() {
      return new Promise((resolve, reject) => {
        axios[this.$Api.getOrderById.type](this.$Api.getOrderById.target + '?id=' + this.orderId).then(response => {
          console.log(response)
          this.order = response.data.data
          this.getPayMethods(this.order.sellerId)
          resolve(response.data.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    beforePay: function() {
      if (this.payMode === 0) {
        this.$message({
          type: 'warning',
          message: '请选择支付方式'
        })
        return
      }
      this.$confirm('此操作将扣减我的支付通余额，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.pay()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消支付'
        })
      })
    },
    pay: function() {
      return new Promise((resolve, reject) => {
        axios[this.$Api.orderPay.type](this.$Api.orderPay.target, { 'id': this.orderId, 'paymentId': this.payMode }).then(response => {
          console.log(response)
          if (response.data.data.status === 0) {
            this.$message({
              type: 'error',
              message: response.data.data.msg
            })
          }
          if (response.data.data.status === 1) {
            this.$message({
              type: 'success',
              message: response.data.data.msg
            })
            this.$router.push({
              name: 'User'
            })
          }
          resolve(response.data.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    gotoMyOrder: function() {
      this.$router.push({
        name: 'User'
      })
    },
    getPayMethods: function(storeId) {
      axios[this.$Api.getPaymentByStore.type](this.$Api.getPaymentByStore.target, { 'storeId': storeId }).then(response => {
        console.log(response)
        this.payMethods = response.data.data
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
