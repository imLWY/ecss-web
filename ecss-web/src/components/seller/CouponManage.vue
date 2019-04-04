<template>
  <el-tabs type="border-card">
    <el-tab-pane label="优惠卷列表">
      <div class="navigation">
        <a href="javascript:void(0);" class="navigation_add" @click="addCounpon(0)">新增优惠券</a>
        <table class="navTable">
          <thead>
            <tr>
              <th><input type="checkbox" name="checkAll" @click="checkAll()"></th>
              <th colspan="4">
                <span>全选</span>
                <a href="javascript:void(0);" @click="delCounpons()">删除</a>
              </th>
            </tr>
            <tr>
              <th style="width:5%;"/>
              <th style="width:15%;">优惠券名称</th>
              <th style="width:10%;">优惠金额</th>
              <th style="width:10%;">使用次数</th>
              <th style="width:20%;">使用期限</th>
              <th style="width:15%;">使用条件</th>
              <th style="width:25%;">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="counpon in counponList" :key="counpon.id">
              <td v-if="counpon.isEffective === 1 && counpon.ifIssue === 1">
                <input type="checkbox" disabled>
              </td>
              <td v-if="counpon.isEffective === 0">
                <input :value="counpon.id" type="checkbox" name="ids">
              </td>
              <td v-if="counpon.isEffective === 1 && counpon.ifIssue === 0">
                <input :value="counpon.id" type="checkbox" name="ids">
              </td>
              <td>{{ counpon.couponName }}</td>
              <td>{{ counpon.couponValue }}</td>
              <td>{{ counpon.useTimes }}</td>
              <td>{{ counpon.start }}至{{ counpon.end }}</td>
              <td>一次购物满 {{ counpon.minAmount }}</td>
              <td v-if="counpon.isEffective === 0">
                <a href="javascript:void(0);" class="navigationBtns" @click="handleDelClick(counpon.id)">删除</a>
              </td>
              <td v-if="counpon.isEffective === 1 && counpon.ifIssue === 0">
                <a href="javascript:void(0);" class="navigationBtns" @click="releaseCounpon(counpon.id)">发布</a>
                <a href="javascript:void(0);" class="navigationBtns" @click="addCounpon(counpon.id)">编辑</a>
                <a href="javascript:void(0);" class="navigationBtns" @click="handleDelClick(counpon.id)">删除</a>
              </td>
              <td v-if="counpon.isEffective === 1 && counpon.ifIssue === 1">
                <a href="javascript:void(0);" class="navigationBtns" @click="exportCounpon(counpon.id)">导出</a>
                <a href="javascript:void(0);" class="navigationBtns" @click="grantCounpon(counpon.id, counpon.useTimes)">发放</a>
              </td>
            </tr>
          </tbody>
        </table>
        <el-dialog :visible.sync="dialogFormVisible" :title="operation" width="30%" >
          <el-form :model="form" :inline="true" label-width="150px" >
            <el-form-item label="优惠券名称">
              <el-input v-model="form.couponName"/>
            </el-form-item>
            <el-form-item label="优惠金额">
              <el-input v-model="form.couponValue"/>
            </el-form-item>
            <el-form-item label="使用次数">
              <el-input v-model="form.useTimes"/>
            </el-form-item>
            <el-form-item label="使用期限开始">
              <el-date-picker
                v-model="form.timeStart"
                type="date"
                format="yyyy-MM-dd"
                placeholder="选择日期"/>
            </el-form-item>
            <el-form-item label="使用期限结束">
              <el-date-picker
                v-model="form.timeEnd"
                type="date"
                format="yyyy-MM-dd"
                placeholder="选择日期"/>
            </el-form-item>
            <el-form-item label="最低消费">
              <el-input v-model="form.minAmount"/>
            </el-form-item>
            <el-form-item label="发布">
              <el-checkbox v-model="checked">立即发布（一旦发布将不能修改优惠券信息）</el-checkbox>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="savePartner()">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="dialogFormVisible2" title="导出优惠券号码" width="30%" >
          <el-form :model="form2" :inline="true" label-width="200px" >
            <el-form-item label="导出数量（1-1000的整数）">
              <el-input v-model="amount" required: true type= "number" message= "只能输入数字" trigger= "blur"/>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="exportPartner()">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="dialogFormVisible3" title="发放优惠券号码" width="20%" >
          <el-form :model="form3" :inline="true" label-width="200px" >
            <el-form-item label="">
              <span>给以下用户发放优惠券号码</span>
              <el-input v-model="users" type="textarea" rows="8"/>
              <span>1、每行填写一个用户名，最多填30行。</span>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible3 = false">取 消</el-button>
            <el-button type="primary" @click="grantPartner()">确 定</el-button>
          </div>
        </el-dialog>
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
    </el-tab-pane>
  </el-tabs>
</template>

<style>
.paging{
    margin:30px auto;
    text-align:center;
    font-size:14px;
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
  .navigation{
    margin-top:20px;
    padding:20px 0;
    border-top:1px solid #eee;
    text-align:left;
  }
  .navigation_add{
    display:block;
    width:150px;
    height:40px;
    line-height:40px;
    background:#f45408;
    color:#fff;
    border-radius:5px;
    text-align:center;
    font-size:14px;
  }
  .navTable{
    width:100%;
    margin-top:20px;
  }
  .navTable th{
    height:50px;
    line-height:50px;
    font-size:14px;
    text-align:center;
  }
  .navTable th span{
    padding-right:30px;
  }
  .navTable th a{
    color:#f45408;
  }
  .navTable thead tr:first-child th{
    height:30px;
    line-height:30px;
    text-align:left;
  }
  .navTable td{
    padding:15px 0;
    border-bottom:1px solid #eee;
    font-size:12px;
    color:#333;
    text-align:center;
  }
  .navTable td:nth-child(2),.navTable th:nth-child(2){
    text-align:left;
  }
  .navigationBtns{
    padding:5px 10px;
    margin:0 3px;
    background:#f45408;
    color:#fff;
    border-radius:5px;
  }
</style>

<script>
import axios from 'axios'

export default {
  name: 'CouponManage',
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      checked: false,
      checkAmount: 0,
      form: {
        id: 0,
        couponName: '',
        couponValue: 0,
        useTimes: 1,
        startTime: '',
        endTime: '',
        minAmount: '',
        ifIssue: 0
      },
      form2: {

      },
      form3: {
        couponId: 0,
        userName: [],
        remainTimes: 1
      },
      release: {
        id: 0,
        ifIssue: 0
      },
      searchParam: {
        page: 1,
        pageSize: 10
      },
      delParam: {
        ids: []
      },
      users: '',
      amount: '',
      couponId: 0,
      counponList: {},
      operation: ''
    }
  },
  mounted() {
    this.getCouponManageList(this.$Yjj.getCouponList.type, this.$Yjj.getCouponList.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize })
  },
  methods: {
    getCouponManageList: function(type, target, data) {
      return new Promise((resolve, reject) => {
        axios[type](target, data).then(response => {
          this.counponList = response.data.data.dataList
          // console.log(this.goodsCollect)
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
      this.getCouponManageList(this.$Yjj.getCouponList.type, this.$Yjj.getCouponList.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize })
    },
    // 单个删除优惠券
    handleDelClick: function(val) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // 确认按钮按下
        const type = this.$Yjj.delCouponById.type
        const target = this.$Yjj.delCouponById.target + '?id=' + val
        return new Promise((resolve, reject) => {
          axios[type](target).then(response => {
            // 刷新列表
            this.getCouponManageList(this.$Yjj.getCouponList.type, this.$Yjj.getCouponList.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize })
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

    // 导出优惠券号码页面
    exportCounpon: function(val) {
      this.couponId = val
      this.dialogFormVisible2 = true
    },

    // 导出优惠券号码操作
    exportPartner: function(val) {
      if (this.amount < 0 || this.amount > 1000) {
        this.$message({
          type: 'info',
          message: '请输入1-1000的整数！'
        })
      } else {
        const type = this.$Yjj.exportCouponSn.type
        const target = this.$Yjj.exportCouponSn.target + '?couponId=' + this.couponId + '&amount=' + this.amount
        return new Promise((resolve, reject) => {
          axios[type](target).then(response => {
            this.dialogFormVisible2 = false
            const blob = new Blob([response.data], { type: 'application/octet-stream' })
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            // 配置下载的文件名
            link.download = decodeURI(response.headers['filename'])
            link.click()
            resolve(response.data)
          }).catch(error => {
            reject(error.response.data.errors)
          })
        })
      }
    },

    // 发放优惠券号码页面
    grantCounpon: function(val, times) {
      this.form3.couponId = val
      this.form3.remainTimes = times
      this.dialogFormVisible3 = true
    },

    // 发放优惠券号码操作
    grantPartner: function(val) {
      if (this.users === null || this.users === '') {
        this.$message({
          type: 'info',
          message: '请输入用户！'
        })
      } else {
        const type = this.$Yjj.grantCouponSn.type
        const target = this.$Yjj.grantCouponSn.target
        this.form3.userName = this.users.split('\n')
        return new Promise((resolve, reject) => {
          axios[type](target, this.form3).then(response => {
            this.dialogFormVisible3 = false
            this.$message({
              type: 'info',
              message: '发放成功！'
            })
            this.users = ''
            resolve(response.data)
          }).catch(error => {
            reject(error.response.data.errors)
          })
        })
      }
    },

    // 发布优惠券
    releaseCounpon: function(val) {
      this.$confirm('一旦发布将不能修改优惠券信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // 确认按钮按下
        this.release.id = val
        this.release.ifIssue = 1
        const type = this.$Yjj.updCoupon.type
        const target = this.$Yjj.updCoupon.target
        return new Promise((resolve, reject) => {
          axios[type](target, this.release).then(response => {
            // 刷新列表
            this.getCouponManageList(this.$Yjj.getCouponList.type, this.$Yjj.getCouponList.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize })
            this.$message({
              type: 'success',
              message: '发布成功!'
            })
            resolve(response.data)
          }).catch(error => {
            reject(error.response.data.errors)
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发布'
        })
      })
    },
    // 添加/编辑按钮按下
    addCounpon: function(val) {
      this.form.ifIssue = false
      if (val === 0) {
        for (const key in this.form) {
          delete this.form[key]
        }
        this.form.type = 'add'
        this.operation = '新增优惠券'
        this.form.id = 0
        this.dialogFormVisible = true
      } else {
        for (const key in this.form) {
          if (key === 'startTime' || key === 'endTime') {
            delete this.form[key]
          }
        }
        this.form.type = 'upd'
        this.operation = '编辑优惠券'
        this.form.id = val
        const type = this.$Yjj.getCouponById.type
        const target = this.$Yjj.getCouponById.target + '?id=' + val
        return new Promise((resolve, reject) => {
          axios[type](target).then(response => {
            this.form.couponName = response.data.data.couponName
            this.form.couponValue = response.data.data.couponValue
            this.form.timeStart = response.data.data.start
            this.form.timeEnd = response.data.data.end
            this.form.useTimes = response.data.data.useTimes
            this.form.minAmount = response.data.data.minAmount
            this.dialogFormVisible = true
          }).catch(error => {
            reject(error.response.data.errors)
          })
        })
      }
    },
    // 确认提交
    savePartner: function() {
      if (this.checked === false) {
        this.form.ifIssue = 0
      } else {
        this.form.ifIssue = 1
      }
      const subType = this.form.type
      if (subType === 'add') {
        const type = this.$Yjj.addCoupon.type
        const target = this.$Yjj.addCoupon.target
        return new Promise((resolve, reject) => {
          axios[type](target, this.form).then(response => {
            this.dialogFormVisible = false
            const code = response.data.code
            if (code === '2000') {
              // 刷新列表
              this.getCouponManageList(this.$Yjj.getCouponList.type, this.$Yjj.getCouponList.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize })
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
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
      } else {
        const type = this.$Yjj.updCoupon.type
        const target = this.$Yjj.updCoupon.target
        return new Promise((resolve, reject) => {
          axios[type](target, this.form).then(response => {
            this.dialogFormVisible = false
            const code = response.data.code
            if (code === '2000') {
              // 刷新列表
              this.getCouponManageList(this.$Yjj.getCouponList.type, this.$Yjj.getCouponList.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize })
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              resolve(response.data)
            } else {
              this.$message({
                type: 'error',
                message: '修改失败!'
              })
            }
            resolve(response.data)
          }).catch(error => {
            reject(error.response.data.errors)
          })
        })
      }
    },
    // 全选控制
    checkAll: function() {
      this.checkAmount += 1
      if (this.checkAmount % 2 === 0) {
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
    delCounpons: function() {
      var counponIds = []
      const cks = document.getElementsByName('ids')
      for (var i = 0; i < cks.length; i++) {
        if (cks[i].checked === true) {
          counponIds.push(cks[i].value)
        }
      }
      if (counponIds.length < 1) {
        this.$message({
          type: 'info',
          message: '请选择要删除的记录!'
        })
        return
      } else {
        this.delParam.ids = counponIds
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          // 确认按钮按下
          const type = this.$Yjj.delCouponByIds.type
          const target = this.$Yjj.delCouponByIds.target
          return new Promise((resolve, reject) => {
            axios[type](target, this.delParam).then(response => {
              // 刷新列表
              this.getCouponManageList(this.$Yjj.getCouponList.type, this.$Yjj.getCouponList.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize })
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
