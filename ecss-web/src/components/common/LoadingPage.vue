<template>
  <div class="loading">
    <span>Loading......</span>
  </div>
</template>

<script>
/* jshint esnext: true */
/* eslint-disable-next-line */
/* eslint-disable */

import { setInterval } from 'timers';
import { setTimeout } from 'timers';

export default {
  name: 'LoadingPage',
  metaInfo: {
    title: 'Loading...'
  },
  data() {
    return {
      paramId: this.$route.query.paramId,
      paramType: this.$route.query.paramType,
      menuId_: this.$route.query.menuId,
      menuUri_: this.$route.query.menuUri
    }
  },
  mounted() {
    this.gotoTarget()
    // setTimeout(function() {
    //   if (this.menuUri_ === 'MyShop') {
    //     this.$router.push({
    //       name: this.menuUri_,
    //       query: {
    //         paramId: this.paramId,
    //         paramType: this.paramType
    //       }
    //     })
    //   } else {
    //     this.$router.push({
    //       name: this.menuUri_,
    //       query: {
    //         menuId: this.menuId_
    //       }
    //     })
    //   }
    // }, 1000);
  },
  methods: {
    gotoTarget: function() {
      console.log(this.paramType)
      console.log(this.menuUri_)
      console.log(this.menuUri_ == 'MyShop')
      if (this.menuUri_ === 'MyShop') {
        this.$router.push({
          name: this.menuUri_,
          query: {
            paramId: this.paramId,
            paramType: this.paramType
          }
        })
      } else {
        this.$router.push({
          name: this.menuUri_,
          query: {
            menuId: this.menuId_
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.loading {
  height: 100%;
  width: 100%;
  background-color: #EAEDF1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading span {
  font-size: 16px;
  font-style: italic;
}
</style>
