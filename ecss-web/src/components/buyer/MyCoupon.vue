<template>
  <el-tabs type="border-card">
    <el-tab-pane label="我的优惠卷">
      <div class="mycoupon">
        <a href="javascript:void(0);" class="mycoupon_btn" @click="addUserCoupon()">优惠券登记</a>
        <span class="mycoupon_all">
          <label><input type="checkbox" name="checkAll" @click="checkAll()">全选</label>
          <a href="javascript:void(0);" @click="delMyCoupons()">删除</a>
        </span>
        <div class="mycoupon_table">
          <table>
            <thead>
              <tr>
                <th style="width:5%;"/>
                <th style="width:10%;">优惠券号码</th>
                <th style="width:10%;">优惠金额</th>
                <th style="width:17%;">使用期限</th>
                <th style="width:17%;">使用条件</th>
                <th style="width:15%;">发放店铺</th>
                <th style="width:8%;">可用次数</th>
                <th style="width:8%;">是否有效</th>
                <th style="width:10%;">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="userCoupon in userCouponData" :key="userCoupon.id">
                <td><input :value="userCoupon.id" type="checkbox" name="ids"></td>
                <td>{{ userCoupon.couponSn }}</td>
                <td>{{ userCoupon.couponData.couponValue }}</td>
                <td>{{ userCoupon.couponData.start }}至{{ userCoupon.couponData.end }}</td>
                <td>一次购物满{{ userCoupon.couponData.minAmount }}</td>
                <td><a href="" class="coupon_shopname">{{ userCoupon.couponData.storeName }}</a></td>
                <td>{{ userCoupon.couponData.useTimes }}</td>
                <td v-if="userCoupon.couponData.isEffective === 1">是</td>
                <td v-if="userCoupon.couponData.isEffective === 0">否</td>
                <td>
                  <a href="javascript:void(0);" class="couponBtn" @click="handleDelClick(userCoupon.id)">删除</a>
                </td>
              </tr>
            </tbody>
          </table>
          <el-dialog :visible.sync="dialogFormVisible" title="优惠券登记" width="30%" >
            <el-form :model="form" :inline="true" label-width="150px" >
              <el-form-item label="优惠券号码">
                <el-input v-model="form.couponSn"/>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="savePartner()">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<style>
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
  .mycoupon{
    margin-top:20px;
    padding:20px 0;
    border-top:1px solid #eee;
    text-align:left;
  }
  .mycoupon_all{
    margin:20px 0;
    padding:20px 0;
    border-top:1px solid #f45408;
    display:block;
  }
  .mycoupon_all label{
    font-size:14px;
    color:#333;
    padding-right:30px;
  }
  .mycoupon_all a{
    color:#f45408;
    font-size:14px;
  }
  .mycoupon_btn{
    display:block;
    width:120px;
    height:40px;
    line-height:40px;
    border-radius:5px;
    background:#f45408;
    color:#fff;
    text-align:center;
  }
  .mycoupon_table table{
    width:100%;
  }
  .mycoupon_table table th{
    height:50px;
    line-height:50px;
    text-align:center;
    font-size:14px;
  }
  .mycoupon_table table td{
    padding:10px 0;
    border-bottom:1px solid #eee;
    font-size:12px;
    text-align:center;
  }
  .coupon_shopname{
    color:#f45408;
  }
  .couponBtn{
    padding:5px 10px;
    margin:0 3px;
    border-radius:5px;
    background:#f45408;
    color:#fff;
  }
</style>

<script>
import axios from 'axios'

export default {
  name: 'MyCoupon',
  data() {
    return {
      dialogFormVisible: false,
      userCouponData: [],
      searchParam: {
        userId: 1
      },
      delParam: {
        ids: []
      },
      amount: 0,
      form: {
        couponSn: ''
      }
    }
  },
  mounted() {
    this.getUserCouponList(this.$Yjj.getUserCoupon.type, this.$Yjj.getUserCoupon.target)
  },
  methods: {
    getUserCouponList: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.userCouponData = response.data.data
          console.log(this.userCouponData)
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
    // 优惠券登记按钮按下
    addUserCoupon: function() {
      for (const key in this.form) {
        delete this.form[key]
      }
      this.dialogFormVisible = true
    },
    // 单个删除我的优惠券
    handleDelClick: function(val) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // 确认按钮按下
        const type = this.$Yjj.delUserCouponById.type
        const target = this.$Yjj.delUserCouponById.target + '?id=' + val
        return new Promise((resolve, reject) => {
          axios[type](target).then(response => {
            // 刷新列表
            this.getUserCouponList(this.$Yjj.getUserCoupon.type, this.$Yjj.getUserCoupon.target)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
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
    // 确认提交
    savePartner: function() {
      const type = this.$Yjj.addUserCoupon.type
      const target = this.$Yjj.addUserCoupon.target
      return new Promise((resolve, reject) => {
        axios[type](target, this.form).then(response => {
          this.dialogFormVisible = false
          const code = response.data.code
          if (code === '2000') {
            if (response.data.data === 0) {
              this.$message({
                type: 'error',
                message: '该优惠券已被使用!'
              })
            } else if (response.data.data === -1) {
              this.$message({
                type: 'error',
                message: '无效的数据!'
              })
            } else {
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              // 刷新列表
              this.getUserCouponList(this.$Yjj.getUserCoupon.type, this.$Yjj.getUserCoupon.target)
            }
            resolve(response.data)
          } else {
            this.$message({
              type: 'error',
              message: '添加失败!'
            })
          }
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    // 全选控制
    checkAll: function() {
      this.amount += 1
      if (this.amount % 2 === 0) {
        const cks = document.getElementsByName('ids')
        for (var i = 0; i < cks.length; i++) {
          cks[i].checked = false
        }
      } else {
        const cks = document.getElementsByName('ids')
        for (var j = 0; j < cks.length; j++) {
          cks[j].checked = true
        }
      }
    },

    // 批量删除
    delMyCoupons: function() {
      var myCouponsIds = []
      const cks = document.getElementsByName('ids')
      for (var i = 0; i < cks.length; i++) {
        if (cks[i].checked === true) {
          myCouponsIds.push(cks[i].value)
        }
      }
      if (myCouponsIds.length < 1) {
        this.$message({
          type: 'info',
          message: '请选择要删除的记录!'
        })
        return
      } else {
        this.delParam.ids = myCouponsIds
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          // 确认按钮按下
          const type = this.$Yjj.delUserCouponByIds.type
          const target = this.$Yjj.delUserCouponByIds.target
          return new Promise((resolve, reject) => {
            axios[type](target, this.delParam).then(response => {
              // 刷新列表
              this.getUserCouponList(this.$Yjj.getUserCoupon.type, this.$Yjj.getUserCoupon.target)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
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
      }
    }
  }
}
</script>
