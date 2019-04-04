<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>
    <el-breadcrumb-item >用户中心</el-breadcrumb-item>
    <el-breadcrumb-item >{{ navItem[main_key].navParent }}</el-breadcrumb-item>
    <el-breadcrumb-item >{{ navItem[main_key].navName }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped>

</style>

<script>
export default {
  name: 'Navigation',
  props: {
    main_key: {
      type: String,
      default: 'AccountView'
    }
  },
  data() {
    return {
      navItem: {
        AccountView: {
          navKey: 'AccountView',
          navParent: '我的账户',
          navName: '账户概览'
        },
        PersonView: {
          navKey: 'PersonView',
          navParent: '我的账户',
          navName: '个人资料'
        },
        ShortMsg: {
          navKey: 'ShortMsg',
          navParent: '我的账户',
          navName: '短消息'
        },
        Friends: {
          navKey: 'Friends',
          navParent: '我的账户',
          navName: '好友'
        },
        Payment: {
          navKey: 'Payment',
          navParent: '我的账户',
          navName: '我的支付通'
        },
        MyOrder: {
          navKey: 'MyOrder',
          navParent: '我是买家',
          navName: '我的订单'
        },
        MyConsult: {
          navKey: 'MyConsult',
          navParent: '我是买家',
          navName: '我的咨询'
        },
        MyCollect: {
          navKey: 'MyCollect',
          navParent: '我是买家',
          navName: '我的收藏'
        },
        MyAddress: {
          navKey: 'MyAddress',
          navParent: '我是买家',
          navName: '我的地址'
        },
        MyCoupon: {
          navKey: 'MyCoupon',
          navParent: '我是买家',
          navName: '我的优惠卷'
        },
        GoodsManage: {
          navKey: 'GoodsManage',
          navParent: '我是卖家',
          navName: '商品管理'
        },
        ConsultManage: {
          navKey: 'ConsultManage',
          navParent: '我是卖家',
          navName: '咨询管理'
        },
        GcategoryManage: {
          navKey: 'GcategoryManage',
          navParent: '我是卖家',
          navName: '分类管理'
        },
        OrderManage: {
          navKey: 'OrderManage',
          navParent: '我是卖家',
          navName: '订单管理'
        },
        StoreManage: {
          navKey: 'StoreManage',
          navParent: '我是卖家',
          navName: '店铺设置'
        },
        TempletManage: {
          navKey: 'TempletManage',
          navParent: '我是卖家',
          navName: '我的模板'
        },
        PayModeManage: {
          navKey: 'PayModeManage',
          navParent: '我是卖家',
          navName: '支付方式管理'
        },
        ExpressModeManage: {
          navKey: 'ExpressModeManage',
          navParent: '我是卖家',
          navName: '配送方式管理'
        },
        NavigationManage: {
          navKey: 'NavigationManage',
          navParent: '我是卖家',
          navName: '导航管理'
        },
        ParterManage: {
          navKey: 'ParterManage',
          navParent: '我是卖家',
          navName: '合作伙伴管理'
        },
        CouponManage: {
          navKey: 'CouponManage',
          navParent: '我是卖家',
          navName: '优惠卷管理'
        },
        StoreRegist: {
          navKey: 'StoreRegist',
          navParent: '我要开店',
          navName: '注册店铺'
        }
      }
    }
  }
}
</script>
