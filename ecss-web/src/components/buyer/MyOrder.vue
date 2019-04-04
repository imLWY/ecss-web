<template>
  <el-tabs type="border-card">
    <el-tab-pane label="订单列表">
      <div class="mine_order">
        <div class="order_form">
          <div class="order_form_input order_form_input01">
            <label>下单时间：</label>
            <div class="orderForm_inputs">
              <el-date-picker
                v-model="searchParam.searchDate"
                :picker-options="pickerOptions"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                format="yyyy-MM-dd HH:mm"
                align="right"
                style="width:100%;" />
            </div>
          </div>
          <div class="order_form_input">
            <label>订单状态：</label>
            <div class="orderForm_inputs">
              <el-select v-model="searchParam.orderStatus" clearable placeholder="请选择" style="width:100%;">
                <el-option v-for="item in orderStatusAll" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>
          <div class="order_form_input">
            <label>订单号：</label>
            <div class="orderForm_inputs">
              <el-input v-model="searchParam.orderNumber" placeholder="请输入订单号" style="width:100%;" />
            </div>
          </div>
          <div class="order_form_input order_form_input04">
            <input type="submit" value="搜索" class="order_submit" @click="search">
          </div>
        </div>
        <div class="order-list">
          <div v-for="order in myOrders.dataList" :key="order.id" class="orderList">
            <div class="orderList_head">
              <span class="order_shopNum">订单号：{{ order.orderNumber }}</span>
              <span class="order_shopName">店铺名：<a href="#">{{ order.shopName }}</a><a href=""><img src="../../../static/img/zn.png"></a></span>
              <span class="order_shopState">订单状态：<b>{{ order.orderStatusName }}</b></span>
            </div>
            <ul class="order_list_detail">
              <li v-for="good in order.goodsList" :key="good.id">
                <div class="orderListImgs">
                  <a href="" class="orderListImg"><img :src="good.goodsImage"></a>
                  <span class="orderListTitle">
                    <strong>{{ good.goodsName }}</strong>
                    <em>{{ good.specification }}</em>
                  </span>
                </div>
                <span class="orderListsl">价格：{{ good.price }}</span>
                <span class="orderListsl">数量：{{ good.quantity }}</span>
              </li>
            </ul>
            <div class="orderList_bottom">
              <div class="orderList-left">
                <span>下单时间：{{ order.orderTime }}</span>
                <span>支付方式：{{ order.paymentName }}</span>
                <span>物流信息：<em>{{ order.postscript }}</em></span>
                <span>订单总价：<b>{{ order.price }}</b></span>
              </div>
              <div v-if="order.orderStatus === 1" class="orderList-right orderList_th">
                <a href="javascript:void(0);" @click="payment(order.id)">付款</a>
                <a href="javascript:void(0);" @click="cancelOrder(order.id,order.orderNumber)">取消订单</a>
                <a href="javascript:void(0);" @click="orderInfo(order.id,order.orderNumber)">查看订单</a>
              </div>
              <div v-if="order.orderStatus === 3" class="orderList-right orderList_th">
                <a href="javascript:void(0);" @click="returnOrder(order.id,order.orderNumber,order.orderStatus)">申请退货</a>
                <a href="javascript:void(0);" @click="orderInfo(order.id,order.orderNumber)">查看订单</a>
              </div>
              <div v-if="order.orderStatus === 4" class="orderList-right orderList_th">
                <a href="javascript:void(0);" @click="receivingGoods(order.id,order.orderNumber)">确认收货</a>
                <a href="javascript:void(0);" @click="orderInfo(order.id,order.orderNumber)">查看订单</a>
              </div>
              <div v-if="order.orderStatus === 5 && order.evaluationStatus !== 1" class="orderList-right orderList_th">
                <a href="javascript:void(0);" @click="evaluateGoods(order.id)">我要评价</a>
                <a href="javascript:void(0);" @click="returnOrder(order.id,order.orderNumber,order.orderStatus)">申请退货</a>
                <a href="javascript:void(0);" @click="orderInfo(order.id,order.orderNumber)">查看订单</a>
              </div>
              <div v-if="order.orderStatus === 5 && order.evaluationStatus === 1" class="orderList-right orderList_th">
                <a href="javascript:void(0);" @click="orderInfo(order.id,order.orderNumber)">查看订单</a>
              </div>
              <div v-if="order.orderStatus === 6 || order.orderStatus === 7 || order.orderStatus === 8 || order.orderStatus === 2 || order.orderStatus === 9 || order.orderStatus === 10" class="orderList-right orderList_th">
                <a href="javascript:void(0);" @click="orderInfo(order.id,order.orderNumber)">查看订单</a>
              </div>
              <!-- <div v-if="order.orderStatus === 7" class="orderList-right orderList_th">
                <a href="">查看订单</a>
              </div>
              <div v-if="order.orderStatus === 8" class="orderList-right orderList_th">
                <a href="">查看订单</a>
              </div> -->

              <!-- <div class="orderList-right orderList_th">
                <a href="javascript:void(0);" @click="testPostFunc">申请退货</a>
                <a href="">查看订单</a>
              </div> -->
            </div>
          </div>
          <!--分页-->
          <div style="height:24px;"/>
          <el-pagination
            :current-page="searchParam.page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="searchParam.pageSize"
            :total="searchParam.total"
            layout="total, sizes, prev, pager, next, jumper"
            style="text-align:center;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        </div>
      </div>
    </el-tab-pane>
    <el-dialog :visible.sync="dialogPayFormVisible" title="付款" width="20%" >
      <el-form :model="form" :inline="true" label-width="150px" >
        <el-form-item label="支付方式">
          <el-radio v-model="form.paymentId" label="1" disabled>支付通</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPayFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="savePartner()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogCancelFormVisible" title="取消订单" width="50%" >
      <el-form :model="cancelForm" :inline="true">
        <el-form-item label="您是否确定要取消以下订单？"/>
        <el-form-item :label="orderNumber"/>
        <el-form-item label="取消原因：">
          <el-radio-group v-model="reason" @change="changeReason">
            <el-radio :label="1">改选其他商品</el-radio>
            <el-radio :label="2">改选其他配送方式</el-radio>
            <el-radio :label="3">改选其他卖家</el-radio>
            <el-radio :label="4">其他原因</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="">
          <el-input v-if="reason == 4" v-model="cancelForm.cancelReason" type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCancelFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCancelPartner()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogReturnFormVisible" title="申请退货" width="50%" >
      <el-form :model="returnForm" :inline="true">
        <el-form-item label="确定要申请退货？"/>
        <el-form-item :label="returnOrderNumber"/>
        <el-form-item label="取消原因：">
          <el-radio-group v-model="returnReason" @change="changeReturnReason">
            <el-radio :label="1">商品与描述不符</el-radio>
            <el-radio :label="2">其他原因</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogReturnFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveReturnPartner()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogEvaluateFormVisible" title="订单评价" width="60%" >
      <el-form :inline="true" model="evaluateForm">
        <!-- <el-form-item label="">
          <a href="" class="orderListImg"><img :src="evaluateForm.goodsImage"></a>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="evaluateForm.quantity"/>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="evaluateForm.price"/>
        </el-form-item> -->
        <el-form-item :label="storeName" style="display:block;width:100%;border-bottom:1px solid #f45408;"/>
        <el-row v-for="(item, index) in evaluateForm" :key="index" :gutter="10" style="width:100%;border-bottom:1px solid #ddd;margin-bottom:20px;">
          <el-form-item label="">
            <a href="" class="orderListImg after_goodsimg"><img :src="evaluateForm[index].goodsImg"></a>
            <el-form-item :label="evaluateForm[index].goodsName" class="after_goodsname"/>
            <el-form-item :label="evaluateForm[index].specification" class="after_goodstip"/>
            <el-form-item label="数量：" class="after_goodsnum01"/>
            <el-form-item :label="evaluateForm[index].quantity" class="after_goodsnum02"/>
            <el-form-item label="价格：" class="after_goodspeice01"/>
            <el-form-item :label="evaluateForm[index].price" class="after_goodsprice02"/>
          </el-form-item>
          <!-- <el-form-item label="数量">
            <el-input v-model="evaluateForm[index].quantity"/>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="evaluateForm[index].price"/>
          </el-form-item> -->
        </el-row>
        <div class="after_addpj">
          <el-form-item label="我的评价" class="after_pj">
            <el-radio-group v-model="evaluation" @change="changeEvaluateReason">
              <el-radio :label="3">好评</el-radio>
              <el-radio :label="2">中评</el-radio>
              <el-radio :label="1">差评</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="" class="after_pjtext">
            <el-input v-model="comment" type="textarea"/>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEvaluateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEvaluatePartner()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogReceivingFormVisible" title="确认收货" width="20%" >
      <el-form :model="receivingForm" :inline="true" label-width="300px" >
        <el-form-item label="您是否确已经收到以下订单的货品？"/>
        <el-form-item :label="receivingForm.orderNumber"/>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogReceivingFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveReceivingPartner()">确 定</el-button>
      </div>
    </el-dialog>
  </el-tabs>
</template>

<style scope>
@import "../../../static/css/element-ui.css";

  ul,li{
    list-style:none;
  }
  input,button,select{
    border:none;
    background:none;
    outline:none;
  }
  .el-tabs--border-card{
    border:none;
    box-shadow: none;
  }
  .el-tabs--border-card>.el-tabs__header{
    background:none;
    border:none;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    border:none;
    color:#f45408;
    font-size:16px;
    font-weight:700;
    background:none;
  }
  .el-tabs--border-card>.el-tabs__content{
    padding:0;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover{
    color:#f45408;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item{
    border:none;
    color:#999;
    font-size:16px;
    font-weight:700;
  }
  .mine_order{
    border-top:1px solid #eee;
    padding-top:20px;
    text-align:left;
  }
  .order_form{
    font-size:0;
  }
  .order_form_input{
    width:50%;
    padding:10px;
    box-sizing:border-box;
    display:inline-block;
    vertical-align:middle;
    font-size:14px;
    color:#666;
    font-size:0;
  }
  .order_form_input label,.order_form_input .orderForm_inputs{
    display:inline-block;
    vertical-align:middle;
    font-size:14px;
  }
  .order_form_input label{
    width:20%;
  }
  .order_form_input .orderForm_inputs{
    width:80%;
  }
  .orderForm_inputs input,.orderForm_inputs select{
    width:100%;
    height:40px;
    line-height:40px;
    padding:0 10px;
    box-sizing:border-box;
    border:1px solid #ddd;
  }
  .order_form_input01 .orderForm_inputs{
    font-size:0;
  }
  .order_form_input01 .orderForm_inputs input{
    display:inline-block;
    vertical-align:middle;
    font-size:14px;
    width:47%;
  }
  .order_form_input01 .orderForm_inputs input:first-child{
    margin-right:5%;
  }
  .order_submit{
    height:40px;
    padding:0 40px;
    border-radius:5px;
    line-height:40px;
    color:#fff;
    background:#ff854b;
    font-size:14px;
    cursor:pointer;
  }
  .orderList{
    margin:10px 0;
    padding:10px;
    border-bottom:3px solid #eff4f8;
  }
  .orderList_head{
    height:40px;
    line-height:40px;
    font-size:0;
    border-bottom:1px solid #ff854b;
  }
  .order_shopNum,.order_shopName,.order_shopState{
    display:inline-block;
    vertical-align:middle;
    font-size:14px;
    width:33.3%;
  }
  .order_shopNum{
    color:#4b9d01;
    font-weight:700;
  }
  .order_shopName a img{
    display:block;
  }
  .order_shopName a{
    display:inline-block;
    padding-right:10px;
    color:#ff854b;
    vertical-align:middle;
  }
  .order_shopState{
    text-align:right;
  }
  .order_list_detail{
    margin:20px 0;
    padding:0;
  }
  .order_list_detail li{
    padding:10px 0;
    border-bottom:1px solid #eee;
    font-size:0;
  }
  .orderListImgs,.orderListsl{
    display:inline-block;
    vertical-align:middle;
    font-size:14px;
    width:25%;
  }
  .orderListsl{
    font-size:14px;
    text-align:center;
  }
  .orderListImgs{
    width:50%;
    font-size:0;
  }
  .orderListImg,.orderListTitle{
    display:inline-block;
    vertical-align:middle;
    font-size:14px;
  }
  .orderListImg{
    margin-right:10px;
    width:100px;
    height:80px;
    overflow:hidden;
    border-radius:5px;
  }
  .orderListImg img{
    width:100%;
    height:100%;
  }
  .orderListTitle{
    width:290px;
    padding:0 10px;
    box-sizing:border-box;
  }
  .orderListTitle strong,.orderListTitle em{
    font-style:normal;
    display:block;
    text-align:left;
  }
  .orderListTitle strong{
    font-weight:700;
    font-size:14px;
    color:#333;
    margin-bottom:8px;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .orderListTitle em{
    font-weight:400;
    font-size:12px;
    color:#999;
  }
  .orderListsl:last-child{
    text-align:right;
  }
  .orderList_bottom{
    height:60px;
    line-height:60px;
    font-size:0;
  }
  .orderList-left,.orderList-right{
    display:inline-block;
    vertical-align:middle;
    font-size:14px;
  }
  .orderList-left{
    float:left;
  }
  .orderList-left span{
    padding-right:10px;
    font-size:12px;
    color:#666;
  }
  .orderList-left span em{
    font-style:normal;
    color:#ff854b;
  }
  .orderList-left span b{
    font-weight:700;
    color:red;
    font-size:14px;
  }
  .orderList-right{
    text-align:right;
    float:right;
    font-size:0;
  }
  .orderList-right a{
    margin:0 10px;
    display:inline-block;
    vertical-align:middle;
    font-size:14px;
    height:40px;
    line-height:40px;
    padding:0 20px;
    border-radius:5px;
    background:#f45408;
    color:#fff;
  }
  .orderList_th a:first-child{
    background:#ffcfb8;
    color:#333;
  }
  /*分页*/
  /* .paging{
    margin:20px auto;
    text-align:center;
    font-size:0;
  }
  .paging a,.paging span{
    margin:0 5px;
    display:inline-block;
    vertical-align:middle;
    font-size:14px;
    width:30px;
    height:30px;
    border-radius:30px;
    text-align:center;
    line-height:30px;
    color:#333;
    border:1px solid #ff854b;
    cursor:pointer;
  }
  .paging a:hover{
    background:#ff854b;
    color:#fff;
  } */
  /*分页结束*/
  .after_goodsimg{
    width:100px;
  }
  .after_goodsname{
    width:260px;
    box-sizing:border-box;
    vertical-align:middle!important;
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-align:left;
  }
  .after_goodsname label{
    text-align:left!important;
    padding:0!important;
    line-height:20px!important;
  }
  .after_goodstip{
    width:150px;
    box-sizing:border-box;
    vertical-align:middle!important;
  }
  .after_goodsnum01,.after_goodsnum02,.after_goodspeice01,.after_goodsprice02{
    vertical-align:middle!important;
  }
  .after_addpj .after_pjtext textarea{
    width:430px;
    margin-left:40px;
  }
</style>

<script>
import axios from 'axios'

export default {
  name: 'MyOrder',
  data() {
    return {
      dialogPayFormVisible: false,
      dialogCancelFormVisible: false,
      dialogReturnFormVisible: false,
      dialogEvaluateFormVisible: false,
      dialogReceivingFormVisible: false,
      searchParam: {
        searchDate: ['', ''],
        orderNumber: '',
        orderStatus: '',
        page: 1,
        pageSize: 10,
        total: 0
      },
      orderGoodsParam: {
        orderId: 0
      },
      receivingForm: {
        id: '',
        orderNumber: ''
      },
      myOrders: {},
      orderStatusAll: [],
      orderStatusSelected: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      testPost: {
        ids: [
          1,
          2,
          3
        ]
      },
      form: {
        id: 0,
        paymentId: '1',
        paymentName: ''
      },
      cancelForm: {
        id: 0,
        cancelReason: ''
      },
      returnForm: {
        id: 0,
        cancelReason: '',
        status: 0
      },
      evaluateForm: [
        {
          id: 0,
          goodsImage: '',
          quantity: '',
          price: 0,
          orderId: 0
        }
      ],
      evaluation: '',
      comment: '',
      orderNumber: '',
      reason: '',
      returnOrderNumber: '',
      returnReason: '',
      storeName: ''
    }
  },
  mounted() {
    this.getMyOrderList(this.$Api.myOrderList.type, this.$Api.myOrderList.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize })
    this.getOrderStatus(this.$Api.orderStatus.type, this.$Api.orderStatus.target)
  },
  methods: {
    getMyOrderList: function(type, target, data) {
      return new Promise((resolve, reject) => {
        axios[type](target, data).then(response => {
          this.myOrders = response.data.data
          console.log(response.data)
          this.searchParam.total = this.myOrders.total
          console.log(this.myOrders)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    getOrderStatus: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.orderStatusAll = response.data.data.data
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    search: function() {
      if (this.searchParam.searchDate === null) {
        this.searchParam.searchDate = ['', '']
      }
      this.getMyOrderList(this.$Api.myOrderList.type, this.$Api.myOrderList.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize, orderNumber: this.searchParam.orderNumber, orderStatus: this.searchParam.orderStatus, startTime: this.searchParam.searchDate[0], endTime: this.searchParam.searchDate[1] })
    },
    handleSizeChange: function(val) {
      console.log('每页${val}条')
    },
    handleCurrentChange: function(val) {
      console.log('当前页:${val}')
      this.searchParam.page = val
      this.getMyOrderList(this.$Api.myOrderList.type, this.$Api.myOrderList.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize })
    },
    testPostFunc: function() {
      return new Promise((resolve, reject) => {
        axios['post']('http://192.168.10.32:9798/admin/friend/del_friend_by_friendIds', this.testPost).then(response => {
          console.log(response.data)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    payment: function(orderId) {
      // this.form.id = val
      // this.dialogPayFormVisible = true
      this.$router.push({
        name: 'BuyOrder',
        query: {
          orderId: orderId
        }
      })
    },
    savePartner: function() {
      this.form.paymentName = '支付通'
      const type = this.$Yjj.paymentOrder.type
      const target = this.$Yjj.paymentOrder.target
      return new Promise((resolve, reject) => {
        axios[type](target, this.form).then(response => {
          this.dialogPayFormVisible = false
          const code = response.data.code
          if (code === '2000') {
            // 刷新列表
            this.getMyOrderList(this.$Api.myOrderList.type, this.$Api.myOrderList.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize })
            this.$message({
              type: 'success',
              message: '支付成功!'
            })
            resolve(response.data)
          } else {
            this.$message({
              type: 'error',
              message: '支付失败!'
            })
          }
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    cancelOrder: function(val, orderNumber) {
      this.cancelForm.id = val
      this.reason = 1
      this.orderNumber = '订单号：' + orderNumber
      this.dialogCancelFormVisible = true
    },
    changeReason: function(value) {
      this.reason = value
      if (value === 4) {
        this.cancelForm.cancelReason = ''
      }
    },
    saveCancelPartner: function() {
      if (this.reason === 1) {
        this.cancelForm.cancelReason = '改选其他商品'
      } else if (this.reason === 2) {
        this.cancelForm.cancelReason = '改选其他配送方式'
      } else if (this.reason === 3) {
        this.cancelForm.cancelReason = '改选其他卖家'
      }
      const type = this.$Yjj.cancelOrder.type
      const target = this.$Yjj.cancelOrder.target
      return new Promise((resolve, reject) => {
        axios[type](target, this.cancelForm).then(response => {
          this.dialogCancelFormVisible = false
          const code = response.data.code
          if (code === '2000') {
            // 刷新列表
            this.getMyOrderList(this.$Api.myOrderList.type, this.$Api.myOrderList.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize })
            this.$message({
              type: 'success',
              message: '取消成功!'
            })
            resolve(response.data)
          } else {
            this.$message({
              type: 'error',
              message: '取消失败!'
            })
          }
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    returnOrder: function(val, orderNumber, status) {
      this.returnForm.id = val
      this.returnForm.status = status
      this.returnReason = 1
      this.returnOrderNumber = '订单号：' + orderNumber
      this.dialogReturnFormVisible = true
    },
    receivingGoods: function(val, orderNumber) {
      this.receivingForm.id = val
      this.receivingForm.orderNumber = '订单号：' + orderNumber
      this.dialogReceivingFormVisible = true
    },
    saveReceivingPartner: function() {
      const type = this.$Yjj.getSignOrder.type
      const target = this.$Yjj.getSignOrder.target + '?id=' + this.receivingForm.id
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.dialogReceivingFormVisible = false
          const code = response.data.code
          if (code === '2000') {
            // 刷新列表
            this.getMyOrderList(this.$Api.myOrderList.type, this.$Api.myOrderList.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize })
            this.$message({
              type: 'success',
              message: '确认收货成功!'
            })
            resolve(response.data)
          } else {
            this.$message({
              type: 'error',
              message: '确认收货失败!'
            })
          }
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    changeReturnReason: function(value) {
      this.returnReason = value
    },
    saveReturnPartner: function() {
      const type = this.$Yjj.returnOrder.type
      const target = this.$Yjj.returnOrder.target + '?id=' + this.returnForm.id + '&reason=' + this.returnReason + '&status=' + this.returnForm.status
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.dialogReturnFormVisible = false
          const code = response.data.code
          if (code === '2000') {
            // 刷新列表
            this.getMyOrderList(this.$Api.myOrderList.type, this.$Api.myOrderList.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize })
            this.$message({
              type: 'success',
              message: '取消成功!'
            })
            resolve(response.data)
          } else {
            this.$message({
              type: 'error',
              message: '取消失败!'
            })
          }
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    evaluateGoods: function(val) {
      this.orderGoodsParam.orderId = val
      this.evaluateForm.orderId = val
      const type = this.$Yjj.getOneOrderGoods.type
      const target = this.$Yjj.getOneOrderGoods.target
      return new Promise((resolve, reject) => {
        axios[type](target, this.orderGoodsParam).then(response => {
          this.evaluateForm = response.data.data
          this.storeName = '店铺名:' + response.data.data[0].storeName
          this.evaluation = 3
          this.comment = ''
          this.dialogEvaluateFormVisible = true
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    saveEvaluatePartner: function() {
      for (var i = 0; i < this.evaluateForm.length; i++) {
        this.evaluateForm[i].evaluation = this.evaluation
        this.evaluateForm[i].comment = this.comment
      }
      // alert(this.evaluateForm[1].id)
      // var evaluates = {}
      // var assess = []
      // var evaluate = {
      //   id: this.evaluateForm.id,
      //   evaluation: this.evaluateForm.evaluation,
      //   comment: this.evaluateForm.comment,
      //   orderId: this.evaluateForm.orderId
      // }
      // assess.push(evaluate)
      // evaluates = assess
      var evaluates = this.evaluateForm
      const type = this.$Yjj.addOrderGoodsEvaluate.type
      const target = this.$Yjj.addOrderGoodsEvaluate.target
      return new Promise((resolve, reject) => {
        axios[type](target, evaluates).then(response => {
          this.dialogEvaluateFormVisible = false
          const code = response.data.code
          if (code === '2000') {
            // 刷新列表
            this.getMyOrderList(this.$Api.myOrderList.type, this.$Api.myOrderList.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize })
            this.$message({
              type: 'success',
              message: '评价成功!'
            })
            resolve(response.data)
          } else {
            this.$message({
              type: 'error',
              message: '评价失败!'
            })
          }
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    orderInfo: function(id, num) {
      this.$router.push({
        name: 'MyOrderDetail',
        query: {
          orderId: id,
          type: 'showSeller'
        }
      })
    }
  }
}
</script>
