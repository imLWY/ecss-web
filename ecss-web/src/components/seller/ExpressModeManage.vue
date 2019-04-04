<template>
  <el-tabs type="border-card">
    <el-tab-pane label="配送方式列表">
      <div class="express">
        <a href="javascript:void(0);" class="express_add" @click="addShipping(0)">新增配送方式</a>
        <table class="express_table">
          <thead>
            <tr>
              <th style="width:10%;">名称</th>
              <th style="width:40%;">简介</th>
              <th style="width:10%;">首件邮费</th>
              <th style="width:10%;">附加邮费</th>
              <th style="width:10%;">启用</th>
              <th style="width:20%;">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="shipping in shippingData" :key="shipping.id">
              <td>{{ shipping.shippingName }}</td>
              <td>{{ shipping.shippingDesc }}</td>
              <td>{{ shipping.firstPrice }}</td>
              <td>{{ shipping.stepPrice }}</td>
              <td v-if="shipping.enabled === 1">是</td>
              <td v-if="shipping.enabled === 0">否</td>
              <td>
                <a href="javascript:void(0);" class="expressBtn" @click="addShipping(shipping.id)">编辑</a>
                <a href="javascript:void(0);" class="expressBtn" @click="handleDelClick(shipping.id)">删除</a>
              </td>
            </tr>
          </tbody>
        </table>
        <el-dialog :visible.sync="dialogFormVisible" :title="operation" width="30%" >
          <el-form ref="updFormValidate" :rules="rules" :model="form" :inline="true" label-width="90px" >
            <el-form-item label="名称" prop="shippingName">
              <el-input v-model="form.shippingName"/>
            </el-form-item>
            <el-form-item label="简介">
              <el-input v-model="form.shippingDesc" type="textarea"/>
            </el-form-item>
            <el-form-item label="首件邮费" prop="firstPrice">
              <el-input v-model="form.firstPrice"/>
            </el-form-item>
            <el-form-item label="附加邮费">
              <el-input v-model="form.stepPrice"/>
            </el-form-item>
            <el-form-item label="启用">
              <el-radio-group v-model="form.enabled" @change="changeEnabled">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="排序">
              <el-input v-model="form.sortOrder"/>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="savePartner('updFormValidate')">确 定</el-button>
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
  .express{
    margin-top:20px;
    padding:20px 0;
    border-top:1px solid #eee;
    text-align:left;
  }
  .express_add{
    display:block;
    width:150px;
    height:40px;
    line-height:40px;
    text-align:center;
    background:#f45408;
    color:#fff;
    font-size:14px;
    border-radius:5px;
  }
  .express_table{
    width:100%;
    margin-top:20px;
  }
  .express_table th{
    height:50px;
    line-height:50px;
    text-align:center;
    font-size:14px;
  }
  .express_table td{
    padding:20px 0;
    border-bottom:1px solid #eee;
    font-size:12px;
    text-align:center;
  }
  .expressBtn{
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
  name: 'ExpressModeManage',
  data() {
    return {
      // 校验规则
      rules: {
        shippingName: [
          { required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }
        ],
        firstPrice: [
          { required: true,
            message: '首件邮费不能为空',
            trigger: 'blur'
          }
        ]
      },
      dialogFormVisible: false,
      shippingData: [],
      operation: '',
      form: {
        id: 0,
        shippingName: '',
        shippingDesc: '',
        firstPrice: 0,
        stepPrice: 0,
        enabled: 0,
        sortOrder: 0
      },
      searchParam: {
        userId: 1
      }
    }
  },
  mounted() {
    this.getShippingList(this.$Yjj.getShipping.type, this.$Yjj.getShipping.target)
  },
  methods: {
    getShippingList: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.shippingData = response.data.data
          console.log(this.shippingData)
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
    clearValidate(formName) {
      this.$refs[formName].clearValidate()
    },
    // 添加/编辑按钮按下
    addShipping: function(val) {
      if (this.form.shippingName !== '' && this.form.firstPrice !== '') {
        this.clearValidate('updFormValidate')
      }
      this.form.ifIssue = false
      if (val === 0) {
        for (const key in this.form) {
          if (key !== 'enabled') {
            delete this.form[key]
          }
        }
        this.form.type = 'add'
        this.operation = '新增配送方式'
        this.form.id = 0
        this.form.enabled = 1
        this.dialogFormVisible = true
      } else {
        this.form.type = 'upd'
        this.operation = '编辑配送方式'
        this.form.id = val
        const type = this.$Yjj.getShippingById.type
        const target = this.$Yjj.getShippingById.target + '?id=' + val
        return new Promise((resolve, reject) => {
          axios[type](target).then(response => {
            this.form.shippingName = response.data.data.shippingName
            this.form.shippingDesc = response.data.data.shippingDesc
            this.form.firstPrice = response.data.data.firstPrice
            this.form.stepPrice = response.data.data.stepPrice
            this.form.enabled = response.data.data.enabled
            this.form.sortOrder = response.data.data.sortOrder
            this.dialogFormVisible = true
          }).catch(error => {
            reject(error.response.data.errors)
          })
        })
      }
    },
    changeEnabled: function(value) {
      this.form.enabled = value
    },
    // 确认提交
    savePartner: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const subType = this.form.type
          if (subType === 'add') {
            const type = this.$Yjj.addShipping.type
            const target = this.$Yjj.addShipping.target
            return new Promise((resolve, reject) => {
              axios[type](target, this.form).then(response => {
                this.dialogFormVisible = false
                const code = response.data.code
                if (code === '2000') {
                  // 刷新列表
                  this.getShippingList(this.$Yjj.getShipping.type, this.$Yjj.getShipping.target)
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
            const type = this.$Yjj.updShipping.type
            const target = this.$Yjj.updShipping.target
            return new Promise((resolve, reject) => {
              axios[type](target, this.form).then(response => {
                this.dialogFormVisible = false
                const code = response.data.code
                if (code === '2000') {
                  // 刷新列表
                  this.getShippingList(this.$Yjj.getShipping.type, this.$Yjj.getShipping.target)
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
        } else {
          this.$message({
            type: 'error',
            message: '请按照要求填写！'
          })
        }
      })
    },
    // 删除配送方式
    handleDelClick: function(val) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // 确认按钮按下
        const type = this.$Yjj.delShippingById.type
        const target = this.$Yjj.delShippingById.target + '?id=' + val
        return new Promise((resolve, reject) => {
          axios[type](target).then(response => {
            // 刷新列表
            this.getShippingList(this.$Yjj.getShipping.type, this.$Yjj.getShipping.target)
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
</script>
