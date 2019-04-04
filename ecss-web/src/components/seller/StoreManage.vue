<template>
  <el-tabs type="border-card">
    <el-tab-pane label="店铺设置">
      <div class="shopMana">
        <span class="shopMana_tip">带<i class="shopTip">&nbsp;*&nbsp;</i>为必填项</span>
        <div class="shopMform">
          <div class="shopform_logo">
            <div class="shopfImg"><img :src="logo">
              <!-- <img v-if="imageUrl" :src="imageUrl" > -->
            </div>
            <div class="shopfImgbtn">
              <el-upload
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :action="uploadUrl"
                :file-list="fileList2"
                list-type="picture-card">
                <i class="el-icon-plus"/>
                <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar">
                LOGO -->
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img :src="dialogImageUrl" width="100%" alt="">
              </el-dialog>
            </div>
            <div class="shopfImgtip"><i class="shopTip">&nbsp;*&nbsp;</i>此处为您的店铺标志，将显示在店铺信息栏里建议尺寸100*100像素，大小不得超过200K</div>
          </div>
          <div class="shopfbanner">
            <div class="shopbannerImg">
              <span class="shopbannerimg_img"><img :src="banner"></span>
              <span class="shopbannerimg_tip"><i class="shopTip">&nbsp;*&nbsp;</i>此处为您的店铺招牌，将显示在店铺导航上方的banner位置，建议尺寸1000*120像素，大小不得超过500K</span>
            </div>
            <div class="shopbannerBtn">
              <el-upload
                :show-file-list="false"
                :on-success="handleAvatarSuccessBanner"
                :before-upload="beforeAvatarUpload"
                :action="uploadUrl"
                list-type="picture-card"
                class="avatar-uploader">

                <i class="el-icon-plus"/>
                <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar">
                更换店铺招牌 -->
              </el-upload>
            </div>
          </div>
          <label class="shopzl01 shopzl">
            <span><i class="shopTip">&nbsp;*&nbsp;</i>店铺名称：</span>
            <el-input v-model="form.storeName" class="marginRight shopInput" style="width:260px!important;"/>
            <span class="marginLeft">店铺名称</span>
            <a href="javascript:void(0)" @click="gotoMyStore">我的店铺首页</a>
          </label>
          <label class="shopzl02 shopzl">
            <span><i class="shopTip">&nbsp;*&nbsp;</i>所在地区：</span>
            <el-cascader
              v-model="form.regions"
              :options="options"
              expand-trigger="hover"
              @change="handleChange"/>
          </label>
          <label class="shopzl03 shopzl">
            <span><i class="shopTip">&nbsp;*&nbsp;</i>详细地址：</span>
            <el-input v-model="form.address" class="marginRight shopInput" style="width:260px!important;"/>
            <span class="marginLeft">不必重复填写所在地区</span>
          </label>
          <label class="shopzl04 shopzl">
            <span><i class="shopTip">&nbsp;*&nbsp;</i>联系电话：</span>
            <el-input v-model="form.tel" class="marginRight shopInput" style="width:260px!important;"/>

          </label>
          <label class="shopzl05 shopzl">
            <span>店铺广告：</span>
            <span>
              <el-radio-group v-model="form.imgg" @change="changeImgg">
                <el-radio :label="1">关闭广告</el-radio>
                <el-radio :label="2">左侧广告</el-radio>
                <el-radio :label="3">右侧广告</el-radio>
              </el-radio-group>

            </span>
            <span>（广告中上传的图片尺寸不要超过100*300px）</span>
          </label>
          <label class="shopzl06 shopzl">
            <span>广告代码：</span>
            <el-input v-model="form.htmlchar" type="textarea" class="shopTextarea" style="width:260px!important;"/>

          </label>
          <div class="shopzl07 shopzl">
            <span><i class="shopTip">&nbsp;*&nbsp;</i>店铺简介：</span>
            <!-- <div class="shopbjq">
              <quill-editor
                ref="storeDescQuillEditor"
                v-model="content"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)" style="display:flex;"/>
            </div>
            <div class="shopsc">
              <el-upload
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess"
                :show-file-list="false"
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                上传图片
              </el-upload>
            </div> -->
          </div>
          <div>
            <quill-editor
              ref="storeDescQuillEditor"
              v-model="form.description"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"/>
          </div>
          <div class="shopform_submit">
            <input type="submit" value="提交" @click="savePartner()">
          </div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<style>
@import 'quill/dist/quill.core.css';
@import 'quill/dist/quill.snow.css';
@import 'quill/dist/quill.bubble.css';

.paging{
    margin:30px auto;
    text-align:center;
    font-size:14px;
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
  .shopMana{
    margin-top:20px;
    padding:20px 0;
    border-top:1px solid #eee;
    text-align:left;
  }
  .shopMana_tip{
    padding-left:20px;
    display:block;
    margin-bottom:20px;
    font-size:14px;
    color:#333;
  }
  .shopTip{
    color:red;
  }
   .avatar-uploader .el-upload {
    /* background:#f45408; */
    color:#fff;
    font-size:14px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    /* width:120px;
    height:36px;
    line-height:36px; */
    text-align:center;
    display:inline-block;

  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .shopform_logo{
    padding-bottom:20px;
    border-bottom:1px solid #ddd;
    font-size:0;
  }
  .shopfImg,.shopfImgbtn,.shopfImgtip{
    display:inline-block;
    vertical-align:middle;
  }
  .shopfImg{
    margin-right:20px;
    width:140px;
    height:140px;
    overflow:hidden;
  }
  .shopfImg img{
    width:100%;
    height:100%;
  }
  .shopfImgtip{
    margin-left:20px;
    font-size:12px;
    color:#999;
  }
  .shopfbanner{
    padding:20px 0;
    margin-bottom:20px;
    border-bottom:1px solid #ddd;
    font-size:14px;
  }
  .shopbannerImg,.shopbannerBtn{
    display: inline-block;
    vertical-align: middle;
  }
  .shopbannerImg span{
    display:block;
  }
  .shopbannerimg_img{
    width:600px;
    height:120px;
    overflow:hidden;
  }
  .shopbannerimg_img img{
    width:100%;
    height:100%;
  }
  .shopbannerimg_tip{
    margin-top:11px;
    font-size:12px;
    color:#999;
  }
  .shopbannerBtn{
    margin-left:50px;
  }
  .shopMform .shopzl{
    display:block;
    padding:15px 0;
    font-size:0;
  }
  .shopMform .shopzl span,.shopMform .shopzl input,.shopMform .shopzl textarea,.shopMform .shopzl a{
    display:inline-block;
    vertical-align:middle;
    font-size:14px;
  }
  .shopMform .shopzl > span:first-child{
     width:100px;
     text-align:right;
  }
  .shopMform .shopzl input{
     width:260px;
     height:34px;
     line-height:34px;
     padding:0 10px;
     color:#666;
     border:1px solid #ddd;
   }
   .marginLeft{
     display:inline-block;
     vertical-align:middle;
     margin-left:20px;
   }
   .marginRight{
     display:inline-block;
     vertical-align:middle;
     margin-right:20px;
     width:260px;
   }
   .shopMform .shopzl a{
     margin-left:40px;
     width:120px;
     height:36px;
     line-height:36px;
     text-align:center;
     background:#f45408;
     color:#fff;
     border-radius:5px;
   }
   .shopMform .shopzl .shopform_b{
     border:none;
     background:#f45408;
     color:#fff;
     width:80px;
     height:34px;
     line-height:34px;
     text-align:center;
     border-radius:5px;
   }
   .shopTextarea{
     width:600px;
     vertical-align:top;
   }
  .shopMform .shopzl .shopbjq{
    margin:20px 0 20px 20px;
    font-size:14px;
   }
   .shopMform .shopzl .shopsc{
     margin-left:20px;
   }
   .shopform_submit{
     margin:30px auto;
     width:100px;
     margin-top:110px;
   }
   .shopform_submit input{
     width:100px;
     height:40px;
     line-height:40px;
     text-align:center;
     background:rgb(255, 225, 211);
     border:1px solid #f45408;
     border-radius:5px;
     color:#333;
     cursor:pointer;
   }

   .quill-editor {
     height: 360px;
     min-height: 160px;
   }
</style>

<script>
import axios from 'axios'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'StoreManage',
  components: {
    quillEditor
  },
  data() {
    return {
      imageUrl: '',
      images: {},
      radio: '1',
      content: '',
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
        placeholder: '店铺简介',
        theme: 'snow'
      },
      form: {
        id: 0,
        storeLogo: '',
        regions: [],
        address: '',
        tel: '',
        storeBanner: '',
        imgg: '',
        htmlchar: '',
        description: ''
      },
      uploadUrl: '',
      logo: '',
      banner: '',
      dialogImageUrl: '',
      dialogVisible: false,
      options: [],
      fileList2: [{ url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
    }
  },
  computed: {
    editor() {
      return this.$refs.storeDescQuillEditor.quill
    }
  },
  mounted() {
    this.uploadUrl = this.$Yjj.uploadStoreImgUrl.target
    this.getRegionList(this.$Yjj.getRegion.type, this.$Yjj.getRegion.target)
    this.getMyStore(this.$Yjj.getMyStore.type, this.$Yjj.getMyStore.target)
    console.log('this is my editor', this.editor)
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log('res:' + res)
      const i = JSON.parse(res)
      this.images = i.data
      console.log(this.images)
      this.logo = 'http://192.168.6.225:9091/ecssfile/' + this.images[0].filePath
      this.form.storeLogo = this.images[0].filePath
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    handleAvatarSuccessBanner(res, file) {
      console.log('res:' + res)
      const i = JSON.parse(res)
      this.images = i.data
      console.log(this.images)
      this.banner = 'http://192.168.6.225:9091/ecssfile/' + this.images[0].filePath
      this.form.storeBanner = this.images[0].filePath
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    onEditorBlur: function(e) {
      console.log('editor blur!', e)
    },
    onEditorFocus: function(e) {
      console.log('editor focus!', e)
    },
    onEditorReady: function(e) {
      console.log('editor ready!', e)
    },
    getRegionList: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.options = response.data.data
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    getMyStore: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.form = response.data.data
          this.logo = response.data.data.logo
          this.banner = response.data.data.banner
          this.form.imgg = parseInt(response.data.data.imgg)
          this.form.regions = this.form.regions.map(Number)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    handleChange(value) {

    },
    changeImgg: function(value) {
      this.form.imgg = value
    },
    // 确认提交
    savePartner: function() {
      const type = this.$Yjj.updMyStore.type
      const target = this.$Yjj.updMyStore.target
      return new Promise((resolve, reject) => {
        axios[type](target, this.form).then(response => {
          const code = response.data.code
          if (code === '2000') {
            // 刷新
            this.getRegionList(this.$Yjj.getRegion.type, this.$Yjj.getRegion.target)
            this.getMyStore(this.$Yjj.getMyStore.type, this.$Yjj.getMyStore.target)
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
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    gotoMyStore: function() {
      this.$router.push({
        name: 'MyShop',
        query: {
          // storeId: this.form.id,
          paramId: this.form.id,
          paramType: 'store'
        }
      })
    }
  }
}
</script>
