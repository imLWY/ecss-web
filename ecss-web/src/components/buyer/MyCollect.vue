<template>
  <el-tabs type="border-card">
    <el-tab-pane label="收藏商品">
      <div class="mycollect">
        <span class="MyCollect_all">
          <label><input type="checkbox" @click="checkAllGoods()">全选</label>
          <a href="javascript:void(0);" @click="delCollects(1)">删除</a>
        </span>
        <table class="mycollect_table">
          <thead>
            <tr>
              <th style="width:5%;"/>
              <th style="width:35%;"/>
              <th style="width:15%;"/>
              <th style="width:15%;"/>
              <th style="width:15%;"/>
              <th style="width:15%;"/>
            </tr>
          </thead>
          <tbody>
            <tr v-for="goods in goodsCollect" :key="goods.id">
              <td><input :value="goods.id" type="checkbox" name="goodsIds"></td>
              <td>
                <a href="javascript:void(0);" class="mycollectImg" @click="viewMerchandise(goods.itemId)"><img :src="goods.goodsData.goodsPhoto"></a>
                <a href="javascript:void(0);" class="mycollectTitle" @click="viewMerchandise(goods.itemId)">{{ goods.goodsData.goodsName }}</a>
              </td>
              <td>{{ goods.storeData.storeName }}</td>
              <td><a href=""><img src="../../../static/img/zn.png"></a></td>
              <td>￥{{ goods.goodsData.goodsPrice }}</td>
              <td>
                <a href="javascript:void(0);" class="mycollect_btn" @click="handleDelClick(goods.id, 1)">删除</a>
              </td>
            </tr>
          </tbody>
        </table>
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
    <el-tab-pane label="收藏店铺">
      <div class="mycollect">
        <span class="MyCollect_all">
          <label><input type="checkbox" @click="checkAllStore()">全选</label>
          <a href="javascript:void(0);" @click="delCollects(2)">删除</a>
        </span>
        <table class="mycollect_table">
          <thead>
            <tr>
              <th style="width:5%;"/>
              <th style="width:35%;"/>
              <th style="width:15%;"/>
              <th style="width:15%;"/>
              <th style="width:15%;"/>
              <th style="width:15%;"/>
            </tr>
          </thead>
          <tbody>
            <tr v-for="store in storeCollect" :key="store.id">
              <td><input :value="store.id" type="checkbox" name="storesIds"></td>
              <td>
                <a href="javascript:void(0);" class="mycollectImg"><img :src="store.storeData.storeLogo" @click="viewStore(store.itemId)"></a>
                <!-- <a href="" class="mycollectTitle">111</a> -->
              </td>
              <td>{{ store.storeData.storeName }}</td>
              <td><a href=""><img src="../../../static/img/zn.png"></a></td>
              <!-- <td>111</td> -->
              <td>
                <a href="javascript:void(0);" class="mycollect_btn" @click="handleDelClick(store.id, 2)">删除</a>
              </td>
            </tr>
          </tbody>
        </table>
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
  .mycollect{
    margin-top:20px;
    padding:20px 0;
    border-top:1px solid #eee;
    text-align:left;
  }
  .MyCollect_all{
    display:block;
  }
  .MyCollect_all label{
    font-size:14px;
    padding-right:30px;
  }
  .MyCollect_all a{
    color:#f45408;
    font-size:14px;
  }
  .mycollect_table{
    width:100%;
    margin:20px 0;
    border-top:1px solid #f45408;
  }
  .mycollect_table td{
    padding:10px 0;
    text-align:center;
    font-size:12px;
    border-bottom:1px solid #eee;
  }
  .mycollectImg,.mycollectTitle{
    display:inline-block;
    vertical-align:middle;
  }
  .mycollectImg{
    margin-right:10px;
    width:80px;
    height:80px;
    overflow:hidden;
  }
  .mycollectImg img{
    width:100%;
    height:100%;
  }
  .mycollect_btn{
    display:inline-block;
    vertical-align:middle;
    color:#fff;
    background:#f45408;
    padding:5px 10px;
    margin:0 3px;
    border-radius:3px;
  }
</style>

<script>
import axios from 'axios'

export default {
  name: 'MyCollect',
  data() {
    return {

      searchParam: {
        page: 1,
        pageSize: 10,
        userId: 1
      },
      searchParam2: {
        page: 1,
        pageSize: 10,
        userId: 1
      },
      delParam: {
        ids: []
      },
      goodsAmount: 0,
      storeAmount: 0,
      goodsCollect: {},
      storeCollect: {},
      collectGoods: 'goods',
      collectStore: 'store'

    }
  },
  mounted() {
    this.getMyGoodsCollectList(this.$Yjj.getCollect.type, this.$Yjj.getCollect.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize, type: this.collectGoods })
    this.getMyStoreCollectList(this.$Yjj.getCollect.type, this.$Yjj.getCollect.target, { page: this.searchParam2.page, pageSize: this.searchParam2.pageSize, type: this.collectStore })
  },
  methods: {
    getMyGoodsCollectList: function(type, target, data) {
      return new Promise((resolve, reject) => {
        axios[type](target, data).then(response => {
          this.goodsCollect = response.data.data.dataList
          // console.log(this.goodsCollect)
          this.searchParam.total = response.data.data.total
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    getMyStoreCollectList: function(type, target, data) {
      return new Promise((resolve, reject) => {
        axios[type](target, data).then(response => {
          this.storeCollect = response.data.data.dataList
          console.log(this.storeCollect)
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
      this.getMyGoodsCollectList(this.$Yjj.getCollect.type, this.$Yjj.getCollect.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize, type: this.collectGoods })
    },
    handleSizeChange2: function(val) {
      console.log('每页${val}条')
    },
    handleCurrentChange2: function(val) {
      this.getMyStoreCollectList(this.$Yjj.getCollect.type, this.$Yjj.getCollect.target, { page: this.searchParam2.page, pageSize: this.searchParam2.pageSize, type: this.collectStore })
    },
    // 单个删除我的收藏
    handleDelClick: function(val, collectType) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // 确认按钮按下
        const type = this.$Yjj.delCollectById.type
        const target = this.$Yjj.delCollectById.target + '?id=' + val
        return new Promise((resolve, reject) => {
          axios[type](target).then(response => {
            // 刷新列表
            if (collectType === 1) {
              this.getMyGoodsCollectList(this.$Yjj.getCollect.type, this.$Yjj.getCollect.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize, type: this.collectGoods })
            } else {
              this.getMyStoreCollectList(this.$Yjj.getCollect.type, this.$Yjj.getCollect.target, { page: this.searchParam2.page, pageSize: this.searchParam2.pageSize, type: this.collectStore })
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
    },
    // 收藏商品全选控制
    checkAllGoods: function() {
      this.goodsAmount += 1
      if (this.goodsAmount % 2 === 0) {
        const cks = document.getElementsByName('goodsIds')
        for (var i = 0; i < cks.length; i++) {
          cks[i].checked = false
        }
      } else {
        const cks = document.getElementsByName('goodsIds')
        for (var j = 0; j < cks.length; j++) {
          cks[j].checked = true
        }
      }
    },
    // 收藏商铺全选控制
    checkAllStore: function() {
      this.storeAmount += 1
      if (this.storeAmount % 2 === 0) {
        const cks = document.getElementsByName('storesIds')
        for (var i = 0; i < cks.length; i++) {
          cks[i].checked = false
        }
      } else {
        const cks = document.getElementsByName('storesIds')
        for (var j = 0; j < cks.length; j++) {
          cks[j].checked = true
        }
      }
    },
    // 批量删除
    delCollects: function(val) {
      var collectIds = []
      if (val === 1) {
        const cks = document.getElementsByName('goodsIds')
        for (var i = 0; i < cks.length; i++) {
          if (cks[i].checked === true) {
            collectIds.push(cks[i].value)
          }
        }
      } else {
        const cks = document.getElementsByName('storesIds')
        for (var j = 0; j < cks.length; j++) {
          if (cks[j].checked === true) {
            collectIds.push(cks[j].value)
          }
        }
      }
      if (collectIds.length < 1) {
        this.$message({
          type: 'info',
          message: '请选择要删除的记录!'
        })
        return
      } else {
        this.delParam.ids = collectIds
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          // 确认按钮按下
          const type = this.$Yjj.delCollectByIds.type
          const target = this.$Yjj.delCollectByIds.target
          return new Promise((resolve, reject) => {
            axios[type](target, this.delParam).then(response => {
              // 刷新列表
              if (val === 1) {
                this.getMyGoodsCollectList(this.$Yjj.getCollect.type, this.$Yjj.getCollect.target, { page: this.searchParam.page, pageSize: this.searchParam.pageSize, type: this.collectGoods })
              } else {
                this.getMyStoreCollectList(this.$Yjj.getCollect.type, this.$Yjj.getCollect.target, { page: this.searchParam2.page, pageSize: this.searchParam2.pageSize, type: this.collectStore })
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
    },
    viewMerchandise: function(goodId) {
      this.$router.push({
        name: 'MyShop',
        query: {
          paramType: 'goods',
          paramId: goodId,
          goodId: goodId
        }
      })
    },
    viewStore: function(storeId) {
      this.$router.push({
        name: 'MyShop',
        query: {
          paramType: 'store',
          paramId: storeId
        }
      })
    }
  }
}
</script>
