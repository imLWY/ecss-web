<template>
  <el-tabs type="border-card">
    <el-tab-pane label="合作伙伴列表">
      <div class="navigation">
        <a href="javascript:void(0);" class="navigation_add" @click="addNewPartner()">新增合作伙伴</a>
        <table class="navTable">
          <thead>
            <tr>
              <th><input type="checkbox" name="checkBoxAll" @click="checkAll()"></th>
              <th colspan="4">
                <span>全选</span>
                <a href="javascript:void(0);" @click="delPartners()">删除</a>
              </th>
            </tr>
            <tr>
              <th style="width:5%;"/>
              <th style="width:15%;">标题</th>
              <th style="width:10%;">链接</th>
              <th style="width:10%;">logo</th>
              <th style="width:20%;">排序</th>
              <th style="width:25%;">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in partnerArr" :key="item.id">
              <td>
                <input :value="item.id" type="checkbox" name="ids">
              </td>
              <td>{{ item.title }}</td>
              <td>{{ item.link }}</td>
              <td><img :src="item.logo" style="height:60px;width:60px;"></td>
              <td>{{ item.sortOrder }}</td>
              <td>
                <a href="javascript:void(0);" class="navigationBtns" @click="handleEditClick(item.id)">编辑</a>
                <a href="javascript:void(0);" class="navigationBtns" @click="handleDelClick(item.id)">删除</a>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- <el-table
          ref="multipleTable"
          :data="partnerArr"
          stripe
          border
          style="width:100%">
          <el-table-column type="selection" width="32" align="center" @click="changeFun" />
          <el-table-column prop="title" label="标题" align="center" width="150"/>
          <el-table-column prop="link" label="链接" align="center" width="150"/>
          <el-table-column prop="logo" label="logo" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.logo" style="height:60px;width:60px;">
            </template>
          </el-table-column>
          <el-table-column prop="sortOrder" label="排序" align="center"/>
          <el-table-column prop="updatedTime" label="操作" width="150" align="center">
            <template slot-scope="scope">
              <el-button-group>
                <el-button
                  type="warning"
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
        </el-table> -->
        <el-dialog :visible.sync="dialogFormVisible" title="编辑合作伙伴" width="550px" >
          <el-form ref="ruleForm" :model="form" :inline="true" :rules="rules" label-width="150px" >
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title"/>
            </el-form-item>
            <el-form-item label="链接" prop="link">
              <el-input v-model="form.link"/>
            </el-form-item>
            <el-form-item label="排序" prop="sortOrder">
              <el-input v-model="form.sortOrder"/>
            </el-form-item>
            <el-form-item label="logo">
              <el-upload
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileShow"
                :on-success="uploadAfter"
                :show-file-list="true"
                :limit="1"
                :multiple="false"
                :action="uploadUrl"
                class="upload-demo"
                list-type="picture-card">
                <i class="el-icon-plus"/>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="savePartner()">确 定</el-button>
          </div>
        </el-dialog>
        <!--分页-->
        <div class="paging" />
        <!--分页结束-->
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<style>
@import '../../../static/css/element-ui.css';

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
  name: 'ParterManage',
  data() {
    return {
      uploadUrl: '',
      multipleSelection: [],
      partnerArr: [],
      fileShow: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        link: '',
        title: '',
        sortOrder: '',
        logo: '',
        id: '',
        optType: '',
        previewFix: ''
      },
      rules: {
        link: [
          { required: true, message: '请输入链接', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到20 个字符', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到15 个字符', trigger: 'blur' }
        ],
        logo: [
          { required: true, message: '请选择文件', trigger: 'blur' }
        ],
        sortOrder: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ]
      },
      idArr: []
    }
  },
  mounted() {
    this.uploadUrl = this.$Lwy.uploadStoreImgUrl.target
    this.getPartnerArr(this.$Lwy.listPartnerListByCurrent.type, this.$Lwy.listPartnerListByCurrent.target)
  },
  methods: {
    getPartnerArr: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.partnerArr = response.data.data
          console.log(this.partnerArr)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    // 修改按钮按下
    handleEditClick: function(id) {
      const type = this.$Lwy.getPartnerInfoByCurrent.type
      const target = this.$Lwy.getPartnerInfoByCurrent.target + '?id=' + id
      this.fileShow = []
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.form = response.data.data
          this.fileShow = [{ name: '', url: this.form.previewFix + this.form.logo }]
          this.form.type = 'upd'
          this.dialogFormVisible = true
          console.log(this.partnerArr)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    // 删除合作伙伴
    handleDelClick: function(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // 确认按钮按下
        const type = this.$Lwy.delPartnerByIds.type
        const target = this.$Lwy.delPartnerByIds.target
        const paramObj = {}
        const ids = []
        ids.push(id)
        paramObj.ids = ids
        return new Promise((resolve, reject) => {
          axios[type](target, paramObj).then(response => {
            // 刷新列表
            this.getPartnerArr(this.$Lwy.listPartnerListByCurrent.type, this.$Lwy.listPartnerListByCurrent.target)
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
    // 上传图片回调
    uploadAfter: function(response, file, fileList) {
      const result = JSON.parse(response)
      if (result.code === 1) {
        this.form.logo = result.data[0].filePath
      } else {
        alert('上传失败')
      }
    },
    // 添加按钮按下
    addNewPartner: function() {
      for (const key in this.form) {
        delete this.form[key]
      }
      this.fileShow = []
      this.form.type = 'add'
      this.dialogFormVisible = true
    },
    // 添加或修改合作伙伴
    savePartner: function() {
      const type = this.form.type
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          // 添加的情况
          if (type === 'add') {
            const type = this.$Lwy.addPartnerByCurrent.type
            const target = this.$Lwy.addPartnerByCurrent.target
            return new Promise((resolve, reject) => {
              axios[type](target, this.form).then(response => {
                const code = response.data.code
                this.dialogFormVisible = false
                if (code === '2000') {
                  // 刷新列表
                  this.getPartnerArr(this.$Lwy.listPartnerListByCurrent.type, this.$Lwy.listPartnerListByCurrent.target)
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
              }).catch(error => {
                reject(error.response.data.errors)
              })
            })
          }
          // 修改的情况
          if (type === 'upd') {
            const type = this.$Lwy.updPartnerById.type
            const target = this.$Lwy.updPartnerById.target
            return new Promise((resolve, reject) => {
              axios[type](target, this.form).then(response => {
                const code = response.data.code
                this.dialogFormVisible = false
                if (code === '2000') {
                  // 刷新列表
                  this.getPartnerArr(this.$Lwy.listPartnerListByCurrent.type, this.$Lwy.listPartnerListByCurrent.target)
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
              }).catch(error => {
                reject(error.response.data.errors)
              })
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    checkAll: function() {
      const ckall = document.getElementsByName('checkBoxAll')
      const flg = ckall[0].checked
      if (flg) {
        const cks = document.getElementsByName('ids')
        for (var i = 0; i < cks.length; i++) {
          cks[i].checked = true
        }
      } else {
        const cks = document.getElementsByName('ids')
        for (var j = 0; j < cks.length; j++) {
          cks[j].checked = false
        }
      }
    },
    delPartners: function() {
      const paramObj = {}
      const ids = []
      const cks = document.getElementsByName('ids')
      for (var i = 0; i < cks.length; i++) {
        if (cks[i].checked === true) {
          ids.push(cks[i].value)
        }
      }
      if (ids.length < 1) {
        this.$message({
          type: 'info',
          message: '请选择要删除的记录!'
        })
      } else {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          // 确认按钮按下
          const type = this.$Lwy.delPartnerByIds.type
          const target = this.$Lwy.delPartnerByIds.target
          paramObj.ids = ids
          return new Promise((resolve, reject) => {
            axios[type](target, paramObj).then(response => {
              // 刷新列表
              this.getPartnerArr(this.$Lwy.listPartnerListByCurrent.type, this.$Lwy.listPartnerListByCurrent.target)
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
            message: '已取消删除！'
          })
        })
      }
    }
  }
}
</script>
