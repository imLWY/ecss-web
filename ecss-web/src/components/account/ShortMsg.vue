<template>
  <el-tabs v-model="activeTab" type="border-card" @tab-click="handleTabsClick">
    <el-tab-pane :label="noReadLabel" name="noReadMsg">
      <div class="shortmsg">
        <div class="shortmsg_table">
          <span class="shortmsg_all">
            <!-- <a class="goodst_btn" href="javascript:void(0);">批量删除</a> -->
          </span>
          <el-table
            :data="noReadArr"
            fit
            stripe
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column align="center" label="头像" width="100" fixed="left">
              <template slot-scope="scope">
                <img :src="scope.row.showPhoto" style="height:40px;width:40px;">
              </template>
            </el-table-column>
            <el-table-column prop="showName" align="left" label="用户名" width="150"/>
            <el-table-column prop="content" align="left" label="内容" width="300"/>
            <el-table-column prop="createdTime" align="left" label="时间" width="150"/>
            <el-table-column align="center" label="操作" width="100" fixed="right">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button
                    type="warning"
                    size="mini"
                    icon="el-icon-view"
                    circle
                    @click="viewByNoReader(scope.row.showId, scope.row.type)" />
                  <el-button
                    type="warning"
                    size="mini"
                    icon="el-icon-delete"
                    circle
                    @click="delPreMsgItemChange(scope.row.showId)" />
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="私人消息" name="personMsg">
      <div class="shortmsg">
        <div class="shortmsg_table">
          <span class="shortmsg_all">
            <a href="javascript:void(0);" @click="delPreMsgChange()">批量删除</a>
          </span>
          <el-table
            :data="talkPerson"
            fit
            stripe
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handlePreMsgChange">
            <el-table-column type="selection" width="55"/>
            <el-table-column align="center" label="头像" width="100" fixed="left">
              <template slot-scope="scope">
                <img :src="scope.row.showPhoto" style="height:40px;width:40px;">
              </template>
            </el-table-column>
            <el-table-column prop="showName" align="left" label="用户名" width="150"/>
            <el-table-column prop="content" align="left" label="内容" width="300"/>
            <el-table-column prop="createdTime" align="left" label="时间" width="150"/>
            <el-table-column align="center" label="操作" width="100" fixed="right">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button
                    type="warning"
                    size="mini"
                    icon="el-icon-view"
                    circle
                    @click="viewByNoReader(scope.row.showId,scope.row.type)" />
                  <el-button
                    type="warning"
                    size="mini"
                    icon="el-icon-delete"
                    circle
                    @click="delPreMsgItemChange(scope.row.showId)" />
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="系统消息" name="sysMsg">
      <div class="shortmsg">
        <!-- <div class="shortmsg_firend"><a href="">添加好友</a></div> -->
        <div class="shortmsg_table">
          <span class="shortmsg_all">
            <!-- <label><input type="checkbox">全选</label> -->
            <a href="javascript:void(0);" @click= "delSysMsgChange">批量删除</a>
          </span>
          <el-table
            :data="sysMsgList"
            fit
            stripe
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSysMsgChange">
            <el-table-column type="selection" width="55"/>
            <el-table-column align="center" label="头像" width="100" fixed="left">
              <template slot-scope="scope">
                <img :src="scope.row.showPhoto" style="height:40px;width:40px;">
              </template>
            </el-table-column>
            <el-table-column prop="showName" align="left" label="消息类型" width="150"/>
            <el-table-column prop="content" align="left" label="内容" width="300"/>
            <el-table-column prop="createdTime" align="left" label="时间" width="150"/>
            <el-table-column align="center" label="操作" width="100" fixed="right">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button
                    type="warning"
                    size="mini"
                    icon="el-icon-delete"
                    circle
                    @click="delSysMsgItem(scope.row.id)" />
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="paging">
            <el-pagination
              :current-page="sysMsgParam.page"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="sysMsgParam.pageSize"
              :total="sysMsgParam.total"
              layout="total, sizes, prev, pager, next, jumper"
              style="text-align:center;"
              @size-change="handleBrandTableSizeChange"
              @current-change="handleBrandTableCurrentChange" />
          </div>
          <!--分页结束-->
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane v-if="msgList === 1234" label="公共消息" name="commonMsg">
      <div class="shortmsg">
        <!-- <div class="shortmsg_firend"><a href="">添加好友</a></div> -->
        <div class="shortmsg_table">
          <span class="shortmsg_all">
            <!-- <label><input type="checkbox">全选</label> -->
            <a href="">删除</a>
          </span>
          <el-table
            :data="commonMsgList"
            fit
            stripe
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column type="selection" width="55"/>
            <el-table-column align="center" label="头像" width="100" fixed="left">
              <template slot-scope="scope">
                <img :src="scope.row.showPhoto" style="height:40px;width:40px;">
              </template>
            </el-table-column>
            <el-table-column prop="showName" align="left" label="消息类型" width="150"/>
            <el-table-column prop="content" align="left" label="内容" width="300"/>
            <el-table-column prop="createdTime" align="left" label="时间" width="150"/>
            <el-table-column align="center" label="操作" width="100" fixed="right">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button
                    type="warning"
                    size="mini"
                    icon="el-icon-delete"
                    circle
                    @click="delMsg(scope.row.id)" />
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="paging">
            <el-pagination
              :current-page="commonMsgParam.page"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="commonMsgParam.pageSize"
              :total="commonMsgParam.total"
              layout="total, sizes, prev, pager, next, jumper"
              style="text-align:center;"
              @size-change="handleBrandTableSizeChange"
              @current-change="handleBrandTableCurrentChange" />
          </div>
          <!--分页结束-->
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane v-if="msgList === 1" label="消息列表" name="msgList">
      <div class="shortmsg">
        <div class="shortmsg_firend" />
        <div class="shortmsg_table">
          <span class="shortmsg_all">
            <a href="javascript:void(0)" @click="delMsgListChange">批量删除</a>
          </span>
          <el-table
            :data="msgListArr"
            fit
            stripe
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleMsgListChange">
            <el-table-column type="selection" width="55"/>
            <el-table-column align="center" label="头像" width="100" fixed="left">
              <template slot-scope="scope">
                <img :src="scope.row.showPhoto" style="height:40px;width:40px;">
              </template>
            </el-table-column>
            <el-table-column prop="showName" align="left" label="用户名" width="150"/>
            <el-table-column prop="content" align="left" label="内容" width="300"/>
            <el-table-column prop="createdTime" align="left" label="时间" width="150"/>
            <el-table-column align="center" label="操作" width="100" fixed="right">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button
                    type="warning"
                    size="mini"
                    icon="el-icon-delete"
                    circle
                    @click="delSysMsgItem(scope.row.id)" />
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
          <div class="mygoodsBottom_zxform">
            <div class="zxform_text" style="display:inline-block;vertical-align:bottom;">
              <el-input v-model="newMsgContent" type="textarea" />
            </div>
            <a href="javascript:void(0);" class="zxform_btn" style="display:inline-block;vertical-align:bottom;" @click="sendMsgByCurrent()">发送消息</a>
          </div>
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
  .shortmsg{
    margin-top:20px;
    padding:20px 0;
    border-top:1px solid #eee;
    text-align:left;
  }
  .shortmsg_firend a{
    display:block;
    margin:0 0 20px 0;
    width:100px;
    text-align:center;
    height:40px;
    line-height:40px;
    border-radius:5px;
    background:#f45408;
    color:#fff;
    font-size:14px;
  }
  .shortmsg_all{
    display:block;
    margin:10px 0;
  }
  .shortmsg_all label{
    font-size:14px;
    padding-right:30px;
  }
  .shortmsg_all a{
    color:#f45408;
    font-size:14px;
  }
  .shortTable{
    margin-top:20px;
    border-top:1px solid #f45408;
    width:100%;
  }
  .shortTable th,.shortTable td{
    text-align:center;
    color:#333;
    font-size:12px;
  }
  .shortTable th{
    font-size:14px;
    height:50px;
    line-height:50px;
  }
  .shortgy{
    display:inline-block;
    vertical-align:middle;
  }
  .shortmsgImg{
    width:50px;
    height:50px;
    overflow:hidden;
    margin-right:10px;
  }
  .shortmsgImg img{
    width:100%;
    height:100%;
  }
  .shortBtns{
    display:inline-block;
    vertical-align:middle;
    color:#fff;
    background:#f45408;
    padding:5px 8px;
    margin:0 3px;
    border-radius:5px;
  }
  .zxform_text textarea{
    display:inline-block;
    vertical-align:top;
    width:720px;
    height:55px;
    border:1px solid #ddd;
    padding:10px;
    box-sizing:border-box;
    font-size:14px;
    color:#666;
    margin: 10px;

  }
  .zxform_btn{
    display:block;
    width:100px;
    height:40px;
    line-height:40px;
    text-align:center;
    font-size:14px;
    color:#fff;
    background:#f45408;
    border-radius:5px;
    margin:20px auto;
  }
</style>

<script>
import axios from 'axios'

export default {
  name: 'ShortMsg',
  data() {
    return {
      noReadArr: [],
      talkPerson: [],
      noReadLabel: '',
      dialogFormVisible: false,
      addObj: {
        friends: ''
      },
      activeTab: this.$route.query.activename === 'msgList' ? this.$route.query.activename : 'noReadMsg',
      msgListArr: [],
      msgList: 0,
      sysMsgList: [],
      sysMsgParam: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      commonMsgParam: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      commonMsgList: [],
      msgItemId: '',
      msgItemType: '',
      delSysParam: {
        ids: []
      },
      delMsgParam: {
        ids: []
      },
      delPerParam: {
        ids: []
      },
      newMsgContent: ''
    }
  },
  mounted() {
    this.getNoReadArr()
  },
  methods: {
    // 获取未读消息
    getNoReadArr: function() {
      const type = this.$Lwy.listNoReadMsg.type
      const target = this.$Lwy.listNoReadMsg.target
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.noReadArr = response.data.data
          this.noReadLabel = '未读消息（' + this.noReadArr.length + '）'
          console.log(this.noReadArr)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    handleTabsClick: function(tab, event) {
      // 清空消息列表
      if (tab.name !== 'msgList') {
        // 清空消息列表
        this.clearMsgList()
      }

      if (tab.name === 'noReadMsg') {
        this.getNoReadArr() // 获取未读消息
      }
      if (tab.name === 'personMsg') {
        this.getTalkPerson() // 获取对话列表
      }
      if (tab.name === 'sysMsg') {
        this.getSysMsgList() // 获取系统消息
      }
      if (tab.name === 'commonMsg') {
        this.getComMsgList() // 获取公共消息
      }
      if (tab.name === 'msgList') {
        console.log('msgList')
      }
    },
    clearMsgList: function() {
      this.msgList = 0
      this.msgListArr = []
    },
    // 获取对话列表
    getTalkPerson: function() {
      const type = this.$Lwy.listTalkPersonMsg.type
      const target = this.$Lwy.listTalkPersonMsg.target
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.talkPerson = response.data.data
          console.log(this.noReadArr)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    // 获取系统消息
    getSysMsgList: function() {
      const type = this.$Lwy.getMsgListBySys.type
      const target = this.$Lwy.getMsgListBySys.target
      return new Promise((resolve, reject) => {
        axios[type](target, this.sysMsgParam).then(response => {
          this.sysMsgList = response.data.data.dataList
          this.sysMsgParam.total = response.data.data.total
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    // 获取公共消息
    getComMsgList: function() {
      const type = this.$Lwy.getMsgListByCom.type
      const target = this.$Lwy.getMsgListByCom.target
      return new Promise((resolve, reject) => {
        axios[type](target, this.sysMsgParam).then(response => {
          this.commonMsgList = response.data.data.dataList
          this.commonMsgParam.total = response.data.data.total
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    // 未读信息查看信息列表
    viewByNoReader: function(id, msgType) {
      this.msgItemId = id
      this.msgItemType = msgType
      if (msgType === 1) {
        this.msgList = 1
        this.activeTab = 'msgList'
        const type = this.$Lwy.getMsgList.type
        const target = this.$Lwy.getMsgList.target
        var param = {}
        param.receiveId = id
        return new Promise((resolve, reject) => {
          axios[type](target, param).then(response => {
            const code = response.data.code
            const msg = response.data.msg
            if (code === '2000') {
              this.msgListArr = response.data.data
              this.getNoReadArr() // 获取未读消息
              console.log(this.noReadArr)
              resolve(response.data)
            } else {
              this.$message({
                type: 'error',
                message: msg
              })
            }
          }).catch(error => {
            reject(error.response.data.errors)
          })
        })
      }
      if (msgType === 0) {
        this.msgList = 0
        this.activeTab = 'sysMsg'
        this.getSysMsgList() // 获取系统消息
      }
      if (msgType === 2) {
        this.msgList = 0
        this.activeTab = 'commonMsg'
        this.getComMsgList() // 获取系统消息
      }
    },
    // 批量删除SysMsg预处理
    handleSysMsgChange: function(val) {
      this.delSysParam.ids.length = 0
      if (val !== '' && val.length > 0) {
        for (var i = 0; i < val.length; i++) {
          console.log('qqqqqqq' + val[i].id)
          this.delSysParam.ids.push(val[i].id)
        }
      }
    },
    delSysMsgChange: function() {
      this.delSysCommom(this.delSysParam.ids)
    },
    delSysMsgItem: function(id) {
      var ids = []
      ids.push(id)
      this.delSysCommom(ids)
    },
    delSysCommom: function(ids) {
      const type = this.$Lwy.removeListByUpdDels.type
      const target = this.$Lwy.removeListByUpdDels.target
      var param = {}
      param.ids = ids
      return new Promise((resolve, reject) => {
        axios[type](target, param).then(response => {
          const code = response.data.code
          const msg = response.data.msg
          if (code === '2000') {
            this.getSysMsgList()
            this.getNoReadArr() // 获取未读消息
            this.viewByNoReader(this.msgItemId, this.msgItemType)
            console.log(this.noReadArr)
            resolve(response.data)
          } else {
            this.$message({
              type: 'error',
              message: msg
            })
          }
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    // 批量删除对话列表预处理
    handleMsgListChange: function(val) {
      this.delMsgParam.ids.length = 0
      if (val !== '' && val.length > 0) {
        for (var i = 0; i < val.length; i++) {
          this.delMsgParam.ids.push(val[i].id)
        }
      }
    },
    // 批量删除消息列表
    delMsgListChange: function() {
      this.delSysCommom(this.delMsgParam.ids)
    },
    // 批量删除对话列表预处理
    handlePreMsgChange: function(val) {
      this.delPerParam.ids.length = 0
      if (val !== '' && val.length > 0) {
        for (var i = 0; i < val.length; i++) {
          this.delPerParam.ids.push(val[i].showId)
        }
      }
    },
    // 对话列表删除
    delPreMsgChange: function() {
      this.delPreMsgCommon(this.delPerParam.ids)
    },
    // 删除对话单条数据
    delPreMsgItemChange: function(id) {
      var ids = []
      ids.push(id)
      this.delPreMsgCommon(ids)
    },
    // 对话列表删除共通
    delPreMsgCommon: function(ids) {
      const type = this.$Lwy.removePerByUpdDels.type
      const target = this.$Lwy.removePerByUpdDels.target
      var param = {}
      param.ids = ids
      return new Promise((resolve, reject) => {
        axios[type](target, param).then(response => {
          const code = response.data.code
          const msg = response.data.msg
          if (code === '2000') {
            this.getTalkPerson() // 获取对话列表
            this.getNoReadArr() // 获取未读消息
            this.viewByNoReader(this.msgItemId, this.msgItemType)
            console.log(this.noReadArr)
            resolve(response.data)
          } else {
            this.$message({
              type: 'error',
              message: msg
            })
          }
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    sendMsgByCurrent: function() {
      const content = this.newMsgContent
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
      param.receiveId = this.msgItemId
      return new Promise((resolve, reject) => {
        axios[type](target, param).then(response => {
          const code = response.data.code
          const msg = response.data.msg
          if (code === '2000') {
            this.viewByNoReader(this.msgItemId, this.msgItemType)
            console.log(this.noReadArr)
            resolve(response.data)
          } else {
            this.$message({
              type: 'error',
              message: msg
            })
          }
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    handleBrandTableSizeChange: function(val) {
      this.sysMsgParam.pageSize = val
      this.sysMsgParam.page = 1
      this.getSysMsgList()
    },
    handleBrandTableCurrentChange: function(val) {
      this.sysMsgParam.page = val
      this.getSysMsgList()
    }
  }
}
</script>
