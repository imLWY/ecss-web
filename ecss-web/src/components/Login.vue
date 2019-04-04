<template>
  <div class="login">
    <div class="login-topbar">
      <a class="login-topbar-logo" href="www.ai-sunny.com">
        <!-- <img class="black" style="z-index: 2;" src="../../static/img/logo.png">
        <img class="black" style="z-index: 1;" src="../../static/img/logo.gif">-->
      </a>
      <ul class="login-link">
        <li>
          <a href="www.ai-sunny.com">首页</a>
        </li>
      </ul>
      <div class="login-site-switch">
        <div class="login-site-switch-box">
          <img src="../../static/img/site.png">
          梦想站
          <i class="iconfont icon-jiantoushang" />
          <i class="iconfont icon-jiantouxia" />
          <ul>
            <li choice="One">
              <a href="#" target="_self">第一网站</a>
            </li>
            <li choice="Two">
              <a href="#" target="_self">第二网站</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="login-body">
      <div class="login-body-box">
        <div>
          <div>
            <div>
              <a
                class="login-body-txt-box"
                href="#"
                target="_blank"
                style="text-decoration: none !important;"
              >
                <h1 class="box-title">企业文化</h1>
                <ul>
                  <li>诚实</li>
                  <li>责任感</li>
                  <li>积极进取</li>
                </ul>
              </a>
            </div>
          </div>
        </div>
        <div class="login-module">
          <div class="login-inner">
            <login-form />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "../../static/css/login.css";
</style>

<script>
/* eslint-disable */
import LoginForm from './LoginForm.vue';
export default {
  name: 'Login',
  metaInfo: {
    title: '登录'
  },
  components: {
    'login-form': LoginForm
  }
}
</script>
