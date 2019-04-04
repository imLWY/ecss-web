<template>
  <el-tabs type="border-card">
    <el-tab-pane label="申请开店">
      <div v-if="isSeller === 2">
        店铺开通中，请联系客服人员。
      </div>
      <div v-if="isSeller === 0" class="store_regist_title">
        <el-form ref="storeRegistForm" :model="registForm" :inline="true" :rules="rules" label-width="120px" style="margin-top:35px;width:100%;text-align:left;">
          <el-form-item label="店主姓名：" prop="ownerName">
            <el-input v-model="registForm.ownerName"/>
          </el-form-item>
          <el-form-item label="身份证号：" prop="ownerCard">
            <el-input v-model="registForm.ownerCard"/>
          </el-form-item>
          <el-form-item label="店铺名称：" prop="storeName">
            <el-input v-model="registForm.storeName" />
          </el-form-item>
          <el-form-item label="所属分类：" prop="scategory">
            <el-cascader
              v-model="registForm.scategory"
              :options="categories"
              :props="categoriesProps"
              expand-trigger="hover"
              filterable
              placeholder="搜索分类"
              style="vertical-align:middle;width:202px;"
              clearable
              @change="handleCategoryChange"/>
          </el-form-item>
          <el-form-item label="所在地区：" prop="regions">
            <el-cascader
              v-model="registForm.regions"
              :options="regions"
              :props="regionsProps"
              expand-trigger="hover"
              filterable
              placeholder="搜索地区"
              style="vertical-align:middle;width:202px;"
              clearable
              @change="handleRegionChange"/>
          </el-form-item>
          <el-form-item label="详细地址：" prop="address">
            <el-input v-model="registForm.address" />
          </el-form-item>
          <el-form-item label="邮政编码：" prop="zipcode">
            <el-input v-model="registForm.zipcode" />
          </el-form-item>
          <el-form-item label="联系电话：" prop="tel">
            <el-input v-model="registForm.tel" />
          </el-form-item>
          <el-form-item label="上传证件：" style="width:100%;" prop="image2">
            <el-upload
              :on-change="handleUploadIdentityImgChange"
              :file-list="identityImages"
              :limit="2"
              :on-preview="handleUploadIdentityImgPreview"
              :on-remove="handleUploadIdentityImgRemove"
              :on-success="handleUploadIdentityImgSuccess"
              :action="uploadStoreImgPath"
              list-type="picture-card"
              multiple>
              <i class="el-icon-plus" />
            </el-upload>
            <el-input v-model="registForm.image1" style="display:none;" />
            <el-input v-model="registForm.image2" style="display:none;" />
          </el-form-item>
          <el-form-item label="上传执照：" style="width:100%;" prop="image3">
            <el-upload
              :on-change="handleUploadLicenseImgChange"
              :file-list="licenseImages"
              :limit="1"
              :on-preview="handleUploadLicenseImgPreview"
              :on-remove="handleUploadLicenseImgRemove"
              :on-success="handleUploadLicenseImgSuccess"
              :action="uploadStoreImgPath"
              list-type="picture-card"
              multiple>
              <!-- <el-button size="small" type="primary">点击上传</el-button> -->
              <i class="el-icon-plus" />
            </el-upload>
            <el-input v-model="registForm.image3" style="display:none;" />
          </el-form-item>
          <el-form-item label=" " prop="isAgree">
            <el-checkbox-group v-model="registForm.isAgree" @change="handleProtocolCheck">
              <el-checkbox label="1" name="isAgree">
                我已认真阅读并完全同意<span style="color:#f45408;"><a href="javascript:void(0);" @click="gotoStoreProtocol">开店协议</a></span>中的所有条款
              </el-checkbox>
            </el-checkbox-group>
            <!-- <el-checkbox v-model="registForm.isAgree" name="isAgree">
              我已认真阅读并完全同意<span style="color:#f45408;"><a href="javascript:void(0);" @click="gotoStoreProtocol">开店协议</a></span>中的所有条款
            </el-checkbox> -->
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="submit('storeRegistForm')">立即开店</el-button>
        <el-dialog :visible.sync="imgPreviewDialogVisible">
          <img :src="imgPreviewDialogUrl" alt="" width="100%" >
        </el-dialog>
        <el-dialog
          :visible.sync="protocolDialogVisible"
          :show-close="false"
          height="45%"
          width="60%">
          <div style="padding:3px;border:1px solid #dcdcdc;">
            <div style="padding:20px;">
              <h1 style="font-size:16px;color:#3d3f3e;text-align:center;">开店协议</h1>
              <h2 style="color:#9a9a9a;font-size:12px;padding:5px 0 20px;margin-bottom:20px;font-weight:normal;text-align:center;border-bottom:1px solid #d2d2d2;">2009-04-19 22:34</h2>
              <p style="text-align:left;font-size:12px;color:#666666;margin:16px 0;">
                使用本公司服务所须遵守的条款和条件。
                <br>
                <br>
                1.用户资格
                <br>
                本公司的服务仅向适用法律下能够签订具有法律约束力的合同的个人提供并仅由其使用。在不限制前述规定的前提下，本公司的服务不向18周岁以下或被临时或无限期中止的用户提供。如您不合资格，请勿使用本公司的服务。此外，您的帐户（包括信用评价）和用户名不得向其他方转让或出售。另外，本公司保留根据其意愿中止或终止您的帐户的权利。
                <br>
                <br>
                2.您的资料（包括但不限于所添加的任何商品）不得：
                <br>
                *具有欺诈性、虚假、不准确或具误导性；
                <br>
                *侵犯任何第三方著作权、专利权、商标权、商业秘密或其他专有权利或发表权或隐私权；
                <br>
                *违反任何适用的法律或法规（包括但不限于有关出口管制、消费者保护、不正当竞争、刑法、反歧视或贸易惯例/公平贸易法律的法律或法规）；
                <br>
                *有侮辱或者诽谤他人，侵害他人合法权益的内容；
                <br>
                *有淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的内容；
                <br>
                *包含可能破坏、改变、删除、不利影响、秘密截取、未经授权而接触或征用任何系统、数据或个人资料的任何病毒、特洛依木马、蠕虫、定时炸弹、删除蝇、复活节彩蛋、间谍软件或其他电脑程序；
                <br>
                <br>
                3.违约
                <br>
                如发生以下情形，本公司可能限制您的活动、立即删除您的商品、向本公司社区发出有关您的行为的警告、发出警告通知、暂时中止、无限期地中止或终止您的用户资格及拒绝向您提供服务：
                <br>
                (a)您违反本协议或纳入本协议的文件；
                <br>
                (b)本公司无法核证或验证您向本公司提供的任何资料；
                <br>
                (c)本公司相信您的行为可能对您、本公司用户或本公司造成损失或法律责任。
                <br>
                <br>
                4.责任限制
                <br>
                本公司、本公司的关联公司和相关实体或本公司的供应商在任何情况下均不就因本公司的网站、本公司的服务或本协议而产生或与之有关的利润损失或任何特别、间接或后果性的损害（无论以何种方式产生，包括疏忽）承担任何责任。您同意您就您自身行为之合法性单独承担责任。您同意，本公司和本公司的所有关联公司和相关实体对本公司用户的行为的合法性及产生的任何结果不承担责任。
                <br>
                <br>
                5.无代理关系
                <br>
                用户和本公司是独立的合同方，本协议无意建立也没有创立任何代理、合伙、合营、雇员与雇主或特许经营关系。本公司也不对任何用户及其网上交易行为做出明示或默许的推荐、承诺或担保。
                <br>
                <br>
                6.一般规定
                <br>
                本协议在所有方面均受中华人民共和国法律管辖。本协议的规定是可分割的，如本协议任何规定被裁定为无效或不可执行，该规定可被删除而其余条款应予以执行。
              </p>
              <span slot="footer" class="dialog-footer">
                <el-button @click="disagreeStoreProtocol">取消</el-button>
                <el-button type="danger" @click="agreeStoreProtocol">同意</el-button>
              </span>
            </div>
          </div>
        </el-dialog>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<style>
/* @import '../../../static/css/element-ui.css'; */

.store_regist_title {
  width: 100%;
  border-top: 1px solid #eeeeee;
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

</style>

<script>
import axios from 'axios'

export default {
  name: 'StoreRegist',
  data() {
    return {
      isSeller: parseInt(this.$store.state.isSeller),
      registForm: {
        userId: this.$store.state.userId,
        ownerName: '',
        ownerCard: '',
        storeName: '',
        scategory: [],
        scategoryId: 0,
        category: 0,
        regions: [],
        regionId: 0,
        address: '',
        zipcode: '',
        sgrade: 2,
        tel: '',
        state: 2,
        isAgree: null,
        image1: '', // 身份证正面
        image2: '', // 身份证反面
        image3: '' // 营业执照
      },
      categories: [],
      regions: [],
      categoriesProps: {
        value: 'id',
        label: 'cateName',
        children: 'children'
      },
      regionsProps: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      rules: {
        ownerName: [
          { required: true, message: '请输入店主姓名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在2到8个字符', trigger: 'blur' }
        ],
        ownerCard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { type: 'string', len: 18, message: '请输入18位身份证号', trigger: 'blur' }
        ],
        storeName: [
          { required: true, message: '请输入店铺名称', trigger: 'blur' }
        ],
        scategory: [
          { required: true, message: '请输入所属分类', trigger: 'change' }
        ],
        regions: [
          { required: true, message: '请选择所在地区', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        zipcode: [
          { required: true, message: '请输入邮政编码', trigger: 'blur' },
          { type: 'string', len: 6, message: '请输入正确的邮政编码', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { type: 'string', len: 11, message: '请输入正确的电话号码', trigger: 'blur' }
        ],
        image2: [
          { required: true, message: '请上传证件', trigger: 'blur' }
        ],
        image3: [
          { required: true, message: '请上次执照', trigger: 'blur' }
        ],
        isAgree: [
          { type: 'boolean', required: true, message: '开店协议', trigger: 'change' }
        ]
      },
      licenseImages: [],
      identityImages: [],
      imgPreviewDialogVisible: false,
      imgPreviewDialogUrl: '',
      protocolDialogVisible: false,
      uploadStoreImgPath: this.$Api.uploadStoreImgPath.target
    }
  },
  mounted() {
    this.getCategories({ 'parentId': 0 })
    this.getRegions()
    console.log('isSeller:' + this.$store.state.isSeller)
    console.log('userId:' + this.$store.state.userId)
  },
  methods: {
    handleUploadLicenseImgChange: function(file, fileList) {
      // this.licenseFiles =
    },
    handleUploadLicenseImgPreview: function(file) {
      this.imgPreviewDialogVisible = true
      this.imgPreviewDialogUrl = file.url
    },
    handleUploadLicenseImgRemove: function(file) {

    },
    handleUploadLicenseImgSuccess: function(response, file, fileList) {
      console.log(file)
      var image3JSON = JSON.parse(file.response)
      if (parseInt(image3JSON.code) === 1) {
        this.registForm.image3 = image3JSON.data[0].filePath
      }
    },
    handleUploadIdentityImgChange: function(file, fileList) {

    },
    handleUploadIdentityImgPreview: function(file) {
      this.imgPreviewDialogVisible = true
      this.imgPreviewDialogUrl = file.url
    },
    handleUploadIdentityImgRemove: function(file) {

    },
    handleUploadIdentityImgSuccess: function(response, file, fileList) {
      console.log(fileList)
      if (fileList.length === 2) {
        var image1JSON = JSON.parse(fileList[0].response)
        var image2JSON = JSON.parse(fileList[1].response)
        if (parseInt(image1JSON.code) === 1) {
          this.registForm.image1 = image1JSON.data[0].filePath
        }
        if (parseInt(image2JSON.code) === 1) {
          this.registForm.image2 = image2JSON.data[0].filePath
        }
      }
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
    getRegions: function() {
      return new Promise((resolve, reject) => {
        axios[this.$Api.regions.type](this.$Api.regions.target).then(response => {
          this.regions = response.data.data
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.erorrs)
        })
      })
    },
    handleCategoryChange: function(categoryIdArray) {
      if (categoryIdArray.length > 0) {
        this.registForm.category = categoryIdArray[categoryIdArray.length - 1]
        this.registForm.scategoryId = categoryIdArray[categoryIdArray.length - 1]
      }
    },
    handleRegionChange: function(regionIdArray) {
      console.log(this.registForm.regions)
      if (regionIdArray.length > 0) {
        this.registForm.regions = regionIdArray
        this.registForm.regionId = regionIdArray[regionIdArray.length - 1]
      }
    },
    registStore: function(storeForm) {
      return new Promise((resolve, reject) => {
        axios[this.$Api.createStore.type](this.$Api.createStore.target, storeForm).then(response => {
          console.log(response)
          console.log(response.status === 200)
          if (response.status === 200) {
            this.$store.commit('saveIsSeller', 2)
            // this.$router.go(0)
            this.isSeller = 2
            this.$message({
              message: '恭喜您，已提交开店申请，请耐心等待后台审核!',
              type: 'success'
            })
            // this.$router.push({
            //   name: 'User'
            //   query: {
            //     userId: this.registForm.userId
            //   }
            // })
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    submit: function(formName) {
      console.log('submit')
      this.registStore(this.registForm)
      // this.$emit('store_regist_success', true)
    },
    gotoStoreProtocol: function() {
      this.protocolDialogVisible = true
    },
    disagreeStoreProtocol: function() {
      this.protocolDialogVisible = false
    },
    agreeStoreProtocol: function() {
      this.registForm.isAgree = true
      this.protocolDialogVisible = false
    },
    handleProtocolCheck: function(isAgree) {
      console.log(isAgree)
      if (isAgree) {
        this.isAgree = true
        this.registForm.isAgree = true
      } else {
        this.isAgree = null
        this.registForm.isAgree = null
      }
    }
  }
}
</script>
