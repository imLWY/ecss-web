<template>
  <el-tabs type="border-card">
    <el-tab-pane label="地址列表">
      <div class="myaddress">
        <a href="javascript:void(0);" class="myaddress_add" @click="addAddress()">新增地址</a>
        <div class="address_table">
          <el-table
            :data="addressData"
            stripe
            style="width:100%">
            <el-table-column prop="consignee" label="收货人姓名" width="100" />
            <el-table-column prop="regionName" label="所在地区" width="150" />
            <el-table-column prop="address" label="详细地址" width="150" />
            <el-table-column prop="zipcode" label="邮政编码" width="120" />
            <el-table-column prop="phoneMob" label="电话" width="120" />
            <el-table-column prop="phoneTel" label="手机" width="120" />
            <el-table-column prop="updatedTime" label="操作" width="100" align="center">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button
                    ype="warning"
                    size="mini"
                    icon="el-icon-edit"
                    circle
                    @click="handleEditClick(scope.row.id)" />
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    circle
                    @click="handleDelClick(scope.row.id)" />
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog :visible.sync="dialogFormVisible" :title="operation" width="30%" >
            <el-form ref="form" :model="form" :inline="true" :rules="formRules" label-width="150px" >
              <el-form-item label="收货人姓名：" prop="consignee">
                <el-input v-model="form.consignee"/>
              </el-form-item>
              <el-form-item label="所在地区：" prop="regions">
                <el-cascader
                  v-model="form.regions"
                  :options="options"
                  clearable
                  expand-trigger="hover"
                  style="width:202px;"
                  @change="handleChange"/>
              </el-form-item>
              <el-form-item label="详细地址：" prop="address">
                <el-input v-model="form.address"/>
              </el-form-item>
              <el-form-item label="邮政编码：">
                <el-input v-model="form.zipcode"/>
              </el-form-item>
              <el-form-item label="手机号码：" prop="phoneMob">
                <el-input v-model="form.phoneMob"/>
              </el-form-item>
              <el-form-item label="电话号码：">
                <el-input v-model="form.phoneTel"/>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="validateFormData('form')">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss">
@import '../../../static/css/custom-ui.scss';
</style>

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

.myaddress{
  margin-top:20px;
  padding:20px 0;
  border-top:1px solid #eee;
  text-align:left;
}
.myaddress_add{
  display:block;
  width:100px;
  height:40px;
  line-height:40px;
  text-align:center;
  border-radius:5px;
  background:#f45408;
  color:#fff;
}
.address_table{
  margin:20px 0;
  padding:20px 0;
  border-top:1px solid #f45408;
}
.address_table table{
  width:100%;
}
.address_table th{
  height:50px;
  line-height:50px;
  font-size:14px;
  text-align:center;
}
.address_table td{
  font-size:12px;
  color:#333;
  text-align:center;
  padding:10px 0;
  border-bottom:1px solid #eee;
}
.address_btn{
  display:inline-block;
  vertical-align:middle;
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
  name: 'MyAddress',
  data() {
    return {
      dialogFormVisible: false,
      addressData: [],
      searchParam: {

      },
      form: {
        id: 0,
        consignee: '',
        regions: [],
        address: '',
        zipcode: '',
        phoneTel: '',
        phoneMob: ''
      },
      formRules: {
        consignee: [
          { required: true, message: '请输入收货人姓名', trigger: 'blur' }
        ],
        regions: [
          { required: true, message: '请选择所在地区', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        phoneMob: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { type: 'string', len: 11, message: '无效的联系方式', trigger: 'blur' }
        ]
      },
      options: [],
      operation: ''
    }
  },
  mounted() {
    this.getMyAddressList(this.$Yjj.getAddress.type, this.$Yjj.getAddress.target)
    this.getRegionList(this.$Yjj.getRegion.type, this.$Yjj.getRegion.target)
  },
  methods: {
    getMyAddressList: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target, this.searchParam).then(response => {
          this.addressData = response.data.data
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
    handleChange(value) {
      console.log(value)
    },
    clearValidate(formName) {
      this.$refs[formName].clearValidate()
    },
    // 添加按钮按下
    addAddress: function() {
      if (this.form.consignee !== '' && this.form.regions !== '' && this.form.address !== '' && this.form.phoneMob !== '') {
        this.clearValidate('form')
      }
      for (const key in this.form) {
        delete this.form[key]
      }
      this.form.type = 'add'
      this.operation = '新增地址'
      this.form.id = 0
      this.dialogFormVisible = true
    },
    // 修改按钮按下
    handleEditClick: function(id) {
      if (this.form.consignee !== '' && this.form.regions !== '' && this.form.address !== '' && this.form.phoneMob !== '') {
        this.clearValidate('form')
      }
      const type = this.$Yjj.getAddressById.type
      const target = this.$Yjj.getAddressById.target + '?id=' + id
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.form = response.data.data
          this.form.regions = this.form.regions.map(Number)
          this.form.type = 'upd'
          this.operation = '编辑地址'
          this.form.id = id
          this.dialogFormVisible = true

          console.log(this.partnerArr)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    // 验证表单
    validateFormData: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.savePartner()
        } else {
          return false
        }
      })
    },
    // 确认提交
    savePartner: function() {
      const subType = this.form.type
      const type = this.$Yjj.addAddress.type
      const target = this.$Yjj.addAddress.target
      return new Promise((resolve, reject) => {
        axios[type](target, this.form).then(response => {
          this.dialogFormVisible = false
          const code = response.data.code
          if (code === '2000') {
            // 刷新列表
            this.getMyAddressList(this.$Yjj.getAddress.type, this.$Yjj.getAddress.target)
            if (subType === 'add') {
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
            } else {
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
            }

            resolve(response.data)
          } else {
            if (subType === 'add') {
              this.$message({
                type: 'error',
                message: '添加失败!'
              })
            } else {
              this.$message({
                type: 'error',
                message: '修改失败!'
              })
            }
          }
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    getRegionList: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.options = response.data.data
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    // 删除我的地址
    handleDelClick: function(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // 确认按钮按下
        const type = this.$Yjj.delAddress.type
        const target = this.$Yjj.delAddress.target + '?id=' + id
        return new Promise((resolve, reject) => {
          axios[type](target).then(response => {
            // 刷新列表
            this.getMyAddressList(this.$Yjj.getAddress.type, this.$Yjj.getAddress.target)
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
