<template>
  <el-tabs type="border-card">
    <el-tab-pane label="支付方式管理">
      <div class="payMode">
        <a href="javascript:void(0);" @click="addPayMentDia()">添加</a>
        <a href="javascript:void(0);" @click="delByIds()">删除</a>
      </div>
      <div class="paym">
        <el-table
          :data="paymentArr"
          fit
          stripe
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleChange">
          <el-table-column type="selection" width="55"/>
          <el-table-column prop="paymentName" align="left" label="支付名称" width="150"/>
          <el-table-column prop="paymentCode" align="left" label="支付代码" width="150"/>
          <el-table-column prop="enabledShow" align="left" label="是否启用" width="100"/>
          <el-table-column prop="sortOrder" align="left" label="序号" width="80"/>
          <el-table-column prop="paymentDesc" align="left" label="描述" width="200"/>
          <el-table-column align="center" label="操作" width="100" fixed="right">
            <template slot-scope="scope">
              <el-button-group>
                <el-button
                  type="warning"
                  size="mini"
                  icon="el-icon-edit"
                  circle
                  @click="updPayMentDia(scope.row.id)" />
                <el-button
                  type="warning"
                  size="mini"
                  icon="el-icon-delete"
                  circle
                  @click="uninstall(scope.row.id)" />
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <div class="paging">
          <el-pagination
            :current-page="pageParam.page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageParam.pageSize"
            :total="pageParam.total"
            layout="total, sizes, prev, pager, next, jumper"
            style="text-align:center;"
            @size-change="handleBrandTableSizeChange"
            @current-change="handleBrandTableCurrentChange" />
        </div>
        <el-dialog :visible.sync="dialogFormVisible" title="编辑支付方式" width="30%" >
          <el-form ref="formUpd" :model="form" :inline="true" :rules="formRules" label-width="150px" >
            <el-form-item label="支付名称：" prop="paymentName">
              <el-input v-model="form.paymentName" placeholder="请输入支付名称"/>
            </el-form-item>
            <el-form-item label="支付代码：" prop="paymentCode">
              <el-input v-model="form.paymentCode" placeholder="请输入支付名称"/>
            </el-form-item>
            <el-form-item label="序号：" prop="sortOrder">
              <el-input-number v-model="form.sortOrder" :min="0" size="mini"/>
            </el-form-item>
            <el-form-item label="简介：" prop="paymentDesc">
              <el-input :rows="2" v-model="form.paymentDesc" type="textarea" placeholder="该信息将在用户下单时被看到"/>
            </el-form-item>
            <el-form-item label="启用：" prop="enabled">
              <el-radio-group v-model="form.enabled" @change="changeEnabled">
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="0">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updPayMentToDB('formUpd')">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog :visible.sync="addDia" title="添加支付方式" width="30%" >
          <el-form ref="formAdd" :model="form" :inline="true" :rules="formRules" label-width="150px" >
            <el-form-item label="支付名称：" prop="paymentName">
              <el-input v-model="form.paymentName" placeholder="请输入支付名称"/>
            </el-form-item>
            <el-form-item label="支付代码：" prop="paymentCode">
              <el-input v-model="form.paymentCode" placeholder="请输入支付名称"/>
            </el-form-item>
            <el-form-item label="序号：" prop="sortOrder">
              <el-input-number v-model="form.sortOrder" :min="0" size="mini" />
            </el-form-item>
            <el-form-item label="简介：" prop="paymentDesc">
              <el-input :rows="2" v-model="form.paymentDesc" type="textarea" placeholder="该信息将在用户下单时被看到"/>
            </el-form-item>
            <el-form-item label="启用：" prop="enabled">
              <el-radio-group v-model="form.enabled" @change="changeEnabled">
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="0">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addDia = false">取 消</el-button>
            <el-button type="primary" @click="addPayMentToDB('formAdd')">确 定</el-button>
          </div>
        </el-dialog>
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
  .paym{
    margin-top:20px;
    padding:20px 0;
    border-top:1px solid #eee;
    text-align:left;
  }
  .paym_table{
    width:100%;
    margin-top:20px;
  }
  .paym_table th{
    height:50px;
    line-height:50px;
    text-align:center;
    font-size:14px;
  }
  .paym_table td{
    padding:20px 0;
    border-bottom:1px solid #eee;
    font-size:12px;
    text-align:center;
  }
  .paymBtn{
    padding:5px 10px;
    margin:0 3px;
    border-radius:5px;
    background:#f45408;
    color:#fff;
  }
  .payMode a{
    display:block;
    margin:0 0 20px 0;
    height:30px;;
    line-height:30px;
    background:#f45408;
    color:#fff;
    border-radius:5px;
    width:80px;
    text-align:center;
    float: left;
    margin: 10px;
  }
</style>

<script>
import axios from 'axios'

export default {
  name: 'PayModeManage',
  data() {
    return {
      enableActive: true,
      dialogFormVisible: false,
      addDia: false,
      paymentArr: [],
      form: {
        id: '',
        paymentName: '',
        isOnline: '',
        storeId: '',
        enabled: '',
        paymentCode: '',
        paymentDesc: '',
        paymentId: ''
      },
      formRules: {
        paymentName: [
          { required: true, message: '请输入支付名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        paymentCode: [
          { required: true, message: '请输入支付代码', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        paymentDesc: [
          { required: true, message: '请输入描述', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        sortOrder: [
          { required: true, message: '请输入序号', trigger: 'blur' }
        ],
        enabled: [
          { required: true, message: '请选择是否启用', trigger: 'blur' }
        ]
      },
      delIdsParam: {
        ids: []
      },
      pageParam: {
        page: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  mounted() {
    this.getPayMentArr(this.$Lwy.listPayMentByCurrent.type, this.$Lwy.listPayMentByCurrent.target)
  },
  methods: {
    getPayMentArr: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target, this.pageParam).then(response => {
          const code = response.data.code
          if (code === '2000') {
            this.paymentArr = []
            this.paymentArr = response.data.data.dataList
            this.pageParam.total = response.data.data.total
            console.log(this.paymentArr)
            resolve(response.data)
          }
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    /* 卸载 */
    uninstall: function(id) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        var ids = []
        ids.push(id)
        this.deleteCommon(ids)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    delByIds: function() {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.deleteCommon(this.delIdsParam.ids)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 删除共通方法
    deleteCommon: function(ids) {
      var param = {}
      param.ids = ids
      const type = this.$Lwy.delPayMentbyId.type
      const target = this.$Lwy.delPayMentbyId.target
      return new Promise((resolve, reject) => {
        axios[type](target, param).then(response => {
          const code = response.data.code
          if (code === '2000') {
            // 刷新列表
            this.getPayMentArr(this.$Lwy.listPayMentByCurrent.type, this.$Lwy.listPayMentByCurrent.target)
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
          } else {
            this.$message({
              type: 'error',
              message: '操作失败!'
            })
          }
          console.log(this.paymentArr)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    /* 修改 */
    updPayMentDia: function(id) {
      const type = this.$Lwy.getPayMentInfoById.type
      const target = this.$Lwy.getPayMentInfoById.target + '?id=' + id
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.form = response.data.data
          this.dialogFormVisible = true
          console.log(this.paymentArr)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    // 保存修改
    updPayMentToDB: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const type = this.$Lwy.updPayMentById.type
          const target = this.$Lwy.updPayMentById.target
          return new Promise((resolve, reject) => {
            axios[type](target, this.form).then(response => {
              this.dialogFormVisible = false
              const code = response.data.code
              if (code === '2000') {
                // 刷新列表
                this.getPayMentArr(this.$Lwy.listPayMentByCurrent.type, this.$Lwy.listPayMentByCurrent.target)
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                })
                resolve(response.data)
              } else {
                this.$message({
                  type: 'error',
                  message: '操作失败!'
                })
              }
              console.log(this.paymentArr)
              resolve(response.data)
            }).catch(error => {
              reject(error.response.data.errors)
            })
          })
        } else {
          return false
        }
      })
    },
    /* 添加 */
    addPayMentDia: function() {
      if (this.form.paymentName !== '') {
        this.$refs['formAdd'].clearValidate()
      }
      for (const key in this.form) {
        if (key !== 'enabled') {
          delete this.form[key]
        }
      }
      this.form.enabled = 1
      this.addDia = true
    },
    addPayMentToDB: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const type = this.$Lwy.addPayMentByCurrent.type
          const target = this.$Lwy.addPayMentByCurrent.target
          return new Promise((resolve, reject) => {
            axios[type](target, this.form).then(response => {
              this.addDia = false
              const code = response.data.code
              if (code === '2000') {
                // 刷新列表
                this.getPayMentArr(this.$Lwy.listPayMentByCurrent.type, this.$Lwy.listPayMentByCurrent.target)
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                })
                resolve(response.data)
              } else {
                this.$message({
                  type: 'error',
                  message: '操作失败!'
                })
              }
              console.log(this.paymentArr)
              resolve(response.data)
            }).catch(error => {
              reject(error.response.data.errors)
            })
          })
        } else {
          return false
        }
      })
    },
    handleBrandTableSizeChange: function(val) {
      this.pageParam.pageSize = val
      this.pageParam.page = 1
      this.getPayMentArr(this.$Lwy.listPayMentByCurrent.type, this.$Lwy.listPayMentByCurrent.target)
    },
    handleBrandTableCurrentChange: function(val) {
      this.pageParam.page = val
      this.getPayMentArr(this.$Lwy.listPayMentByCurrent.type, this.$Lwy.listPayMentByCurrent.target)
    },
    // 批量删除对话列表预处理
    handleChange: function(val) {
      this.delIdsParam.ids.length = 0
      if (val !== '' && val.length > 0) {
        for (var i = 0; i < val.length; i++) {
          this.delIdsParam.ids.push(val[i].id)
        }
      }
    },
    changeEnabled: function(value) {
      this.form.enabled = value
    }
  }
}
</script>
