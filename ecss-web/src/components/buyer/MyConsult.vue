<template>
  <el-tabs type="border-card">
    <el-tab-pane label="全部咨询">
      <ul v-for="all in allConsult" :key="all.id" class="zx_all">
        <li>
          <p class="zxAll_left">
            <span class="zx_questions"><a href="">{{ all.itemName }}</a>商品咨询</span>
            <span class="zx_content">咨询内容: {{ all.questionContent }}</span>
            <span v-if="all.isReply === 1" class="zx_content">商家回复: {{ all.replyContent }}</span>
          </p>
          <p class="zxAll_right">
            <span class="zx_person">{{ all.userName }}</span>
            <span class="zx_time">{{ all.postTime }}</span>
            <span v-if="all.isReply === 1" class="zx_time">{{ all.replyTime }}</span>
          </p>
        </li>
      </ul>
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
    </el-tab-pane>
    <el-tab-pane label="已回复的咨询">
      <ul v-for="reply in replyConsult" :key="reply.id" class="zx_all">
        <li>
          <p class="zxAll_left">
            <span class="zx_questions"><a href="">{{ reply.itemName }}</a>商品咨询</span>
            <span class="zx_content">咨询内容: 这款风衣为什么没有图片</span>
          </p>
          <p class="zxAll_right">
            <span class="zx_person">{{ reply.userName }}</span>
            <span class="zx_time">{{ reply.postTime }}</span>
          </p>
        </li>
      </ul>
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
    </el-tab-pane>
  </el-tabs>
</template>

<style>
ul{
  padding:0;
}
.zx_all{
  border-top:1px solid #eee;
  text-align:left;
}
.zx_all li{
  padding:10px 20px;
  margin:10px 0;
  font-size:0;
  border-bottom:1px solid #ffe1d3;
}
.zxAll_left,.zxAll_right{
  margin:0;
  display:inline-block;
  vertical-align:middle;
  font-size:14px;
}
.zxAll_left{
  width:70%;
}
.zxAll_right{
  width:30%;
  text-align:right;
}
.zxAll_left span,.zxAll_right span{
  display:block;
  margin:5px 0;
}
.zxAll_left span a{
  padding-right:10px;
  color:#ff854b;
}
.zxAll_right span{
  color:#999;
}
/*分页*/
  /* .paging{
    margin:20px auto;
    text-align:center;
    font-size:0;
  }
  .paging a,.paging span{
    margin:0 5px;
    display:inline-block;
    vertical-align:middle;
    font-size:14px;
    width:30px;
    height:30px;
    border-radius:30px;
    text-align:center;
    line-height:30px;
    color:#333;
    border:1px solid #ff854b;
    cursor:pointer;
  }
  .paging a:hover{
    background:#ff854b;
    color:#fff;
  } */
  /*分页结束*/
</style>

<script>
import axios from 'axios'

export default {
  name: 'MyConsult',
  data() {
    return {

      searchParam: {
        page: 1,
        pageSize: 10,
        total: 0,
        userId: 1
      },
      searchParam2: {
        page: 1,
        pageSize: 10,
        total: 0,
        userId: 1
      },
      allConsult: {},
      replyConsult: {},
      consultAll: 'all',
      consultReply: 'reply'

    }
  },
  mounted() {
    this.getMyAllConsultList(this.$Yjj.getConsult.type, this.$Yjj.getConsult.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize, schType: this.consultAll })
    this.getMyReplyConsultList(this.$Yjj.getConsult.type, this.$Yjj.getConsult.target, { page: this.searchParam2.page, pageSize: this.searchParam2.pageSize, schType: this.consultReply })
  },
  methods: {
    getMyAllConsultList: function(type, target, data) {
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
    getMyReplyConsultList: function(type, target, data) {
      return new Promise((resolve, reject) => {
        axios[type](target, data).then(response => {
          this.replyConsult = response.data.data.dataList
          // console.log(this.replyConsult)
          this.searchParam2.total = response.data.data.total
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
      this.getMyAllConsultList(this.$Api.getConsult.type, this.$Api.getConsult.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize, schType: this.consultAll })
    },
    handleSizeChange2: function(val) {
      console.log('每页${val}条')
    },
    handleCurrentChange2: function(val) {
      console.log('当前页:${val}')
      this.searchParam2.page = val
      this.getMyReplyConsultList(this.$Api.getConsult.type, this.$Api.getConsult.target, { page: this.searchParam2.page, pageSize: this.searchParam2.pageSize, schType: this.consultReply })
    }
  }
}
</script>
