<template>
  <el-tabs type="border-card">
    <el-tab-pane label="导航列表">
      <div class="navigation">
        <a href="javascript:void(0);" class="navigation_add" @click="addArticle(0)">新增导航</a>
        <table class="navTable">
          <thead>
            <tr>
              <th><input type="checkbox" name="checkAll" @click="checkAll()"></th>
              <th colspan="4">
                <span>全选</span>
                <a href="javascript:void(0);" @click="delArticles()">删除</a>
              </th>
            </tr>
            <tr>
              <th style="width:5%;"/>
              <th style="width:55%;">导航名称</th>
              <th style="width:10%;">是否显示</th>
              <th style="width:10%;">排序</th>
              <th style="width:20%;">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="article in articleData" :key="article.id">
              <td><input :value="article.id" type="checkbox" name="ids"></td>
              <td>{{ article.title }}</td>
              <td v-if="article.ifShow === 1">是</td>
              <td v-if="article.ifShow === 0">否</td>
              <td>{{ article.sort }}</td>
              <td>
                <a href="javascript:void(0);" class="navigationBtns" @click="addArticle(article.id)">编辑</a>
                <a href="javascript:void(0);" class="navigationBtns" @click="delArticle(article.id)">删除</a>
              </td>
            </tr>
          </tbody>
        </table>
        <el-dialog :visible.sync="dialogFormVisible" :title="operation" width="30%" >
          <el-form ref="updFormValidate" :rules="rules" :model="form" :inline="true" label-width="80px" >
            <el-form-item label="导航名称" prop="title">
              <el-input v-model="form.title"/>
            </el-form-item>
            <el-form-item label="是否显示">
              <el-radio-group v-model="form.ifShow" @change="changeEnabled">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="排序">
              <el-input v-model="form.sort"/>
            </el-form-item>
            <el-form-item label="简介" class="tanEditor">
              <quill-editor
                ref="myQuillEditor"
                v-model="form.content"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @change="onEditorChange($event)"/>
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
@import 'quill/dist/quill.core.css';
@import 'quill/dist/quill.snow.css';
@import 'quill/dist/quill.bubble.css';
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
    width:100px;
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
  .tanEditor .ql-container{
    height:220px!important;
  }
  .tanEditor .el-form-item__label{
    text-align:left!important;
    font-weight:700;
    padding-left:10px;
  }
   .tanEditor{
     margin:0!important;
   }
   .el-form--inline .el-form-item{
     display:block;
   }
</style>

<script>
import axios from 'axios'
import { quillEditor } from 'vue-quill-editor' // 调用编辑器

export default {
  name: 'NavigationManage',
  components: {
    quillEditor
  },
  data() {
    return {
      // 校验规则
      rules: {
        title: [
          { required: true,
            message: '导航名称不能为空',
            trigger: 'blur'
          }
        ]
      },
      dialogFormVisible: false,
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['image']
          ]
        },
        placeholder: '店铺简介',
        theme: 'snow'
      },
      articleData: [],
      delParam: {
        ids: []
      },
      form: {
        id: 0,
        title: '',
        ifShow: '',
        sort: 0,
        content: ''
      },
      amount: 0
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted() {
    this.getArticleList(this.$Yjj.getArticle.type, this.$Yjj.getArticle.target)
  },
  methods: {
    getArticleList: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.articleData = response.data.data
          console.log(this.articleData)
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
    onEditorReady(editor) { // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    clearValidate(formName) {
      this.$refs[formName].clearValidate()
    },
    // 添加/编辑按钮按下
    addArticle: function(val) {
      if (this.form.title !== '') {
        this.clearValidate('updFormValidate')
      }
      if (val === 0) {
        for (const key in this.form) {
          if (key !== 'ifShow') {
            delete this.form[key]
          }
        }
        this.form.type = 'add'
        this.operation = '新增导航'
        this.form.id = 0
        this.form.ifShow = 1
        this.dialogFormVisible = true
      } else {
        this.form.type = 'upd'
        this.operation = '编辑导航'
        this.form.id = val
        const type = this.$Yjj.getArticleById.type
        const target = this.$Yjj.getArticleById.target + '?id=' + val
        return new Promise((resolve, reject) => {
          axios[type](target).then(response => {
            this.form.title = response.data.data.title
            this.form.ifShow = response.data.data.ifShow
            this.form.sort = response.data.data.sort
            this.form.content = response.data.data.content
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
            const type = this.$Yjj.addArticle.type
            const target = this.$Yjj.addArticle.target
            return new Promise((resolve, reject) => {
              axios[type](target, this.form).then(response => {
                this.dialogFormVisible = false
                const code = response.data.code
                if (code === '2000') {
                  // 刷新列表
                  this.getArticleList(this.$Yjj.getArticle.type, this.$Yjj.getArticle.target)
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
            const type = this.$Yjj.updArticle.type
            const target = this.$Yjj.updArticle.target
            return new Promise((resolve, reject) => {
              axios[type](target, this.form).then(response => {
                this.dialogFormVisible = false
                const code = response.data.code
                if (code === '2000') {
                  // 刷新列表
                  this.getArticleList(this.$Yjj.getArticle.type, this.$Yjj.getArticle.target)
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
    // 单个删除导航
    delArticle: function(val) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // 确认按钮按下
        const type = this.$Yjj.delArticleById.type
        const target = this.$Yjj.delArticleById.target + '?id=' + val
        return new Promise((resolve, reject) => {
          axios[type](target).then(response => {
            // 刷新列表
            this.getArticleList(this.$Yjj.getArticle.type, this.$Yjj.getArticle.target)
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
    delArticles: function() {
      var articleIds = []
      const cks = document.getElementsByName('ids')
      for (var i = 0; i < cks.length; i++) {
        if (cks[i].checked === true) {
          articleIds.push(cks[i].value)
        }
      }
      if (articleIds.length < 1) {
        this.$message({
          type: 'info',
          message: '请选择要删除的记录!'
        })
        return
      } else {
        this.delParam.ids = articleIds
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          // 确认按钮按下
          const type = this.$Yjj.delArticleByIds.type
          const target = this.$Yjj.delArticleByIds.target
          return new Promise((resolve, reject) => {
            axios[type](target, this.delParam).then(response => {
              // 刷新列表
              this.getArticleList(this.$Yjj.getArticle.type, this.$Yjj.getArticle.target)
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
