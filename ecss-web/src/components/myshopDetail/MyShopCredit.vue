<template>
  <el-collapse>
    <div class="myshoplist">
      <div class="myshop_recommend">
        <h3>好评率（{{ evaluationRate }}%）</h3>
        <div class="myshopCredit">
          <table>
            <thead>
              <tr>
                <th/>
                <th>最近一周</th>
                <th>最近一个月</th>
                <th>最近六个月</th>
                <th>六个月前</th>
                <th>总计</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span class="credit_good">好评</span></td>
                <td>{{ evaluation.weekGood }}</td>
                <td>{{ evaluation.monthGood }}</td>
                <td>{{ evaluation.halfYearGood }}</td>
                <td>{{ evaluation.beforeHalfYearGood }}</td>
                <td>{{ evaluation.halfYearGood + evaluation.beforeHalfYearGood }}</td>
              </tr>
              <tr>
                <td><span class="credit_middle">中评</span></td>
                <td>{{ evaluation.weekMedium }}</td>
                <td>{{ evaluation.monthMedium }}</td>
                <td>{{ evaluation.halfYearMedium }}</td>
                <td>{{ evaluation.beforeHalfYearMedium }}</td>
                <td>{{ evaluation.halfYearMedium + evaluation.beforeHalfYearMedium }}</td>
              </tr>
              <tr>
                <td><span class="credit_bad">差评</span></td>
                <td>{{ evaluation.weekBad }}</td>
                <td>{{ evaluation.monthBad }}</td>
                <td>{{ evaluation.halfYearBad }}</td>
                <td>{{ evaluation.beforeHalfYearBad }}</td>
                <td>{{ evaluation.halfYearBad + evaluation.beforeHalfYearBad }}</td>
              </tr>
              <tr>
                <td><span class="credit_total">总计</span></td>
                <td>{{ evaluation.weekGood + evaluation.weekMedium + evaluation.weekBad }}</td>
                <td>{{ evaluation.monthGood + evaluation.monthMedium + evaluation.monthBad }}</td>
                <td>{{ evaluation.halfYearGood + evaluation.halfYearMedium + evaluation.halfYearBad }}</td>
                <td>{{ evaluation.beforeHalfYearGood + evaluation.beforeHalfYearMedium + evaluation.beforeHalfYearBad }}</td>
                <td>{{ evaluation.halfYearGood + evaluation.halfYearMedium + evaluation.halfYearBad + evaluation.beforeHalfYearGood + evaluation.beforeHalfYearMedium + evaluation.beforeHalfYearBad }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="credit_detail">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部评价" name="first">
            <div class="comment comment_all">
              <table class="commentAll_table">
                <thead>
                  <tr>
                    <th style="width:5%;">评价</th>
                    <th style="width:30%;">内容</th>
                    <th style="width:30%;">商品</th>
                    <th style="width:5%;">金额</th>
                    <th style="width:10%;">买家</th>
                    <th style="width:20%;">时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in evaluationData" :key="item.id">

                    <td v-if="item.evaluation === 3"><span class="credit_good">好评</span></td>
                    <td v-if="item.evaluation === 2"><span class="credit_middle">中评</span></td>
                    <td v-if="item.evaluation === 1"><span class="credit_bad">差评</span></td>
                    <td>{{ item.comment }}</td>
                    <td><a href="javascript:void(0);" @click="gotoGoodDetail(item.goodsId)">{{ item.goodsName }}</a></td>
                    <td>￥{{ item.price }}</td>
                    <td>{{ item.buyerName }}</td>
                    <td>{{ item.updatedTime }}</td>
                  </tr>
                  <!-- <tr>
                    <td><span class="credit_middle">中评</span></td>
                    <td>特别好特别好</td>
                    <td><a href="">Apple iPhone XS Max(A2104)</a></td>
                    <td>￥1000.00</td>
                    <td>admin</td>
                    <td>2019-01-01&nbsp;12:00:00</td>
                  </tr>
                  <tr>
                    <td><span class="credit_bad">差评</span></td>
                    <td>特别好特别好</td>
                    <td><a href="">Apple iPhone XS Max(A2104)</a></td>
                    <td>￥1000.00</td>
                    <td>admin</td>
                    <td>2019-01-01&nbsp;12:00:00</td>
                  </tr>
                  <tr>
                    <td><span class="credit_bad">差评</span></td>
                    <td>特别好特别好</td>
                    <td><a href="">Apple iPhone XS Max(A2104)</a></td>
                    <td>￥1000.00</td>
                    <td>admin</td>
                    <td>2019-01-01&nbsp;12:00:00</td>
                  </tr>
                  <tr>
                    <td><span class="credit_bad">差评</span></td>
                    <td>特别好特别好</td>
                    <td><a href="">Apple iPhone XS Max(A2104)</a></td>
                    <td>￥1000.00</td>
                    <td>admin</td>
                    <td>2019-01-01&nbsp;12:00:00</td>
                  </tr> -->
                </tbody>
              </table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="好评" name="second">
            <div class="comment comment_good">
              <table class="commentAll_table">
                <thead>
                  <tr>
                    <th style="width:5%;">评价</th>
                    <th style="width:30%;">内容</th>
                    <th style="width:30%;">商品</th>
                    <th style="width:5%;">金额</th>
                    <th style="width:10%;">买家</th>
                    <th style="width:20%;">时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in goodEvaluations" :key="item.id">
                    <td><span class="credit_good">好评</span></td>
                    <td>{{ item.comment }}</td>
                    <td><a href="">{{ item.goodsName }}</a></td>
                    <td>￥{{ item.price }}</td>
                    <td>{{ item.buyerName }}</td>
                    <td>{{ item.updatedTime }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="中评" name="third">
            <div class="comment comment_middle">
              <table class="commentAll_table">
                <thead>
                  <tr>
                    <th style="width:5%;">评价</th>
                    <th style="width:30%;">内容</th>
                    <th style="width:30%;">商品</th>
                    <th style="width:5%;">金额</th>
                    <th style="width:10%;">买家</th>
                    <th style="width:20%;">时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in mediumEvaluations" :key="item.id">
                    <td><span class="credit_middle">中评</span></td>
                    <td>{{ item.comment }}</td>
                    <td><a href="">{{ item.goodsName }}</a></td>
                    <td>￥{{ item.price }}</td>
                    <td>{{ item.buyerName }}</td>
                    <td>{{ item.updatedTime }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="差评" name="fourth">
            <div class="comment comment_bad">
              <table class="commentAll_table">
                <thead>
                  <tr>
                    <th style="width:5%;">评价</th>
                    <th style="width:30%;">内容</th>
                    <th style="width:30%;">商品</th>
                    <th style="width:5%;">金额</th>
                    <th style="width:10%;">买家</th>
                    <th style="width:20%;">时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in badEvaluations" :key="item.id">
                    <td><span class="credit_bad">差评</span></td>
                    <td>{{ item.comment }}</td>
                    <td><a href="">{{ item.goodsName }}</a></td>
                    <td>￥{{ item.price }}</td>
                    <td>{{ item.buyerName }}</td>
                    <td>{{ item.updatedTime }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </el-collapse>
</template>

<style>
  ul,li{
    list-style:none;
  }
  input,button{
    border:none;
    background:none;
    outline:none;
  }
  .el-collapse{
    border:none;
  }
  .myshop_recommend{
    margin-bottom:20px;
  }
  .myshop_recommend h3{
    height:50px;
    line-height:50px;
    border-bottom:1px solid #f6783d;
    color:#333;
    font-weight:700;
    text-align:left;
    margin:0;
  }
  .myshopCredit table{
    width:100%;
    margin:20px 0;
  }
  .myshopCredit table th{
    height:50px;
    line-height:50px;
    text-align:center;
    font-size:14px;
    font-weight:700;
    color:#333;
    background:#eee;
  }
  .myshopCredit table td{
    font-size:14px;
    padding:10px 0;
    text-align:center;
    color:#666;
    border-bottom:1px solid #ddd;
  }
  .credit_good{
    font-weight:700!important;
    color:red!important;
  }
  .credit_middle{
    font-weight:700!important;
    color:#569636!important;
  }
  .credit_bad{
    font-weight:700!important;
    color:#3e3e3e!important;
  }
  .credit_total{
    font-weight:700!important;
    color:#275bcb!important;
  }
  .comment{
    text-align:left;
    margin:10px 0;
  }
  .commentAll_table{
    width:100%;
    margin-top:30px;
    border-top:1px solid #f6783d;
  }
  .commentAll_table th{
    height:40px;
    line-height:40px;
    text-align:center;
    font-size:14px;
    border-bottom:1px solid #ddd;
  }
  .commentAll_table td{
    padding:10px 0;
    border-bottom:1px solid #ddd;
    text-align:center;
    font-size:12px;
    color:#666;
  }
</style>

<script>
import axios from 'axios'

export default {
  name: 'MyShopCredit',
  props: {
    store_id: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      activeName: 'first',
      evaluation: {
        weekGood: 0,
        weekMedium: 0,
        weekBad: 0,
        monthGood: 0,
        monthMedium: 0,
        monthBad: 0,
        halfYearGood: 0,
        halfYearMedium: 0,
        halfYearBad: 0,
        beforeHalfYearGood: 0,
        beforeHalfYearMedium: 0,
        beforeHalfYearBad: 0
      },
      evaluationRate: 0,
      evaluationData: [],
      goodEvaluations: [],
      mediumEvaluations: [],
      badEvaluations: []
    }
  },
  mounted() {
    console.log('store_id')
    console.log(this.store_id)
    this.getEvaluationByStore()
    this.getEvaluationDataByStore()
  },
  methods: {
    getEvaluationByStore: function() {
      return new Promise((resolve, reject) => {
        axios[this.$Api.evaluationByStore.type](this.$Api.evaluationByStore.target + '?storeId=' + this.store_id).then(response => {
          this.evaluation = response.data.data
          let goodEvaluations = 0
          goodEvaluations = this.evaluation.halfYearGood + this.evaluation.beforeHalfYearGood
          let totalEvaluations = 0
          totalEvaluations = this.evaluation.halfYearGood + this.evaluation.halfYearMedium + this.evaluation.halfYearBad + this.evaluation.beforeHalfYearGood + this.evaluation.beforeHalfYearMedium + this.evaluation.beforeHalfYearBad
          if (totalEvaluations === 0) {
            this.evaluationRate = 0
          } else {
            this.evaluationRate = (goodEvaluations / totalEvaluations) * 100
          }
          this.evaluationRate = this.evaluationRate.toFixed(2)
          resolve(response.data.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getEvaluationDataByStore: function() {
      return new Promise((resolve, reject) => {
        axios[this.$Api.evaluationDataByStore.type](this.$Api.evaluationDataByStore.target + '?storeId=' + this.store_id).then(response => {
          console.log(response)
          this.evaluationData = response.data.data
          for (var i = 0; i < this.evaluationData.length; i++) {
            if (this.evaluationData[i].evaluation === 3) {
              this.goodEvaluations.push(this.evaluationData[i])
            }
            if (this.evaluationData[i].evaluation === 2) {
              this.mediumEvaluations.push(this.evaluationData[i])
            }
            if (this.evaluationData[i].evaluation === 1) {
              this.badEvaluations.push(this.evaluationData[i])
            }
          }
          resolve(response.data.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    gotoGoodDetail: function(goodId) {
      // this.$router.push({
      //   name: 'MyShop',
      //   query: {
      //     paramType: 'goods',
      //     paramId: goodId
      //   }
      // })
      this.$router.push({
        name: 'LoadingPage',
        query: {
          menuUri: 'MyShop',
          paramId: goodId,
          paramType: 'goods'
        }
      })
    }
  }
}
</script>
