<template>
  <el-container style="background:#ffffff;">
    <el-header style="min-width:100%;border-bottom:1px solid #e2e2e2;">
      <Header />
    </el-header>
    <el-container class="nav-er">
      <Navigation :main_key="menuKey" />
    </el-container>
    <el-container class="user_main">
      <el-aside>
        <Userside
          :main_key="menuKey"
          @change_menu_event="changeMenuMain" />
      </el-aside>
      <el-container>
        <el-main>
          <Usermain
            :main_key="menuKey"
            @edit_account_event="handleEditAccountEvent"
            @my_order_event="handleMyOrderEvent"
            @order_manage_event="handleOrderManageEvent"
            @store_regist_success="storeRegistSuccess" />
        </el-main>
      </el-container>
    </el-container>
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>

<style scoped>
.el-header, .el-footer {
  background-color: #ffffff;
  color: #333333;
  text-align: center;
  height: 70px !important;
  line-height: 70px;
  padding: 0;
}

.el-aside {
  text-align: center;
  min-height: 740px;
  width: 260px!important;
}

.el-main {

  text-align: center;
  min-height: 740px;
}

.el-footer {
  width: 100%;
  height: 70px !important;
  /* background: #e9eef3; */
  background: #ffffff;
  margin: 0 !important;
}
.user_main{
  width:1200px;
  margin:0 auto;
}
.nav-er {
  padding-top: 20px;
  width:1200px;
  margin:20px auto;
}

body > .el-container {
  margin-bottom: 0px;
}

/* .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
} */
</style>

<script>
import Userside from './Userside.vue'
import Usermain from './Usermain.vue'

export default {
  name: 'User',
  metaInfo: {
    title: '个人中心'
  },
  components: {
    Userside,
    Usermain
  },
  data() {
    return {
      currentUserId: this.$route.query.userId,
      menuKey: 'AccountView'
      // isSeller: false
    }
  },
  mounted() {
    console.log('CurrentUserId:' + this.currentUserId)
  },
  methods: {
    changeMenuMain: function(data) {
      this.menuKey = data
    },
    storeRegistSuccess: function(data) {
      // this.isSeller = data
      this.menuKey = 'AccountView'
    },
    handleEditAccountEvent: function(param) {
      console.log(param)
      this.menuKey = param
    },
    handleMyOrderEvent: function(param) {
      this.menuKey = param
    },
    handleOrderManageEvent: function(param) {
      console.log(param)
      this.menuKey = param
    }
  }
}
</script>
