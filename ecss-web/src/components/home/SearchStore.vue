<template>
  <el-container>
    <el-header style="min-height:70px;min-width:100%;border-bottom:1px solid #e2e2e2;">
      <Header />
    </el-header>
    <el-container style="margin-top: 20px; min-width: 1200px; max-width: 1200px; margin: 0px auto;">
      <el-container style="margin-top:32px;height:100%;">
        <el-header style="width:100%;height:30%!important;">
          <el-row :gutter="10" style="height:100%;min-height:64px;margin:0;padding:0;">
            <el-col :span="3">
              <div class="grid-content">
                <span>店铺名称：</span>
              </div>
            </el-col>
            <el-col :span="4">
              <el-input v-model="searchStore.storeNameLike" placeholder="请输入店铺名称"/>
            </el-col>
          </el-row>
          <el-row :gutter="10" style="height:100%;min-height:64px;margin:0;padding:0;">
            <el-col :span="3">
              <div class="grid-content">
                <span>店主名称：</span>
              </div>
            </el-col>
            <el-col :span="4">
              <el-input v-model="searchStore.userName" placeholder="请输入店主名称"/>
            </el-col>
          </el-row>
          <el-row :gutter="10" style="height:64px;line-height: 64px;text-align:center;vertical-align:middle;margin:0;padding:0;">
            <el-col :span="3">
              <div class="grid-content">
                <span>商铺分类：</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content" style="height:100%;">
                <el-cascader
                  v-model="scategory"
                  :options="categories"
                  :props="categoriesProps"
                  expand-trigger="hover"
                  filterable
                  placeholder="搜索分类"
                  clearable
                  @change="handleCategoryChange"/>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content">
                <span>所在地区：</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content" style="height:100%;">
                <el-cascader
                  v-model="regions"
                  :options="regionsArr"
                  expand-trigger="hover"
                  placeholder="搜索地区"
                  clearable/>
              </div>
            </el-col>
            <el-col :span="3"/>
          </el-row>
          <el-row :gutter="10" style="height:100%;min-height:64px;margin:0;padding:0;">
            <el-col :span="2">
              <el-button type="success" @click="getStoreList">检索店铺</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main style="height:70%;text-align:left;min-height:500px;">
          <h3 style="height:40px;line-height:40px;border-bottom:1px solid #f45408;color:#f45408;">店铺列表</h3>
          <el-table
            :data="storeArr"
            fit
            stripe
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column align="center" label="logo" width="200" fixed="left">
              <template slot-scope="scope">
                <img :src="scope.row.storeLogo" style="height:60px;width:60px;">
              </template>
            </el-table-column>
            <el-table-column prop="storeName" align="left" label="店铺名称" width="200"/>
            <el-table-column prop="userName" align="left" label="店主名称" width="200"/>
            <el-table-column prop="cateName" align="left" label="分类" width="200"/>
            <el-table-column prop="regionName" align="left" label="地区" width="200"/>
            <el-table-column align="center" label="操作" width="200" fixed="right">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button
                    type="warning"
                    size="mini"
                    icon="el-icon-info"
                    circle
                    @click="viewStore(scope.row.id)" />
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
          <el-row style="text-align:center;">
            <el-pagination
              :current-page="searchStore.page"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="searchStore.pageSize"
              :total="searchStore.total"
              layout="total, sizes, prev, pager, next, jumper"
              style="text-align:center;"
              @size-change="handleBrandTableSizeChange"
              @current-change="handleBrandTableCurrentChange" />
          </el-row>
        </el-main>
      </el-container>
    </el-container>
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>
<style scoped>
@import "../../../static/css/element-ui.css";

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

/* .el-radio-button__inner {
  border: none;
} */
/* .el-radio-button:first-child .el-radio-button__inner {
  border-left: none;
} */

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
</style>

<script>
import axios from 'axios'

export default {
  name: 'SearchStore',
  data() {
    return {
      scategory: [],
      categories: [],
      categoriesProps: {
        value: 'id',
        label: 'cateName',
        children: 'children'
      },
      regionsArr: [],
      regions: [],
      storeArr: [],
      searchStore: {
        page: 1,
        pageSize: 10,
        cateId: null,
        storeNameLike: this.$route.query.paramName,
        total: 0,
        regionId: null,
        userName: null
      }
    }
  },
  mounted() {
    this.getCategories({ 'parentId': 0 })
    this.getRegionList(this.$Yjj.getRegion.type, this.$Yjj.getRegion.target)
    this.getStoreList()
  },
  methods: {
    getGcategory: function(searchParam, type, target) {
    },
    getCategories: function(searchParam) {
      return new Promise((resolve, reject) => {
        axios[this.$Api.storeCategory.type](this.$Api.storeCategory.target, searchParam).then(response => {
          this.categories = response.data.data
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    getRegionList: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.regionsArr = response.data.data
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    getStoreList: function() {
      const type = this.$Lwy.getStoreListByQuery.type
      const target = this.$Lwy.getStoreListByQuery.target
      return new Promise((resolve, reject) => {
        if (this.scategory !== null && this.scategory.length > 0) {
          this.searchStore.cateId = this.scategory[this.scategory.length - 1]
        } else {
          this.searchStore.cateId = null
        }
        if (this.regions !== null && this.regions.length > 0) {
          this.searchStore.regionId = this.regions[this.regions.length - 1]
        } else {
          this.searchStore.regionId = null
        }
        axios[type](target, this.searchStore).then(response => {
          this.storeArr = response.data.data.dataList
          this.searchStore.total = response.data.data.total
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    handleCategoryChange: function() {

    },
    handleBrandTableSizeChange: function(val) {
      this.searchStore.pageSize = val
      this.searchStore.page = 1
      this.getStoreList(this.searchGoods)
    },
    handleBrandTableCurrentChange: function(val) {
      this.searchStore.page = val
      this.getStoreList()
    },
    viewStore: function(id) {
      this.$router.push({
        name: 'MyShop',
        query: {
          // storeId: this.form.id,
          paramId: id,
          paramType: 'store'
        }
      })
    }
  }
}
</script>
