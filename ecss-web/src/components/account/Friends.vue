<template>
  <el-tabs type="border-card">
    <el-tab-pane label="好友列表">
      <div class="friend">
        <div class="firendAdd"><a href="javascript:void(0);" @click="showAddDia()">添加好友</a></div>
        <div class="firend_list">
          <span class="frienfList_all">
            <label><input type="checkbox" name="checkBoxAll" @click="checkAll()">全选</label>
            <!-- <a href="javascript:void(0);" @click="editMsg()">短消息</a> -->
            <a href="javascript:void(0);" @click="delFriends()">删除</a>
          </span>
          <ul class="friendsUl">
            <li v-for="item in friendArr" :key="item.id">
              <div class="friendli_img"><img :src="item.friendPhoto"></div>
              <div class="friends_check">
                <span class="friend_input"><input :value="item.id" name="ids" type="checkbox">{{ item.friendName }}</span>
                <div class="friendadd_btn">
                  <a href="javascript:void(0);" @click="editMsg(item.friendId)" >短消息</a>
                  <a href="javascript:void(0);" @click="delFriend(item.id)">删除</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </el-tab-pane>
    <el-dialog :visible.sync="dialogFormVisible" title="添加好友" width="30%" >
      <el-form :model="addObj" :inline="true" label-width="60px" >
        <el-form-item label="学号:">
          <el-input v-model="addObj.friends" placeholder="格式如：10001,10002"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveFriends()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisibles" title="发送消息" width="25%" center >
      <el-form :model="addObj" :inline="true" label-width="150px" style="text-align:center;" >
        <el-form-item label="">
          <el-input v-model="msgContent" type="textarea" style="width:300px"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibles = false">取 消</el-button>
        <el-button type="primary" @click="sendMsg()">确 定</el-button>
      </div>
    </el-dialog>
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
  .friend{
    margin-top:20px;
    padding:20px 0;
    border-top:1px solid #eee;
    text-align:left;
  }
  .firendAdd a{
    display:block;
    margin:0 0 20px 0;
    height:40px;;
    line-height:40px;
    background:#f45408;
    color:#fff;
    border-radius:5px;
    width:100px;
    text-align:center;
  }
  .firend_list{
    border-top:1px solid #f45408;
    padding:20px 0;
  }
  .frienfList_all{
    display:block;
    margin-bottom:20px;
  }
  .frienfList_all label{
    font-size:14px;
    padding-right:30px;
  }
  .frienfList_all a{
    padding-right:10px;
    font-size:14px;
    color:#f45408;
  }
  .friendsUl{
    font-size:0;
  }
  .friendsUl li{
    display:inline-block;
    vertical-align:top;
    font-size:0;
    color:#333;
    width:33.33%;
    padding:15px;
    box-sizing:border-box;
  }
  .friendli_img,.friends_check{
    display:inline-block;
    vertical-align:middle;
    font-size:14px;
  }
  .friendli_img{
    width:80px;
    height:80px;
    overflow:hidden;
  }
  .friendli_img img{
    width:100%;
    height:100%;
  }
  .friends_check{
    width:150px;
    margin-left:10px;
  }
  .friends_check span,.friends_check a{
    font-size:14px;
    color:#333;
  }
  .friends_check .friend_input{
    display:block;
    margin-bottom:10px;
    color:#5ba439;
  }
  .friendadd_btn{
    font-size:0;
  }
  .friendadd_btn a{
    display:inline-block;
    color:#333;
    font-size:14px;
    padding:4px 10px;
    margin-right:8px;
    background:rgb(255, 225, 211);
    border-radius:3px;
  }
</style>

<script>
import axios from 'axios'

export default {
  name: 'Friends',
  data() {
    return {
      friendArr: [],
      dialogFormVisible: false,
      addObj: {
        friends: ''
      },
      dialogFormVisibles: false,
      msgContent: '',
      showId: ''
    }
  },
  mounted() {
    this.getFriends(this.$Lwy.listFrendsByCurrent.type, this.$Lwy.listFrendsByCurrent.target)
  },
  methods: {
    getFriends: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.friendArr = response.data.data
          console.log(this.friendArr)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    // 多条删除
    delFriends: function() {
      const ids = []
      const cks = document.getElementsByName('ids')
      for (var i = 0; i < cks.length; i++) {
        if (cks[i].checked === true) {
          ids.push(cks[i].value)
        }
      }
      this.delCommon(ids)
    },
    // 单条删除
    delFriend: function(id) {
      const ids = []
      ids.push(id)
      this.delCommon(ids)
    },
    // 删除的共通方法
    delCommon: function(ids) {
      // 参数对象
      const paramObj = {}
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
          const type = this.$Lwy.delFriendByIds.type
          const target = this.$Lwy.delFriendByIds.target
          paramObj.ids = ids
          return new Promise((resolve, reject) => {
            axios[type](target, paramObj).then(response => {
              // 刷新列表
              this.getFriends(this.$Lwy.listFrendsByCurrent.type, this.$Lwy.listFrendsByCurrent.target)
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
    },
    // 全选
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
    showAddDia: function() {
      this.addObj.friends = ''
      this.dialogFormVisible = true
    },
    // 添加好友
    saveFriends: function() {
      const type = this.$Lwy.addFriendByName.type
      const target = this.$Lwy.addFriendByName.target
      const paramObj = this.addObj
      var nums = paramObj.friends
      if (nums === null || nums === '') {
        this.$message({
          type: 'info',
          message: '添加信息不允许为空!'
        })
        return
      }
      return new Promise((resolve, reject) => {
        axios[type](target, paramObj).then(response => {
          this.dialogFormVisible = false
          const code = response.data.code
          if (code === '2000') {
            // 刷新列表
            this.getFriends(this.$Lwy.listFrendsByCurrent.type, this.$Lwy.listFrendsByCurrent.target)
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
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
    editMsg: function(id) {
      this.showId = id
      this.dialogFormVisibles = true
    },
    sendMsg: function() {
      const content = this.msgContent
      if (content === null || content === '') {
        this.$message({
          type: 'info',
          message: '内容不允许为空'
        })
        return
      }
      if (content.length > 100) {
        this.$message({
          type: 'info',
          message: '输入内容过长'
        })
        return
      }
      const type = this.$Lwy.sendMsgByCurrent.type
      const target = this.$Lwy.sendMsgByCurrent.target
      var param = {}
      param.content = content
      param.receiveId = this.showId
      return new Promise((resolve, reject) => {
        axios[type](target, param).then(response => {
          const code = response.data.code
          if (code === '2000') {
            this.$message({
              type: 'success',
              message: '发送成功!'
            })
            console.log(this.noReadArr)
            resolve(response.data)
          } else {
            this.$message({
              type: 'error',
              message: '发送失败'
            })
          }
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    }
  }
}
</script>
