<template>
  <div class="width-vertical login-label-text login-view-password">
    <div class="corner-icon-view view-type-qrcode">
      <div class="master-login-title">密码登录</div>
      <i class="iconfont icon-erweima" style="font-size:40px;color:#999999;" />
      <div class="login-tip">
        <div class="poptip">
          <div class="poptip-arrow">
            <em />
            <span />
          </div>
          <div class="poptip-content">扫码登录</div>
        </div>
      </div>
    </div>
    <div class="login-content">
      <div class="login-password">
        <div id="login-error" class="login-error">
          <i class="iconfont icon-tishi" />
          <div class="login-error-msg">登录名或登录密码不正确</div>
        </div>
      </div>
      <form id="login-form" class="login-form" @submit.prevent="submit">
        <div class="fm-field">
          <label class="fm-label">
            <span>
              <label>登录名</label>
            </span>
          </label>
          <div class="input-wrap">
            <input v-model="forminfo.username" type="text" class="fm-text" tabindex="1" aria-label="邮箱/会员名/手机号码" placeholder="邮箱/会员名/手机号码">
          </div>
        </div>
        <div class="fm-field">
          <label class="fm-label">
            <span>
              <label>登录密码</label>
            </span>
          </label>
          <div class="input-wrap">
            <input v-model="forminfo.password" type="password" class="fm-text" tabindex="2" aria-label="请输入登录密码" placeholder="请输入登录密码" maxlength="40" autocomplete="off">
          </div>
        </div>
        <div class="fm-btn">
          <button type="submit" tabindex="3" class="fm-button fm-submit">登录</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Form from '../../static/js/form.js'

export default {
  name: 'LoginForm',
  data() {
    return {
      forminfo: new Form({
        username: '',
        password: ''
      })
    }
  },
  methods: {
    submit() {
      this.forminfo.post('/auth')
        .then(data => {
          const status = data.status
          const token = data.token
          if (status === '200') {
            this.$store.commit('saveToken', token)
            this.$router.push({
              name: 'Home',
              query: {
                menuId: 0
              }
            })
          } else {
            this.forminfo.reset()
          }
        })
    }
  }
}
</script>
