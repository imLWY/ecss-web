import Mock from 'mockjs'

Mock.setup({
  timeout: 0 - 300
})

const getAccountByCurrent = Mock.mock(
  '/admin/users/get_account_by_current', 'post', (req, res) => {
    return {
      code: '2000',
      data: {
        address: Mock.mock('@county(true)'),
        classIds: '7,6,3',
        courseIds: '10,',
        courseNames: 'zhaokag_测试课程',
        createdAt: Mock.mock('@integer(1, 99999)'),
        createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
        creditValue: Mock.mock('@integer(1, 100)'),
        currentIntegral: 0,
        direction: '授课方向未知',
        duty: '班主任',
        email: Mock.mock('@email("huatang.com")'),
        fcard: '',
        grades: '2017年级,2018年级,2019年级',
        hightRecord: '本科',
        id: Mock.mock('@integer(1, 999999'),
        international: '中国',
        intro: '',
        isCharge: 0,
        landscape: '群众',
        lastIp: Mock.mock('@ip()'),
        lastLogin: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
        name: Mock.mock('@cname()'),
        national: '汉族',
        number: '666666',
        originalIntegral: 0,
        phone: Mock.mock('@integer(13800000000, 13899999999)'),
        photo: Mock.mock('@image("50*50")'),
        praiseRate: Mock.mock('@float(1,100,0,2)'),
        rememberToken: '',
        role: 2,
        roles: '1',
        sex: 1,
        synopsis: '',
        token: '1',
        stayPaymentOrderNum: Mock.mock('@integer(0,10)'),
        hasPaymentOrderNum: Mock.mock('@integer(0, 10)'),
        finishOrderNum: Mock.mock('@integer(0,10)'),
        sgrade: '认证店铺',
        validityTime: '无限制',
        goodsRelease: '10/20',
        useSpace: '100M/1024M',
        isSeller: '0',
        stayHandleOrderNum: Mock.mock('@integer(1, 10)'),
        stayDeliverOrderNum: Mock.mock('@integer(1, 10)'),
        updateAt: 0,
        updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss"'),
        text: '<div id="attributes" class="attributes" style="margin: 0px; padding: 0px; color: #404040; font-family: tahoma, arial, 微软雅黑, sans-serif; font-size: 12px; line-height: 18px;">' +
              '<div id="J_AttrList" class="attributes-list" style="margin: 0px 0px 10px; padding: 0px; clear: both; border-width: 0px 1px 1px; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-right-color: #e6e6e6; border-bottom-color: #e6e6e6; border-left-color: #e6e6e6;">' +
              '<ul id="J_AttrUL" style="padding-right: 20px; padding-bottom: 18px; padding-left: 20px; zoom: 1; border-top-width: 1px; border-top-style: solid; border-top-color: #ffffff;">' +
              '<li style="margin-top: 10px; margin-right: 15px; display: inline; float: left; width: 220px; height: 18px; overflow: hidden; vertical-align: top; white-space: nowrap; text-overflow: ellipsis; color: #666666;" title="&nbsp;棉100%">材质成分:&nbsp;棉100%</li>' +
              '<li style="margin-top: 10px; margin-right: 15px; display: inline; float: left; width: 220px; height: 18px; overflow: hidden; vertical-align: top; white-space: nowrap; text-overflow: ellipsis; color: #666666;" title="&nbsp;长袖">袖长:&nbsp;长袖</li>' +
              '<li style="margin-top: 10px; margin-right: 15px; display: inline; float: left; width: 220px; height: 18px; overflow: hidden; vertical-align: top; white-space: nowrap; text-overflow: ellipsis; color: #666666;" title="&nbsp;长袖"><span style="font-size: 12px;">服装版型:&nbsp;宽松</span></li>' +
              '<li style="margin-top: 10px; margin-right: 15px; display: inline; float: left; width: 220px; height: 18px; overflow: hidden; vertical-align: top; white-space: nowrap; text-overflow: ellipsis; color: #666666;" title="&nbsp;常规款">衣长:&nbsp;常规款</li>' +
              '<li style="margin-top: 10px; margin-right: 15px; display: inline; float: left; width: 220px; height: 18px; overflow: hidden; vertical-align: top; white-space: nowrap; text-overflow: ellipsis; color: #666666;" title="&nbsp;圆领">领型:&nbsp;圆领</li>' +
              '<li style="margin-top: 10px; margin-right: 15px; display: inline; float: left; width: 220px; height: 18px; overflow: hidden; vertical-align: top; white-space: nowrap; text-overflow: ellipsis; color: #666666;" title="&nbsp;蝙蝠袖">袖型:&nbsp;蝙蝠袖</li>' +
              '<li style="margin-top: 10px; margin-right: 15px; display: inline; float: left; width: 220px; height: 18px; overflow: hidden; vertical-align: top; white-space: nowrap; text-overflow: ellipsis; color: #666666;" title="&nbsp;字母">图案:&nbsp;字母</li>' +
              '<li style="margin-top: 10px; margin-right: 15px; display: inline; float: left; width: 220px; height: 18px; overflow: hidden; vertical-align: top; white-space: nowrap; text-overflow: ellipsis; color: #666666;" title="&nbsp;科幻">图案文化:&nbsp;科幻</li>' +
              '<li style="margin-top: 10px; margin-right: 15px; display: inline; float: left; width: 220px; height: 18px; overflow: hidden; vertical-align: top; white-space: nowrap; text-overflow: ellipsis; color: #666666;" title="&nbsp;通勤">风格:&nbsp;通勤</li>' +
              '<li style="margin-top: 10px; margin-right: 15px; display: inline; float: left; width: 220px; height: 18px; overflow: hidden; vertical-align: top; white-space: nowrap; text-overflow: ellipsis; color: #666666;" title="&nbsp;2013年秋季">年份季节:&nbsp;2016年秋季</li>' +
              '<li style="margin-top: 10px; margin-right: 15px; display: inline; float: left; width: 220px; height: 18px; overflow: hidden; vertical-align: top; white-space: nowrap; text-overflow: ellipsis; color: #666666;" title="&nbsp;深灰色&nbsp;黑色">主要颜色:&nbsp;深灰色&nbsp;黑色</li>' +
              '<li style="margin-top: 10px; margin-right: 15px; display: inline; float: left; width: 220px; height: 18px; overflow: hidden; vertical-align: top; white-space: nowrap; text-overflow: ellipsis; color: #666666;" title="&nbsp;XXS&nbsp;XS&nbsp;S&nbsp;M">尺码: &nbsp;S&nbsp;M</li>' +
              '</ul>' +
              '</div>' +
              '</div>' +
              '<div id="description" class="J_DetailSection tshop-psm tshop-psm-bdetaildes" style="margin: 0px; padding: 0px; width: auto; color: #404040; font-family: tahoma, arial, 微软雅黑, sans-serif; font-size: 12px; line-height: 18px;">' +
              '<div class="content ke-post" style="margin: 10px 0px 0px; padding: 0px; font-stretch: normal; font-size: 14px; line-height: 1.5; font-family: tahoma, arial, 宋体, sans-serif; width: 790px; overflow: hidden; height: auto;"><img id="desc-module-1" class="desc_anchor img-ks-lazyload" style="height: 1px; display: block; clear: both; animation: ks-fadeIn 350ms linear 0ms 1 normal both; opacity: 1; vertical-align: top;" src="https://assets.alicdn.com/kissy/1.0.0/build/imglazyload/spaceball.gif" alt="" />' +
              '<p style="margin-top: 1.12em; margin-bottom: 1.12em; line-height: 1.4;"><img class="img-ks-lazyload" style="animation: ks-fadeIn 350ms linear 0ms 1 normal both; opacity: 1; vertical-align: top; float: none;" src="https://img.alicdn.com/imgextra/i1/844629998/T2rytqXxpaXXXXXXXX_!!844629998.jpg" alt="" align="absMiddle" /><img class="img-ks-lazyload" style="animation: ks-fadeIn 350ms linear 0ms 1 normal both; opacity: 1; vertical-align: top; float: none;" src="https://img.alicdn.com/imgextra/i1/844629998/T2qHBvXxlXXXXXXXXX_!!844629998.jpg" alt="" align="absMiddle" /></p>' +
              '<p style="margin-top: 1.12em; margin-bottom: 1.12em; line-height: 1.4;"><img class="img-ks-lazyload" style="animation: ks-fadeIn 350ms linear 0ms 1 normal both; opacity: 1; vertical-align: top; float: none;" src="https://img.alicdn.com/imgextra/i1/844629998/T2Z41jXMVaXXXXXXXX_!!844629998.jpg" alt="" align="absmiddle" /></p>' +
              '<p style="margin-top: 1.12em; margin-bottom: 1.12em; line-height: 1.4;"><img class="img-ks-lazyload" style="animation: ks-fadeIn 350ms linear 0ms 1 normal both; opacity: 1; vertical-align: top; float: none;" src="https://img.alicdn.com/imgextra/i1/844629998/T2n7I0XbxaXXXXXXXX_!!844629998.jpg" alt="" align="absMiddle" /></p>' +
              '</div>' +
              '</div>'
      },
      errorKey: '',
      msg: 'SUCCESS'
    }
  }
)

const listFriendByCurrent = Mock.mock(
  '/admin/friend/list_friend_by_current', 'post', (req, res) => {
    return {
      code: '2000',
      data: [
        {
          addTime: 0,
          createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
          friendId: 11,
          friendName: Mock.mock('@cname()'),
          friendPhoto: Mock.mock('@image("", "#ffcc33", "#ffffff", "头像")'),
          id: Mock.mock('@integer(1, 1000000)'),
          ownerId: 1,
          updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")')
        },
        {
          addTime: 0,
          createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
          friendId: 11,
          friendName: Mock.mock('@cname()'),
          friendPhoto: Mock.mock('@image("", "#ffcc33", "#ffffff", "头像")'),
          id: Mock.mock('@integer(1, 1000000)'),
          ownerId: 1,
          updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")')
        },
        {
          addTime: 0,
          createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
          friendId: 11,
          friendName: Mock.mock('@cname()'),
          friendPhoto: Mock.mock('@image("", "#ffcc33", "#ffffff", "头像")'),
          id: Mock.mock('@integer(1, 1000000)'),
          ownerId: 1,
          updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")')
        },
        {
          addTime: 0,
          createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
          friendId: 11,
          friendName: Mock.mock('@cname()'),
          friendPhoto: Mock.mock('@image("", "#ffcc33", "#ffffff", "头像")'),
          id: Mock.mock('@integer(1, 1000000)'),
          ownerId: 1,
          updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")')
        },
        {
          addTime: 0,
          createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
          friendId: 11,
          friendName: Mock.mock('@cname()'),
          friendPhoto: Mock.mock('@image("", "#ffcc33", "#ffffff", "头像")'),
          id: Mock.mock('@integer(1, 1000000)'),
          ownerId: 1,
          updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")')
        }
      ]
    }
  }
)

const getHomeBannerImgs = Mock.mock(
  '/admin/home/get_home_banner_imgs', 'post', (req, res) => {
    return {
      code: '2000',
      data: [
        {
          index: 0,
          img: Mock.mock('@image("", "#ffcc33", "#ffffff", "BannerOne")'),
          rightImg: [
            {
              img: Mock.mock('@image("", "#deaa2a", "#ffffff", "BannerRightOneOne")')
            },
            {
              img: Mock.mock('@image("", "#111a2a", "#ffffff", "BannerRightOneTwo")')
            },
            {
              img: Mock.mock('@image("", "#999a2a", "#ffffff", "BannerRightOneThree")')
            }
          ]
        },
        {
          index: 1,
          img: Mock.mock('@image("", "#ffcc33", "#ffffff", "BannerTwo")'),
          rightImg: [
            {
              img: Mock.mock('@image("", "#fb0a2a", "#ffffff", "BannerRightTwoOne")')
            },
            {
              img: Mock.mock('@image("", "#1aa2a", "#ffffff", "BannerRightTwoTwo")')
            },
            {
              img: Mock.mock('@image("", "#bf0a2a", "#ffffff", "BannerRightTwoThree")')
            }
          ]
        },
        {
          index: 2,
          img: Mock.mock('@image("", "#ccff33", "#ffffff", "BannerThree")'),
          rightImg: [
            {
              img: Mock.mock('@image("", "#2a0a2a", "#ffffff", "BannerRightThreeOne")')
            },
            {
              img: Mock.mock('@image("", "#02aa2a", "#ffffff", "BannerRightThreeTwo")')
            },
            {
              img: Mock.mock('@image("", "#ff2a2a", "#ffffff", "BannerRightThreeThree")')
            }
          ]
        }
      ]
    }
  }
)

const delFriendByFriendIds = Mock.mock(
  '/admin/friend/del_friend_by_friendIds', 'post', (req, res) => {
    return {
      code: '2000',
      data: false,
      errorKey: '',
      msg: 'SUCCESS'
    }
  }
)

const myOrderList = Mock.mock(
  '/admin/order/my_order_list', 'post', (req, res) => {
    return {
      code: '2000',
      data: {
        attributes: {

        },
        dataList: [
          {
            buyerId: Mock.mock('@integer(1, 100000)'),
            buyerName: Mock.mock('@cname()'),
            createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
            deliveryTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
            discount: 1,
            evaluationStatus: 0,
            evaluationTime: null,
            goodsIds: '',
            goodsList: [
              {
                comment: '',
                createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
                creditValue: 0,
                goodsId: Mock.mock('@integer(1, 10000)'),
                goodsImage: Mock.mock('@image("", "#ffcc33", "#ffffff", "商品")'),
                goodsName: '漱口水',
                id: Mock.mock('@integer(1, 10000)'),
                isValid: 1,
                orderId: Mock.mock('@integer(1, 10000)'),
                price: Mock.mock('@float(1,1000,0,2)'),
                quantity: 1,
                specId: 274,
                specification: '',
                updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")')
              },
              {
                comment: '',
                createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
                creditValue: 0,
                goodsId: Mock.mock('@integer(1, 10000)'),
                goodsImage: Mock.mock('@image("", "#ffcc33", "#ffffff", "商品")'),
                goodsName: '漱口水',
                id: Mock.mock('@integer(1, 10000)'),
                isValid: 1,
                orderId: Mock.mock('@integer(1, 10000)'),
                price: Mock.mock('@float(1,1000,0,2)'),
                quantity: 1,
                specId: 274,
                specification: '',
                updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")')
              }
            ],
            id: Mock.mock('@integer(1, 10000)'),
            orderNumber: Mock.mock('@integer(18300000000, 18366666666)'),
            orderStatus: 1,
            orderStatusName: '待付款',
            orderTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
            paymentId: 1,
            paymentName: '支付通',
            paymentTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
            postscript: '',
            price: Mock.mock('@integer(1, 1000)'),
            sellerId: Mock.mock('@integer(1, 10000)'),
            sellerName: Mock.mock('@cname()'),
            shopName: '一生挚爱',
            updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")')
          },
          {
            buyerId: Mock.mock('@integer(1, 100000)'),
            buyerName: Mock.mock('@cname()'),
            createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
            deliveryTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
            discount: 1,
            evaluationStatus: 0,
            evaluationTime: null,
            goodsIds: '',
            goodsList: [
              {
                comment: '',
                createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
                creditValue: 0,
                goodsId: Mock.mock('@integer(1, 10000)'),
                goodsImage: Mock.mock('@image("", "#ffcc33", "#ffffff", "商品")'),
                goodsName: '漱口水',
                id: Mock.mock('@integer(1, 10000)'),
                isValid: 1,
                orderId: Mock.mock('@integer(1, 10000)'),
                price: Mock.mock('@float(1,1000,0,2)'),
                quantity: 1,
                specId: 274,
                specification: '',
                updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")')
              },
              {
                comment: '',
                createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
                creditValue: 0,
                goodsId: Mock.mock('@integer(1, 10000)'),
                goodsImage: Mock.mock('@image("", "#ffcc33", "#ffffff", "商品")'),
                goodsName: '漱口水',
                id: Mock.mock('@integer(1, 10000)'),
                isValid: 1,
                orderId: Mock.mock('@integer(1, 10000)'),
                price: Mock.mock('@float(1,1000,0,2)'),
                quantity: 1,
                specId: 274,
                specification: '',
                updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")')
              },
              {
                comment: '',
                createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
                creditValue: 0,
                goodsId: Mock.mock('@integer(1, 10000)'),
                goodsImage: Mock.mock('@image("", "#ffcc33", "#ffffff", "商品")'),
                goodsName: '漱口水',
                id: Mock.mock('@integer(1, 10000)'),
                isValid: 1,
                orderId: Mock.mock('@integer(1, 10000)'),
                price: Mock.mock('@float(1,1000,0,2)'),
                quantity: 1,
                specId: 274,
                specification: '',
                updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")')
              }
            ],
            id: Mock.mock('@integer(1, 10000)'),
            orderNumber: Mock.mock('@integer(18300000000, 18366666666)'),
            orderStatus: 1,
            orderStatusName: '待付款',
            orderTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
            paymentId: 1,
            paymentName: '支付通',
            paymentTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
            postscript: '',
            price: Mock.mock('@integer(1, 1000)'),
            sellerId: Mock.mock('@integer(1, 10000)'),
            sellerName: Mock.mock('@cname()'),
            shopName: '一生挚爱',
            updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")')
          },
          {
            buyerId: Mock.mock('@integer(1, 100000)'),
            buyerName: Mock.mock('@cname()'),
            createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
            deliveryTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
            discount: 1,
            evaluationStatus: 0,
            evaluationTime: null,
            goodsIds: '',
            goodsList: [
              {
                comment: '',
                createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
                creditValue: 0,
                goodsId: Mock.mock('@integer(1, 10000)'),
                goodsImage: Mock.mock('@image("", "#ffcc33", "#ffffff", "商品")'),
                goodsName: '漱口水',
                id: Mock.mock('@integer(1, 10000)'),
                isValid: 1,
                orderId: Mock.mock('@integer(1, 10000)'),
                price: Mock.mock('@float(1,1000,0,2)'),
                quantity: 1,
                specId: 274,
                specification: '',
                updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")')
              }
            ],
            id: Mock.mock('@integer(1, 10000)'),
            orderNumber: Mock.mock('@integer(18300000000, 18366666666)'),
            orderStatus: 1,
            orderStatusName: '已付款',
            orderTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
            paymentId: 1,
            paymentName: '支付通',
            paymentTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
            postscript: '',
            price: Mock.mock('@integer(1, 1000)'),
            sellerId: Mock.mock('@integer(1, 10000)'),
            sellerName: Mock.mock('@cname()'),
            shopName: '一生挚爱',
            updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")')
          }
        ],
        page: 1,
        pageSize: 20,
        total: 1
      },
      errorKey: '',
      msg: 'SUCCESS'
    }
  }
)

const getOrderById = Mock.mock(
  '/admin/order/get_by_id', 'get', (req, res) => {
    return {
      code: '2000',
      data: {
        buyerId: Mock.mock('@integer(1, 1000)'),
        buyerName: Mock.mock('@cname()'),
        createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
        deliveryTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
        discount: 1,
        evaluationStatus: 0,
        evaluationTime: null,
        goodsIds: '165',
        goodsList: [
          {
            comment: '',
            createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
            creditValue: 0,
            evaluation: 0,
            goodsId: 165,
            goodsImage: Mock.mock('@image("", "#ffcc33", "#ffffff", "商品")'),
            goodsName: '漱口水',
            id: Mock.mock('@integer(1, 1000)'),
            isValid: 1,
            orderId: Mock.mock('@integer(1, 1000)'),
            price: Mock.mock('@float(1, 100, 0, 2)'),
            quantity: 1,
            recId: 1,
            specId: 274,
            specification: '',
            updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")')
          },
          {
            comment: '',
            createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
            creditValue: 0,
            evaluation: 0,
            goodsId: 165,
            goodsImage: Mock.mock('@image("", "#ffcc33", "#ffffff", "商品")'),
            goodsName: '漱口水',
            id: Mock.mock('@integer(1, 1000)'),
            isValid: 1,
            orderId: Mock.mock('@integer(1, 1000)'),
            price: Mock.mock('@float(1, 100, 0, 2)'),
            quantity: 1,
            recId: 1,
            specId: 274,
            specification: '',
            updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")')
          },
          {
            comment: '',
            createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
            creditValue: 0,
            evaluation: 0,
            goodsId: 165,
            goodsImage: Mock.mock('@image("", "#ffcc33", "#ffffff", "商品")'),
            goodsName: '漱口水',
            id: Mock.mock('@integer(1, 1000)'),
            isValid: 1,
            orderId: Mock.mock('@integer(1, 1000)'),
            price: Mock.mock('@float(1, 100, 0, 2)'),
            quantity: 1,
            recId: 1,
            specId: 274,
            specification: '',
            updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")')
          }
        ],
        id: Mock.mock('@integer(1, 1000)'),
        logList: [
          {
            changedStatus: '待发货',
            createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
            id: Mock.mock('@integer(1, 1000)'),
            logId: Mock.mock('@integer(1, 1000)'),
            logTime: 0,
            operator: Mock.mock('@cname()'),
            orderId: 1,
            orderStatus: '待付款',
            remark: '',
            updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")')
          }
        ],
        orderExtmData: {
          address: Mock.mock('@county(true)'),
          consignee: '123',
          createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
          id: 24,
          orderId: 1,
          phoneMob: '',
          phoneTel: '1231212321',
          regionId: 24,
          regionName: '中国 天津市 河东区',
          shippingFee: 0,
          shippingId: 4,
          shippingName: '顺风',
          updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
          zipcode: '123'
        },
        orderNumber: '1835904310',
        orderStatus: 1,
        orderStatusName: '待付款',
        orderTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
        paymentId: 1,
        paymentName: '支付通',
        paymentTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
        postscript: '',
        price: 110,
        sellerId: 1,
        sellerName: Mock.mock('@cname()'),
        shoName: '一生挚爱',
        storeData: {
          addTime: 0,
          address: Mock.mock('@county(true)'),
          applyRemark: '',
          category: 1652,
          categoryName: '',
          certification: 'autoym,material',
          closeReason: '',
          creditValue: 15,
          description: '<p>啥都有，</p>',
          domain: '',
          enableGroupbuy: 0,
          enableRadar: 0,
          endTime: 0,
          id: 1,
          ownerCard: '13058219860714XXXX',
          ownerName: Mock.mock('@cname()'),
          praiseRate: 89.47,
          recommended: 1,
          regionId: 105,
          regionName: '中国 河北 石家庄',
          sgrade: 2,
          sortOrder: 0,
          state: 1,
          storeBanner: Mock.mock('@image("", "#ffcc33", "#ffffff", "商品")'),
          storeLogo: Mock.mock('@image("", "#ffcc33", "#ffffff", "商品")'),
          storeName: '一生挚爱',
          tel: '13081076780',
          theme: 'default|style5',
          updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
          zipcode: '050000'
        },
        updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")')
      },
      errorKey: '',
      msg: 'SUCCESS'
    }
  }
)

const applyOrderReturn = Mock.mock(
  RegExp('/admin/order/apply_return.*'), 'get', (req, res) => {
    return {
      code: '2000',
      data: true,
      errorKey: '',
      msg: 'SUCCESS'
    }
  }
)

const orderGoodsEvaluate = Mock.mock(
  RegExp('/admin/order_goods_order_goods_evaluate.*'), 'get', (req, res) => {
    return {
      code: '2000',
      data: true,
      errorKey: '',
      msg: 'SUCCESS'
    }
  }
)

const paymentOrderReceived = Mock.mock(
  RegExp('/admin/order/payment_received.*'), 'get', (req, res) => {
    return {
      code: '2000',
      data: true,
      errorKey: '',
      msg: 'SUCCESS'
    }
  }
)

const setupOrderCostSch = Mock.mock(
  RegExp('/admin/order/setup_cost_sch.*'), 'get', (req, res) => {
    return {
      code: '2000',
      data: {
        buyerId: 40,
        buyerName: '超级卖家',
        createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
        deliveryTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
        discount: 1,
        evaluationStatus: 0,
        evaluationTime: null,
        goodsAmount: 170,
        goodsIds: '165',
        goodsList: [

        ],
        id: 1,
        logList: [

        ],
        orderExtmData: {
          address: Mock.mock('@county(true)'),
          consignee: '123',
          createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
          id: 24,
          orderId: 1,
          phoneMob: '',
          phoneTel: '1231212321',
          regionId: 24,
          regionName: '中国 天津市 河东区',
          shippingFee: 0,
          shippingId: 4,
          shippingName: '顺风',
          updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
          zipcode: '123'
        },
        orderNumber: Mock.mock('@integer(18211111111, 18289999911)'),
        orderStatus: 7,
        orderStatusName: '',
        orderTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
        paymentId: 1,
        paymentName: '支付通',
        paymentTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
        postscript: '',
        price: Mock.mock('@integer(1, 1012)'),
        sellerId: 1,
        sellerName: '一生挚爱',
        shopName: '一生挚爱',
        storeDate: null,
        updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")')
      },
      errorKey: '',
      msg: 'SUCCESS'
    }
  }
)

const setupOrderCost = Mock.mock(
  RegExp('/admin/order/setup_cost.*'), 'get', (req, res) => {
    return {
      code: '2000',
      data: true,
      errorKey: '',
      msg: 'SUCCESS'
    }
  }
)

const orderInvoice = Mock.mock(
  RegExp('/admin/order/invoice.*'), 'get', (req, res) => {
    return {
      code: '2000',
      data: true,
      errorKey: '',
      msg: 'SUCCESS'
    }
  }
)

const cancelOrder = Mock.mock(
  RegExp('/admin/order/cancel_order.*'), 'get', (req, res) => {
    return {
      code: '2000',
      data: true,
      errorKey: '',
      msg: 'SUCCESS'
    }
  }
)

const orderStatus = Mock.mock(
  '/admin/order/order_status', 'get', (req, res) => {
    return {
      code: '2000',
      data: {
        data: [
          {
            label: '待付款',
            value: 1
          },
          {
            label: '已提交',
            value: 2
          },
          {
            label: '待发货',
            value: 3
          },
          {
            label: '已发货',
            value: 4
          },
          {
            label: '已完成',
            value: 5
          },
          {
            label: '已取消',
            value: 6
          },
          {
            label: '待退货',
            value: 7
          },
          {
            label: '已退货',
            value: 8
          }
        ]
      },
      errorKey: '',
      msg: 'SUCCESS'
    }
  }
)

const homeGcategory = Mock.mock(
  '/admin/gcategory/list_iterat_third_child', 'post', (req, res) => {
    return {
      code: '2000',
      data: [
        {
          id: Mock.mock('@integer(100, 10000)'),
          catename: '家装软饰',
          children: [
            {
              id: Mock.mock('@integer(10, 10000)'),
              catename: '床上用品',
              children: [
                {
                  id: Mock.mock('@integer(1, 50000)'),
                  catename: '被'
                },
                {
                  id: Mock.mock('@integer(1, 50000)'),
                  catename: '单'
                }
              ]
            }
          ]
        },
        {
          id: Mock.mock('@integer(100, 100000)'),
          catename: '粮油调味',
          children: [
            {
              id: Mock.mock('@integer(1, 100000)'),
              catename: '粮',
              children: [
                {
                  id: Mock.mock('@integer(1, 10000)'),
                  catename: '米'
                },
                {
                  id: Mock.mock('@integer(1, 10000)'),
                  catename: '面'
                }
              ]
            }
          ]
        }
      ],
      errorKey: '',
      msg: 'SUCCESS'
    }
  }
)

const userGcategory = Mock.mock(
  '/admin/user/gcategory/list_iterat_second_child', 'post', (req, res) => {
    return {
      code: '2000',
      data: [
        {
          id: Mock.mock('@integer(1, 10000)'),
          name: Mock.mock('@cname()'),
          orderBy: Mock.mock('@integer(1, 100)'),
          isShow: Mock.mock('@integer(0, 1)'),
          children: [
            {
              id: Mock.mock('@integer(1, 10000)'),
              name: Mock.mock('@cname()'),
              orderBy: Mock.mock('@integer(1, 100)'),
              isShow: Mock.mock('@integer(0, 1)')
            },
            {
              id: Mock.mock('@integer(1, 10000)'),
              name: Mock.mock('@cname()'),
              orderBy: Mock.mock('@integer(1, 100)'),
              isShow: Mock.mock('@integer(0, 1)')
            },
            {
              id: Mock.mock('@integer(1, 10000)'),
              name: Mock.mock('@cname()'),
              orderBy: Mock.mock('@integer(1, 100)'),
              isShow: Mock.mock('@integer(0, 1)')
            }
          ]
        },
        {
          id: Mock.mock('@integer(1, 10000)'),
          name: Mock.mock('@cname()'),
          orderBy: Mock.mock('@integer(1, 100)'),
          isShow: Mock.mock('@integer(0, 1)'),
          children: [
            {
              id: Mock.mock('@integer(1, 10000)'),
              name: Mock.mock('@cname()'),
              orderBy: Mock.mock('@integer(1, 100)'),
              isShow: Mock.mock('@integer(0, 1)')
            },
            {
              id: Mock.mock('@integer(1, 10000)'),
              name: Mock.mock('@cname()'),
              orderBy: Mock.mock('@integer(1, 100)'),
              isShow: Mock.mock('@integer(0, 1)')
            },
            {
              id: Mock.mock('@integer(1, 10000)'),
              name: Mock.mock('@cname()'),
              orderBy: Mock.mock('@integer(1, 100)'),
              isShow: Mock.mock('@integer(0, 1)')
            },
            {
              id: Mock.mock('@integer(1, 10000)'),
              name: Mock.mock('@cname()'),
              orderBy: Mock.mock('@integer(1, 100)'),
              isShow: Mock.mock('@integer(0, 1)')
            },
            {
              id: Mock.mock('@integer(1, 10000)'),
              name: Mock.mock('@cname()'),
              orderBy: Mock.mock('@integer(1, 100)'),
              isShow: Mock.mock('@integer(0, 1)')
            }
          ]
        },
        {
          id: Mock.mock('@integer(1, 10000)'),
          name: Mock.mock('@cname()'),
          orderBy: Mock.mock('@integer(1, 100)'),
          isShow: Mock.mock('@integer(0, 1)'),
          children: [
            {
              id: Mock.mock('@integer(1, 10000)'),
              name: Mock.mock('@cname()'),
              orderBy: Mock.mock('@integer(1, 100)'),
              isShow: Mock.mock('@integer(0, 1)')
            }
          ]
        },
        {
          id: Mock.mock('@integer(1, 10000)'),
          name: Mock.mock('@cname()'),
          orderBy: Mock.mock('@integer(1, 100)'),
          isShow: Mock.mock('@integer(0, 1)'),
          children: [
            {
              id: Mock.mock('@integer(1, 10000)'),
              name: Mock.mock('@cname()'),
              orderBy: Mock.mock('@integer(1, 100)'),
              isShow: Mock.mock('@integer(0, 1)')
            },
            {
              id: Mock.mock('@integer(1, 10000)'),
              name: Mock.mock('@cname()'),
              orderBy: Mock.mock('@integer(1, 100)'),
              isShow: Mock.mock('@integer(0, 1)')
            }
          ]
        }
      ],
      errorKey: '',
      msg: 'SUCCESS'
    }
  }
)

const homeGoodList = Mock.mock(
  '/admin/recommended_goods/list_recommended_goods', 'post', (req, res) => {
    return {
      code: '2000',
      data: {
        1: [
          {
            id: 1,
            goodsName: '新品001',
            recomId: 1,
            sortOrder: 0,
            goodsId: 169,
            goodsPrice: 6900,
            goodsPhoto: 'http://192.168.6.225:9091/ecssfile/ECSS/goods/ac38c26206a245c8a25abb7ed2a188ec.jpg',
            createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm)'),
            updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")')
          },
          {
            id: 2,
            goodsName: '新品002',
            recomId: 1,
            sortOrder: 0,
            goodsId: 169,
            goodsPrice: 6500,
            goodsPhoto: 'http://192.168.6.225:9091/ecssfile/ECSS/goods/ac38c26206a245c8a25abb7ed2a188ec.jpg',
            createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm)'),
            updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")')
          },
          {
            id: 3,
            goodsName: '新品001',
            recomId: 1,
            sortOrder: 0,
            goodsId: 169,
            goodsPrice: 6100,
            goodsPhoto: 'http://192.168.6.225:9091/ecssfile/ECSS/goods/ac38c26206a245c8a25abb7ed2a188ec.jpg',
            createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm)'),
            updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")')
          }
        ],
        2: [
          {
            id: 21,
            goodsName: '喜欢021',
            recomId: 2,
            sortOrder: 0,
            goodsId: 169,
            goodsPrice: 5800,
            goodsPhoto: 'http://192.168.6.225:9091/ecssfile/ECSS/goods/ac38c26206a245c8a25abb7ed2a188ec.jpg',
            createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm)'),
            updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")')
          },
          {
            id: 22,
            goodsName: '喜欢022',
            recomId: 2,
            sortOrder: 0,
            goodsId: 169,
            goodsPrice: 4800,
            goodsPhoto: 'http://192.168.6.225:9091/ecssfile/ECSS/goods/ac38c26206a245c8a25abb7ed2a188ec.jpg',
            createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm)'),
            updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")')
          },
          {
            id: 23,
            goodsName: '喜欢023',
            recomId: 2,
            sortOrder: 0,
            goodsId: 169,
            goodsPrice: 7800,
            goodsPhoto: 'http://192.168.6.225:9091/ecssfile/ECSS/goods/ac38c26206a245c8a25abb7ed2a188ec.jpg',
            createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm)'),
            updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")')
          },
          {
            id: 24,
            goodsName: '喜欢024',
            recomId: 2,
            sortOrder: 0,
            goodsId: 169,
            goodsPrice: 6100,
            goodsPhoto: 'http://192.168.6.225:9091/ecssfile/ECSS/goods/ac38c26206a245c8a25abb7ed2a188ec.jpg',
            createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm)'),
            updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")')
          }
        ],
        3: [
          {
            id: 31,
            goodsName: '喜欢031',
            recomId: 3,
            sortOrder: 0,
            goodsId: 169,
            goodsPrice: 6800,
            goodsPhoto: 'http://192.168.6.225:9091/ecssfile/ECSS/goods/ac38c26206a245c8a25abb7ed2a188ec.jpg',
            createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm)'),
            updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")')
          },
          {
            id: 32,
            goodsName: '喜欢001',
            recomId: 3,
            sortOrder: 0,
            goodsId: 169,
            goodsPrice: 6800,
            goodsPhoto: 'http://192.168.6.225:9091/ecssfile/ECSS/goods/ac38c26206a245c8a25abb7ed2a188ec.jpg',
            createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm)'),
            updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")')
          }
        ],
        4: [
          {
            id: 41,
            goodsName: '推荐041',
            recomId: 4,
            sortOrder: 0,
            goodsId: 169,
            goodsPrice: 6200,
            goodsPhoto: 'http://192.168.6.225:9091/ecssfile/ECSS/goods/ac38c26206a245c8a25abb7ed2a188ec.jpg',
            createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm)'),
            updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")')
          },
          {
            id: 42,
            goodsName: '推荐042',
            recomId: 4,
            sortOrder: 0,
            goodsId: 169,
            goodsPrice: 6800,
            goodsPhoto: 'http://192.168.6.225:9091/ecssfile/ECSS/goods/ac38c26206a245c8a25abb7ed2a188ec.jpg',
            createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm)'),
            updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")')
          },
          {
            id: 43,
            goodsName: '推荐043',
            recomId: 1,
            sortOrder: 0,
            goodsId: 169,
            goodsPrice: 6800,
            goodsPhoto: 'http://192.168.6.225:9091/ecssfile/ECSS/goods/ac38c26206a245c8a25abb7ed2a188ec.jpg',
            createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm)'),
            updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")')
          }
        ]
      },
      errorKey: '',
      msg: 'SUCCESS'
    }
  }
)

const regions = Mock.mock(
  '/admin/region/all', 'post', (req, res) => {
    return {
      code: '2000',
      data: [
        {
          id: 1,
          regionName: '中国',
          children: [
            {
              id: 2,
              regionName: '北京',
              children: [
                {
                  id: Mock.mock('@integer(1, 1000)'),
                  regionName: '朝阳'
                },
                {
                  id: Mock.mock('@integer(1, 1000)'),
                  regionName: '海淀'
                },
                {
                  id: Mock.mock('@integer(1, 1000)'),
                  regionName: '东城'
                },
                {
                  id: Mock.mock('@integer(1, 1000)'),
                  regionName: '西城'
                }
              ]
            },
            {
              id: 3,
              regionName: '天津',
              children: [
                {
                  id: Mock.mock('@integer(1, 1000)'),
                  regionName: '武请'
                },
                {
                  id: Mock.mock('@integer(1, 1000)'),
                  regionName: '静海'
                },
                {
                  id: Mock.mock('@integer(1, 1000)'),
                  regionName: '滨海'
                },
                {
                  id: Mock.mock('@integer(1, 1000)'),
                  regionName: '南开'
                }
              ]
            }
          ]
        }
      ],
      errorKey: '',
      msg: 'SUCCESS'
    }
  }
)

const storesIncome = Mock.mock(
  '/store/get_stores_orderby_income', 'post', (req, res) => {
    return {
      code: '2000',
      data: [
        {
          classNames: Mock.mock('@cword("一二三四五", 1, 1)') + '班',
          createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")'),
          date: 0,
          id: Mock.mock('@integer(100,100000)'),
          money: Mock.mock('@float(100000, 1000000, 0, 2)'),
          moneyShow: '',
          orderId: 0,
          orders: 0,
          sellerId: 1,
          status: 0,
          storeId: 1,
          storeLogo: Mock.mock('@image("", "#ffcc33", "#ffffff", "StoreLogo")'),
          storeName: '昆明鲜花',
          updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")'),
          userId: 0,
          userName: Mock.mock('@cname()'),
          userNameShow: ''
        },
        {
          classNames: Mock.mock('@cword("一二三四五", 1, 1)') + '班',
          createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")'),
          date: 0,
          id: Mock.mock('@integer(100,100000)'),
          money: Mock.mock('@float(10000, 100000, 0, 2)'),
          moneyShow: '',
          orderId: 0,
          orders: 0,
          sellerId: 1,
          status: 0,
          storeId: 1,
          storeLogo: Mock.mock('@image("", "#ffcc33", "#ffffff", "StoreLogo")'),
          storeName: '昆明鲜花',
          updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")'),
          userId: 0,
          userName: Mock.mock('@cname()'),
          userNameShow: ''
        },
        {
          classNames: Mock.mock('@cword("一二三四五", 1, 1)') + '班',
          createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")'),
          date: 0,
          id: Mock.mock('@integer(100,100000)'),
          money: Mock.mock('@float(1000, 10000, 0, 2)'),
          moneyShow: '',
          orderId: 0,
          orders: 0,
          sellerId: 1,
          status: 0,
          storeId: 1,
          storeLogo: Mock.mock('@image("", "#ffcc33", "#ffffff", "StoreLogo")'),
          storeName: '昆明鲜花',
          updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")'),
          userId: 0,
          userName: Mock.mock('@cname()'),
          userNameShow: ''
        },
        {
          classNames: Mock.mock('@cword("一二三四五", 1, 1)') + '班',
          createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")'),
          date: 0,
          id: Mock.mock('@integer(100,100000)'),
          money: Mock.mock('@float(100, 1000, 0, 2)'),
          moneyShow: '',
          orderId: 0,
          orders: 0,
          sellerId: 1,
          status: 0,
          storeId: 1,
          storeLogo: Mock.mock('@image("", "#ffcc33", "#ffffff", "StoreLogo")'),
          storeName: '昆明鲜花',
          updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")'),
          userId: 0,
          userName: Mock.mock('@cname()'),
          userNameShow: ''
        },
        {
          classNames: Mock.mock('@cword("一二三四五", 1, 1)') + '班',
          createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")'),
          date: 0,
          id: Mock.mock('@integer(100,100000)'),
          money: Mock.mock('@float(10, 100, 0, 2)'),
          moneyShow: '',
          orderId: 0,
          orders: 0,
          sellerId: 1,
          status: 0,
          storeId: 1,
          storeLogo: Mock.mock('@image("", "#ffcc33", "#ffffff", "StoreLogo")'),
          storeName: '昆明鲜花',
          updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")'),
          userId: 0,
          userName: Mock.mock('@cname()'),
          userNameShow: ''
        }
      ],
      errorKey: '',
      msg: 'SUCCESS'
    }
  }
)

const storesRecommend = Mock.mock(
  '/store/get_orderby_recommend', 'post', (req, res) => {
    return {
      code: '2000',
      data: [
        {
          addTime: 0,
          address: Mock.mock('@county(true)'),
          applyRemark: '',
          category: Mock.mock('@integer(1, 5)'),
          categoryName: '',
          certification: '',
          closeReason: '',
          createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")'),
          creditValue: 0,
          description: '',
          domain: '',
          enableGroupbuy: 0,
          enableRadar: 0,
          endTime: 0,
          id: Mock.mock('@integer(1, 500)'),
          ownerCard: Mock.mock('@integer(110110110110110110, 111111111111111111)'),
          ownerName: Mock.mock('@cname()'),
          praiseRate: Mock.mock('@float(1, 100, 0, 2)'),
          recommended: Mock.mock('@integer(0, 1)'),
          regionId: Mock.mock('@integer(1, 100)'),
          regionName: Mock.mock('@county(true)'),
          sgrade: 2,
          sortOrder: 1,
          state: 1,
          storeBanner: '',
          storeLogo: Mock.mock('@image("", "#ffcc33", "#ffffff", "StoreLogo")'),
          storeName: Mock.mock('@cword("一二三四五", 1, 1)') + '店',
          tel: '13242345678',
          theme: '',
          updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")'),
          zipcode: '111111'
        },
        {
          addTime: 0,
          address: Mock.mock('@county(true)'),
          applyRemark: '',
          category: Mock.mock('@integer(1, 5)'),
          categoryName: '',
          certification: '',
          closeReason: '',
          createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")'),
          creditValue: 0,
          description: '',
          domain: '',
          enableGroupbuy: 0,
          enableRadar: 0,
          endTime: 0,
          id: Mock.mock('@integer(1, 500)'),
          ownerCard: Mock.mock('@integer(110110110110110110, 111111111111111111)'),
          ownerName: Mock.mock('@cname()'),
          praiseRate: Mock.mock('@float(1, 100, 0, 2)'),
          recommended: Mock.mock('@integer(0, 1)'),
          regionId: Mock.mock('@integer(1, 100)'),
          regionName: Mock.mock('@county(true)'),
          sgrade: 2,
          sortOrder: 1,
          state: 1,
          storeBanner: '',
          storeLogo: Mock.mock('@image("", "#ffcc33", "#ffffff", "StoreLogo")'),
          storeName: Mock.mock('@cword("一二三四五", 1, 1)') + '店',
          tel: '13242345678',
          theme: '',
          updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")'),
          zipcode: '111111'
        },
        {
          addTime: 0,
          address: Mock.mock('@county(true)'),
          applyRemark: '',
          category: Mock.mock('@integer(1, 5)'),
          categoryName: '',
          certification: '',
          closeReason: '',
          createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")'),
          creditValue: 0,
          description: '',
          domain: '',
          enableGroupbuy: 0,
          enableRadar: 0,
          endTime: 0,
          id: Mock.mock('@integer(1, 500)'),
          ownerCard: Mock.mock('@integer(110110110110110110, 111111111111111111)'),
          ownerName: Mock.mock('@cname()'),
          praiseRate: Mock.mock('@float(1, 100, 0, 2)'),
          recommended: Mock.mock('@integer(0, 1)'),
          regionId: Mock.mock('@integer(1, 100)'),
          regionName: Mock.mock('@county(true)'),
          sgrade: 2,
          sortOrder: 1,
          state: 1,
          storeBanner: '',
          storeLogo: Mock.mock('@image("", "#ffcc33", "#ffffff", "StoreLogo")'),
          storeName: Mock.mock('@cword("一二三四五", 1, 1)') + '店',
          tel: '13242345678',
          theme: '',
          updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")'),
          zipcode: '111111'
        },
        {
          addTime: 0,
          address: Mock.mock('@county(true)'),
          applyRemark: '',
          category: Mock.mock('@integer(1, 5)'),
          categoryName: '',
          certification: '',
          closeReason: '',
          createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")'),
          creditValue: 0,
          description: '',
          domain: '',
          enableGroupbuy: 0,
          enableRadar: 0,
          endTime: 0,
          id: Mock.mock('@integer(1, 500)'),
          ownerCard: Mock.mock('@integer(110110110110110110, 111111111111111111)'),
          ownerName: Mock.mock('@cname()'),
          praiseRate: Mock.mock('@float(1, 100, 0, 2)'),
          recommended: Mock.mock('@integer(0, 1)'),
          regionId: Mock.mock('@integer(1, 100)'),
          regionName: Mock.mock('@county(true)'),
          sgrade: 2,
          sortOrder: 1,
          state: 1,
          storeBanner: '',
          storeLogo: Mock.mock('@image("", "#ffcc33", "#ffffff", "StoreLogo")'),
          storeName: Mock.mock('@cword("一二三四五", 1, 1)') + '店',
          tel: '13242345678',
          theme: '',
          updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")'),
          zipcode: '111111'
        },
        {
          addTime: 0,
          address: Mock.mock('@county(true)'),
          applyRemark: '',
          category: Mock.mock('@integer(1, 5)'),
          categoryName: '',
          certification: '',
          closeReason: '',
          createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")'),
          creditValue: 0,
          description: '',
          domain: '',
          enableGroupbuy: 0,
          enableRadar: 0,
          endTime: 0,
          id: Mock.mock('@integer(1, 500)'),
          ownerCard: Mock.mock('@integer(110110110110110110, 111111111111111111)'),
          ownerName: Mock.mock('@cname()'),
          praiseRate: Mock.mock('@float(1, 100, 0, 2)'),
          recommended: Mock.mock('@integer(0, 1)'),
          regionId: Mock.mock('@integer(1, 100)'),
          regionName: Mock.mock('@county(true)'),
          sgrade: 2,
          sortOrder: 1,
          state: 1,
          storeBanner: '',
          storeLogo: Mock.mock('@image("", "#ffcc33", "#ffffff", "StoreLogo")'),
          storeName: Mock.mock('@cword("一二三四五", 1, 1)') + '店',
          tel: '13242345678',
          theme: '',
          updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")'),
          zipcode: '111111'
        },
        {
          addTime: 0,
          address: Mock.mock('@county(true)'),
          applyRemark: '',
          category: Mock.mock('@integer(1, 5)'),
          categoryName: '',
          certification: '',
          closeReason: '',
          createdTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")'),
          creditValue: 0,
          description: '',
          domain: '',
          enableGroupbuy: 0,
          enableRadar: 0,
          endTime: 0,
          id: Mock.mock('@integer(1, 500)'),
          ownerCard: Mock.mock('@integer(110110110110110110, 111111111111111111)'),
          ownerName: Mock.mock('@cname()'),
          praiseRate: Mock.mock('@float(1, 100, 0, 2)'),
          recommended: Mock.mock('@integer(0, 1)'),
          regionId: Mock.mock('@integer(1, 100)'),
          regionName: Mock.mock('@county(true)'),
          sgrade: 2,
          sortOrder: 1,
          state: 1,
          storeBanner: '',
          storeLogo: Mock.mock('@image("", "#ffcc33", "#ffffff", "StoreLogo")'),
          storeName: Mock.mock('@cword("一二三四五", 1, 1)') + '店',
          tel: '13242345678',
          theme: '',
          updatedTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm")'),
          zipcode: '111111'
        }
      ],
      errorKey: '',
      msg: 'SUCCESS'
    }
  }
)

const currentUserInfo = Mock.mock(
  '/admin/users/get_info_by_current', 'post', (req, res) => {
    return {
      code: '2000',
      data: {
        address: '',
        classIds: '',
        classNames: '',
        courseIds: '',
        courseNames: '',
        createAt: 0,
        createdTime: '',
        creditValue: 0,
        currentIntegral: Mock.mock('@integer(1, 10000)'),
        direction: '',
        duty: '',
        email: '',
        fcard: '',
        finishOrderNum: 0,
        goodsRelease: '',
        grades: '',
        hasPaymentOrderNum: 0,
        hightRecord: '',
        id: 1,
        international: '',
        intro: '',
        isCharge: 0,
        isSeller: '',
        landscape: '',
        lastIp: '1',
        lastLogin: 0,
        name: Mock.mock('@cname()'),
        national: '',
        number: '88888888',
        originalIntegral: 0,
        phone: '',
        photo: Mock.mock('@image("", "#ffcc33", "#ffffff", "StoreLogo")'),
        praiseRate: 0,
        rememberToken: '',
        role: '1',
        roles: '1',
        sex: 1,
        sgrade: '',
        stayDeliverOrderNum: 0,
        stayHandleOrderNum: 0,
        stayPaymentOrderNum: 0,
        synopsis: 'bnbnbnbnb',
        token: '1',
        updatedAt: 11111,
        updatedTime: '',
        useSpace: '',
        validityTime: ''
      },
      errorKey: '',
      msg: 'SUCCESS'
    }
  }
)

export default {
  getAccountByCurrent,
  listFriendByCurrent,
  getHomeBannerImgs,
  delFriendByFriendIds,
  myOrderList,
  getOrderById,
  applyOrderReturn,
  orderGoodsEvaluate,
  paymentOrderReceived,
  setupOrderCostSch,
  setupOrderCost,
  orderInvoice,
  cancelOrder,
  orderStatus,
  homeGcategory,
  userGcategory,
  homeGoodList,
  regions,
  storesIncome,
  storesRecommend,
  currentUserInfo
}
