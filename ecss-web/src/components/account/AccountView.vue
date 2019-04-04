<template>
  <!-- <div v-html="account.text"/> -->
  <el-collapse v-model="activeNames" @change="handleChange">
    <div class="account_title">账户概览</div>
    <el-collapse-item title="个人资料" name="1">
      <el-container>
        <el-aside width="130px">
          <img :src="account.photo" style="height:100%;width:130px;max-height:165px;max-width:130px;">
        </el-aside>
        <el-main class="account-main">
          <el-row :gutter="0" class="title">
            <el-col :span="8">
              <span>欢迎您,&nbsp;&nbsp;{{ account.name }} &nbsp;&nbsp;</span>
            </el-col>
            <el-col :span="8">
              <a href="javascript:void(0);" @click="handleEditAccountEvent">查看个人资料>></a>
            </el-col>
          </el-row>
          <el-row :gutter="0" class="login-record">
            <el-col :span="16">
              <span>上次登录时间: &nbsp;&nbsp;{{ account.lastLogin }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="16">
              <span>上次登录IP: &nbsp;&nbsp;{{ account.lastIp }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="0" class="short-msg">
            <el-col :span="8">
              <span>您有&nbsp;<span style="font-size:16px;color:red;">{{ noReadMsgNum }}</span>&nbsp;条短消息</span>
            </el-col>
            <el-col :span="8">
              <a href="javascript:void(0);" @click="tomsg()" >点击查看</a>
            </el-col>
          </el-row>
        </el-main>
        <!-- <el-aside class="account-right">
          <el-row :gutter="0">
            <el-col :span="8">
              <span style="font-size:14px;">卖家信用:</span>
            </el-col>
            <el-col :span="16" style="text-align:left;vertical-align:middle;">
              <el-rate v-model="creditValue" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="5" show-score text-color="#ff9900" disabled />
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col>
              <span style="font-size:14px;">卖家好评率: &nbsp;&nbsp;<span>{{ account.praiseRate }}</span></span>
            </el-col>
          </el-row>
        </el-aside> -->
      </el-container>
    </el-collapse-item>
    <el-collapse-item title="买家提醒" name="2">
      <el-container style="border-top: 1px solid #e2e2e2;overflow:hidden;">
        <el-main class="buyer-main">
          <el-row :gutter="0" class="title">
            <el-col :span="8">
              <span>订单提醒</span>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :offset="1">
              <span>您有<span style="color:#fe5400;">{{ account.stayPaymentOrderNum }}</span>个待付款的订单，请尽快到<span style="color:#2a5ac9;">“待付款订单”</span>中付款</span>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :offset="1">
              <span>您有<span style="color:#fe5400;">{{ account.hasPaymentOrderNum }}</span>个订单卖家已发货，等待您的确认，请尽快到<span style="color: #2a5ac9;">“已发货订单”</span>中确认</span>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :offset="1">
              <span>您有<span style="color:#fe5400;">{{ account.finishOrderNum }}</span>个订单还没有评价，请尽快到<span style="color: #2a5ac9;">“已完成订单”</span>中确认</span>
            </el-col>
          </el-row>
        </el-main>
        <el-aside>
          <el-row style="height:100%;line-height:130px;vertical-align:middle;text-align:left;">
            <el-col>
              <el-button type="primary" size="small" icon="el-icon-edit" @click="handleMyOrderEvent">查看我的订单</el-button>
            </el-col>
          </el-row>
        </el-aside>
      </el-container>
    </el-collapse-item>
    <el-collapse-item title="卖家提醒" name="3">
      <el-container style="border-top: 1px solid #e2e2e2;">
        <el-main style="text-align:left;padding:3px;margin-left:0;overflow:hidden;">
          <el-row :gutter="0" class="title">
            <el-col :span="8">
              <span>订单提醒</span>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :offset="1">
              <span>您有<span style="color:#fe5400;">{{ account.stayHandleOrderNum }}</span>个待处理的订单，请尽快到<span style="color:#2a5ac9;">“已提交订单”</span>中处理</span>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :offset="1">
              <span>您有<span style="color:#fe5400;">{{ account.stayDeliverOrderNum }}</span>个待发货的订单，请尽快到<span style="color: #2a5ac9;">“待发货订单”</span>中处理</span>
            </el-col>
          </el-row>
        </el-main>
        <el-aside>
          <el-row style="line-height:65px;vertical-align:middle;text-align:left;">
            <el-col>
              <el-button type="primary" size="small" icon="el-icon-edit">查看我的店铺</el-button>
            </el-col>
          </el-row>
          <el-row style="line-height:65px;vertical-align:middle;text-align:left;">
            <el-col>
              <el-button type="primary" size="small" icon="el-icon-edit" @click="handleOrderManageEvent">管理我的订单</el-button>
            </el-col>
          </el-row>

        </el-aside>
      </el-container>
    </el-collapse-item>
  </el-collapse>
</template>

<style>
.el-collapse{
  border-top:0;
}
.el-aside {
  min-height: 130px;
  overflow: hidden;
}

.account-main {
  text-align: left;
  padding: 3px;
  margin-left: 32px;
  overflow: hidden;
}

.account-right {
  text-align: left;
}

.buyer-main {
  text-align: left;
  padding: 3px;
  margin-left: 0;
  overflow: hidden;
  /* padding-left: 16px; */
}

.title {
  font-size: 14px;
  font-weight: bold;
}

.login-record {
  margin-top: 24px;
  font-size: 14px;
}

.short-msg {
  margin-top: 24px;
  font-size: 14px;
}
.el-button--primary{
  background:#f45408;
  color:#fff;
  border-radius:5px;
  border:none;
  box-sizing:border-box;
}
.el-button--primary:focus, .el-button--primary:hover{
  background:rgb(255, 225, 211);
  color:#333;
  border:1px solid #f45408;
}
.account_title{
  font-size:16px;
  color:#f45408;
  font-weight:700;
  text-align:left;
  line-height:50px;
  height:50px;
  border-bottom:1px solid #eee;
}

</style>

<script>
import axios from 'axios'

export default {
  name: 'AccountView',
  data() {
    return {
      activeNames: ['1', '2', '3'],
      account: {},
      creditValue: 0,
      noReadMsgNum: 0
    }
  },
  mounted() {
    this.getAccount(this.$Api.getAccountByCurrent.type, this.$Api.getAccountByCurrent.target)
    this.getNoReadArr()
  },
  methods: {
    handleChange: function(data) {
      console.log('account: ' + data)
    },
    getAccount: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.account = response.data.data
          this.creditValue = response.data.data.creditValue / 20
          console.log(this.account)
          console.log(this.creditValue)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    handleEditAccountEvent: function(param) {
      this.$emit('edit_account_event', 'PersonView')
    },
    handleMyOrderEvent: function(param) {
      this.$emit('my_order_event', 'MyOrder')
    },
    handleOrderManageEvent: function(param) {
      this.$emit('order_manage_event', 'OrderManage')
    },
    tomsg: function() {
      this.$emit('order_manage_event', 'ShortMsg')
    },
    // 获取未读消息
    getNoReadArr: function() {
      const type = this.$Lwy.listNoReadMsg.type
      const target = this.$Lwy.listNoReadMsg.target
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.noReadMsgNum = response.data.data.length
          console.log(this.noReadArr)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    }
  }
}
</script>
