<template>
  <div />
</template>

<script>
import axios from 'axios'
import qs from 'qs'

export default {
  name: 'LoginInterface',
  data() {
    return {
      loginInfo: {
        loginname: this.$route.query.loginname,
        password: '',
        optType: this.$route.query.optType,
        paramId: this.$route.query.paramId,
        paramType: this.$route.query.paramType
      }
    }
  },
  mounted() {
    this.handleLogin()
  },
  methods: {
    handleLogin: function() {
      return new Promise((resolve, reject) => {
        axios['post']('/admin/home/login', qs.stringify(this.loginInfo)).then(response => {
          console.log(response)
          this.loginRes = response.data
          const code = this.loginRes.code
          if (code === '200') {
            const token = this.loginRes.data.token
            this.$store.commit('saveToken', token)
            if (this.loginInfo.optType === 'preview') {
              this.$router.push({
                name: 'MyShop',
                query: {
                  paramId: this.loginInfo.paramId,
                  paramType: this.loginInfo.paramType
                }
              })
            } else {
              this.$router.push({
                name: 'Home'
              })
            }
          } else {
            this.$message.error('系统错误，请联系管理员！')
          }
          resolve(response.data)
        }).catch(error => {
          this.$message.error('系统错误，请联系管理员！')
          reject(error.response.data.errors)
        })
      })
    }
  }
}
</script>
