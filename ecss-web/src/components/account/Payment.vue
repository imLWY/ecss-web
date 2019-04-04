<template>
  <el-tabs type="border-card">
    <el-tab-pane label="我的支付通">
      <div class="payment">
        <div class="payment_last">
          <!-- <p>支付通余额：<i/></p> -->
          <p>您的支付通当前余额为：<i>{{ blanceShow }}</i>元</p>
        </div>
        <div class="payment_record">
          <h3>支付通交易记录</h3>
          <el-table
            :data="paymentsData"
            stripe
            style="width:100%">
            <el-table-column prop="orderId" label="订单编号" width="150"/>
            <el-table-column prop="userNameShow" label="买家/卖家" width="150"/>
            <el-table-column prop="moneyShow" label="交易金额（收/支）"/>
            <el-table-column prop="updatedTime" label="交易时间" width="150"/>
          </el-table>
          <!-- 分页 -->
          <div style="height:24px;"/>
          <el-pagination
            :current-page="search.page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="search.pageSize"
            :total="search.total"
            layout="total, sizes, prev, pager, next, jumper"
            style="text-align:center;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
            <!--分页结束-->
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<style>
@import '../../../static/css/element-ui.css';

  .paging{
    margin:30px auto;
    text-align:center;
  }
.height10{
  height:10px;
  border-bottom:1px solid #eee;
}
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
  .payment{
    margin-top:20px;
    padding:20px 0;
    border-top:1px solid #eee;
    text-align:left;
  }
  .payment_last p{
    padding:0 20px;
    margin:8px 0;
    font-size:14px;
    font-weight:700;
  }
  .payment_last p i{
    font-style:normal;
    color:red;
  }
  .payment_record{
    margin:20px 0;
    border-top:1px solid #f45408;
  }
  .payment_record h3{
    line-height:30px;
    color:#f45408;
    font-weight:400;
    font-size:14px;
  }
  .payment_record table{
    width:100%;
  }
  .payment_record table th{
    height:50px;
    line-height:50px;
    text-align:center;
    font-size:14px;
  }
  .payment_record table td{
    text-align:center;
    font-size:12px;
    border-bottom:1px solid #eee;
    padding:10px 0;
  }
  .payment_record table td:first-child a{
    color:#5ba439;
  }
  .payment_record table td:nth-child(3){
    color:red;
  }
</style>

<script>
import axios from 'axios'

export default {
  name: 'Payment',
  data() {
    return {
      search: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      paymentsData: [],
      blanceShow: ''
    }
  },
  mounted() {
    this.getBlance(this.$Lwy.listZftBalanceByCurrent.type, this.$Lwy.listZftBalanceByCurrent.target)
    this.getRecords(this.$Lwy.listZftRecordsByCurrent.type, this.$Lwy.listZftRecordsByCurrent.target)
  },
  methods: {
    handleSizeChange: function(val) {
      console.log(val)
      this.search.pageSize = val
      this.getRecords(this.$Lwy.listZftRecordsByCurrent.type, this.$Lwy.listZftRecordsByCurrent.target)
    },
    handleCurrentChange: function(val) {
      console.log(val)
      this.search.page = val
      this.getRecords(this.$Lwy.listZftRecordsByCurrent.type, this.$Lwy.listZftRecordsByCurrent.target)
    },
    getBlance: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.blanceShow = response.data.data.balance
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    getRecords: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target, this.search).then(response => {
          this.paymentsData = response.data.data.dataList
          this.search.total = response.data.data.total
          console.log(this.paymentsData)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    }
  }
}
</script>
