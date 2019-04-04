<template>
  <el-tabs type="border-card">
    <el-tab-pane label="全部咨询">
      <div class="consult">
        <table class="consult_tableall">
          <thead>
            <tr>
              <th style="width:30px;"><input type="checkbox" @click="checkAllConsult()"></th>
              <th colspan="3">
                <span>全选</span>
                <a href="javascript:void(0);" @click="delConsults(1)">删除</a>
              </th>
            </tr>
          </thead>
          <tbody v-for="all in allConsult" :key="all.id">
            <tr class="bgcolor">
              <td><input :value="all.id" type="checkbox" name="allConsultIds"></td>
              <td>
                <a href="" class="consult-shopname">{{ all.itemName }}</a>
                <span>商品咨询</span>
              </td>
              <td style="width:150px;">{{ all.userName }}</td>
              <td v-if="all.isReply === 1" style="width:150px;" >
                <a href="javascript:void(0);" class="consultBtn" @click="handleDelClick(all.id)">删除</a>
                <a href="javascript:void(0);" class="consultBtn" @click="replyQa(all.questionContent ,all.replyContent, all.id, 1)">编辑回复</a>
              </td>
              <td v-if="all.isReply === 0" style="width:150px;" >
                <a href="javascript:void(0);" class="consultBtn" @click="handleDelClick(all.id)">删除</a>
                <a href="javascript:void(0);" class="consultBtn" @click="replyQa(all.questionContent ,all.replyContent, all.id, 1)">回复</a>
              </td>
            </tr>
            <tr>
              <td/>
              <td><b>咨询内容：</b>{{ all.questionContent }}</td>
              <td>{{ all.postTime }}</td>
              <td/>
            </tr>
            <tr v-if="all.isReply === 1">
              <td/>
              <td><strong>我的回复：</strong>{{ all.replyContent }}</td>
              <td>{{ all.replyTime }}</td>
              <td/>
            </tr>
          </tbody>
        </table>
        <el-dialog :visible.sync="dialogFormVisible" title="回复咨询" width="30%" >
          <el-form :model="form" :inline="true" label-width="150px" >
            <el-form-item label="咨询内容">
              <el-input v-model="form.questionContent" :readonly="true"/>
            </el-form-item>
            <el-form-item label="回复咨询">
              <el-input v-model="form.replyContent" type="textarea"/>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="savePartner(1)">确 定</el-button>
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
    <el-tab-pane label="未回复咨询">
      <div class="consult">
        <table class="consult_tableall">
          <thead>
            <tr>
              <th style="width:30px;"><input type="checkbox" @click="checkToReplyConsult()"></th>
              <th colspan="3">
                <span>全选</span>
                <a href="javascript:void(0);" @click="delConsults(2)">删除</a>
              </th>
            </tr>
          </thead>
          <tbody v-for="toReply in toReplyConsult" :key="toReply.id">
            <tr class="bgcolor">
              <td><input :value="toReply.id" type="checkbox" name="toReplyConsultIds"></td>
              <td>
                <a href="" class="consult-shopname">{{ toReply.itemName }}</a>
                <span>商品咨询</span>
              </td>
              <td style="width:150px;">{{ toReply.userName }}</td>
              <td style="width:150px;">
                <a href="javascript:void(0);" class="consultBtn" @click="handleDelClick(toReply.id)">删除</a>
                <a href="javascript:void(0);" class="consultBtn" @click="replyQa(toReply.questionContent ,toReply.replyContent, toReply.id, 2)">回复</a>
              </td>
            </tr>
            <tr>
              <td/>
              <td><b>咨询内容：</b>{{ toReply.questionContent }}</td>
              <td>{{ toReply.postTime }}</td>
              <td/>
            </tr>
          </tbody>
        </table>
        <el-dialog :visible.sync="dialogFormVisible2" title="回复咨询" width="30%" >
          <el-form :model="form2" :inline="true" label-width="150px" >
            <el-form-item label="咨询内容">
              <el-input v-model="form2.questionContent" :readonly="true"/>
            </el-form-item>
            <el-form-item label="回复咨询">
              <el-input v-model="form2.replyContent" type="textarea"/>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="savePartner(2)">确 定</el-button>
          </div>
        </el-dialog>
        <!--分页-->
        <div style="height:24px;"/>
        <el-pagination
          :current-page="searchParam2.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="searchParam2.pageSize"
          :total="searchParam2.total"
          layout="total, sizes, prev, pager, next, jumper"
          style="text-align:center;"
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2" />
      </div>
    </el-tab-pane>
    <el-tab-pane label="已回复咨询">
      <div class="consult">
        <table class="consult_tableall">
          <thead>
            <tr>
              <th style="width:30px;"><input type="checkbox" @click="checkReplyConsult()"></th>
              <th colspan="3">
                <span>全选</span>
                <a href="javascript:void(0);" @click="delConsults(3)">删除</a>
              </th>
            </tr>
          </thead>
          <tbody v-for="reply in replyConsult" :key="reply.id">
            <tr class="bgcolor">
              <td><input :value="reply.id" type="checkbox" name="replyConsultIds"></td>
              <td>
                <a href="" class="consult-shopname">{{ reply.itemName }}</a>
                <span>商品咨询</span>
              </td>
              <td style="width:150px;">{{ reply.userName }}</td>
              <td style="width:150px;">
                <a href="javascript:void(0);" class="consultBtn" @click="handleDelClick(reply.id)">删除</a>
                <a href="javascript:void(0);" class="consultBtn" @click="replyQa(reply.questionContent ,reply.replyContent, reply.id, 3)">回复</a>
              </td>
            </tr>
            <tr>
              <td/>
              <td><b>咨询内容：</b>{{ reply.questionContent }}</td>
              <td>{{ reply.postTime }}</td>
              <td/>
            </tr>
            <tr>
              <td/>
              <td><strong>我的回复：</strong>{{ reply.replyContent }}</td>
              <td>{{ reply.postTime }}</td>
              <td/>
            </tr>
          </tbody>
        </table>
        <el-dialog :visible.sync="dialogFormVisible3" title="回复咨询" width="30%" >
          <el-form :model="form3" :inline="true" label-width="150px" >
            <el-form-item label="咨询内容">
              <el-input v-model="form3.questionContent" :readonly="true"/>
            </el-form-item>
            <el-form-item label="回复咨询">
              <el-input v-model="form3.replyContent" type="textarea"/>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible3 = false">取 消</el-button>
            <el-button type="primary" @click="savePartner(3)">确 定</el-button>
          </div>
        </el-dialog>
        <!--分页-->
        <div style="height:24px;"/>
        <el-pagination
          :current-page="searchParam3.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="searchParam3.pageSize"
          :total="searchParam3.total"
          layout="total, sizes, prev, pager, next, jumper"
          style="text-align:center;"
          @size-change="handleSizeChange3"
          @current-change="handleCurrentChange3" />
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
  .consult{
    margin-top:20px;
    padding:20px 0;
    border-top:1px solid #eee;
    text-align:left;
  }
  .consult_tableall{
    width:100%;
    margin:20px 0;
  }
  .consult_tableall th{
    height:50px;
    line-height:50px;
    font-sizE:14px;
  }
  .consult_tableall th span{
    padding-right:30px;
  }
  .consult_tableall th a{
    color:#f45408;
    font-size:14px;
  }
  .consult_tableall .bgcolor{
    background:#eee;
    font-weight:700;
    text-align:center;
  }
  .consult_tableall .bgcolor td:nth-child(2){
    padding-left:10px;
    box-sizing:border-box;
    text-align:left;
  }
  .consult_tableall .consult-shopname{
    color:#f45408;
    padding-right:20px;
  }
  .consult_tableall td{
    font-size:12px;
    padding:10px 0;
  }
  .consult_tableall .consultBtn{
    padding:5px 10px;
    border-radius:5px;
    background:#f45408;
    color:#fff;
    font-size:12px;
    margin:0 3px;
    font-weight:400;
  }
  .consult_tableall td:nth-child(3){
    text-align:center;
  }
</style>

<script>
import axios from 'axios'

export default {
  name: 'ConsultManage',
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      searchParam: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      searchParam2: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      searchParam3: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      form: {
        id: 0,
        questionContent: '',
        replyContent: '',
        isReply: 1
      },
      form2: {
        id: 0,
        questionContent: '',
        replyContent: '',
        isReply: 1
      },
      form3: {
        id: 0,
        questionContent: '',
        replyContent: '',
        isReply: 1
      },
      delParam: {
        ids: []
      },
      allConsultAmount: 0,
      toReplyConsultAmount: 0,
      replyConsultAmount: 0,
      allConsult: {},
      replyConsult: {},
      toReplyConsult: {},
      consultAll: 'all',
      consultReply: 'reply',
      consultToReply: 'to_reply'

    }
  },
  mounted() {
    this.getAllConsultList(this.$Yjj.getConsultManageList.type, this.$Yjj.getConsultManageList.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize, schType: this.consultAll })
    this.getToReplyConsultList(this.$Yjj.getConsultManageList.type, this.$Yjj.getConsultManageList.target, { page: this.searchParam2.page, pageSize: this.searchParam2.pageSize, schType: this.consultToReply })
    this.getReplyConsultList(this.$Yjj.getConsultManageList.type, this.$Yjj.getConsultManageList.target, { page: this.searchParam3.page, pageSize: this.searchParam3.pageSize, schType: this.consultReply })
  },
  methods: {
    getAllConsultList: function(type, target, data) {
      return new Promise((resolve, reject) => {
        axios[type](target, data).then(response => {
          this.allConsult = response.data.data.dataList
          console.log(this.allConsult.total)
          this.searchParam.total = response.data.data.total
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    getToReplyConsultList: function(type, target, data) {
      return new Promise((resolve, reject) => {
        axios[type](target, data).then(response => {
          this.toReplyConsult = response.data.data.dataList
          // console.log(this.replyConsult)
          this.searchParam2.total = response.data.data.total
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    getReplyConsultList: function(type, target, data) {
      return new Promise((resolve, reject) => {
        axios[type](target, data).then(response => {
          this.replyConsult = response.data.data.dataList
          this.searchParam3.total = response.data.data.total
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
      console.log('当前页:${val}')
      this.searchParam.page = val
      this.getAllConsultList(this.$Yjj.getConsultManageList.type, this.$Yjj.getConsultManageList.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize, schType: this.consultAll })
    },
    handleSizeChange2: function(val) {
      console.log('每页${val}条')
    },
    handleCurrentChange2: function(val) {
      console.log('当前页:${val}')
      this.searchParam2.page = val
      this.getToReplyConsultList(this.$Yjj.getConsultManageList.type, this.$Yjj.getConsultManageList.target, { page: this.searchParam2.page, pageSize: this.searchParam2.pageSize, schType: this.consultToReply })
    },
    handleSizeChange3: function(val) {
      console.log('每页${val}条')
    },
    handleCurrentChange3: function(val) {
      console.log('当前页:${val}')
      this.searchParam3.page = val
      this.getReplyConsultList(this.$Yjj.getConsultManageList.type, this.$Yjj.getConsultManageList.target, { page: this.searchParam3.page, pageSize: this.searchParam3.pageSize, schType: this.consultReply })
    },
    replyQa: function(qa, ans, id, type) {
      if (type === 1) {
        for (const key in this.form) {
          delete this.form[key]
        }
        this.form.questionContent = qa
        this.form.replyContent = ans
        this.form.id = id
        this.form.isReply = 1
        this.dialogFormVisible = true
      } else if (type === 2) {
        for (const key in this.form2) {
          delete this.form2[key]
        }
        this.form2.questionContent = qa
        this.form2.replyContent = ans
        this.form2.id = id
        this.form2.isReply = 1
        this.dialogFormVisible2 = true
      } else {
        for (const key in this.form3) {
          delete this.form3[key]
        }
        this.form3.questionContent = qa
        this.form3.replyContent = ans
        this.form3.id = id
        this.form3.isReply = 1
        this.dialogFormVisible3 = true
      }
    },
    // 单个删除咨询管理
    handleDelClick: function(val) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // 确认按钮按下
        const type = this.$Yjj.delConsultManageById.type
        const target = this.$Yjj.delConsultManageById.target + '?id=' + val
        return new Promise((resolve, reject) => {
          axios[type](target).then(response => {
            // 刷新列表
            this.getAllConsultList(this.$Yjj.getConsultManageList.type, this.$Yjj.getConsultManageList.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize, schType: this.consultAll })
            this.getToReplyConsultList(this.$Yjj.getConsultManageList.type, this.$Yjj.getConsultManageList.target, { page: this.searchParam2.page, pageSize: this.searchParam2.pageSize, schType: this.consultToReply })
            this.getReplyConsultList(this.$Yjj.getConsultManageList.type, this.$Yjj.getConsultManageList.target, { page: this.searchParam3.page, pageSize: this.searchParam3.pageSize, schType: this.consultReply })
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
    savePartner: function(sub) {
      const type = this.$Yjj.replyConsultManage.type
      const target = this.$Yjj.replyConsultManage.target
      return new Promise((resolve, reject) => {
        if (sub === 1) {
          axios[type](target, this.form).then(response => {
            this.dialogFormVisible = false
            const code = response.data.code
            if (code === '2000') {
              // 刷新列表
              this.getAllConsultList(this.$Yjj.getConsultManageList.type, this.$Yjj.getConsultManageList.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize, schType: this.consultAll })
              this.getToReplyConsultList(this.$Yjj.getConsultManageList.type, this.$Yjj.getConsultManageList.target, { page: this.searchParam2.page, pageSize: this.searchParam2.pageSize, schType: this.consultToReply })
              this.getReplyConsultList(this.$Yjj.getConsultManageList.type, this.$Yjj.getConsultManageList.target, { page: this.searchParam3.page, pageSize: this.searchParam3.pageSize, schType: this.consultReply })
              this.$message({
                type: 'success',
                message: '回复成功!'
              })
              resolve(response.data)
            } else {
              this.$message({
                type: 'error',
                message: '回复失败!'
              })
            }
            resolve(response.data)
          }).catch(error => {
            reject(error.response.data.errors)
          })
        } else if (sub === 2) {
          axios[type](target, this.form2).then(response => {
            this.dialogFormVisible2 = false
            const code = response.data.code
            if (code === '2000') {
              // 刷新列表
              this.getAllConsultList(this.$Yjj.getConsultManageList.type, this.$Yjj.getConsultManageList.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize, schType: this.consultAll })
              this.getToReplyConsultList(this.$Yjj.getConsultManageList.type, this.$Yjj.getConsultManageList.target, { page: this.searchParam2.page, pageSize: this.searchParam2.pageSize, schType: this.consultToReply })
              this.getReplyConsultList(this.$Yjj.getConsultManageList.type, this.$Yjj.getConsultManageList.target, { page: this.searchParam3.page, pageSize: this.searchParam3.pageSize, schType: this.consultReply })
              this.$message({
                ype: 'success',
                message: '回复成功!'
              })
              resolve(response.data)
            } else {
              this.$message({
                type: 'error',
                message: '回复失败!'
              })
            }
            resolve(response.data)
          }).catch(error => {
            reject(error.response.data.errors)
          })
        } else {
          axios[type](target, this.form3).then(response => {
            this.dialogFormVisible3 = false
            const code = response.data.code
            if (code === '2000') {
              // 刷新列表
              this.getAllConsultList(this.$Yjj.getConsultManageList.type, this.$Yjj.getConsultManageList.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize, schType: this.consultAll })
              this.getToReplyConsultList(this.$Yjj.getConsultManageList.type, this.$Yjj.getConsultManageList.target, { page: this.searchParam2.page, pageSize: this.searchParam2.pageSize, schType: this.consultToReply })
              this.getReplyConsultList(this.$Yjj.getConsultManageList.type, this.$Yjj.getConsultManageList.target, { page: this.searchParam3.page, pageSize: this.searchParam3.pageSize, schType: this.consultReply })
              this.$message({
                ype: 'success',
                message: '回复成功!'
              })
              resolve(response.data)
            } else {
              this.$message({
                type: 'error',
                message: '回复失败!'
              })
            }
            resolve(response.data)
          }).catch(error => {
            reject(error.response.data.errors)
          })
        }
      })
    },
    // 全部咨询全选控制
    checkAllConsult: function() {
      this.allConsultAmount += 1
      if (this.allConsultAmount % 2 === 0) {
        const cks = document.getElementsByName('allConsultIds')
        for (var i = 0; i < cks.length; i++) {
          cks[i].checked = false
        }
      } else {
        const cks = document.getElementsByName('allConsultIds')
        for (var j = 0; j < cks.length; j++) {
          cks[j].checked = true
        }
      }
    },
    // 未回复咨询全选控制
    checkToReplyConsult: function() {
      this.toReplyConsultAmount += 1
      if (this.toReplyConsultAmount % 2 === 0) {
        const cks = document.getElementsByName('toReplyConsultIds')
        for (var i = 0; i < cks.length; i++) {
          cks[i].checked = false
        }
      } else {
        const cks = document.getElementsByName('toReplyConsultIds')
        for (var j = 0; j < cks.length; j++) {
          cks[j].checked = true
        }
      }
    },
    // 已回复咨询全选控制
    checkReplyConsult: function() {
      this.replyConsultAmount += 1
      if (this.replyConsultAmount % 2 === 0) {
        const cks = document.getElementsByName('replyConsultIds')
        for (var i = 0; i < cks.length; i++) {
          cks[i].checked = false
        }
      } else {
        const cks = document.getElementsByName('replyConsultIds')
        for (var j = 0; j < cks.length; j++) {
          cks[j].checked = true
        }
      }
    },
    // 批量删除
    delConsults: function(val) {
      var consultIds = []
      if (val === 1) {
        const cks = document.getElementsByName('allConsultIds')
        for (var i = 0; i < cks.length; i++) {
          if (cks[i].checked === true) {
            consultIds.push(cks[i].value)
          }
        }
      } else if (val === 2) {
        const cks = document.getElementsByName('toReplyConsultIds')
        for (var j = 0; j < cks.length; j++) {
          if (cks[j].checked === true) {
            consultIds.push(cks[j].value)
          }
        }
      } else {
        const cks = document.getElementsByName('replyConsultIds')
        for (var k = 0; k < cks.length; k++) {
          if (cks[k].checked === true) {
            consultIds.push(cks[k].value)
          }
        }
      }
      if (consultIds.length < 1) {
        this.$message({
          type: 'info',
          message: '请选择要删除的记录!'
        })
        return
      } else {
        this.delParam.ids = consultIds
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          // 确认按钮按下
          const type = this.$Yjj.delConsultManageByIds.type
          const target = this.$Yjj.delConsultManageByIds.target
          return new Promise((resolve, reject) => {
            axios[type](target, this.delParam).then(response => {
              // 刷新列表
              if (val === 1) {
                this.getAllConsultList(this.$Yjj.getConsultManageList.type, this.$Yjj.getConsultManageList.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize, schType: this.consultAll })
                this.getToReplyConsultList(this.$Yjj.getConsultManageList.type, this.$Yjj.getConsultManageList.target, { page: this.searchParam2.page, pageSize: this.searchParam2.pageSize, schType: this.consultToReply })
                this.getReplyConsultList(this.$Yjj.getConsultManageList.type, this.$Yjj.getConsultManageList.target, { page: this.searchParam3.page, pageSize: this.searchParam3.pageSize, schType: this.consultReply })
              } else if (val === 2) {
                this.getAllConsultList(this.$Yjj.getConsultManageList.type, this.$Yjj.getConsultManageList.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize, schType: this.consultAll })
                this.getToReplyConsultList(this.$Yjj.getConsultManageList.type, this.$Yjj.getConsultManageList.target, { page: this.searchParam2.page, pageSize: this.searchParam2.pageSize, schType: this.consultToReply })
              } else {
                this.getAllConsultList(this.$Yjj.getConsultManageList.type, this.$Yjj.getConsultManageList.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize, schType: this.consultAll })
                this.getReplyConsultList(this.$Yjj.getConsultManageList.type, this.$Yjj.getConsultManageList.target, { page: this.searchParam3.page, pageSize: this.searchParam3.pageSize, schType: this.consultReply })
              }
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
