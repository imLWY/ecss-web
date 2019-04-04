<template>
  <el-tabs type="border-card">
    <el-tab-pane label="基本信息">
      <el-form ref="personalForm" :model="account" label-width="160px" style="width:40%;">
        <el-form-item label="用户名：">
          <el-input v-model="account.name" disabled />
        </el-form-item>
        <el-form-item label="学号：">
          <el-input v-model="account.number" disabled />
        </el-form-item>
        <el-form-item label="电子邮箱：">
          <el-input v-model="account.email" disabled />
        </el-form-item>
        <el-form-item label="地址：">
          <el-input v-model="account.address" disabled />
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <!-- <el-tab-pane label="修改密码">修改密码</el-tab-pane>
    <el-tab-pane label="修改电子邮箱">修改电子邮箱</el-tab-pane> -->
  </el-tabs>
</template>

<style>

</style>

<script>
import axios from 'axios'

export default {
  name: 'PersonView',
  data() {
    return {
      account: {}
    }
  },
  mounted() {
    this.getAccount(this.$Api.getAccountByCurrent.type, this.$Api.getAccountByCurrent.target)
  },
  methods: {
    getAccount: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.account = response.data.data
          console.log(this.account)
          console.log(this.creditValue)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    }
  }
}
</script>
