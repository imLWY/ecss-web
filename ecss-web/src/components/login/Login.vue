<template>
  <div id="login" class="login">
    <div class="login_content">
      <div class="loginLogo"><img src="../../../static/img/login_logo.png"></div>
      <div class="loginForm">
        <div class="loginform loginform_un"><i class="icon-un"/><input v-model="form.loginname" type="text" placeholder="请输入用户名"></div>
        <div class="loginform loginform_pw"><i class="icon-pw"/><input v-model="form.password" type="password" placeholder="请输入密码"></div>
        <!-- <div class="loginform loginform_yz">
          <input type="text" class="loginInputyz" placeholder="验证码">
          <span class="loginYz">
            <a href="#">
              <img src="" alt="">
            </a>
          </span>
        </div> -->
        <div class="loginbtn">
          <a href="javascript:void(0);" class="logoBtn" @click="handleLogin">登录</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
}

button {
  border: none;
  background: none;
  list-style: none;
}

.login {
  width: 1070px;
  height: 590px;
  position: absolute;
  top: 200px;
  left: 50%;
  margin-left: -535px;
  z-index: 1500;
  border-radius: 5px;
  box-shadow: 0 0 20px #f0c6b7;
  background: url(../../../static/img/login_b01.jpg) no-repeat left center;
}

.login_content {
  position: absolute;
  top: 0;
  right: 0;
  width: 440px;
  padding: 50px 0;
}

.loginLogo {
  margin: 0 auto;
  text-align: center;
}

.loginForm {
  margin: 50px auto 30px;
  padding: 0 80px;
}

.loginform {
  margin: 20px 0;
}

.loginform input {
  width: 100%;
  border: none;
  border-bottom: 1px solid #999;
  padding-left: 50px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: #999999;
  outline: none;
  box-sizing: border-box;
}

.loginform_yz {
  font-size: 0;
}

.loginform_yz .loginInputyz {
  display: inline-block;
  vertical-align: middle;
  width: 100px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #999999;
  font-size: 16px;
  margin-right: 26px;
  padding: 10px;
}

.loginYz {
  display: inline-block;
  vertical-align: middle;
  font-size: 16px;
  width: 120px;
  height: 40px;
  overflow: hidden;
  border-bottom: 1px solid #eeeeee;
  cursor: pointer;
}

.loginform_un, .loginform_pw {
  position: relative;
}

.loginform_un i, .loginform_pw i {
  position: absolute;
  left: 10px;
  font-size: 20px;
  color: #85382c;
  top: 50%;
  margin-top: -10px;
}

.loginbtn {
  margin-top: 40px;
  text-align: center;
}

.loginbtn .logoBtn {
  display: block;
  margin: 0 auto;
  width: 190px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #ffffff;
  border-radius: 50px;
  background: -webkit-linear-gradient(right, #ff6d30, #fcb135);
  background: -o-linear-gradient(right, #ff6d30, #fcb135);
  background: -moz-linear-gradient(right, #ff6d30, #fcb135);
  background: linear-gradient(to right, #ff6d30, #fcb135);
  box-shadow: 0 0 10px #ff6c1f;
  font-size: 20px;
  cursor: pointer;
}

#btclose i {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 34px;
  color: #666666;
  cursor: pointer;
}

.contentss {
  margin-top: 50px;
  color: red;
  line-height: 200px;
  height: 200px;
  text-align: center;
}
</style>

<script>
import axios from 'axios'
import qs from 'qs'

export default {
  name: 'Login',
  metaInfo: {
    title: '登录'
  },
  data() {
    return {
      form: {
        loginname: '',
        password: ''
      },
      head: {
        // 'method': 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }
  },
  mounted() {

  },
  methods: {
    handleLogin: function() {
      return new Promise((resolve, reject) => {
        axios.head('/admin/home/login', this.head)
        axios['post']('/admin/home/login', qs.stringify(this.form)).then(response => {
          this.loginInfo = response.data
          console.log(this.loginInfo)
          const code = this.loginInfo.code
          const msg = this.loginInfo.msg
          if (code === '200') {
            this.$message({
              message: msg,
              type: 'success'
            })
            const token = this.loginInfo.data.token
            this.$store.commit('saveToken', token)
            this.$router.push({
              name: 'Home'
            })
          } else {
            this.$message.error(msg)
          }
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    }
  }
}
</script>
