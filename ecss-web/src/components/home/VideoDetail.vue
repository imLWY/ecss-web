<template>
  <el-container>
    <el-header style="min-height:70px;min-width:100%;border-bottom:1px solid #e2e2e2;">
      <Header />
    </el-header>
    <el-container>
      <div class="video">
        <div class="videoSelf">
          <div class="video_mine">
            <!-- <img src="../../../static/img/photo.png"> -->
            <video src="http://192.168.10.90:9798/video/v.f30.mp4" controls="controls" width="100%" height="100%">
              Your browser does not support the video tag
            </video>
          </div>
        </div>
        <div class="video_right">
          <h3>全部宝贝<b>3</b></h3>
          <ul class="video_goodslist">
            <li v-for="item in [1, 2, 3, 4, 5]" :key="item">
              <dl>
                <dt><a href="javascript:void(0);" @click="gotoGoodDetail(item)"><img src="../../../static/img/photo.png"></a></dt>
                <dd>
                  <a href="javascript:void(0);" @click="gotoGoodDetail(item)">哈哈哈哈哈哈</a>
                  <b>￥120.00</b>
                  <p>
                    <span>2人已购买</span>
                    <span class="videoGoodck"><a href="javascript:void(0);" @click="gotoGoodDetail(item)">立即查看</a></span>
                  </p>
                </dd>
              </dl>
            </li>
            <!-- <li>
              <dl>
                <dt><a href=""><img src="../../../static/img/photo.png"></a></dt>
                <dd>
                  <a href="" class="videoGoodtitle">哈哈哈哈</a>
                  <b>￥120.00</b>
                  <p>
                    <span>2人已购买</span>
                    <span class="videoGoodck"><a href="">立即查看</a></span>
                  </p>
                </dd>
              </dl>
            </li>
            <li>
              <dl>
                <dt><a href=""><img src="../../../static/img/photo.png"></a></dt>
                <dd>
                  <a href="" class="videoGoodtitle">哈哈哈哈</a>
                  <b>￥120.00</b>
                  <p>
                    <span>2人已购买</span>
                    <span class="videoGoodck"><a href="">立即查看</a></span>
                  </p>
                </dd>
              </dl>
            </li>
            <li>
              <dl>
                <dt><a href=""><img src="../../../static/img/photo.png"></a></dt>
                <dd>
                  <a href="" class="videoGoodtitle">哈哈哈哈</a>
                  <b>￥120.00</b>
                  <p>
                    <span>2人已购买</span>
                    <span class="videoGoodck"><a href="">立即查看</a></span>
                  </p>
                </dd>
              </dl>
            </li>
            <li>
              <dl>
                <dt><a href=""><img src="../../../static/img/photo.png"></a></dt>
                <dd>
                  <a href="" class="videoGoodtitle">哈哈哈哈</a>
                  <b>￥120.00</b>
                  <p>
                    <span>2人已购买</span>
                    <span class="videoGoodck"><a href="">立即查看</a></span>
                  </p>
                </dd>
              </dl>
            </li>
            <li>
              <dl>
                <dt><a href=""><img src="../../../static/img/photo.png"></a></dt>
                <dd>
                  <a href="" class="videoGoodtitle">哈哈哈哈</a>
                  <b>￥120.00</b>
                  <p>
                    <span>2人已购买</span>
                    <span class="videoGoodck"><a href="">立即查看</a></span>
                  </p>
                </dd>
              </dl>
            </li> -->
          </ul>
        </div>
      </div>
    </el-container>
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>

<style>
ul,li{
  margin:0;
  padding:0;
  list-style:none;
}
.video{
  margin:20px auto;
  width:1200px;
  text-align:left;
  font-size:0;
}
.videoSelf,.video_right{
  display:inline-block;
  vertical-align:top;
  font-size:14px;
}
.videoSelf{
  width:60%;
  padding:20px 70px 0 50px;
  box-sizing:border-box;
}
.video_right{
  width:40%;
}
.video_mine{
  width:620px;
  height:700px;
  overflow:hidden;
}
.video_mine img{
  width:100%;
  height:100%;
}
.video_right h3{
  height:50px;
  line-height:50px;
  margin:0;
  color:#f45408;
  font-size:16px;
  font-weight:400;
}
.video_goodslist li{
  border-bottom:1px solid #eee;
}
.video_goodslist dl dt,.video_goodslist dl dd{
  display:inline-block;
  vertical-align:middle;
}
.video_goodslist dl dt{
  width:100px;
  height:100px;
  overflow:hidden;
}
.video_goodslist dl dt a{
  display:block;
}
.video_goodslist dl dt img{
  width:100%;
  height:100%;
}
.video_goodslist dl dd{
  width:330px;
}
.video_goodslist dl dd a,.video_goodslist dl dd b{
  display:block;
  margin-bottom:5px;
}
.video_goodslist dl dd a{
  font-size:14px;
}
.video_goodslist dl dd b{
  font-size:16px;
  color:red;
}
.video_goodslist dl dd p{
  font-size:0;
}
.video_goodslist dl dd p span,.video_goodslist dl dd p a{
  display:inline-block;
  vertical-align:middle;
  font-size:12px;
  width:50%;
}
.video_goodslist dl dd p span{
  color:#999;
  font-size:12px;
}
.video_goodslist dl dd p span a{
  display:block;
  width:100px;
  height:30px;
  line-height:30px;
  text-align:center;
  font-size:14px;
  color:#f45408;
  border:1px solid #f45408;
  border-radius:5px;
}
</style>

<script>
export default {
  name: 'VideoDetail',
  props: {

  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    gotoGoodDetail: function(goodId) {
      this.$router.push({
        name: 'MyShop',
        query: {
          goodId: goodId
        }
      })
    }
  }
}
</script>
