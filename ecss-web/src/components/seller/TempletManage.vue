<template>
  <el-tabs type="border-card">
    <el-tab-pane label="可用模板">
      <div class="tempelet">
        <div class="tempelet_current">
          <div class="tempelet_currLeft"><img src="../../../static/img/photo.png"></div>
          <div class="tempelet_currRight">
            <p class="temShopname">
              <span>店铺名称:一生挚爱123</span>
              <a href="" target="_blank">店铺首页</a>
            </p>
            <p class="tempelet_model">
              <span>当前模板名称:<b>default</b></span>
            </p>
          </div>
        </div>
        <div class="temList">
          <h3>可用模板</h3>
          <ul class="tempelet_list">
            <li>
              <div class="temImg"><img src="../../../static/img/photo.png"></div>
              <p class="temmbName">模板名称：default</p>
              <p class="temBtns">
                <a href="">使用</a>
                <a href="">预览</a>
              </p>
            </li>
            <li>
              <div class="temImg"><img src="../../../static/img/photo.png"></div>
              <p class="temmbName">模板名称：default</p>
              <p class="temBtns">
                <a href="">使用</a>
                <a href="">预览</a>
              </p>
            </li>
            <li>
              <div class="temImg"><img src="../../../static/img/photo.png"></div>
              <p class="temmbName">模板名称：default</p>
              <p class="temBtns">
                <a href="">使用</a>
                <a href="">预览</a>
              </p>
            </li>
            <li>
              <div class="temImg"><img src="../../../static/img/photo.png"></div>
              <p class="temmbName">模板名称：default</p>
              <p class="temBtns">
                <a href="">使用</a>
                <a href="">预览</a>
              </p>
            </li>
          </ul>
          <!--分页-->
          <div class="paging">
            分页
          </div>
          <!--分页结束-->
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="创建模板">
      <div class="tempelet02">
        <div class="temForm">
          <label>
            <span>姓名：</span>
            <input type="text" placeholder="请输入姓名">
          </label>
          <label>
            <span>模板名称：</span>
            <input type="text" placeholder="请输入模板名称">
          </label>
          <label>
            <span>模板价格：</span>
            <input type="text" placeholder="请输入模板价格">
            <span class="temNum">请输入数字</span>
          </label>
          <label>
            <input type="submit" value="创建" class="temNew">
          </label>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="模板商城">
      <div class="tempelet">
        <div class="temList">
          <ul class="tempelet_list">
            <li>
              <div class="temImg"><img src="../../../static/img/photo.png"></div>
              <p class="temmbName">模板名称：default</p>
              <p class="temmbName">模板价格：￥100.00</p>
              <p class="temBtns">
                <a href="">购买</a>
                <a href="">预览</a>
              </p>
            </li>
            <li>
              <div class="temImg"><img src="../../../static/img/photo.png"></div>
              <p class="temmbName">模板名称：default</p>
              <p class="temmbName">模板价格：￥100.00</p>
              <p class="temBtns">
                <a href="">购买</a>
                <a href="">预览</a>
              </p>
            </li>
            <li>
              <div class="temImg"><img src="../../../static/img/photo.png"></div>
              <p class="temmbName">模板名称：default</p>
              <p class="temmbName">模板价格：￥100.00</p>
              <p class="temBtns">
                <a href="">购买</a>
                <a href="">预览</a>
              </p>
            </li>
            <li>
              <div class="temImg"><img src="../../../static/img/photo.png"></div>
              <p class="temmbName">模板名称：default</p>
              <p class="temmbName">模板价格：￥100.00</p>
              <p class="temBtns">
                <a href="">购买</a>
                <a href="">预览</a>
              </p>
            </li>
          </ul>
          <!--分页-->
          <div class="paging">
            分页
          </div>
          <!--分页结束-->
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="我的模板">
      <div class="tempelet04">
        <table class="temTable">
          <thead>
            <tr>
              <th style="width:20%;">模板样式图</th>
              <th style="width:30%;">模板名称</th>
              <th style="width:10%;">模板价格</th>
              <th style="width:10%;">上传时间</th>
              <th style="width:10%;">上传到商城</th>
              <th style="width:20%;">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span class="tempelet_img"><img src="../../../static/img/photo.png"></span>
              </td>
              <td>1234567</td>
              <td>1000</td>
              <td>2018-09-02</td>
              <td>已发布到商城</td>
              <td>
                <a href="" class="tem_btns">编辑</a>
                <a href="" class="tem_btns">删除</a>
              </td>
            </tr>
            <tr>
              <td>
                <span class="tempelet_img"><img src="../../../static/img/photo.png"></span>
              </td>
              <td>1234567</td>
              <td>1000</td>
              <td>2018-09-02</td>
              <td>已发布到商城</td>
              <td>
                <a href="" class="tem_btns">编辑</a>
                <a href="" class="tem_btns">删除</a>
              </td>
            </tr>
          </tbody>
        </table>
        <!--分页-->
        <div class="paging">
          分页
        </div>
        <!--分页结束-->
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<style>
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
    padding:0;
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
  .tempelet,.tempelet02,.tempelet04{
    margin-top:20px;
    padding:20px 0;
    border-top:1px solid #eee;
    text-align:left;
  }
  .tempelet_current{
    padding:15px;
    box-sizing:border-box;
    border-bottom:1px solid #f45408;
    margin-bottom:30px;
    font-size:0;
  }
  .tempelet_currLeft,.tempelet_currRight{
    display:inline-block;
    vertical-align:middle;
    font-size:14px;
  }
  .tempelet_currLeft{
    width:160px;
    height:110px;
    overflow:hidden;
    border:1px solid #eee;
  }
  .tempelet_currLeft img{
    width:100%;
    height:100%;
  }
  .tempelet_currRight{
    width:660px;
    padding-left:30px;
    box-sizing:border-box;
  }
  .tempelet_currRight p span{
    padding-right:30px;
  }
  .temShopname a{
    padding:8px 20px;
    border-radius:5px;
    background:#ff854b;
    color:#fff;
  }
  .tempelet_model b{
    color:#5ca339;
  }
  .temList h3{
    font-size:14px;
    color:#333;
    line-height:36px;
    border-bottom:1px solid #ddd;
  }
  .tempelet_list{
    font-size:0;
  }
  .tempelet_list li{
    display:inline-block;
    vertical-align:top;
    font-size:14px;
    width:33.33%;
    box-sizing:border-box;
    padding:10px 20px;
  }
  .temImg{
    width:100%;
    height:140px;
    overflow:hidden;
  }
  .temImg img{
    width:100%;
    height:100%;
  }
  .tempelet_list p{
    text-align:center;
  }
  .temmbName{
    color:#5ca339;
    font-weight:700;
    font-size:14px;
  }
  .temBtns a{
    padding:5px 10px;
    margin:0 3px;
    border-radius:5px;
    background:#ff854b;
    color:#fff;
    font-size:14px;
  }
  .temForm label{
    display:block;
    padding:20px 0;
    font-size:0;
  }
  .temForm label span,.temForm label input{
    display:inline-block;
    vertical-align:middle;
    font-size:14px;
    color:#333;
  }
  .temForm label span{
    width:100px;
    text-align:right;
  }
  .temForm label input{
    width:260px;
    height:40px;
    line-height:40px;
    padding:0 10px;
    box-sizing:border-box;
    border:1px solid #ddd;
  }
  .temForm .temNew{
    border:none;
    width:100px;
    height:40px;
    line-height:40px;
    text-align:center;
    border-radius:5px;
    background:#ff854b;
    color:#fff;
  }
  .temForm .temNum{
    color:red;
    font-size:12px;
    font-weight:700;
  }
  .temTable{
    width:100%;
  }
  .temTable th{
    height:50px;
    line-height:50px;
    text-align:center;
    font-size:14px;
    border-bottom:1px solid #ddd;
  }
  .temTable td{
    padding:15px 0;
    font-size:12px;
    text-align:center;
  }
  .tempelet_img{
    display:block;
    width:80px;
    height:60px;
    overflow:hidden;
    margin:0 auto
  }
  .tempelet_img img{
    width:100%;
    height:100%;
  }
  .tem_btns{
    padding:5px 10px;
    margin:0 3px;
    background:#ff854b;
    border-radius:5px;
    color:#fff;
  }
</style>

<script>
export default {
  name: 'TempletManage'
}
</script>
