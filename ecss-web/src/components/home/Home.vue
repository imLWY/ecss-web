<template>
  <el-container>
    <el-header style="min-width:100%;border-bottom:1px solid #e2e2e2;">
      <Header />
    </el-header>
    <el-container class="search-er">
      <el-row :gutter="20" style="width:100%;margin-top:10px;">
        <el-col :span="2" style="margin-left:0px;">
          <el-select v-model="schTypeValue" placeholder="请选择" style="width:80px;">
            <el-option v-for="item in schTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>
        <el-col :span="10" style="margin-left:0px;">
          <el-input v-model="homeSearch" placeholder="请输入关键字" class="home-search">
            <el-button slot="append" icon="el-icon-search" class="home-search-btn" @click="handleSearch"/>
          </el-input>
        </el-col>
        <el-col :span="10" style="margin-left: 5px;text-align:left;">
          <span>热门搜索: </span>
          <a v-for="item in homeHotSearchGoods" :key="item.goodsId" href="javascript:void(0);" @click="gotoGoodCateSearch(item.cateId1, item.cateId2, item.cateId3)">{{ item.cateName + '&nbsp;&nbsp;&nbsp;' }}</a>
        </el-col>
      </el-row>
    </el-container>
    <el-container style="width:1200px;margin:0 auto;">
      <el-main style="margin-top:30px;position:relative;">
        <el-carousel :interval="5000" height="500px" arrow="always">
          <el-carousel-item v-for="item in [0, 1, 2]" :key="item">
            <el-row style="height:100%;">
              <el-col style="height:100%;width:70%;">
                <img :src="homeBannerImgs[item].img" class="homeBanner" style="width:99%;height:100%;">
              </el-col>
              <el-col style="height:100%;width:30%;">
                <el-row style="height:32%;">
                  <el-col>
                    <img :src="homeBannerImgs[item].rightImg[0].img" class="homeBanner" style="height:165px;width:100%;">
                  </el-col>
                </el-row>
                <el-row style="height:30%;">
                  <el-col>
                    <img :src="homeBannerImgs[item].rightImg[1].img" class="homeBanner" style="height:165px;width:100%;">
                  </el-col>
                </el-row>
                <el-row style="height:30%;">
                  <el-col>
                    <img :src="homeBannerImgs[item].rightImg[2].img" class="homeBanner" style="height:165px;width:100%;">
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
        <div class="main_menulist" style="overflow:auto;">
          <span class="main_ml"><i class="icon-fs"/>商品分类</span>
          <ul class="main_menuContent">
            <li v-for="gcategory in homeGcategory" :key="gcategory.id" class="main_menul">
              <a href="javascript:void(0);" @click="gotoSearch(gcategory.id, -1, -1)">{{ gcategory.cateName }}</a>
              <ul class="main_menulist_detail">
                <li v-for="second in gcategory.children" :key="second.id">
                  <a href="javascript:void(0);" class="main_menulist_detail2" @click="gotoSearch(second.id, gcategory.id, -1)">
                    {{ second.cateName }}
                  </a> &nbsp; | &nbsp;
                  <a v-for="third in second.children" :key="third.id" href="javascript:void(0);" @click="gotoSearch(third.id, second.id, gcategory.id)">
                    {{ third.cateName }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </el-main>
    </el-container>
    <el-container style="width:1200px;margin:0 auto;">
      <el-main style="padding: 10px 0; font-size:0;margin-bottom:40px;">
        <div class="main_left">
          <div class="main_tj">
            <h3 class="pick-title" style="font-szie:20px;color:#333333;">推介商品<em>&nbsp;&nbsp;&bull;&nbsp;&nbsp;Pick of the week</em></h3>
            <el-tabs type="border-card">
              <el-tab-pane label="热卖商品">
                <div class="mainTab_hot">
                  <ul>
                    <li v-for="hotGood in homeHotGoods" :key="hotGood.goodsId">
                      <a href="javascript:void(0);" @click="gotoGoodDetail(hotGood.goodsId)">
                        <div class="main_img">
                          <img :src="hotGood.goodsPhoto" >
                        </div>
                        <span :title="hotGood.goodsName" class="main_title">{{ hotGood.goodsName }}</span>
                        <span class="main_money">￥{{ hotGood.goodsPrice }}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
              <el-tab-pane label="新品上市">
                <div class="mainTab_hot">
                  <ul>
                    <li v-for="newGood in homeNewGoods" :key="newGood.goodsId">
                      <a href="javascript:void(0);" @click="gotoGoodDetail(newGood.goodsId)">
                        <div class="main_img">
                          <img :src="newGood.goodsPhoto" >
                        </div>
                        <span :title="newGood.goodsName" class="main_title">{{ newGood.goodsName }}</span>
                        <span class="main_money">￥{{ newGood.goodsPrice }}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
              <el-tab-pane label="推荐商品">
                <div class="mainTab_hot">
                  <ul>
                    <li v-for="recommendGood in homeRecommendGoods" :key="recommendGood.goodsId">
                      <a href="javascript:void(0);" @click="gotoGoodDetail(recommendGood.goodsId)">
                        <div class="main_img">
                          <img :src="recommendGood.goodsPhoto" >
                        </div>
                        <span :title="recommendGood.goodsName" class="main_title">{{ recommendGood.goodsName }}</span>
                        <span class="main_money">￥{{ recommendGood.goodsPrice }}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
              <el-tab-pane label="猜你喜欢">
                <div class="mainTab_hot">
                  <ul>
                    <li v-for="likeGood in homeLikeGoods" :key="likeGood.goodsId">
                      <a href="javascript:void(0);" @click="gotoGoodDetail(likeGood.goodsId)">
                        <div class="main_img">
                          <img :src="likeGood.goodsPhoto" >
                        </div>
                        <span :title="likeGood.goodsName" class="main_title">{{ likeGood.goodsName }}</span>
                        <span class="main_money">￥{{ likeGood.goodsPrice }}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="main_sp">
            <h3 class="pick-title" style="font-szie:20px;color:#333333;">视频商品<em>&nbsp;&nbsp;&bull;&nbsp;&nbsp;Video commodity</em></h3>
            <div class="main_spcontent">
              <div class="main_vshop float_left main_vshop01">
                <a href="javascript:void(0);" @click="gotoVideo">
                  <img src="../../../static/img/photo.png">
                  <span class="main_shopname">爱美丽羽绒服微店爱美丽羽绒服微店爱美丽羽绒服微店</span>
                  <p>
                    <span>爱美丽羽绒服微店爱美丽羽绒服微店爱美丽羽绒服微店</span>
                    <span><i class="icon-eye"/>100次</span>
                  </p>
                </a>
              </div>
              <div class="main_vshop float_left main_vshop02">
                <a href="javascript:void(0);" @click="gotoVideo">
                  <img src="../../../static/img/photo.png">
                  <span class="main_shopname">爱美丽羽绒服微店爱美丽羽绒服微店爱美丽羽绒服微店</span>
                  <p>
                    <span>爱美丽羽绒服微店爱美丽羽绒服微店爱美丽羽绒服微店</span>
                    <span><i class="icon-eye"/>100次</span>
                  </p>
                </a>
              </div>
              <div class="main_vshop float_right main_vshop03">
                <a href="javascript:void(0);" @click="gotoVideo">
                  <img src="../../../static/img/photo.png">
                  <span class="main_shopname">爱美丽羽绒服微店爱美丽羽绒服微店爱美丽羽绒服微店</span>
                  <p>
                    <span>爱美丽羽绒服微店爱美丽羽绒服微店爱美丽羽绒服微店</span>
                    <span><i class="icon-eye"/>100次</span>
                  </p>
                </a>
                <a href="javascript:void(0);" @click="gotoVideo">
                  <img src="../../../static/img/photo.png">
                  <span class="main_shopname">爱美丽羽绒服微店爱美丽羽绒服微店爱美丽羽绒服微店</span>
                  <p>
                    <span>爱美丽羽绒服微店爱美丽羽绒服微店爱美丽羽绒服微店</span>
                    <span><i class="icon-eye"/>100次</span>
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="main_right">
          <div class="mainr_btn">
            <a href="#"><i class="icon-yx"/>营销中心</a>
          </div>
          <div class="mainr_jf">
            <a href="javascript:void(0)" title="立即兑换" @click="handleCreditsExchange">
              <i class="icon-jf"/>
              <strong>积分兑换：</strong>
              <span>当前积分<b>{{ currentUserInfo.currentIntegral }}分</b></span>
            </a>
          </div>
          <ul class="main_shoplist">
            <li class="main_shoplist_title">店铺收入排行</li>
            <li v-for="(storeIncome, index) in homeStoresIncome" :key="storeIncome.id">
              <em>{{ index + 1 }}</em>
              <p>
                <span class="main_shoplimg">
                  <img :src="storeIncome.storeLogo" >
                </span>
                <span class="main_shoplcontent">
                  <strong>{{ storeIncome.userName }}</strong>
                  <b>{{ storeIncome.classNames }}</b>
                </span>
              </p>
              <span class="main_shoplMoney">￥{{ storeIncome.money }}</span>
            </li>
          </ul>
          <ul class="main_shoplist main_shopTglist">
            <li class="main_shoplist_title">店铺推广排行</li>
            <li v-for="storeRecommend in homeStoresRecommend" :key="storeRecommend.id">
              <p>
                <span class="main_shoplimg">
                  <img :src="storeRecommend.storeLogo" >
                </span>
                <span class="main_shoplcontent">
                  <strong>{{ storeRecommend.ownerName }}</strong>
                  <b>{{ storeRecommend.storeName }}</b>
                </span>
              </p>
            </li>
          </ul>
        </div>
        <el-dialog :visible.sync="creditsExchangeDialogVisible" title="积分兑换" width="30%" style="text-align:left;">
          <el-form :model="creditsExchangeForm" :inline="true" label-width="150px">
            <el-form-item label="当前积分：">
              <!-- <el-input
                v-model="creditsExchangeForm.currentIntegral"
                readonly /> -->
              <span>{{ creditsExchangeForm.currentIntegral }}</span>
            </el-form-item>
            <el-form-item label="兑换比例：">
              <el-tooltip content="每10积分可兑换1支付通金额" effect="light">
                <!-- <el-input
                  v-model="creditsExchangeForm.exchangeRate"
                  readonly /> -->
                <span>{{ creditsExchangeForm.exchangeRate }}</span>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="兑换积分：">
              <el-input-number
                v-model="creditsExchangeForm.exchangeIntegral"
                :min="0"
                :max="creditsExchangeForm.currentIntegral"
                :step="10"
                style="width:202px;"
                @change="handleExchangeIntegralChange" />
            </el-form-item>
            <el-form-item label="兑换金额：">
              <!-- <el-input
                v-model="creditsExchangeForm.exchangeMoney"
                readonly /> -->
              <span>{{ creditsExchangeForm.exchangeMoney }}</span>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="creditsExchangeDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="exchange">确 定</el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>

<style>
/* @import "../../../static/css/element-ui.css"; */

.el-header, .el-footer {
  background-color: #ffffff;
  color: #333333;
  text-align: center;
  height: 70px !important;
  line-height: 70px;
  margin: 0 auto;
  padding: 0;
}

.el-footer {
  width: 100%;
  height: 70px !important;
  background: #e9eef3;
  margin: 0 !important;
}
.search-er {
  height: 72px;
  width:1200px;
  margin:0 auto;
  line-height: 64px;
  vertical-align: middle;
  text-align: left;
}
body > .el-container {
  margin-bottom: 0px;
}
.home-search {
  width: 100%;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
  color:#f45408!important;
}
.el-carousel__item h3 {
  color: #ffffff;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #ffffff;
}
.el-carousel__item:nth-child(2n+1) {
  background-color: #ffffff;
}
.pick-title::before {
  display: inline-block;
  width: 260px;
  height: 2px;
  margin-right: 47px;
  background: linear-gradient(to right, #fdac35, #ef4c12);
  vertical-align: middle;
  content: '';
}
.pick-title {
  font-size: 20px;
  color: #333333;
}
.pick-title::after {
  display: inline-block;
  width: 260px;
  height: 2px;
  margin-left: 48px;
  background: linear-gradient(to left, #fdac35, #ef4c12);
  vertical-align: middle;
  content: '';
}
.home-search-btn{
  border:none;
  background:none;
  width:80px;
  height:40px;
  background: -webkit-linear-gradient(left, #fcb235, #ff5f19);
  background: -o-linear-gradient(right, #fcb235, #ff5f19);
  background: -moz-linear-gradient(right, #fcb235, #ff5f19);
  background: linear-gradient(to right, #fcb235, #ff5f19);
  border-radius:0;
  border-top-right-radius:5px;
  border-bottom-right-radius:5px;
}
.home-search-btn:hover{
  background:#ff5f19!important;
}
.homeBanner:hover {
  cursor: pointer;
}

.main_left,.main_right{
  display:inline-block;
  vertical-align:top;
  box-sizing:border-box;
}
.main_left{
  width:898px;
  margin-right:40px;
  text-align:left;
}
.main_right{
  width:262px;
}
ul,li{
  list-style:none;
  padding:0;
}
.el-icon-search{
  font-size:20px;
  color:#fff;
}

.pick-title em{
  font-style:normal;
  color:#999
}
.mainTab_hot{
  font-size:14px;
}
.mainTab_hot ul{
  padding:0;
  font-size:0;
}
.mainTab_hot li{
  display:inline-block;
  vertical-align:top;
  box-sizing:border-box;
  margin:10px 8px;
}
.mainTab_hot li a{
  width:200px;
  display:block;
  padding:14px;
  box-sizing:border-box;
  border-radius:5px;
}
.main_img{
  width:170px;
  height:150px;
  overflow:hidden;
  border-radius:5px;
}
.main_img img{
  width:100%;
  height: 100%;
}
.main_title,.main_money{
  display:block;
  text-align:center;
  margin:10px 0;
}
.main_title{
  font-size:14px;
  color:#333;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.main_money{
  font-size:16px;
  color:#e10601;
}
.main_zan{
  padding:20px;
  color:#999;
  box-sizing:border-box;
  font-size:14px;
}
.main_zan span:first-child{
  float:left;
}
.main_zan span:last-child{
  float:right;
}
.main_zan span:first-child i{
  padding-right:5px;
}
  .main_zan span:last-child i{
    padding-left:5px;
  }
.main_zan span i{
  font-size:20px;
  vertical-align:middle;
}
.mainTab_hot li:hover a{
  box-shadow:0 0 10px #fbcab5;
}
.mainTab_hot li:hover .main_zan span{
  color:#ef540f;
}
.main_sp{
  margin-top:30px;
}
.float_left{
  float:left;
}
.float_right{
  float:right;
}
.main_vshop a{
  display:block;
  position:relative;
  border-radius:5px;
}
.main_vshop a img{
  width:100%;
  height:100%;
}
.main_vshop a{
  width:230px;
  height:280px;
  border-radius:5px;
  overflow:hidden;
}
.main_vshop a .main_shopname{
  position:absolute;
  top:15px;
  left:50%;
  width:200px;
  margin-left:-100px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  color:#fff;
  font-size:14px;
  z-index:100;
}
.main_vshop a::before{
  position:absolute;
  top:50%;
  left:50%;
  width:40px;
  height:40px;
  margin-left:-20px;
  margin-top:-20px;
  background:url(../../../static/img/play1.png) no-repeat;
  background-size:100%;
  z-index:99;
  content: '';
}
.main_vshop a::after{
  position:absolute;
  width:100%;
  height:100%;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background:url(../../../static/img/hei5.png) repeat 0 0;
  background-size:100%;
  content:'';
}
.main_vshop a p{
  position:absolute;
  bottom:15px;
  left:50%;
  width:200px;
  margin-left:-100px;
  font-size:0;
  z-index:100;
}
.main_vshop a p span{
  display:inline-block;
  vertical-align:middle;
  font-size:12px;
  color:#fff;
}
.main_vshop a p span:first-child{
  width:130px;
  margin-right:10px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.main_vshop a p span:last-child{
  width:60px;
}
.main_vshop a p span:last-child i{
  font-size:16px;
  vertical-align:middle;
}
.main_vshop02 a{
  margin:0 10px;
  width:410px;
}
.main_vshop02 a .main_shopname,.main_vshop02 a p{
  width:362px;
  margin-left:-181px;
}
.main_vshop02 a p span:first-child{
  width:270px;
}
.main_vshop03 a{
  width:235px;
  height:135px;
}
.main_vshop03 a:first-child{
  margin-bottom:10px;
}
.mainr_btn,.mainr_jf{
  margin-bottom: 15px;
  padding: 20px 40px;
  background: #fff;
}
.mainr_btn a{
  display:block;
  width:100%;
  height:50px;
  line-height:50px;
  border:1px #fca02f solid;
  border-radius:5px;
  color:#ef510a;
  font-size:18px;
  background:#fdede6;
}
.mainr_btn a i{
  font-size:20px;
  vertical-align:middle;
  padding-right:5px;
}
.mainr_jf a{
  padding-left:60px;
  display:block;
  position:relative;
  font-size:18px;
  text-align:center;
}
.mainr_jf a i{
  position:absolute;
  top:0;
  left:0;
  font-size:52px;
  color:#2f9ff5;
}
.mainr_jf a strong,.mainr_jf a span{
  display:block;
  color:#333;
}
.mainr_jf a span{
  margin-top:18px;
  font-size:14px;
}
.mainr_jf a span b{
  font-size:10px;
  color:#f62e2e;
}
.main_shoplist{
  width:262px;
  box-sizing:border-box;
}
.main_shoplist li{
  padding:10px 0;
  border-bottom:1px solid #dcdcdc;
  text-align:left;
}
.main_shoplist .main_shoplist_title{
  border:none;
  margin-bottom:15px;
  font-size:18px;
  font-weight:700;
  color:#333;
  text-align:left;
}
.main_shoplist em{
  font-size:16px;
  font-style:normal;
  font-weight:700;
  padding-right:10px;
  vertical-align:middle;
}
.main_shoplist p{
  display:inline-block;
  vertical-align:middle;
  width:170px;
  font-size:0;
}
.main_shoplist .main_shoplimg{
  display:inline-block;
  vertical-align:middle;
  width:50px;
  height:50px;
  border-radius:50px;
  overflow: hidden;
}
.main_shoplist .main_shoplimg img{
  width:100%;
  height:100%;
}
.main_shoplist .main_shoplcontent{
  display:inline-block;
  vertical-align:middle;
  font-size:14px;
  width:105px;
  margin-left:10px;
  text-align:left;
}
.main_shoplist .main_shoplcontent strong,.main_shoplist .main_shoplcontent b{
  display:block;
  margin:5px 0;
}
.main_shoplMoney{
  font-size:14px;
  color:#ff4949;
}
.main_shopTglist p{
  width:100%;
  box-sizing:border-box;
}
.main_shopTglist .main_shoplcontent{
  width:180px;
}
.main_shopTglist .main_shoplimg{
  width:66px;
  height:55px;
  border-radius:10px;
}
.el-aside, .el-main{
  overflow:hidden;
}
.main_ml{
  position:absolute;
  top:0;
  left:0;
  width:130px;
  height:40px;
  line-height:40px;
  text-align:center;
  z-index:1000;
  background:rgba(255,255,255,0.8);
  color:#ef510a;
  font-size:18px;
  cursor:pointer;
}
.main_menuContent{
  display:none;
  position:absolute;
  top:0;
  left:0;
  background:rgba(255,255,255,0.8);
  box-sizing:border-box;
  z-index:1001;
  height:100%;
  margin:0;
}
.main_menuContent .main_menul{
  width:170px;
  padding:10px;
  line-height:30px;
  font-size:14px;
}
.main_menuContent .main_menul:hover{
  background:rgba(0,0,0,0.3);
}
.main_menuContent .main_menul a{
  color:#333;
}
.main_menuContent .main_menul a:hover{
  color:#ef510a;
}
.el-main{
  padding:0!important;
}
.main_menuContent .main_menulist_detail{
  display:none;
  position:absolute;
  top:0;
  left:190px;;
  padding:20px 40px;
  box-sizing:border-box;
  width:680px;
  height:500px;
  background:#fff;
  text-align:left;
}
.main_menuContent .main_menul:hover > .main_menulist_detail{
  display:block;
}
.main_menulist:hover .main_ml{
  display:none;
}
.main_menulist:hover .main_menuContent{
  display:block;
}
</style>
<script>
import axios from 'axios'

export default {
  name: 'Home',
  metaInfo: {
    title: '首页'
  },
  data() {
    return {
      schTypeOptions: [{
        value: 'goods',
        label: '商品'
      }, {
        value: 'store',
        label: '店铺'
      }],
      schTypeValue: 'goods',
      homeSearch: '',
      currentUserInfo: {},
      homeBannerImgs: [
        {
          index: 0,
          img: '../../../static/img/banner-b1.jpg',
          rightImg: [
            {
              img: '../../../static/img/banner-b1.jpg'
            },
            {
              img: '../../../static/img/banner-b2.jpg'
            },
            {
              img: '../../../static/img/banner-b3.jpg'
            }
          ]
        },
        {
          index: 1,
          img: '../../../static/img/banner-b2.jpg',
          rightImg: [
            {
              img: '../../../static/img/banner-b1.jpg'
            },
            {
              img: '../../../static/img/banner-b2.jpg'
            },
            {
              img: '../../../static/img/banner-b3.jpg'
            }
          ]
        },
        {
          index: 2,
          img: '../../../static/img/banner-b3.jpg',
          rightImg: [
            {
              img: '../../../static/img/banner-b1.jpg'
            },
            {
              img: '../../../static/img/banner-b2.jpg'
            },
            {
              img: '../../../static/img/banner-b3.jpg'
            }
          ]
        }
      ],
      homeGcategory: [],
      searchHomeGcategory: {
        page: 1,
        pageSize: 10,
        orderBy: ['sortOrder_asc']
      },
      homeNewGoods: [],
      homeLikeGoods: [],
      homeRecommendGoods: [],
      homeHotGoods: [],
      homeStoresIncome: [],
      homeStoresRecommend: [],
      homeHotSearchGoods: [],
      NowImg: 0,
      MaxImg: 4,
      hotGoodsNames: '',
      creditsExchangeDialogVisible: false,
      creditsExchangeForm: {
        currentIntegral: 0,
        exchangeRate: 0.1,
        exchangeIntegral: 0,
        exchangeMoney: 0
      }
    }
  },
  mounted() {
    this.getCurrentUserInfo(this.$Api.getAccountByCurrent.type, this.$Api.getAccountByCurrent.target)
    // this.getHomeBannerImgs(this.$Api.getHomeBannerImgs.type, this.$Api.getHomeBannerImgs.target)
    this.getHomeGcategory(this.$Api.homeGcategory.type, this.$Api.homeGcategory.target)
    this.getHomeGoods(this.$Api.homeGoodsList.type, this.$Api.homeGoodsList.target)
    this.getHomeStoresIncome(this.$Api.storesIncome.type, this.$Api.storesIncome.target)
    this.getHomeStoresRecommend(this.$Api.storesRecommend.type, this.$Api.storesRecommend.target)
    this.getHomeHotSearchGoods(this.$Yjj.schHotGoods.type, this.$Yjj.schHotGoods.target)
  },
  methods: {
    getHomeBannerImgs: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.homeBannerImgs = response.data.data
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    getHomeGcategory: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target, this.searchHomeGcategory).then(response => {
          this.homeGcategory = response.data.data
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    getHomeGoods: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target, {}).then(response => {
          console.log(response.data)
          this.homeNewGoods = response.data.data['1']
          this.homeLikeGoods = response.data.data['2']
          this.homeHotGoods = response.data.data['3']
          this.homeRecommendGoods = response.data.data['4']
          console.log(this.homeNewGoods)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    getHomeStoresIncome: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target, {}).then(response => {
          this.homeStoresIncome = response.data.data
          console.log('homeStoresIncome')
          console.log(this.homeStoresIncome)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    getHomeStoresRecommend: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target, {}).then(response => {
          this.homeStoresRecommend = response.data.data.dataList
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    getCurrentUserInfo: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          console.log(response)
          this.currentUserInfo = response.data.data
          this.creditsExchangeForm.currentIntegral = this.currentUserInfo.currentIntegral
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    handleSearch: function() {
      const schType = this.schTypeValue
      if (schType === 'goods') {
        this.$router.push({
          name: 'SearchResult',
          query: {
            paramName: this.homeSearch
          }
        })
      }
      if (schType === 'store') {
        this.$router.push({
          name: 'SearchStore',
          query: {
            paramName: this.homeSearch
          }
        })
      }
    },
    gotoVideo: function() {
      this.$router.push({
        name: 'VideoDetail'
      })
    },
    gotoGoodDetail: function(goodId) {
      console.log('GoodId:' + goodId)
      this.$router.push({
        name: 'MyShop',
        query: {
          // goodId: goodId,
          paramId: goodId,
          paramType: 'goods'
        }
      })
    },
    gotoGoodCateSearch: function(cateId1, cateId2, cateId3) {
      if (cateId3 === 0) {
        this.$router.push({
          name: 'SearchResult',
          query: {
            gcategoryId: cateId1,
            parentId: cateId2,
            grandParentId: -1
          }
        })
      } else {
        this.$router.push({
          name: 'SearchResult',
          query: {
            gcategoryId: cateId1,
            parentId: cateId2,
            grandParentId: cateId3
          }
        })
      }
    },
    gotoSearch: function(gcategoryId, parentId, grandParentId) {
      this.$router.push({
        name: 'SearchResult',
        query: {
          gcategoryId: gcategoryId,
          parentId: parentId,
          grandParentId: grandParentId
        }
      })
    },
    getHomeHotSearchGoods: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.homeHotSearchGoods = response.data.data
          this.MaxImg = this.homeHotSearchGoods.length - 1
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    handleCreditsExchange: function() {
      this.creditsExchangeDialogVisible = true
    },
    handleExchangeIntegralChange: function(integral) {
      console.log(integral)
      let tempMoney = 0
      tempMoney = integral / 10
      this.creditsExchangeForm.exchangeMoney = tempMoney.toFixed(2)
    },
    exchange: function() {
      if (this.creditsExchangeForm.exchangeIntegral === 0) {
        this.$message({
          message: '请输入需要兑换积分',
          type: 'warning'
        })
        return
      }
      let msgTip = ''
      msgTip = '确认将' + this.creditsExchangeForm.exchangeIntegral + '积分兑换为' + this.creditsExchangeForm.exchangeMoney + '支付通余额吗？'
      this.$confirm(msgTip, '提示', {
        confirmButtonText: '兑换',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios[this.$Api.integralExchange.type](this.$Api.integralExchange.target, this.creditsExchangeForm).then(response => {
          let status = 0
          status = response.status
          if (status === 200) {
            this.getCurrentUserInfo(this.$Api.getAccountByCurrent.type, this.$Api.getAccountByCurrent.target)
            this.creditsExchangeDialogVisible = false
            this.$message({
              type: 'success',
              message: '兑换成功'
            })
          }
        }).catch(error => {
          this.$message({
            type: 'error',
            message: '兑换失败'
          })
          console.log(error)
        })
      }).catch(() => {
        this.creditsExchangeDialogVisible = false
        this.$message({
          type: 'info',
          message: '已取消兑换'
        })
      })
    }
  }
}
</script>
