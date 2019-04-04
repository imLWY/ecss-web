/** 获取当前用户信息 */
const getAccountByCurrent = {
  type: 'post',
  target: '/admin/users/get_account_by_current'
}

/** 查询好友列表 */
const listFriendByCurrent = {
  type: 'post',
  target: '/admin/friend/list_friend_by_current'
}

/** 获取主页Banner图片 */
const getHomeBannerImgs = {
  type: 'post',
  target: '/admin/home/get_home_banner_imgs'
}

/** 单个,批量删除好友 */
const delFriendByFriendIds = {
  type: 'post',
  target: '/admin/friend/del_friend_by_friendIds'
}

/** 我的订单查询 */
const myOrderList = {
  type: 'post',
  target: '/admin/order/my_order_list'
}

const orderManageList = {
  type: 'post',
  target: '/admin/order/order_manage_list'
}

/** 我的订单查询详情 */
const getOrderById = {
  type: 'get',
  target: '/admin/order/get_by_id'
}

/** 我的订单-申请退货 */
const applyOrderReturn = {
  type: 'get',
  target: '/admin/order/apply_return'
}

/** 我的订单-订单评价 */
const orderGoodsEvaluate = {
  type: 'get',
  target: '/admin/order_goods_order_goods_evaluate'
}

/** 订单管理-收到货款 */
const paymentOrderReceived = {
  type: 'post',
  target: '/admin/order/payment_received'
}

/** 订单管理-费用调整-查询 */
const setupOrderCostSch = {
  type: 'get',
  target: '/admin/order/setup_cost_sch'
}

/** 订单管理-费用调整-修改 */
const setupOrderCost = {
  type: 'get',
  target: '/admin/order/setup_cost'
}

/** 订单管理-发货/修改 单号 */
const orderInvoice = {
  type: 'post',
  target: '/admin/order/invoice'
}

/** 订单管理-取消订单 */
const cancelOrder = {
  type: 'get',
  target: '/admin/order/cancel_order'
}

/** 订单所有状态查询 */
const orderStatus = {
  type: 'get',
  target: '/admin/order/order_status'
}

/** 首页商品分类 */
const homeGcategory = {
  type: 'post',
  target: '/admin/gcategory/list_iterat_third_child'
}

/** 店铺分类 */
const storeCategory = {
  type: 'post',
  target: '/admin/scategory/list_iterat_second_child'
}

/** 分类管理table数据接口 */
const userGcategory = {
  type: 'post',
  target: '/admin/gcategory/list_iterat_second_child'
}

const gcategoryByStore = {
  type: 'post',
  target: '/admin/gcategory/get_gcategory_by_store'
}

/** 首页 商品列表 新品/热卖/推荐/喜欢 */
const homeGoodsList = {
  type: 'post',
  target: '/admin/recommended_goods/list_recommended_goods'
}

/** 获取所有地区 */
const regions = {
  type: 'post',
  target: '/admin/region/get_all_region'
}

/** 店铺收入排行 */
const storesIncome = {
  type: 'post',
  target: '/store/get_stores_orderby_income'
}

/** 店铺推广排行 */
const storesRecommend = {
  type: 'post',
  target: '/store/get_orderby_recommend'
}

/** 获取当前用户信息 */
const currentUserInfo = {
  type: 'post',
  target: '/admin/users/get_Info_by_current'
}

/** 商品详情接口 */
const goodDetail = {
  type: 'get',
  target: '/admin/goods/get_by_id'
}

/** 获取当前用户商铺信息 */
const myStore = {
  type: 'get',
  target: '/store/get_my_store'
}

/** 根据店铺ID获取店内一级分类 */
const myStoreGcategory = {
  type: 'post',
  target: '/admin/gcategory/get_my_store_gcategory'
}

/** 获取店铺主商品分类 */
const storeMainGcategory = {
  type: 'post',
  target: '/admin/gcategory/list_iterat_first_list'
}

/** 获取商铺一级分类下的商品 */
const gcategoryGoods = {
  type: 'post',
  target: '/admin/category_goods/get_goods_by_cateid'
}

/** 根据商品分类ID获取商品列表 */
const goodsByGcategoryId = {
  type: 'post',
  target: '/admin/goods/list_goods_by_gcategory'
}

/** 获取店铺推荐商品 */
const getRecommendedGoodsByStore = {
  type: 'post',
  target: '/admin/goods/get_recommended_goods_by_store'
}

/** 获取店铺新品商品 */
const getNewGoodsByStore = {
  type: 'post',
  target: '/admin/goods/get_new_goods_by_store'
}

/** 获取店铺全部商品 */
const getAllGoodsByStore = {
  type: 'post',
  target: '/admin/goods/get_all_goods_by_store'
}

/** 获取商品评论 */
const goodsComments = {
  type: 'post',
  target: '/admin/order_goods/list_comments_by_goodsid'
}

/** 根据ID获取商品分类信息 */
const getGcategoryById = {
  type: 'post',
  target: '/admin/gcategory/get_by_id'
}

/** 根据分类ID获取品牌信息 */
const getBrandsByGcategoryId = {
  type: 'post',
  target: '/admin/brand/list_all'
}

/** 图片上传路径 */
const uploadStoreImgPath = {
  type: 'post',
  target: 'http://192.168.10.63:9798/fileUpload/uploadStoreImgs.action'
}

/** 注册店铺 */
const createStore = {
  type: 'post',
  target: '/store/create_my_store'
}

/** 根据商铺获取购物车商品信息 */
const getGoodsInCartByStore = {
  type: 'post',
  target: '/admin/cart/list_all_by_current'
}

/** 通过购物车下订单 */
const createOrderByCart = {
  type: 'post',
  target: '/admin/order/create_order_from_shop_car'
}

/** 订单支付 */
const orderPay = {
  type: 'post',
  target: '/admin/order/order_pay'
}

/** 添加商铺商品分类 */
const addGcategoryForStore = {
  type: 'post',
  target: '/admin/gcategory/add_gcategory_for_store'
}

/** 根据ID更新商铺商品分类 */
const updGcategoryById = {
  type: 'post',
  target: '/admin/gcategory/update_by_id'
}

/** 根据ID删除商铺商品分类 */
const delGcategoryById = {
  type: 'get',
  target: '/admin/gcategory/remove_by_id'
}

/** 根据商铺ID查询配送方式 */
const shippingByStore = {
  type: 'post',
  target: '/admin/shipping/get_shipping_by_store'
}

/** 获取商铺信用评价统计 */
const evaluationByStore = {
  type: 'get',
  target: '/admin/evaluation_statistics/get_by_store_id'
}

/** 获取商铺评价数据 */
const evaluationDataByStore = {
  type: 'get',
  target: '/admin/order_goods/list_evaluation_by_storeid'
}

/** 积分兑换接口 */
const integralExchange = {
  type: 'post',
  target: '/admin/integral_exchange_record/create'
}

const getPaymentByStore = {
  type: 'post',
  target: '/admin/payment/get_by_store_id'
}

export default {
  getAccountByCurrent,
  listFriendByCurrent,
  getHomeBannerImgs,
  delFriendByFriendIds,
  myOrderList,
  orderManageList,
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
  storeCategory,
  userGcategory,
  homeGoodsList,
  regions,
  storesIncome,
  storesRecommend,
  currentUserInfo,
  goodDetail,
  myStore,
  myStoreGcategory,
  storeMainGcategory,
  gcategoryGoods,
  getRecommendedGoodsByStore,
  getNewGoodsByStore,
  getAllGoodsByStore,
  goodsComments,
  getGcategoryById,
  goodsByGcategoryId,
  getBrandsByGcategoryId,
  uploadStoreImgPath,
  createStore,
  getGoodsInCartByStore,
  createOrderByCart,
  orderPay,
  gcategoryByStore,
  addGcategoryForStore,
  updGcategoryById,
  delGcategoryById,
  shippingByStore,
  evaluationByStore,
  evaluationDataByStore,
  integralExchange,
  getPaymentByStore
}
