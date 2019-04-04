<template>
  <div class="mygoods">
    <div class="mygoodsExplain">
      <span class="mygoodsTitle">{{ good.goodsName }}</span>
      <div class="mygoodsD">
        <div class="mygoodsImg">
          <!-- <img src="../../../static/img/photo.png"> -->
          <img :src="good.previewFix + good.goodsPhoto">
        </div>
        <div class="mygood_details">
          <ul class="mygoods_detail_exist">
            <li>价格：<strong>{{ goodPrice }}</strong></li>
            <li>品牌：{{ good.brand }}</li>
            <li>标签：{{ good.tags }}</li>
            <li>销售情况：售出{{ good.goodsSales }}件（{{ good.goodsCommentsNum }} 条评论）</li>
            <li>所在地区：{{ good.goodsPlace }}</li>
          </ul>
          <ul class="mygoods_detail_unexist">
            <li v-if="good.specName1 !== ''">{{ good.specName1 }}：
              <span v-for="(spec1, index) in spec1s" :key="index" class="mygoods_color" @click="handleSelectSpec1(spec1)">{{ spec1 }}</span>
            </li>
            <li v-if="good.specName2 !== ''">{{ good.specName2 }}：
              <span v-for="spec2 in spec2s" :key="spec2.id" class="mygoods_color" @click="handleSelectSpec2(spec2.id)">{{ spec2.name }}</span>
            </li>
            <li>购买数量：<el-input-number v-model="buyNumber" :min="1" :max="stock" size="small" /><span class="mygoods_overnum">（库存{{ stock }}件）</span></li>
            <li>您已选择：<span class="mygoods_choice">{{ selectedSpec1Name + ' ' + selectedSpec2Name }}</span></li>
          </ul>
          <div class="mygoods_btns">
            <!-- <a href="javascript:;" target="_blank" class="mygoodsbtn mygoods_buy" @click="handleBuy">立即购买</a> -->
            <a href="javascript:;" target="_blank" class="mygoodsbtn mygoods_car" @click="handleGoodscar">立即购买</a>
            <a href="javascript:void(0);" target="_blank" class="mygoodsbtn mygoods_store" @click="handleCollect">收藏该商品</a>
          </div>
        </div>
      </div>
      <div class="mygoods_tab">
        <el-tabs v-model="activeName">
          <el-tab-pane label="商品详情" name="first">
            <div v-html="good.description"/>
          </el-tab-pane>
          <el-tab-pane label="商品评论" name="second">
            <div class="mygoodsBottom">
              <ul class="mygoods_comment">
                <li v-for="item in goodsComments" :key="item.id">
                  <div class="mygoods_comments_detail">
                    <div class="mygoods_comments_name">{{ item.userName }}（{{ item.commentTime }}）</div>
                    <div class="mygoods_comments_words">{{ item.commentContent }}</div>
                  </div>
                  <div class="mygoods_comment_star">评价：<el-rate v-model="item.evaluationCode" :max="3" disabled/></div>
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="销售记录" name="third">
            <div class="mygoodsBottom">
              <table class="mygoodsBottom_table">
                <thead>
                  <tr>
                    <th style="width:20%;">买家</th>
                    <th style="width:10%;">购买价</th>
                    <th style="width:30%;">购买数量</th>
                    <th style="width:20%;">购买时间</th>
                    <th style="width:20%;">评价</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in goodsRecords" :key="item.id">
                    <td>{{ item.buyerName }}</td>
                    <td>￥{{ item.price }}</td>
                    <td>{{ item.quantity }}（{{ item.specification }}）</td>
                    <td>{{ item.createdTime }}</td>
                    <td><el-rate v-model="item.evaluation" :max="3" disabled/></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="产品咨询" name="fourth">
            <div class="mygoodsBottom">
              <ul class="mygoodsBottom_zx">
                <li v-for="item in qaArr" :key="item.id">
                  <div class="ask">
                    <span class="mjask"><b>咨询内容：</b>{{ item.questionContent }}</span>
                    <span class="mjname">{{ item.userName }}</span>
                    <span class="mjtime">{{ item.createdTime }}</span>
                  </div>
                  <div v-if="item.isReply === 1" class="answer">
                    <span class="mjask mjanswer"><b>店主回复：</b>{{ item.replyContent }}</span>
                    <span class="mjname" />
                    <span class="mjtime">{{ item.updatedTime }}</span>
                  </div>
                </li>
              </ul>
              <div v-if="qaArr !== null && qaArr.length > 0" >
                <el-pagination
                  :current-page="searchQa.page"
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size="searchQa.pageSize"
                  :total="searchQa.total"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="text-align:center;"
                  @size-change="handleBrandTableSizeChange"
                  @current-change="handleBrandTableCurrentChange" />
              </div>
              <div class="mygoodsBottom_zxform">
                <div class="zxform_text">
                  <span>我要咨询：</span>
                  <textarea v-model="questionContent" />
                </div>
                <a href="javascript:void(0);" class="zxform_btn" @click="addQuestion()">发布咨询</a>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<style scoped>
  ul,li{
    list-style:none;
  }
  input,button,select{
    border:none;
    background:none;
  }
  .mygoodsExplain{
    text-align:left;
  }
  .mygoodsTitle{
    display:block;
    font-size:14px;
    font-weight:700;
    color:#333;
  }
  .mygoodsD{
    font-size:0;
    margin:20px 0;
  }
  .mygoodsImg,.mygood_details{
    display:inline-block;
    vertical-align:top;
    font-size:14px;
    color:#333;
  }
  .mygoodsImg{
    width:280px;
    height:380px;
    overflow:hidden;
    border:1px solid #ddd;
    background:#fff;
  }
  .mygoodsImg img{
    width:100%;
    height:100%;
  }
  .mygood_details{
    margin-left:50px;
    width:525px;
  }
  .mygoods_detail_exist{
    margin-bottom:10px;
  }
  .mygoods_detail_exist li{
    font-size:14px;
    padding:5px 0;
  }
  .mygoods_detail_exist li strong{
    font-size:16px;
    color:red;
  }
  .mygoods_detail_unexist{
    padding:10px;
    border:1px solid #eee;
    margin-bottom:10px;
  }
  .mygoods_detail_unexist li{
    font-size:14px;
    padding:5px 0;
  }
  .mygoods_color{
    display:inline-block;
    vertical-align:middle;
    padding:5px;
    margin:0 5px;
    border:1px solid #ddd;
    background:#fff;
    cursor:pointer;
  }
  .mygoods_color:active{
    border:1px solid #f45408;
  }
  .mygoods_size{
    display:inline-block;
    vertical-align:middle;
    padding:5px 10px;
    border:1px solid #ddd;
    background:#fff;
    margin:0 3px;
    cursor:pointer;
  }
  .mygoods_size:active{
    border:1px solid #f45408;
  }
  .mygoods_detail_unexist li input{
    width:40px;
    height:30px;
    line-height:30px;
    border:1px solid #ddd;
    font-size:14px;
    color:#666;
    padding:0 10px;
  }
  .mygoods_overnum{
    padding-left:10px;
    color:#666;
  }
  .mygoods_choice{
    color:#5dab24;
    font-weight:700;
  }
  .mygoods_btns{
    font-size:0;
  }
  .mygoods_btns .mygoodsbtn{
    display:inline-block;
    vertical-align:middle;
    font-size:14px;
    width:100px;
    height:40px;
    line-height:40px;
    text-align:center;
    background:#f45408;
    color:#fff;
    margin-right:10px;
    border-radius:5px;
  }
  .mygoods_btns .mygoods_car{
    border:1px solid #f45408;
    background:none;
    color:#f45408;
  }
  .mygoods_btns .mygoods_store{
    background:none;
    border:1px solid #32acfd;
    color:#32acfd;
  }
  .mygoodsBottom-detail{
    padding:0 20px;
    box-sizing:border-box;
    margin:10px 0;
    font-size:0;
  }
  .mygoodsBottom-detail li{
    display:inline-block;
    vertical-align:middle;
    font-size:12px;
    width:50%;
    padding:5px 40px;
    box-sizing:border-box;
    color:#666;
  }
  .mygoods-imglist li{
    display:block;
    margin:20px auto;
    padding:30px;
    text-align:center;
  }
  .mygoodsBottom-detail .mygoodsBottom-title{
    display:block;
    font-size:16px;
    font-weight:700;
    color:#333;
    padding:0;
    line-height:30px;
    padding-bottom:20px;
  }
  .mygoods-imglist .mygoodsBottom-title{
    display:block;
    font-size:16px;
    font-weight:700;
    color:#333;
    padding:0;
    line-height:30px;
    padding-bottom:20px;
    width:auto;
    height:30px;
    line-height:30px;
    text-align:left;
  }
  .mygoods_comment{
    margin:10px 0;
  }
  .mygoods_comment li{
    padding:15px 0;
    border-bottom:1px solid #ddd;
  }
  .mygoods_comments_detail,.mygoods_comment_star{
    display:inline-block;
    vertical-align:middle;
    font-size:14px;
  }
  .mygoods_comments_detail{
    width:80%;
  }
  .mygoods_comment_star{
    width:18%;
    text-align:right;
  }
  .mygoods_comment_star i{
    color:#ffc116;
  }
  .mygoods_comments_name{
    font-size:12px;
    color:#666;
  }
  .mygoods_comments_words{
    margin-top:10px;
    font-size:14px;
    color:#333;
  }
  .mygoodsBottom_table{
    width:100%;
  }
  .mygoodsBottom_table th{
    height:50px;
    line-height:50px;
    text-align:center;
    font-size:14px;
    font-weight:700;
  }
  .mygoodsBottom_table td{
    font-size:12px;
    text-align:center;
    padding:10px 0;
    border-bottom:1px solid #ddd;
  }
  .mygoodsBottom_table td i{
    color:#ffc116;
  }
  .mygoodsBottom_zx{
    margin:10px 0 20px;
  }
  .mygoodsBottom_zx li{
    padding:15px 0;
    border-bottom:1px solid #f7ba97;
    font-size:0;
  }
  .mygoodsBottom_zx li span{
    display:inline-block;
    vertical-align:middle;
    font-size:14px;
  }
  .mygoodsBottom_zx li .mjask{
    width:70%;
  }
  .mygoodsBottom_zx li .mjname{
    width:10%;
    font-size:12px;
    color:#666;
  }
  .mygoodsBottom_zx li .mjtime{
    font-size:12px;
    color:#999;
    width:20%;
    text-align:right;
  }
  .answer{
    margin-top:10px;
  }
  .ask .mjask b{
    color:#32acfd;
  }
  .answer .mjask{
    color:#f45408;
  }
  .zxform_text span{
    display:inline-block;
    vertical-align:top;
    font-size:14px;
    width:80px;
  }
  .zxform_text textarea{
    display:inline-block;
    vertical-align:top;
    width:750px;
    height:80px;
    border:1px solid #ddd;
    padding:10px;
    box-sizing:border-box;
    font-size:14px;
    color:#666;
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
  name: 'MyShoplistDetail',
  props: {
    good_id: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      activeName: 'first',
      good: {},
      spec1s: [],
      spec2s: [],
      stock: 0,
      goodPrice: 0,
      selectedSpec1Name: '',
      selectedSpec2Name: '',
      specId: -1,
      buyNumber: 1,
      goodsComments: [],
      goodsRecords: [],
      rate: 2,
      qaArr: [],
      questionContent: '',
      searchQa: {
        page: 1,
        pageSize: 10,
        total: 0,
        itemId: null
      }
    }
  },
  mounted() {
    this.getGoodDetail(this.$Api.goodDetail.type, this.$Api.goodDetail.target + '?id=' + this.good_id)
    this.getGoodsComments(this.$Api.goodsComments.type, this.$Api.goodsComments.target, { goodsId: this.good_id })
    this.getGoodsRecord(this.$Yjj.schOrderGoodsRecordById.type, this.$Yjj.schOrderGoodsRecordById.target, { goodsId: this.good_id })
  },
  methods: {
    getGoodDetail: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          console.log('good_detail')
          console.log(response)
          this.good = response.data.data
          this.goodPrice = this.good.goodsPrice
          console.log('this.goodPrice' + this.good.goodsPrice)
          this.assembleSpecArr(this.good.specArr)
          this.showQaList()
          console.log(this.good)
        }).catch(error => {
          reject(error)
        })
      })
    },
    assembleSpec2Arr: function(spec1Name) {
      this.spec2s = []
      var specList = this.good.specArr
      for (var i = 0; i < specList.length; i++) {
        if (spec1Name === specList[i].spec1) {
          var spec2 = { 'id': specList[i].id, 'name': specList[i].spec2, 'number': specList[i].stock, 'price': specList[i].price }
          this.spec2s.push(spec2)
        }
      }
    },
    assembleSpecArr: function(specList) {
      for (var i = 0; i < specList.length; i++) {
        if (this.spec1s.indexOf(specList[i].spec1) === -1) {
          this.spec1s.push(specList[i].spec1)
        }
      }
      if (this.spec1s.length > 0) {
        this.assembleSpec2Arr(this.spec1s[0])
        // for (var j = 0; j < specList.length; j++) {
        //   if (this.spec1s[0] === specList[j].spec1) {
        //     var spec2 = { 'id': specList[j].id, 'name': specList[j].spec2 }
        //     this.spec2s.push(spec2)
        //   }
        // }
      }
    },
    handleSelectSpec1: function(spec1Name) {
      console.log(spec1Name)
      this.assembleSpec2Arr(spec1Name)
      this.selectedSpec2Name = ''
      this.selectedSpec1Name = spec1Name
    },
    handleSelectSpec2: function(spec2Id) {
      console.log(spec2Id)
      this.specId = spec2Id
      for (var i = 0; i < this.spec2s.length; i++) {
        if (spec2Id === this.spec2s[i].id) {
          this.stock = this.spec2s[i].number
          this.selectedSpec2Name = this.spec2s[i].name
          this.goodPrice = this.spec2s[i].price
        }
      }
    },
    handleBuy: function(goodId) {
      this.$router.push({
        name: 'Goods_buy',
        query: {
          isShopCar: 0,
          goodId: this.good_id,
          specId: this.specId,
          buyNumber: this.buyNumber
        }
      })
    },
    handleGoodscar: function() {
      const type = this.$Lwy.creatAddShopCar.type
      const target = this.$Lwy.creatAddShopCar.target
      const param = {}
      param.goodsId = this.good.id
      if (this.specId > 0) {
        param.specId = this.specId
        param.quantity = this.buyNumber
        param.price = this.goodPrice
        console.log(param)
        return new Promise((resolve, reject) => {
          axios[type](target, param).then(response => {
            const code = this.goodsComments = response.data.code
            const msg = this.goodsComments = response.data.msg
            if (code === '2000') {
              this.$confirm('成功添加到购物车，是否要打开购物车', '提示', {
                confirmButtonText: '打开购物车',
                cancelButtonText: '我再逛逛',
                type: 'warning',
                center: true
              }).then(() => {
                // 确认按钮按下
                this.$router.push({
                  name: 'myGoodscar'
                })
              }).catch(() => {
              })
              this.initShopCarGoodsNum(this.$Lwy.getShopCarGoodsNum.type, this.$Lwy.getShopCarGoodsNum.target)
            } else {
              this.$message({
                type: 'warning',
                message: msg
              })
            }
            console.log(this.goodsComments)
            resolve(response.data)
          }).catch(error => {
            reject(error.response.data.errors)
          })
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请先选择商品的规格'
        })
      }
    },
    getGoodsComments: function(type, target, data) {
      return new Promise((resolve, reject) => {
        axios[type](target, data).then(response => {
          this.goodsComments = response.data.data
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    getGoodsRecord: function(type, target, data) {
      return new Promise((resolve, reject) => {
        axios[type](target, data).then(response => {
          this.goodsRecords = response.data.data
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    initShopCarGoodsNum: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          const num = response.data.data
          this.$store.commit('saveShopCarGoodsNumber', num)
          console.log('this.currentUser.isSeller: ' + this.currentUser.isSeller)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    handleCollect: function() {
      const type = this.$Lwy.collectGoodByCurrent.type
      const target = this.$Lwy.collectGoodByCurrent.target
      var param = {}
      param.itemId = this.good.id
      return new Promise((resolve, reject) => {
        axios[type](target, param).then(response => {
          const code = response.data.code
          const msg = response.data.msg
          if (code === '2000') {
            this.$message({
              type: 'success',
              message: msg
            })
            this.initList()
          } else {
            this.$message({
              type: 'warning',
              message: msg
            })
          }
          console.log(this.shopCarGoodArr)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    showQaList: function() {
      const type = this.$Lwy.getGoodsQaList.type
      const target = this.$Lwy.getGoodsQaList.target
      var param = this.searchQa
      param.itemId = parseInt(this.good_id)
      param.questionContent = null
      return new Promise((resolve, reject) => {
        axios[type](target, param).then(response => {
          this.qaArr = response.data.data.dataList
          this.searchQa.total = response.data.data.total
          console.log(this.shopCarGoodArr)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    handleBrandTableSizeChange: function(val) {
      this.searchQa.pageSize = val
      this.searchQa.page = 1
      this.showQaList()
    },
    handleBrandTableCurrentChange: function(val) {
      this.searchQa.page = val
      this.showQaList()
    },
    addQuestion: function() {
      const type = this.$Lwy.createQaByCurrent.type
      const target = this.$Lwy.createQaByCurrent.target
      var param = this.searchQa
      param.itemId = parseInt(this.good_id)
      param.questionContent = this.questionContent
      return new Promise((resolve, reject) => {
        axios[type](target, param).then(response => {
          const code = response.data.code
          const msg = response.data.msg
          if (code === '2000') {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.showQaList()
          } else {
            this.$message({
              type: 'warning',
              message: msg
            })
          }
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    }
  }
}
</script>
