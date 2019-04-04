<template>
  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="商品列表">
      <div class="goodsManage">
        <div class="goodsForm">
          <label>
            <el-select v-model="searchGood.goodGroup" clearable placeholder="全部商品" @change="handleSearchGoodGroupChange">
              <el-option
                v-for="group in goodGroups"
                :key="group.value"
                :label="group.label"
                :value="group.value"/>
            </el-select>
          </label>
          <el-cascader
            :options="options2"
            v-model="searchGoodGcategory"
            filterable
            placeholder="搜索商品分类"
            change-on-select
            style="vertical-align:middle;"
            clearable
            @change="handleGcategoryChange"/>
          <label>
            <el-select v-model="searchGood.goodStatus" clearable placeholder="状态" @change="handleSearchGoodStatusChange">
              <el-option
                v-for="status in goodStatuss"
                :key="status.value"
                :label="status.label"
                :value="status.value"/>
            </el-select>
          </label>
          <label>
            <el-input v-model="searchGood.paramName" clearable placeholder="检索条件" />
          </label>
          <label>
            <input type="submit" value="搜索" class="goodselectBtn" @click="searchGoods()">
          </label>
        </div>
        <div class="goodst_btn">
          <a href="javascript:void(0);" @click="addNewGoods()">新增商品</a>
          <a href="javascript:void(0);" @click="delGoods()">删除</a>
        </div>
        <div class="goodsManage_table">
          <el-table
            ref="goodTable"
            :data="goodList"
            :default-sort="{prop: 'price', order: 'ascending'}"
            fit
            tooltip-effect="dark"
            style="width:100%"
            @selection-change="handleGoodTableSelectionChange">
            <el-table-column type="selection" width="32" align="center"/>
            <el-table-column prop="goodsName" label="商品名称" width="120" align="center"/>
            <el-table-column label="商品图片" width="80" align="center">
              <template slot-scope="scope">
                <img :src="scope.row.previewFix + scope.row.goodsPhoto" style="height:60px;width:60px;">
              </template>
            </el-table-column>
            <el-table-column prop="cateName" label="商品分类" width="80" align="center"/>
            <el-table-column prop="brand" label="品牌" width="80" align="center"/>
            <el-table-column prop="goodsPrice" sortable label="价格" width="100" align="center"/>
            <el-table-column prop="stock" sortable label="库存" width="100" align="center"/>
            <el-table-column prop="ifShow" label="上架" width="50" align="center">
              <template slot-scope="scope">
                <i
                  v-if="scope.row.ifShow === 1"
                  class="el-icon-success"
                  style="color: green;"
                  @click="handleIsShowClick(scope.row)"/>
                <i
                  v-if="scope.row.ifShow === 0"
                  class="el-icon-success"
                  style="color: #d4d4d4;"
                  @click="handleIsShowClick(scope.row)"/>
              </template>
            </el-table-column>>
            <el-table-column prop="recommended" label="推荐" width="50" align="center">
              <template slot-scope="scope">
                <i
                  v-if="scope.row.recommended === 1"
                  class="el-icon-success"
                  style="color: green;"
                  @click="handleIsRecommendClick(scope.row)"/>
                <i
                  v-if="scope.row.recommended === 0"
                  class="el-icon-success"
                  style="color: #d4d4d4;"
                  @click="handleIsRecommendClick(scope.row)"/>
              </template>
            </el-table-column>>
            <el-table-column prop="closed" label="禁售" width="50" align="center">
              <template slot-scope="scope">
                <i
                  v-if="scope.row.closed === 1"
                  class="el-icon-success"
                  style="color: green;"/>
                <i
                  v-if="scope.row.closed === 0"
                  class="el-icon-success"
                  style="color: #d4d4d4;"/>
              </template>
            </el-table-column>>
            <el-table-column label="操作" width="100" align="center">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button
                    type="warning"
                    size="mini"
                    icon="el-icon-edit"
                    circle
                    @click="handleGoodTableEditClick(scope.row.id)" />
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    circle
                    @click="handleGoodTableDeleteClick(scope.row.id)" />
                </el-button-group>
              </template>
            </el-table-column>>
          </el-table>
          <div style="height:24px;"/>
          <el-pagination
            :current-page="searchGood.page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="searchGood.pageSize"
            :total="searchGood.total"
            layout="total, sizes, prev, pager, next, jumper"
            style="text-align:center;"
            @size-change="handleGoodTableSizeChange"
            @current-change="handleGoodTableCurrentChange" />

        </div>
      </div>
    </el-tab-pane>

    <el-tab-pane v-if="isAddGoods === 1" label="新增商品" name="addGoods">
      <div class="goodsManage goodshopAdd">
        <el-form ref="addFormValidate" :rules="rules" :model="form" :inline="true" label-width="100px" >
          <el-form-item label="商品分类" class="goodshopAdd_list" prop="addCateId">
            <el-cascader
              v-model="form.addCateId"
              :options="options2"
              expand-trigger="hover"
              @change="handleChange"/>
          </el-form-item>
          <el-form-item label="本店分类" class="goodshopAdd_list">
            <div v-for="(item, index) in addMyGcategory" :key="index" class="shopadd_list">
              <el-cascader
                :options="options"
                v-model="addMyGcategory[index].cateId"
                expand-trigger="hover"
                @change="handleGcategoryChange2"/>
            </div>
            <el-button type="primary" round @click="addGcategory">新增分类</el-button>
          </el-form-item>
          <h3 class="goodbaseInfo">商品基本信息</h3>
          <div class="shopgoodimg_left">
            <el-form-item class="shopgood_imgbox">
              <img :src="logo">
            </el-form-item>
            <el-form-item class="shopgood_img">
              <el-upload

                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :file-list="fileList2"
                :action="uploadUrl"
                list-type="picture-card">
                <span>上传商品图片</span>
              </el-upload>
            </el-form-item>
          </div>
          <div class="shopgood_input">
            <el-form-item label="商品名称" prop="goodsName">
              <el-input v-model="form.goodsName" class="goodGginput"/>
            </el-form-item>
            <el-form-item label="品牌">
              <el-input v-model="form.brand" class="goodGginput"/>
            </el-form-item>
            <el-form-item label="标签（TAG）">
              <el-input v-model="form.tags" class="goodGginput"/>
            </el-form-item>
            <div class="shopgoodGg">
              <el-form-item label="规格" style="margin-right:0;"/>
              <el-form-item v-if="ifSpec === true" class="shopbj_result">

                <el-form :model="form" :inline="true">
                  <el-row :gutter="10">
                    <el-col :span="4" align="center">
                      <el-form-item :label="form.specName1"/>
                    </el-col>
                    <el-col :span="4" align="center">
                      <el-form-item :label="form.specName2"/>
                    </el-col>
                    <el-col :span="4" align="center">
                      <el-form-item label="价格"/>
                    </el-col>
                    <el-col :span="4" align="center">
                      <el-form-item label="库存"/>
                    </el-col>
                    <el-col :span="8" align="center">
                      <el-form-item label="货号"/>
                    </el-col>
                  </el-row>
                  <el-row v-for="(item, index) in form.specArr" :key="index" :gutter="10">
                    <el-col :span="4">
                      <el-input v-model="form.specArr[index].spec1" readonly/>
                    </el-col>
                    <el-col :span="4">
                      <el-input v-model="form.specArr[index].spec2" readonly/>
                    </el-col>
                    <el-col :span="4">
                      <el-input v-model="form.specArr[index].price" readonly/>
                    </el-col>
                    <el-col :span="4">
                      <el-input v-model="form.specArr[index].stock" readonly/>
                    </el-col>
                    <el-col :span="8">
                      <el-input v-model="form.specArr[index].sku" readonly/>
                    </el-col>
                  </el-row>
                </el-form>
                <div class="shopeditor_byns">
                  <el-button type="primary" round @click="openSpecifications">编辑规格</el-button>
                </div>

              </el-form-item>
              <div v-if="ifSpec === false" class="shopgoodGg_box">
                <el-button type="primary" round @click="openSpecifications">开启规格</el-button>
                <p>您最多可以添加两种商品规格（如：颜色，尺码）用户在购买时需要选择规格来购买</p>
              </div>
            </div>
            <el-form-item label="上架">
              <el-radio-group v-model="form.ifShow" @change="changeIfShow">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="推荐">
              <el-radio-group v-model="form.recommended" @change="changeRecommended">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <el-form-item label="商品描述" class="tanEditor">
            <quill-editor
              ref="myQuillEditor"
              v-model="form.description"
              :options="editorOption"
              style="border-bottom:1px solid #ddd;overflow:hidden;height:500px;"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveGoodsPartner(0, 'addFormValidate')">确 定</el-button>
        </div>
      </div>
    </el-tab-pane>

    <el-tab-pane label="品牌列表">
      <div class="goodsManage">
        <div class="goodsForm goodsForm02" style="text-align:left;">
          <label>
            <el-input v-model="searchBrand.brandName" placeholder="品牌名称" clearable />
          </label>
          <label>
            <label>
              <el-select v-model="searchBrand.brandGroup" clearable placeholder="全部">
                <el-option
                  v-for="group in brandGroups"
                  :key="group.value"
                  :label="group.label"
                  :value="group.value" />
              </el-select>
            </label>
            <input type="submit" value="搜索" class="goodselectBtn" @click="searchBrands">
          </label>
        </div>
        <div class="goodst_btn">
          <a href="javascript:void(0);" @click="handleBrandTableEditClick(0)">品牌申请</a>
        </div>
        <div class="goodsManage_table">
          <el-table
            ref="brandTable"
            :data="brandList"
            border
            fit
            tooltip-effect="dark"
            style="width:100%"
            @selection-change="handleBrandTableSelectionChange">
            <el-table-column type="selection" width="32" align="center"/>
            <el-table-column prop="brandName" label="品牌名称" align="center"/>
            <el-table-column prop="logo" label="品牌图标" width="80" align="center">
              <template slot-scope="scope">
                <img :src="scope.row.logo" style="height:60px;width:60px;">
              </template>
            </el-table-column>
            <el-table-column prop="tag" label="类别" align="center"/>
            <el-table-column label="操作" width="120" align="center">
              <template v-if="scope.row.isMyBand === 1" slot-scope="scope">
                <el-button-group>
                  <el-button
                    type="warning"
                    size="mini"
                    icon="el-icon-edit"
                    circle
                    @click="handleBrandTableEditClick(scope.row.id)" />
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    circle
                    @click="handleBrandTableDeleteClick(scope.row.id)" />
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog :visible.sync="dialogBrandFormVisible" title="新增品牌申请" width="40%" >
            <el-form :model="brandForm" :inline="true" label-width="150px" >
              <el-form-item label="品牌名称">
                <el-input v-model="brandForm.brandName"/>
              </el-form-item>
              <el-form-item label="类别">
                <el-input v-model="brandForm.tag"/>
              </el-form-item>
              <el-form-item label="品牌图标">
                <el-upload
                  :file-list="fileShow"
                  :on-success="uploadAfter"
                  :show-file-list="true"
                  :limit="1"
                  :multiple="false"
                  :action="uploadUrl"
                  class="upload-demo"
                  list-type="picture-card">
                  <i class="el-icon-plus"/>
                </el-upload>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogBrandFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveBrandPartner()">确 定</el-button>
            </div>
          </el-dialog>
          <!--分页-->
          <div style="height:24px;"/>
          <el-pagination
            :current-page="searchBrand.page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="searchBrand.pageSize"
            :total="searchBrand.total"
            layout="total, sizes, prev, pager, next, jumper"
            style="text-align:center;"
            @size-change="handleBrandTableSizeChange"
            @current-change="handleBrandTableCurrentChange" />
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="云商品库">
      <div class="goodsManage">
        <div class="goodsForm">
          <el-cascader
            :options="options2"
            v-model="cloudGcategory"
            filterable
            placeholder="搜索商品分类"
            change-on-select
            style="vertical-align:middle;"
            clearable
            @change="handleCloudGcategoryChange"/>
          <label>
            <input type="submit" value="搜索" class="goodselectBtn" @click="schCloudGoodsByCateId()">
          </label>
        </div>
        <div class="goodsManage_table">
          <el-table
            ref="cloudGoodTable"
            :data="cloudGoodList"
            :default-sort="{prop: 'price', order: 'ascending'}"
            border
            fit
            tooltip-effect="dark"
            style="width:100%"
            @selection-change="handleCloudGoodTableSelectionChange">
            <el-table-column type="selection" width="32" align="center"/>
            <el-table-column prop="goodsName" label="商品名称" width="120" align="center"/>
            <el-table-column label="商品图片" width="80" align="center">
              <template slot-scope="scope">
                <img :src="scope.row.allPath" style="height:60px;width:60px;">
              </template>
            </el-table-column>
            <el-table-column prop="prePrice" sortable label="供货价" width="100" align="center"/>
            <el-table-column prop="price" sortable label="价格" width="80" align="center"/>
            <el-table-column prop="precent" label="平台抽成" width="100" align="center"/>
            <el-table-column prop="stage" sortable label="库存" width="80" align="center"/>
            <el-table-column prop="addState" label="已添加" width="80" align="center"/>
            <el-table-column prop="ifShow" label="上架" width="50" align="center">
              <template slot-scope="scope">
                <i
                  v-if="scope.row.ifShow === 0"
                  class="el-icon-success"
                  style="color: green;"
                  @click="handleIsShowClick(scope.row)"/>
                <i
                  v-if="scope.row.ifShow === 1"
                  class="el-icon-success"
                  style="color: #d4d4d4;"
                  @click="handleIsShowClick(scope.row)"/>
              </template>
            </el-table-column>>
            <el-table-column prop="recommended" label="推荐" width="50" align="center">
              <template slot-scope="scope">
                <i
                  v-if="scope.row.recommended === 1"
                  class="el-icon-success"
                  style="color: green;"
                  @click="handleIsRecommendClick(scope.row)"/>
                <i
                  v-if="scope.row.recommended === 0"
                  class="el-icon-success"
                  style="color: #d4d4d4;"
                  @click="handleIsRecommendClick(scope.row)"/>
              </template>
            </el-table-column>>
            <el-table-column prop="closed" label="禁售" width="50" align="center">
              <template slot-scope="scope">
                <i
                  v-if="scope.row.closed === 1"
                  class="el-icon-success"
                  style="color: green;"/>
                <i
                  v-if="scope.row.closed === 0"
                  class="el-icon-success"
                  style="color: #d4d4d4;"/>
              </template>
            </el-table-column>>
            <el-table-column label="操作" width="50" align="center">
              <template slot-scope="scope">
                <el-button-group v-if="scope.row.addState === '否'">
                  <el-button
                    type="warning"
                    size="mini"
                    icon="el-icon-check"
                    circle
                    @click="handleCloudGoodEditClick(scope.row.id)" />
                </el-button-group>
              </template>
            </el-table-column>>
          </el-table>
          <!--分页-->
          <div style="height:24px;"/>
          <el-pagination
            :current-page="searchCloudGood.page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="searchCloudGood.pageSize"
            :total="searchCloudGood.total"
            layout="total, sizes, prev, pager, next, jumper"
            style="text-align:center;"
            @size-change="handleCloudGoodSizeChange"
            @current-change="handleCloudGoodCurrentChange" />
        </div>
      </div>
    </el-tab-pane>

    <el-tab-pane v-if="isUpdGoods === 1" label="编辑商品" name="updGoods">
      <div class="goodsManage goodedibox">
        <el-form ref="updFormValidate" :rules="rules" :model="updForm" :inline="true" label-width="100px" >
          <el-form-item v-if="updForm.isYun !== 1" label="商品分类" class="goodshopAdd_list" prop="updCateId">
            <el-cascader
              v-model="updCateId"
              :options="options2"
              expand-trigger="hover"
              @change="handleUpdChange"/>
          </el-form-item>
          <el-form-item label="本店分类" class="goodshopAdd_list">
            <div v-for="(item, index) in updMyGcategory" :key="index" class="shopadd_list">
              <el-cascader
                :options="options"
                v-model="updMyGcategory[index].cateId"
                expand-trigger="hover"
                @change="handleUpdGcategoryChange2"/>
            </div>
            <el-button type="primary" round @click="addUpdGcategory">新增分类</el-button>
          </el-form-item>
          <h3 v-if="updForm.isYun !== 1" class="goodbaseInfo">商品基本信息</h3>
          <div v-if="updForm.isYun !== 1" class="shopgoodimg_left">
            <el-form-item class="shopgood_imgbox">
              <img :src="updLogo">
            </el-form-item>
            <el-form-item class="shopgood_img">
              <el-upload

                :show-file-list="false"
                :on-success="handleUpdAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :file-list="fileList2"
                :action="uploadUrl"
                list-type="picture-card">
                <span>上传商品图片</span>
              </el-upload>
            </el-form-item>
          </div>
          <div v-if="updForm.isYun !== 1" class="shopgood_input">
            <el-form-item label="商品名称" prop="goodsName">
              <el-input v-model="updForm.goodsName"/>
            </el-form-item>
            <el-form-item label="品牌">
              <el-input v-model="updForm.brand"/>
            </el-form-item>
            <el-form-item label="标签（TAG）">
              <el-input v-model="updForm.tags"/>
            </el-form-item>
            <div class="shopgoodGg">
              <el-form-item label="规格" style="margin-right:0;" />
              <el-form-item v-if="ifUpdSpec === true" class="shopbj_result">

                <el-form :model="updForm" :inline="true">
                  <el-row :gutter="10">
                    <el-col :span="4" align="center">
                      <el-form-item :label="updForm.specName1"/>
                    </el-col>
                    <el-col :span="4" align="center">
                      <el-form-item :label="updForm.specName2"/>
                    </el-col>
                    <el-col :span="4" align="center">
                      <el-form-item label="价格"/>
                    </el-col>
                    <el-col :span="4" align="center">
                      <el-form-item label="库存"/>
                    </el-col>
                    <el-col :span="8" align="center">
                      <el-form-item label="货号"/>
                    </el-col>
                  </el-row>
                  <el-row v-for="(item, index) in updForm.specArr" :key="index" :gutter="10">
                    <el-col v-if="updForm.specArr[index].optType !== 'del'" :span="4">
                      <el-input v-model="updForm.specArr[index].spec1" readonly/>
                    </el-col>
                    <el-col v-if="updForm.specArr[index].optType !== 'del'" :span="4">
                      <el-input v-model="updForm.specArr[index].spec2" readonly/>
                    </el-col>
                    <el-col v-if="updForm.specArr[index].optType !== 'del'" :span="4">
                      <el-input v-model="updForm.specArr[index].price" readonly/>
                    </el-col>
                    <el-col v-if="updForm.specArr[index].optType !== 'del'" :span="4">
                      <el-input v-model="updForm.specArr[index].stock" readonly/>
                    </el-col>
                    <el-col v-if="updForm.specArr[index].optType !== 'del'" :span="8">
                      <el-input v-model="updForm.specArr[index].sku" readonly/>
                    </el-col>
                  </el-row>
                </el-form>
                <div class="shopeditor_byns">
                  <el-button type="primary" round @click="openUpdSpecifications">编辑规格</el-button>
                </div>

              </el-form-item>

              <div v-if="ifUpdSpec === false" class="shopgoodGg_box">
                <el-button type="primary" round @click="openUpdSpecifications">开启规格</el-button>
                <p>您最多可以添加两种商品规格（如：颜色，尺码）如商品没有规格则不用添加</p>
              </div>
            </div>
            <el-form-item label="上架">
              <el-radio-group v-model="updForm.ifShow" @change="changeUpdIfShow">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="推荐">
              <el-radio-group v-model="updForm.recommended" @change="changeUpdRecommended">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <el-form-item v-if="updForm.isYun !== 1" label="商品描述" class="tanEditor">
            <quill-editor
              ref="myQuillEditor"
              v-model="updForm.description"
              :options="editorOption"
              style="border-bottom:1px solid #ddd;overflow:hidden;height:500px;"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveGoodsPartner(1, 'updFormValidate' ,updForm.isYun)">确 定</el-button>
        </div>
      </div>
    </el-tab-pane>
    <el-dialog :visible.sync="dialogUpdFormVisible" title="编辑商品规格" width="30%" class="goodeditor" style="text-align:left;">
      <el-form :model="form" :inline="true" >
        <el-row :gutter="10">
          <el-col :span="4">
            <el-input v-model="form.specName1"/>
          </el-col>
          <el-col :span="4">
            <el-input v-model="form.specName2"/>
          </el-col>
          <el-col :span="4" align="center">
            <el-form-item label="价格"/>
          </el-col>
          <el-col :span="4" align="center">
            <el-form-item label="库存"/>
          </el-col>
          <el-col :span="4" align="center">
            <el-form-item label="货号"/>
          </el-col>
          <el-col :span="4" align="center">
            <el-form-item label="操作"/>
          </el-col>
        </el-row>
        <el-row v-for="(item, index) in form.specArr" :key="index" :gutter="10">
          <el-col :span="4">
            <el-input v-model="form.specArr[index].spec1"/>
          </el-col>
          <el-col :span="4">
            <el-input v-model="form.specArr[index].spec2"/>
          </el-col>
          <el-col :span="4">
            <el-input v-model="form.specArr[index].price"/>
          </el-col>
          <el-col :span="4">
            <el-input v-model="form.specArr[index].stock"/>
          </el-col>
          <el-col :span="4">
            <el-input v-model="form.specArr[index].sku"/>
          </el-col>
          <el-col :span="4">
            <el-button v-if="index !== 0" @click="delRow(index)">X</el-button>
          </el-col>
        </el-row>
        <el-button type="primary" @click="addTr">添加一行</el-button>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSpecPartner()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogUpdFormVisible2" title="编辑商品规格" width="30%" class="goodeditor" style="text-align:left;">
      <el-form :model="updForm" :inline="true">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-input v-model="updForm.specName1"/>
          </el-col>
          <el-col :span="4">
            <el-input v-model="updForm.specName2"/>
          </el-col>
          <el-col :span="4">
            <el-form-item label="价格"/>
          </el-col>
          <el-col :span="4">
            <el-form-item label="库存"/>
          </el-col>
          <el-col :span="4">
            <el-form-item label="货号"/>
          </el-col>
          <el-col :span="4">
            <el-form-item label="操作"/>
          </el-col>
        </el-row>
        <el-row v-for="(item, index) in updForm.specArr" :key="index" :gutter="10">
          <el-col v-if="updForm.specArr[index].optType !== 'del'" :span="4">
            <el-input v-model="updForm.specArr[index].spec1"/>
          </el-col>
          <el-col v-if="updForm.specArr[index].optType !== 'del'" :span="4">
            <el-input v-model="updForm.specArr[index].spec2"/>
          </el-col>
          <el-col v-if="updForm.specArr[index].optType !== 'del'" :span="4">
            <el-input v-model="updForm.specArr[index].price"/>
          </el-col>
          <el-col v-if="updForm.specArr[index].optType !== 'del'" :span="4">
            <el-input v-model="updForm.specArr[index].stock"/>
          </el-col>
          <el-col v-if="updForm.specArr[index].optType !== 'del'" :span="4">
            <el-input v-model="updForm.specArr[index].sku"/>
          </el-col>
          <el-col v-if="updForm.specArr[index].optType !== 'del'" :span="4">
            <el-button v-if="index !== 0" @click="delUpdRow(index)">X</el-button>
          </el-col>
        </el-row>
        <el-button type="primary" @click="addUpdTr">添加一行</el-button>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="saveSpecPartner2()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogAddFormVisible" title="添加到商品" width="30%" style="text-align:left;">
      <el-form ref="addYunFormValidate" :rules="yunRules" :model="addYunForm" :inline="true">
        <el-form-item label="请选择商品分类：" class="goodshopAdd_list" prop="addCateId">
          <el-cascader
            v-model="addYunForm.addCateId"
            :options="options"
            expand-trigger="hover"
            @change="handleChange"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveYunPartner('addYunFormValidate')">确 定</el-button>
      </div>
    </el-dialog>
  </el-tabs>
</template>

<style>
/* @import "../../../static/css/element-ui.css"; */
@import 'quill/dist/quill.core.css';
@import 'quill/dist/quill.snow.css';
@import 'quill/dist/quill.bubble.css';

.height10{
  height:10px;
  background:#eee;
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
  .goodsManage{
    padding-top:20px;
    border-top:1px solid #eee;
    text-align:left;
  }
  .goodsForm{
    margin:20px 0;
    font-size:0;
  }
  .goodsForm label{
    display:inline-block;
    vertical-align:middle;
    font-size:14px;
  }
  .goodsForm select,.goodsForm input{
    margin-right:10px;
    width:165px;
    height:40px;
    line-height:40px;
    border:1px solid #ddd;
    color:#333;
    padding-left:10px;
    box-sizing:border-box;
  }
  .goodsForm .goodselectBtn{
    width:100px;
    text-align:center;
    border-radius:5px;
    background:#f45408;
    color:#fff;
    cursor:pointer;
    border:none;
  }
  .goodst_btn{
    margin-bottom:30px;
    font-size:0;
  }
  .goodst_btn a{
    display:inline-block;
    vertical-align:middle;
    font-size:14px;
    padding:0 30px;
    height:40px;
    line-height:40px;
    background:rgb(255, 225, 211);
    border:1px solid #f45408;
    color:#333;
    border-radius:5px;
    margin-right:10px;
  }
  .goodsAll{
    display:block;
    margin-bottom:10px;
    font-size:14px;
    color:#333;
  }
  .goodsAll label{
    padding-right:30px;
  }
  .goodsAll a{
    margin-left:10px;
    display:inline-block;
    vertical-align:middle;
    height:30px;
    line-height:30px;
    padding:0 20px;
    background:#ff854b;
    color:#fff;
    border-radius:5px;
  }
  .goodstable{
    width:100%;
    margin-top:20px;
    border-top:1px solid #ff854b;
  }
  .goodstable th{
    height:50px;
    font-size:14px;
    text-align:center;
  }
  .goodstable td{
    text-align:center;
    font-size:12px;
  }
  .goodstable_img,.goodstable_title{
    display:block;
  }
  .goodstable_img{
    margin:0 auto;
    width:100px;
    height:80px;
    overflow:hidden;
    border-radius:5px;
  }
  .goodstable_img img{
    width:100%;
    height:100%;
  }
  .goodstable_title{
    margin-top:8px;
    color:#666;
    font-size:12px;
    text-align:center;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .goodstable .goodsbtn{
    display:inline-block;
    vertical-align:middle;
    padding:5px 10px;
    margin:0 2px;
    border-radius:5px;
    background:rgb(255, 225, 211);
    border:1px solid #ff854b;
    color:#333;
  }
  .goodsForm02{
    text-align:right;
  }
  .goodsimg{
    display:block;
    width:80px;
    height:60px;
    overflow:hidden;
    margin:0 auto;
  }
  .goodsimg img{
    width:100%;
    height:100%;
  }
  .goodstable_list{
    width:80px;
    height:30px;
    line-height:30px;
    border-radius:5px;
    border:1px solid #ddd;
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
  .goodshopAdd .goodshopAdd_list,.goodedibox .goodshopAdd_list{
    display:block;
  }
  .shopadd_list{
    display:inline-block;
    vertical-align:middle;
    margin:2px 3px;
    width:130px;
  }
  .shopgoodimg_left,.shopgood_input{
    display:inline-block;
    vertical-align:top;
  }
  .shopgoodimg_left{
    width:285px;
  }
  .shopgood_input{
    width:530px;
    padding-left:30px;
    box-sizing:border-box;
  }
  .shopgood_imgbox{
    display:block;
    width:280px;
    height:280px;
    overflow:hidden;
  }
  .shopgood_imgbox img{
    width:280px;
    height:280px;
  }
  .goodbaseInfo{
    line-height:50px;
    font-size:14px;
    color:#333;
  }
  .shopgood_img .el-upload--picture-card{
    width:280px;
    height:40px;
    line-height:40px;
    text-align:center;
    font-size:14px;
    color:#333;
    border:1px solid #ff8514;
    background:rgb(255, 238, 218);
  }
  .goodGginput{
    width:300px;
  }
  .shopgoodGg_box{
    display:inline-block;
    vertical-align:top;
    width:350px;
    padding:10px;
    box-sizing:border-box;
    border:1px solid #ff7f35;
    text-align:center;
    margin-bottom:5px;
  }
  .shopgoodGg_box p{
    font-size:12px;
    color:#999;
    line-height:22px;
  }
  .goodeditor .el-form-item__label{
    padding:0;
  }
  .goodeditor .el-form-item{
    margin-right:0;
  }
  .goodeditor .el-input{
    margin-bottom:10px;
  }
  .shopgoodGg_box .el-button--primary{
    border:1px solid #f45408;
  }
  .shopbj_result{
    width:350px;
    border:1px solid #ff7f35;
    padding:10px;
    box-sizing:border-box;
  }
  .shopbj_result .el-form-item__label{
    padding:0;
  }
  .shopbj_result .el-form-item{
    margin-right:0;
  }
  .shopbj_result .el-input__inner{
    border:none;
    text-align:center;
    box-sizing:border-box;
    padding:0;
  }
  .shopbj_result button{
    margin:10px 0;
  }
  .shopeditor_byns{
    text-align:center;
  }
  .shopeditor_byns button{
    border:1px solid #f45408;
  }

</style>

<script>
import axios from 'axios'
// const goodsOptions = ['1']
import { quillEditor } from 'vue-quill-editor'
import { valid } from 'semver'

export default {
  name: 'GoodsManage',
  components: {
    quillEditor,
    valid
  },
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['image']
          ]
        },
        placeholder: '',
        theme: 'snow'
      },
      activeName: '0',
      /** 商品列表数据 */
      searchGoodGcategory: [],
      searchGood: {
        goodGroup: '',
        gcategory: '',
        goodStatus: '',
        goodName: '',
        paramCatalog: '',
        paramType: '',
        paramStatu: '',
        paramName: '',
        page: 1,
        pageSize: 10,
        total: 0
      },
      goodGroups: [

      ],
      goodStatuss: [

      ],
      goodList: [

      ],
      // 校验规则
      rules: {
        addCateId: [
          {
            type: 'array',
            required: true,
            message: '商品分类不能为空',
            trigger: 'change'
          }
        ],
        goodsName: [
          { required: true,
            message: '商品名称不能为空',
            trigger: 'blur'
          }
        ],
        goodsPrice: [
          { required: true,
            message: '商品价格不能为空',
            trigger: 'blur'
          }
        ]
      },
      yunRules: {
        addCateId: [
          {
            type: 'array',
            required: true,
            message: '商品分类不能为空',
            trigger: 'change'
          }
        ]
      },
      dialogUpdFormVisible: false,
      dialogUpdFormVisible2: false,
      dialogAddFormVisible: false,
      isAddGoods: 0,
      isUpdGoods: 0,
      trs_arr: [],
      addCateId: [],
      updCateId: [],
      addMyGcategory: [
        {
          cateId: '',
          optType: 'add'
        }
      ],
      updMyGcategory: [
        {
          id: '',
          cateId: [],
          optType: 'upd'
        }
      ],
      form: {
        cateId: 0,
        addCateId: [],
        goodsName: '',
        brand: '',
        tags: '',
        goodsPrice: '',
        stock: '',
        sku: '',
        ifShow: 1,
        recommended: 0,
        goodsPhoto: '',
        description: '',
        specName1: '',
        specName2: '',
        optType: 'add',
        specArr: [
          {
            spec1: '',
            spec2: '',
            price: '',
            stock: '',
            sku: '',
            optType: 'add',
            orderNum: ''
          },
          {
            spec1: '',
            spec2: '',
            price: '',
            stock: '',
            sku: '',
            optType: 'add',
            orderNum: ''
          }
        ],
        myGcategory: [
          {
            cateId: '',
            optType: 'add'
          }
        ]
      },
      ifSpec: false,
      ifUpdSpec: false,
      updForm: {
        id: 0,
        cateId: 0,
        goodsName: '',
        brand: '',
        tags: '',
        goodsPrice: '',
        stock: '',
        sku: '',
        ifShow: 1,
        recommended: 0,
        goodsPhoto: '',
        description: '',
        optType: 'upd',
        specArr: [
          {
            id: '',
            spec1: '',
            spec2: '',
            price: '',
            stock: '',
            sku: '',
            optType: 'upd',
            orderNum: ''
          },
          {
            id: '',
            spec1: '',
            spec2: '',
            price: '',
            stock: '',
            sku: '',
            optType: 'upd',
            orderNum: ''
          }
        ],
        myGcategory: [
          {
            id: '',
            cateId: '',
            optType: 'upd'
          }
        ]
      },
      updYunForm: {
        id: 0,
        optType: 'upd',
        myGcategory: [
          {
            id: '',
            cateId: '',
            optType: 'upd'
          }
        ]
      },
      logo: '',
      updLogo: '',
      /** 品牌列表数据 */
      searchBrand: {
        brandName: '',
        brandGroup: '',
        page: 1,
        pageSize: 10,
        total: 57
      },
      fileList2: [],
      brandGroups: [
        {
          value: 1,
          label: '全部品牌'
        },
        {
          value: 2,
          label: '我申请的'
        }
      ],
      brandList: [

      ],
      brandForm: {
        id: 0,
        brandName: '',
        tag: '',
        brandLogo: '',
        logo: ''
      },
      delParam: {
        ids: []
      },
      dialogBrandFormVisible: false,
      uploadUrl: '',
      fileShow: [],
      /** 云商品库数据 */
      addYunForm: {
        id: '',
        cateId: '',
        addCateId: []
      },
      searchCloudGood: {
        cateId2: '',
        page: 1,
        pageSize: 10,
        total: 0
      },
      cloudGcategory: [],
      cloudGood: {
        gcategory: []
      },
      cloudGoodList: [

      ],
      /** 公共数据 */
      options2: [

      ],
      options: [

      ],
      multipleSelection: []
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted() {
    this.uploadUrl = this.$Yjj.uploadStoreImgUrl.target
    this.getGoodsListByCurrent(this.$Yjj.getGoodsList.type, this.$Yjj.getGoodsList.target)
    this.getDictList(this.$Yjj.getDictList.type, this.$Yjj.getDictList.target)
    this.getMyGcategoryList(this.$Yjj.getMyGcategoryList.type, this.$Yjj.getMyGcategoryList.target)
    this.getGcategoryList(this.$Yjj.homeGcategory.type, this.$Yjj.homeGcategory.target)
    this.getBrandList(this.$Yjj.getBrandList.type, this.$Yjj.getBrandList.target, { page: this.searchBrand.page, pageSize: this.searchBrand.pageSize })
    this.getCloudGoodsList(this.$Yjj.getYunGoodsList.type, this.$Yjj.getYunGoodsList.target, { page: this.searchCloudGood.page, pageSize: this.searchCloudGood.pageSize })
  },
  methods: {
    /** 商品列表方法 */
    getGoodsListByCurrent: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target, this.searchGood).then(response => {
          this.goodList = response.data.data.dataList
          this.searchGood.total = response.data.data.total
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    getDictList: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.goodGroups = response.data.data.paramTypes
          this.goodStatuss = response.data.data.paramStatus
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    handleChange(value) {
    },
    getMyGcategoryList: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.options = response.data.data
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    getGcategoryList: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target, {}).then(response => {
          this.options2 = response.data.data
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    handleAvatarSuccess(res, file) {
      const i = JSON.parse(res)
      this.images = i.data
      this.logo = 'http://192.168.6.225:9091/ecssfile/' + this.images[0].filePath
      this.form.goodsPhoto = this.images[0].filePath
    },
    handleClick: function(tab, event) {
      if (tab.paneName === '0') {
        this.isAddGoods = 0
        this.isUpdGoods = 0
      }
    },
    addNewGoods: function() {
      this.addMyGcategory = [
        {
          cateId: '',
          optType: 'add'
        }
      ]
      this.form = {
        cateId: 0,
        addCateId: [],
        goodsName: '',
        brand: '',
        tags: '',
        goodsPrice: '',
        stock: '',
        sku: '',
        ifShow: 1,
        recommended: 0,
        goodsPhoto: '',
        description: '',
        specName1: '',
        specName2: '',
        optType: 'add',
        specArr: [
          {
            spec1: '',
            spec2: '',
            price: '',
            stock: '',
            sku: '',
            optType: 'add',
            orderNum: ''
          },
          {
            spec1: '',
            spec2: '',
            price: '',
            stock: '',
            sku: '',
            optType: 'add',
            orderNum: ''
          }
        ]
      }
      this.isAddGoods = 1
      this.activeName = 'addGoods'
    },
    searchGoods: function() {
      this.searchGood.gcategory = this.searchGoodGcategory
      this.getGoodsListByCurrent(this.$Yjj.getGoodsList.type, this.$Yjj.getGoodsList.target)
    },
    handleGcategoryChange: function(val) {
      this.searchGood.paramCatalog = val[val.length - 1]
    },
    handleGcategoryChange2: function(val) {
      this.form.gcategory = val[val.length - 1]
    },
    handleUpdGcategoryChange2: function(val) {
      this.updForm.gcategory = val[val.length - 1]
    },
    handleSearchGoodStatusChange: function(val) {
      this.searchGood.paramStatu = val
    },
    handleSearchGoodGroupChange: function(val) {
      this.searchGood.paramType = val
    },
    changeIfShow: function(value) {
      this.form.ifShow = value
    },
    changeRecommended: function(value) {
      this.form.recommended = value
    },
    handleGoodTableSelectionChange: function(val) {
      this.delParam.ids.length = 0
      if (val !== '' && val.length > 0) {
        for (var i = 0; i < val.length; i++) {
          this.delParam.ids.push(val[i].id)
        }
      }
    },
    handleGoodTableEditClick: function(val) {
      this.updMyGcategory = [
        {
          id: '',
          cateId: [],
          optType: 'upd'
        }
      ]
      this.updForm = {
        id: 0,
        cateId: 0,
        goodsName: '',
        brand: '',
        tags: '',
        goodsPrice: '',
        stock: '',
        sku: '',
        ifShow: 1,
        recommended: 0,
        goodsPhoto: '',
        description: '',
        optType: 'upd',
        specArr: [
          {
            id: '',
            spec1: '',
            spec2: '',
            price: '',
            stock: '',
            sku: '',
            optType: 'upd',
            orderNum: ''
          },
          {
            id: '',
            spec1: '',
            spec2: '',
            price: '',
            stock: '',
            sku: '',
            optType: 'upd',
            rderNum: ''
          }
        ],
        myGcategory: [
          {
            id: '',
            cateId: '',
            optType: 'upd'
          }
        ]
      }
      this.isUpdGoods = 1
      this.activeName = 'updGoods'
      const type = this.$Yjj.getGoodsById.type
      const target = this.$Yjj.getGoodsById.target + '?id=' + val
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.updForm = response.data.data
          this.updCateId = response.data.data.cateIds
          this.updLogo = response.data.data.previewFix + response.data.data.goodsPhoto
          this.updForm.id = val
          if (response.data.data.specArr.length > 0) {
            this.ifUpdSpec = true
          } else {
            this.ifUpdSpec = false
            this.updForm.goodsPrice = response.data.data.specArr[0].price
            this.updForm.stock = response.data.data.specArr[0].stock
            this.updForm.sku = response.data.data.specArr[0].sku
            this.updForm.specArr = [
              {
                spec1: '',
                spec2: '',
                price: '',
                stock: '',
                sku: '',
                optType: 'upd',
                orderNum: ''
              },
              {
                spec1: '',
                spec2: '',
                price: '',
                stock: '',
                sku: '',
                optType: 'upd',
                orderNum: ''
              }
            ]
          }
          this.updMyGcategory = response.data.data.myCateIds
          if (response.data.data.myCateIds.length > 0) {
            for (var j = 0; j < response.data.data.myCateIds.length; j++) {
              this.updMyGcategory[j].cateId = response.data.data.myCateIds[j].cateIds
            }
          } else {
            this.updMyGcategory = [
              {
                cateId: [],
                optType: 'add'
              }
            ]
          }

          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    handleUpdAvatarSuccess(res, file) {
      const i = JSON.parse(res)
      this.images = i.data
      this.updLogo = 'http://192.168.6.225:9091/ecssfile/' + this.images[0].filePath
      this.updForm.goodsPhoto = this.images[0].filePath
    },
    handleGoodTableDeleteClick: function(val) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // 确认按钮按下
        const type = this.$Yjj.delGoodsById.type
        const target = this.$Yjj.delGoodsById.target + '?id=' + val
        return new Promise((resolve, reject) => {
          axios[type](target).then(response => {
            // 刷新列表
            this.getGoodsListByCurrent(this.$Yjj.getGoodsList.type, this.$Yjj.getGoodsList.target)
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
    delGoods: function() {
      if (this.delParam.ids.length < 1) {
        this.$message({
          type: 'info',
          message: '请选择要删除的数据！'
        })
      } else {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          // 确认按钮按下
          const type = this.$Yjj.delAllCheckGoods.type
          const target = this.$Yjj.delAllCheckGoods.target
          return new Promise((resolve, reject) => {
            axios[type](target, this.delParam).then(response => {
              // 刷新列表
              this.getGoodsListByCurrent(this.$Yjj.getGoodsList.type, this.$Yjj.getGoodsList.target)
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
    handleGoodTableSizeChange: function(val) {
    },
    handleGoodTableCurrentChange: function(val) {
      this.searchGood.page = val
      this.getGoodsListByCurrent(this.$Yjj.getGoodsList.type, this.$Yjj.getGoodsList.target)
    },
    openSpecifications: function() {
      this.form.specName1 = '颜色'
      this.form.specName2 = '尺寸'
      if (this.form.specArr.length < 2) {
        this.form.specArr.length = 2
      }
      this.dialogUpdFormVisible = true
    },
    openUpdSpecifications: function() {
      this.dialogUpdFormVisible2 = true
    },
    closeSpecifications: function() {
      this.dialogUpdFormVisible = false
      this.ifSpec = false
      this.form.specName1 = ''
      this.form.specName2 = ''
      this.form.specArr = [
        {
          spec1: '',
          spec2: '',
          price: '',
          stock: '',
          sku: '',
          optType: 'add',
          orderNum: ''
        },
        {
          spec1: '',
          spec2: '',
          price: '',
          stock: '',
          sku: '',
          optType: 'add',
          orderNum: ''
        }
      ]
    },
    closeUpdSpecifications: function() {
      this.dialogUpdFormVisible2 = false
      this.ifUpdSpec = false
      this.updForm.goodsPrice = this.updForm.specArr[0].price
      this.updForm.stock = this.updForm.specArr[0].stock
      this.updForm.sku = this.updForm.specArr[0].sku
      this.updForm.specName1 = ''
      this.updForm.specName2 = ''
      this.updForm.specArr = [
        {
          spec1: '',
          spec2: '',
          price: '',
          stock: '',
          sku: '',
          optType: 'upd',
          orderNum: ''
        },
        {
          spec1: '',
          spec2: '',
          price: '',
          stock: '',
          sku: '',
          optType: 'upd',
          orderNum: ''
        }
      ]
    },
    addGcategory: function() {
      this.addMyGcategory.push({ cateId: '', optType: 'add' })
      this.form.myGcategory.push({ cateId: '', optType: 'add' })
    },
    addUpdGcategory: function() {
      this.updMyGcategory.push({ cateId: '', optType: 'add' })
      this.updForm.myGcategory.push({ cateId: '', optType: 'add' })
    },
    addTr: function() {
      this.form.specArr.push({ spec1: '', spec2: '', price: '', stock: '', sku: '', optType: 'add' })
    },
    addUpdTr: function() {
      this.updForm.specArr.push({ spec1: '', spec2: '', price: '', stock: '', sku: '', optType: 'add' })
    },
    delRow: function(val) {
      this.form.specArr.splice(val, 1)
    },
    topRow: function(val) {
      this.form.specArr.splice(0, 0, this.form.specArr[val])
      this.form.specArr.splice(val + 1, 1)
    },
    downRow: function(val) {
      this.form.specArr.splice(this.form.specArr.length + 1, 0, this.form.specArr[val])
      this.form.specArr.splice(val, 1)
    },
    delUpdRow: function(val) {
      if (this.updForm.specArr[val].id > 0) {
        this.updForm.specArr[val].optType = 'del'
      } else {
        this.updForm.specArr.splice(val, 1)
      }
    },
    topUpdRow: function(val) {
      this.updForm.specArr.splice(0, 0, this.updForm.specArr[val])
      this.updForm.specArr.splice(val + 1, 1)
    },
    downUpdRow: function(val) {
      this.updForm.specArr.splice(this.updForm.specArr.length + 1, 0, this.updForm.specArr[val])
      this.updForm.specArr.splice(val, 1)
    },
    saveSpecPartner: function() {
      if (this.form.specArr[0].spec1 === '' || this.form.specArr[0].spec1 === null || this.form.specArr[0].spec2 === '' || this.form.specArr[0].spec2 === null) {
        this.$message({
          type: 'error',
          message: '请正确填写规格!'
        })
        return false
      } else if (this.form.specArr[0].price === '' || this.form.specArr[0].price === null) {
        this.$message({
          type: 'error',
          message: '请填写价格!'
        })
        return false
      }
      this.dialogUpdFormVisible = false
      this.ifSpec = true
    },
    saveSpecPartner2: function() {
      if (this.updForm.specArr[0].spec1 === '' || this.updForm.specArr[0].spec1 === null || this.updForm.specArr[0].spec2 === '' || this.updForm.specArr[0].spec2 === null) {
        this.$message({
          type: 'error',
          message: '请正确填写规格!'
        })
        return false
      } else if (this.updForm.specArr[0].price === '' || this.updForm.specArr[0].price === null) {
        this.$message({
          type: 'error',
          message: '请填写价格!'
        })
        return false
      }
      if (this.updForm.specArr !== null && this.updForm.specArr.length > 0) {
        for (var i = 0; i < this.updForm.specArr.length; i++) {
          this.updForm.specArr[i].orderNum = i
        }
      }
      this.dialogUpdFormVisible2 = false
      this.ifUpdSpec = true
    },
    saveGoodsPartner: function(val, formName, isYun) {
      if (val === 0) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var cateIds = this.form.addCateId.map(Number)
            this.form.cateId = cateIds[cateIds.length - 1]
            if (this.addMyGcategory.length > 0) {
              this.form.myGcategory = this.addMyGcategory
              for (var k = 0; k < this.addMyGcategory.length; k++) {
                if (this.addMyGcategory[k].cateId !== '' && this.addMyGcategory[k].cateId !== null) {
                  var myCateIds = this.addMyGcategory[k].cateId.map(Number)
                  this.form.myGcategory[k].cateId = myCateIds[myCateIds.length - 1]
                } else {
                  this.addMyGcategory.length--
                }
              }
            }
            if (this.ifSpec === false) {
              this.$message({
                type: 'error',
                message: '请填写规格!'
              })
              if (this.addMyGcategory.length === 0) {
                this.addMyGcategory = [
                  {
                    cateId: '',
                    optType: 'add'
                  }
                ]
              }
              return false
            } else {
              if (this.form.specArr[0].spec1 === '' || this.form.specArr[0].spec1 === null || this.form.specArr[0].spec2 === '' || this.form.specArr[0].spec2 === null) {
                this.$message({
                  type: 'error',
                  message: '请正确填写规格!'
                })
                if (this.addMyGcategory.length === 0) {
                  this.addMyGcategory = [
                    {
                      cateId: '',
                      optType: 'add'
                    }
                  ]
                }
                return false
              } else if (this.form.specArr[0].price === '' || this.form.specArr[0].price === null) {
                this.$message({
                  type: 'error',
                  message: '请填写价格!'
                })
                if (this.addMyGcategory.length === 0) {
                  this.addMyGcategory = [
                    {
                      cateId: '',
                      optType: 'add'
                    }
                  ]
                }
                return false
              }
            }
            this.form.goodsPrice = this.form.specArr[0].price
            const type = this.$Yjj.addGoods.type
            const target = this.$Yjj.addGoods.target
            return new Promise((resolve, reject) => {
              axios[type](target, this.form).then(response => {
                const code = response.data.code
                if (code === '2000') {
                  // 刷新列表
                  this.$message({
                    type: 'success',
                    message: '添加成功!'
                  })
                  if (this.addMyGcategory.length === 0) {
                    this.addMyGcategory = [
                      {
                        cateId: '',
                        optType: 'add'
                      }
                    ]
                  }
                  this.searchGood = {
                    goodGroup: '',
                    gcategory: '',
                    goodStatus: '',
                    goodName: '',
                    paramCatalog: '',
                    paramType: '',
                    paramStatu: '',
                    paramName: '',
                    page: 1,
                    pageSize: 10,
                    total: 0
                  }
                  this.getGoodsListByCurrent(this.$Yjj.getGoodsList.type, this.$Yjj.getGoodsList.target)
                  this.isAddGoods = 0
                  this.activeName = '0'
                  this.tab.paneName === '0'
                  resolve(response.data)
                } else {
                  this.$message({
                    type: 'error',
                    message: '添加失败!'
                  })
                  if (this.addMyGcategory.length === 0) {
                    this.addMyGcategory = [
                      {
                        cateId: '',
                        optType: 'add'
                      }
                    ]
                  }
                }
              }).catch(error => {
                reject(error.response.data.errors)
              })
            })
          } else {
            this.$message({
              type: 'error',
              message: '请按照要求填写！'
            })
            if (this.addMyGcategory.length === 0) {
              this.addMyGcategory = [
                {
                  cateId: '',
                  optType: 'add'
                }
              ]
            }
          }
        })
      } else if (isYun !== 1) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updForm.optType = 'upd'
            if (this.updForm.specArr.length > 0) {
              for (var i = 0; i < this.updForm.specArr.length; i++) {
                if (this.updForm.specArr[i].id !== '' && this.updForm.specArr[i].id > 0) {
                  if (this.updForm.specArr[i].optType === '' || this.updForm.specArr[i].optType === null) {
                    this.updForm.specArr[i].optType = 'upd'
                  }
                } else {
                  this.updForm.specArr[i].optType = 'add'
                }
                delete this.updForm.specArr[i].createdTime
                delete this.updForm.specArr[i].updatedTime
              }
            }
            if (this.updMyGcategory.length > 0) {
              this.updForm.myGcategory = this.updMyGcategory
              for (var j = 0; j < this.updMyGcategory.length; j++) {
                if (this.updMyGcategory[j].cateId !== '' && this.updMyGcategory[j].cateId !== null) {
                  var updMyCateIds = this.updMyGcategory[j].cateId.map(Number)
                  this.updForm.myGcategory[j].cateId = updMyCateIds[updMyCateIds.length - 1]
                  if (this.updMyGcategory[j].id !== '' && this.updMyGcategory[j].id > 0) {
                    this.updForm.myGcategory[j].optType = 'upd'
                  } else {
                    this.updForm.myGcategory[j].optType = 'add'
                  }
                } else {
                  this.updMyGcategory.length--
                }
              }
            }
            var updCateIds = this.updCateId.map(Number)
            this.updForm.cateId = updCateIds[updCateIds.length - 1]
            this.updForm.goodsPrice = this.updForm.specArr[0].price
            const type = this.$Yjj.addGoods.type
            const target = this.$Yjj.addGoods.target
            return new Promise((resolve, reject) => {
              axios[type](target, this.updForm).then(response => {
                const code = response.data.code
                if (code === '2000') {
                  // 刷新列表
                  this.$message({
                    type: 'success',
                    message: '修改成功!'
                  })
                  this.searchGood = {
                    goodGroup: '',
                    gcategory: '',
                    goodStatus: '',
                    goodName: '',
                    paramCatalog: '',
                    paramType: '',
                    paramStatu: '',
                    paramName: '',
                    page: 1,
                    pageSize: 10,
                    total: 0
                  }
                  this.getGoodsListByCurrent(this.$Yjj.getGoodsList.type, this.$Yjj.getGoodsList.target)
                  this.isUpdGoods = 0
                  this.activeName = '0'
                  this.tab.paneName === '0'
                  resolve(response.data)
                } else {
                  this.$message({
                    type: 'error',
                    message: '修改失败!'
                  })
                }
              }).catch(error => {
                reject(error.response.data.errors)
              })
            })
          } else {
            this.$message({
              type: 'error',
              message: '请按照要求填写！'
            })
          }
        })
      } else {
        this.updYunForm.id = this.updForm.id
        if (this.updMyGcategory.length > 0) {
          this.updForm.myGcategory = this.updMyGcategory
          for (var j = 0; j < this.updMyGcategory.length; j++) {
            if (this.updMyGcategory[j].cateId !== '' && this.updMyGcategory[j].cateId !== null) {
              var updMyCateIds = this.updMyGcategory[j].cateId.map(Number)
              this.updForm.myGcategory[j].cateId = updMyCateIds[updMyCateIds.length - 1]
              if (this.updMyGcategory[j].id !== '' && this.updMyGcategory[j].id > 0) {
                this.updForm.myGcategory[j].optType = 'upd'
              } else {
                this.updForm.myGcategory[j].optType = 'add'
              }
            } else {
              this.updMyGcategory.length--
            }
          }
        }
        this.updYunForm.myGcategory = this.updForm.myGcategory
        const type = this.$Yjj.addGoods.type
        const target = this.$Yjj.addGoods.target
        return new Promise((resolve, reject) => {
          axios[type](target, this.updYunForm).then(response => {
            const code = response.data.code
            if (code === '2000') {
              // 刷新列表
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              this.searchGood = {
                goodGroup: '',
                gcategory: '',
                goodStatus: '',
                goodName: '',
                paramCatalog: '',
                paramType: '',
                paramStatu: '',
                paramName: '',
                page: 1,
                pageSize: 10,
                total: 0
              }
              this.getGoodsListByCurrent(this.$Yjj.getGoodsList.type, this.$Yjj.getGoodsList.target)
              this.isUpdGoods = 0
              this.activeName = '0'
              this.tab.paneName === '0'
              this.updYunForm = {
                id: 0,
                optType: 'upd',
                myGcategory: [
                  {
                    id: '',
                    cateId: '',
                    optType: 'upd'
                  }
                ]
              }
              resolve(response.data)
            } else {
              this.$message({
                type: 'error',
                message: '修改失败!'
              })
            }
          }).catch(error => {
            reject(error.response.data.errors)
          })
        })
      }
    },
    /** 品牌列表方法 */
    handleBrandTableSelectionChange: function(val) {

    },
    searchBrands: function() {
      if (this.searchBrand.brandName !== '' && this.searchBrand.brandName !== null) {
        this.getBrandList(this.$Yjj.getBrandList.type, this.$Yjj.getBrandList.target, { page: this.searchBrand.page, pageSize: this.searchBrand.pageSize, brandName: this.searchBrand.brandName, brandGroup: this.searchBrand.brandGroup })
      } else {
        this.getBrandList(this.$Yjj.getBrandList.type, this.$Yjj.getBrandList.target, { page: this.searchBrand.page, pageSize: this.searchBrand.pageSize, brandGroup: this.searchBrand.brandGroup })
      }
    },
    handleBrandTableEditClick: function(val) {
      if (val === 0) {
        for (const key in this.brandForm) {
          delete this.brandForm[key]
        }
        this.fileShow = []
        this.brandForm.type = 'add'
        this.dialogBrandFormVisible = true
      } else {
        this.fileShow = []
        this.brandForm.id = val
        const type = this.$Yjj.getBrandById.type
        const target = this.$Yjj.getBrandById.target + '?id=' + val
        return new Promise((resolve, reject) => {
          axios[type](target).then(response => {
            this.brandForm = response.data.data
            this.brandForm.type = 'upd'
            this.fileShow = [{ name: '', url: this.brandForm.logo }]
            this.dialogBrandFormVisible = true
          }).catch(error => {
            reject(error.response.data.errors)
          })
        })
      }
    },
    handleBrandTableDeleteClick: function(val) {

    },
    handleBrandTableSizeChange: function(val) {

    },
    handleBrandTableCurrentChange: function(val) {
      this.searchBrand.page = val
      this.getBrandList(this.$Yjj.getBrandList.type, this.$Yjj.getBrandList.target, { page: this.searchBrand.page, pageSize: this.searchBrand.pageSize })
    },
    getBrandList: function(type, target, data) {
      return new Promise((resolve, reject) => {
        axios[type](target, data).then(response => {
          this.brandList = response.data.data.dataList
          this.searchBrand.total = response.data.data.total
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    // 上传图片回调
    uploadAfter: function(response, file, fileList) {
      const result = JSON.parse(response)
      if (result.code === 1) {
        this.brandForm.brandLogo = result.data[0].filePath
      } else {
        alert('上传失败')
      }
    },
    // 添加或修改品牌申请
    saveBrandPartner: function() {
      const type = this.brandForm.type
      // 添加的情况
      if (type === 'add') {
        const type = this.$Yjj.addMyBrand.type
        const target = this.$Yjj.addMyBrand.target
        return new Promise((resolve, reject) => {
          axios[type](target, this.brandForm).then(response => {
            const code = response.data.code
            this.dialogBrandFormVisible = false
            if (code === '2000') {
              // 刷新列表
              this.getBrandList(this.$Yjj.getBrandList.type, this.$Yjj.getBrandList.target, { page: this.searchBrand.page, pageSize: this.searchBrand.pageSize })
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              resolve(response.data)
            } else {
              this.$message({
                type: 'error',
                message: '添加失败!'
              })
            }
          }).catch(error => {
            reject(error.response.data.errors)
          })
        })
      } else {
        // 修改的情况
        const type = this.$Yjj.updBrandById.type
        const target = this.$Yjj.updBrandById.target
        return new Promise((resolve, reject) => {
          axios[type](target, this.brandForm).then(response => {
            const code = response.data.code
            this.dialogBrandFormVisible = false
            if (code === '2000') {
              // 刷新列表
              this.getBrandList(this.$Yjj.getBrandList.type, this.$Yjj.getBrandList.target, { page: this.searchBrand.page, pageSize: this.searchBrand.pageSize })
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              resolve(response.data)
            } else {
              this.$message({
                type: 'error',
                message: '修改失败!'
              })
            }
          }).catch(error => {
            reject(error.response.data.errors)
          })
        })
      }
    },
    /** 云商品库方法 */
    getCloudGoodsList: function(type, target, data) {
      return new Promise((resolve, reject) => {
        axios[type](target, data).then(response => {
          this.cloudGoodList = response.data.data.dataList
          this.searchCloudGood.total = response.data.data.total
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    schCloudGoodsByCateId: function() {
      if (this.cloudGcategory !== '') {
        var cateIds = this.cloudGcategory.map(Number)
        this.searchCloudGood.cateId2 = cateIds[cateIds.length - 1]
        this.getCloudGoodsList(this.$Yjj.getYunGoodsList.type, this.$Yjj.getYunGoodsList.target, { page: this.searchCloudGood.page, pageSize: this.searchCloudGood.pageSize, cateId2: this.searchCloudGood.cateId2 })
      } else {
        this.getCloudGoodsList(this.$Yjj.getYunGoodsList.type, this.$Yjj.getYunGoodsList.target, { page: this.searchCloudGood.page, pageSize: this.searchCloudGood.pageSize })
      }
    },
    handleCloudGcategoryChange: function(val) {

    },
    handleCloudGoodTableSelectionChange: function(val) {

    },
    clearValidate: function(formName) {
      this.$refs[formName].clearValidate()
    },
    handleCloudGoodEditClick: function(val) {
      // this.clearValidate('addYunFormValidate')
      this.dialogAddFormVisible = true
      this.addYunForm.id = val
      this.addYunForm.addCateId = []
    },
    saveYunPartner: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.savePartner()
        } else {
          return false
        }
      })
    },
    savePartner: function() {
      var cateIds = this.addYunForm.addCateId.map(Number)
      this.addYunForm.cateId = cateIds[cateIds.length - 1]
      const type = this.$Yjj.addCloudGoods.type
      const target = this.$Yjj.addCloudGoods.target + '?id=' + this.addYunForm.id + '&cateId=' + this.addYunForm.cateId
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.dialogFormVisible = false
          const code = response.data.code
          if (code === '2000') {
            // 刷新列表
            this.dialogAddFormVisible = false
            this.getCloudGoodsList(this.$Yjj.getYunGoodsList.type, this.$Yjj.getYunGoodsList.target, { page: this.searchCloudGood.page, pageSize: this.searchCloudGood.pageSize })
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            resolve(response.data)
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
    handleCloudGoodDeleteClick: function(val) {

    },
    handleCloudGoodSizeChange: function(val) {

    },
    handleCloudGoodCurrentChange: function(val) {
      this.searchCloudGood.page = val
      this.getCloudGoodsList(this.$Yjj.getYunGoodsList.type, this.$Yjj.getYunGoodsList.target, { page: this.searchCloudGood.page, pageSize: this.searchCloudGood.pageSize })
    },
    handleCloudGoodTableGcategoryChange: function(val) {

    },
    /** 公用方法 */
    handleIsShowClick: function(val) {
      var ifShow = val.ifShow
      var id = val.id
      if (ifShow === 0) {
        val.ifShow = 1
      }
      if (ifShow === 1) {
        val.ifShow = 0
      }
      var updParam = {
        id: id,
        ifShow: val.ifShow
      }
      const type = this.$Yjj.updGoodsById.type
      const target = this.$Yjj.updGoodsById.target
      return new Promise((resolve, reject) => {
        axios[type](target, updParam).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    handleIsRecommendClick: function(val) {
      var recommended = val.recommended
      var id = val.id
      if (recommended === 0) {
        val.recommended = 1
      }
      if (recommended === 1) {
        val.recommended = 0
      }
      var updParam = {
        id: id,
        recommended: val.recommended
      }
      const type = this.$Yjj.updGoodsById.type
      const target = this.$Yjj.updGoodsById.target
      return new Promise((resolve, reject) => {
        axios[type](target, updParam).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    }
  }
}

</script>
