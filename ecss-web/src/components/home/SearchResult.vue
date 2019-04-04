<template>
  <el-container>
    <el-header style="min-height:70px;min-width:100%;border-bottom:1px solid #e2e2e2;">
      <Header />
    </el-header>
    <el-container style="margin-top: 20px; min-width: 1200px; max-width: 1200px; margin: 0px auto;">
      <el-container style="margin-top:32px;height:100%;">
        <el-header style="width:100%;height:30%!important;">
          <el-row :gutter="10" style="height:64px;line-height:64px;vertical-align: middle;margin:0;padding:0;">
            <el-col :span="3">
              <div class="grid-content">
                <span>按商品名称：</span>
              </div>
            </el-col>
            <el-col :span="6">
              <el-input v-model="searchGoods.goodNameLike" placeholder="请输入商品名称"/>
            </el-col>
          </el-row>
          <el-row :gutter="10" style="height:64px;line-height:64px;text-align:center;vertical-align:middle;margin:0;padding:0;">
            <el-col :span="3">
              <div class="grid-content">
                <span>按商品分类：</span>
              </div>
            </el-col>
            <el-col :span="21">
              <el-breadcrumb separator-class="el-icon-arrow-right" style="height:64px;line-height:64px;vertical-align: middle;">
                <el-breadcrumb-item v-if="first.length > 0">
                  <el-select v-model="firstGcategoryId" @change="handleFirstChange">
                    <el-option
                      v-for="item in first"
                      :key="item.id"
                      :label="item.cateName"
                      :value="item.id"
                      style="padding:10px;"
                    />
                  </el-select>
                </el-breadcrumb-item>
                <el-breadcrumb-item v-if="second.length > 0">
                  <el-select v-model="secondGcategoryId" @change="handleSecondChange">
                    <el-option
                      v-for="item in second"
                      :key="item.id"
                      :label="item.cateName"
                      :value="item.id"
                      style="padding:10px;"
                    />
                  </el-select>
                </el-breadcrumb-item>
                <el-breadcrumb-item v-if="third.length > 0">
                  <el-select v-model="thirdGcategoryId" @change="handleThirdChange">
                    <el-option
                      v-for="item in third"
                      :key="item.id"
                      :label="item.cateName"
                      :value="item.id"
                      @change="handleThirdChange"
                    />
                  </el-select>
                </el-breadcrumb-item>
              </el-breadcrumb>
            </el-col>
          </el-row>
          <el-row :gutter="10" style="height:64px;line-height:64px;vertical-align:middle;margin:0;padding:0;">
            <el-col :span="3">
              <div class="grid-content">
                <span>按价格区间：</span>
              </div>
            </el-col>
            <el-col :span="3">
              <el-input v-model="searchGoods.goodsPriceStart" placeholder="请输入金额"/>
            </el-col>
            <el-col :span="1">
              <span class="height:64px;line-height:64px;vertical-align:middle;">￥ - </span>
            </el-col>
            <el-col :span="3">
              <el-input v-model="searchGoods.goodsPriceEnd" placeholder="请输入金额"/>
            </el-col>
            <el-col :span="1">
              <span class="height:64px;line-height:64px;vertical-align:middle;">￥</span>
            </el-col>
          </el-row>
          <el-row :gutter="10" style="height:64px;line-height:64px;margin:0;padding:0;">
            <el-col :span="2">
              <el-button type="success" @click="queryGoods">检索商品</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main style="height:70%;text-align:left;">
          <h3 style="height:40px;line-height:40px;border-bottom:1px solid #f45408;color:#f45408;">搜索商品</h3>
          <el-row>
            <el-col v-for="(good, index) in goods" :span="4" :key="good.id" :offset="index % 5 > 0 ? 1 : 0" style="margin-bottom:10px;">
              <el-card :body-style="{ padding: '0px' }" :title="good.goodsName">
                <img :src="good.goodsPhoto" style="height:150px;width:100%;display:block;" @click="handleGoodClick(good.id)">
                <div style="padding:8px;height:72px;" @click="handleGoodClick(good.id)">
                  <div style="height:32px;width:100%;">
                    <p style="width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{ good.goodsName }}</p>
                  </div>
                  <div class="bottom clearfix" style="height:36px;">
                    <p class="searchmt">
                      <span class="searchmt_m">￥{{ good.goodsPrice }}</span>
                      <span class="searchmt_t">已售{{ good.goodsSales }}件</span>
                    </p>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row style="text-align:center;">
            <el-pagination
              :current-page="searchGoods.page"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="searchGoods.pageSize"
              :total="searchGoods.total"
              layout="total, sizes, prev, pager, next, jumper"
              style="text-align:center;"
              @size-change="handleBrandTableSizeChange"
              @current-change="handleBrandTableCurrentChange" />
          </el-row>
        </el-main>
      </el-container>
      <el-aside style="width: 250px;min-width: 200px; margin-top: 32px;margin-left:10px;padding-left:30px;">
        <h3 style="height:40px;line-height:40px;border-bottom:1px solid #f45408;color:#f45408;text-align:left;">热卖商品</h3>
        <el-row>
          <el-col v-for="good in hotGoods" :span="24" :key="good.goodsId" style="margin-bottom:10px;">
            <el-card :body-style="{ padding: '0px' }" :title="good.goodsName">
              <img :src="good.goodsPhoto" style="height:164px;width:100%;display:block;" @click="handleGoodClick(good.goodsId)">
              <div style="padding:8px;height:72px;" @click="handleGoodClick(good.goodsId)">
                <div style="height:32px;width:100%;">
                  <p style="width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{ good.goodsName }}</p>
                </div>
                <div class="bottom clearfix" style="height:36px;">
                  <p class="searchmt">
                    <span class="searchmt_m">￥{{ good.goodsPrice }}</span>
                    <span class="searchmt_t">已售{{ good.goodsSales }}件</span>
                  </p>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-aside>
    </el-container>
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>
<style>

.selectedRegion {
  color: #f45408;
}

.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  text-align: left;
  /* vertical-align: middle; */
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 5px 0;
  background-color: #f9fafc;
}

.el-card:hover {
  cursor: pointer;
}

ul,li{
  list-style:none;
  /* display:inline-block; */
  padding:0;
  margin:0;
}
/* input,select,button{
  border:none;
  outline:none;
  background:none;
} */
.searchResult{
  width:1200px;
  margin:20px auto;
  text-align:left;
  font-size:0;
}
.searchRleft,.searchRright{
  display:inline-block;
  vertical-align:top;
  font-size:14px;
  box-sizing:border-box;
}
.searchRleft{
  width:70%;
  padding-right:40px;
}
.searchRright{
  width:30%;
}
.search_choice h3{
  height:40px;
  line-height:40px;
  background:#eee;
  color:#333;
  font-size:14px;
  font-weight:700;
  padding:0 20px;
  box-sizing:border-box;
  border-top:2px solid #ddd;
}
.search_list li{
  padding:8px 10px;
  border-bottom:1px dashed #ddd;
  box-sizing:border-box;
  font-size:14px;
}
.search_list li span{
  font-weight:700;
  padding-right:10px;
}
.search_list li a{
  color:#666;
  padding:0 10px;
}
.search_goods{
  margin:20px 0;
}
.search_goods h3{
  height:40px;
  line-height:40px;
  border-bottom:1px solid #f45408;
}
.search_goods h3 span{
  display:block;
  width:100px;
  height:40px;
  text-align:center;
  font-size:14px;
  color:#fff;
  background:#f45408;
}
.searchGood_list{
  font-size:0;
}
.searchGood_list li{
  display:inline-block;
  vertical-align:top;
  font-size:14px;
  width:25%;
  padding:10px 15px;
  box-sizing:border-box;
}
.searchGood_list li a{
  display:block;
  text-align:center;
}
.searchimg{
  width:160px;
  height:160px;
  overflow:hidden;
}
.searchimg img{
  width:100%;
  height:100%;
}
.searchtitle{
  font-size:14px;
  color:#333;
  margin-top:10px;
}
.searchmt{
  /* margin-top:10px; */
  font-size:0;
}
.searchmt span{
  display:inline-block;
  vertical-align:middle;
  font-size:12px;
  width:50%;
}
.searchmt .searchmt_m{
  font-size:16px;
  color:red;
  font-weight:700;
}
.searchmt .searchmt_t{
  text-align:right;
}
.search_hot{
  font-size:0;
}
.search_hot li{
  display:inline-block;
  vertical-align:top;
  font-size:14px;
  width:50%;
  padding:10px 20px;
  box-sizing:border-box;
}
.hot_img{
  display:block;
  width:140px;
  height:140px;
  overflow:hidden;
}
.hot_img img{
  width:100%;
  height:100%;
}
.searchRright h3{
  height:40px;
  line-height:40px;
  color:#f45408;
  font-size:16px;
  font-weight:700;
  margin:0;
  border-bottom:1px solid #f45408;
  margin-bottom:10px;
}
.hotmt{
  margin-top:10px;
  font-size:0;
}
.hotmt_m,.hotmt_t{
  display:inline-block;
  vertical-align:middle;
  font-size:12px;
  width:50%;
  color:#666;
}
.hotmt_m{
  font-size:14px;
  color:red;
  font-weight:700;
}
.hotmt_t{
  text-align:right;
}
.el-select-dropdown__list{
  padding:10px!important;
}
</style>

<script>
import axios from 'axios'

export default {
  name: 'SearchResult',
  data() {
    return {
      gcategoryId: parseInt(this.$route.query.gcategoryId),
      parentId: parseInt(this.$route.query.parentId),
      grandParentId: parseInt(this.$route.query.grandParentId),
      searchGcategory: {
        page: 1,
        pageSize: 1000000,
        orderBy: ['sortOrder_asc']
      },
      searchGoods: {
        page: 1,
        pageSize: 20,
        cateId: this.$route.query.gcategoryId,
        brand: null,
        goodNameLike: this.$route.query.paramName,
        total: 0,
        goodsPriceStart: null,
        goodsPriceEnd: null
      },
      searchBrands: {
        page: 1,
        pageSize: 100,
        categoryId: this.$route.query.gcategoryId
      },
      gcategorys: [],
      first: [],
      firstGcategoryId: 0,
      second: [],
      secondGcategoryId: 0,
      third: [],
      thirdGcategoryId: 0,
      thirdGcategoryName: '',
      goods: [],
      brands: [],
      selectedBrand: '',
      selectedRegionId: null,
      regions: [],
      hotGoods: []
    }
  },
  mounted() {
    this.getGcategory(this.searchGcategory, this.$Api.homeGcategory.type, this.$Api.homeGcategory.target)
    this.getBrandsByGcategory(this.searchBrands)
    this.getGoodsByCondition(this.searchGoods)
    this.getRegions()
    this.getHotGoods()
  },
  methods: {
    getGcategory: function(searchParam, type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target, searchParam).then(response => {
          this.gcategorys = response.data.data
          console.log('gcategorys')
          console.log(this.gcategorys)
          this.first.push({ 'id': -1, cateName: '全部', 'children': [] })
          for (var i = 0; i < this.gcategorys.length; i++) {
            this.first.push(this.gcategorys[i])
          }
          if (isNaN(this.gcategoryId) || this.gcategoryId === null) {
            this.firstGcategoryId = -1
            return
          }
          if (this.parentId === -1) {
            this.firstGcategoryId = this.gcategoryId
            if (this.first.length > 0) {
              for (var x = 0; x < this.first.length; x++) {
                if (this.gcategoryId === this.first[x].id) {
                  this.second = this.first[x].children
                }
              }
            }
            if (this.second.length > 0) {
              this.secondGcategoryId = this.second[0].id
              this.third = this.second[0].children
            }
            if (this.third.length > 0) {
              this.thirdGcategoryId = this.third[0].id
              this.thirdGcategoryName = this.third[0].cateName
            }
          }
          if (this.parentId !== -1) {
            for (var j = 0; j < this.first.length; j++) {
              if (this.grandParentId === -1) {
                this.firstGcategoryId = this.parentId
                this.secondGcategoryId = this.gcategoryId
                if (this.parentId === this.first[j].id) {
                  this.second = this.first[j].children
                }
              } else {
                this.firstGcategoryId = this.grandParentId
                this.secondGcategoryId = this.parentId
                this.thirdGcategoryId = this.gcategoryId
                if (this.grandParentId === this.first[j].id) {
                  this.second = this.first[j].children
                }
              }
              if (this.second.length > 0) {
                for (var k = 0; k < this.second.length; k++) {
                  if (this.grandParentId === -1) {
                    if (this.gcategoryId === this.second[k].id) {
                      this.third = this.second[k].children
                    }
                    if (this.third.length > 0) {
                      this.thirdGcategoryId = this.third[0].id
                    }
                  } else {
                    if (this.parentId === this.second[k].id) {
                      this.third = this.second[k].children
                    }
                  }
                }
              }
            }
          }
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    getGoodsByCondition: function(searchParam) {
      return new Promise((resolve, reject) => {
        axios[this.$Api.goodsByGcategoryId.type](this.$Api.goodsByGcategoryId.target, searchParam).then(response => {
          this.goods = response.data.data.dataList
          this.searchGoods.pageSize = response.data.data.pageSize
          this.searchGoods.page = response.data.data.page
          this.searchGoods.total = response.data.data.total
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    getBrandsByGcategory: function(searchBrand) {
      return new Promise((resolve, reject) => {
        axios[this.$Api.getBrandsByGcategoryId.type](this.$Api.getBrandsByGcategoryId.target, searchBrand).then(response => {
          console.log(response.data)
          this.brands = response.data.data
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    handleFirstChange: function(firstCateId) {
      this.second = []
      this.third = []
      if (this.first.length > 0) {
        for (var i = 0; i < this.first.length; i++) {
          if (firstCateId === this.first[i].id) {
            this.second = this.first[i].children
          }
        }
        if (this.second.length > 0) {
          this.third = this.second[0].children
          this.secondGcategoryId = this.second[0].id
        } else {
          this.gcategoryId = firstCateId
          this.searchGoods.cateId = firstCateId
          this.searchBrands.categoryId = firstCateId
        }
        if (this.third.length > 0) {
          this.thirdGcategoryId = this.third[0].id
          this.gcategoryId = this.thirdGcategoryId
          this.searchGoods.cateId = this.thirdGcategoryId
          this.searchBrands.categoryId = this.thirdGcategoryId
        } else {
          this.gcategoryId = this.secondGcategoryId
          this.searchGoods.cateId = this.secondGcategoryId
          this.searchBrands.categoryId = this.secondGcategoryId
        }
      }
      // this.getGoodsByCondition(this.searchGoods)
      // this.getBrandsByGcategory(this.searchBrands)
    },
    handleSecondChange: function(secondCateId) {
      this.secondGcategoryId = secondCateId
      this.third = []
      if (this.second.length > 0) {
        for (var i = 0; i < this.second.length; i++) {
          if (secondCateId === this.second[i].id) {
            this.third = this.second[i].children
          }
        }
        if (this.third.length > 0) {
          this.thirdGcategoryId = this.third[0].id
          this.gcategoryId = this.thirdGcategoryId
          this.searchGoods.cateId = this.gcategoryId
          this.searchBrands.categoryId = this.gcategoryId
        } else {
          this.gcategoryId = secondCateId
          this.searchGoods.cateId = secondCateId
          this.searchBrands.categoryId = secondCateId
        }
      }
      // this.getGoodsByCondition(this.searchGoods)
      // this.getBrandsByGcategory(this.searchBrands)
    },
    handleThirdChange: function(thirdCateId) {
      this.thirdGcategoryId = thirdCateId
      this.gcategoryId = this.thirdGcategoryId
      this.searchGoods.cateId = this.gcategoryId
      this.searchBrands.categoryId = this.gcategoryId
      // this.getGoodsByCondition(this.searchGoods)
      // this.getBrandsByGcategory(this.searchBrands)
    },
    handleBrandChange: function(brandId) {
      console.log('brand' + brandId)
      this.searchGoods.brand = brandId
      this.getGoodsByCondition(this.searchGoods)
    },
    getRegions: function() {
      return new Promise((resolve, reject) => {
        axios[this.$Api.regions.type](this.$Api.regions.target, { 'parentId': 2 }).then(response => {
          console.log(response.data)
          this.regions = response.data.data.dataList
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    handleRegionClick: function(regionId) {
      this.selectedRegionId = regionId
    },
    getHotGoods: function() {
      return new Promise((resolve, reject) => {
        axios[this.$Api.homeGoodsList.type](this.$Api.homeGoodsList.target, {}).then(response => {
          console.log(response.data)
          this.hotGoods = response.data.data['3']
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    handleGoodClick: function(goodId) {
      console.log(goodId)
      this.$router.push({
        name: 'MyShop',
        query: {
          paramId: goodId,
          paramType: 'goods'
        }
      })
    },
    handleBrandTableSizeChange: function(val) {
      this.searchGoods.pageSize = val
      this.searchGoods.page = 1
      this.getGoodsByCondition(this.searchGoods)
    },
    handleBrandTableCurrentChange: function(val) {
      this.searchGoods.page = val
      this.getGoodsByCondition(this.searchGoods)
    },
    queryGoods: function() {
      if (this.searchGoods.brand === '') {
        this.searchGoods.brand = null
      }
      this.getGoodsByCondition(this.searchGoods)
    }
  }
}
</script>
