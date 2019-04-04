<template>
  <div id="app">
    <router-view name="hello"/>
    <router-view name="loading"/>
    <router-view name="logininterface"/>
    <router-view name="loginMall"/>
    <router-view name="home"/>
    <router-view name="user"/>
    <router-view name="myShop"/>
    <router-view name="goods_buy"/>
    <router-view name="searchResult"/>
    <router-view name="searchStore"/>
    <router-view name="videoDetail"/>
    <router-view name="myOrderDetail"/>
    <router-view name="myGoodscar"/>
    <router-view name="buyOrder"/>
  </div>
</template>

<style lang="scss" scoped>
@import "../static/css/custom-ui.scss";
</style>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
@import "../static/css/custom-ui.scss";
</style>

<style>
@import "../static/css/element-ui.css";

html {
  height: 100%;
  background-color: #ffffff !important;
}

body {
  height: 100%;
  margin: 0;
  overflow: hidden;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #ffffff;
  height: 100% !important;
  width: 100%;
}

a {
  text-decoration: none;
  outline: none;
}
</style>
