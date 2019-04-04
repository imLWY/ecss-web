/** 店铺图片上传 */
const uploadStoreImgUrl = {
  target: 'http://192.168.10.63:9798/fileUpload/uploadStoreImgs.action'
}
/** 获取我的地址信息 */
const getAddress = {
  type: 'post',
  target: '/admin/address/list_all'
}
/** 获取我的收藏信息 */
const getCollect = {
  type: 'post',
  target: '/admin/collect/collectList'
}

/** 获取我的咨询信息 */
const getConsult = {
  type: 'post',
  target: '/admin/goods_qa/my_list'
}
/** 获取配送方式管理列表 */
const getShipping = {
  type: 'post',
  target: '/admin/shipping/my_list_all'
}
/** 获取导航管理列表 */
const getArticle = {
  type: 'post',
  target: '/admin/article/my_list_all'
}
/** 获取我的优惠券列表 */
const getUserCoupon = {
  type: 'post',
  target: 'admin/user_coupon/my_list'
}
/** 获取订单添加商品信息 */
const getGoodsAndSpec = {
  type: 'get',
  target: '/admin/goods/get_goods'
}
/** 提交订单 */
const addGoodsOrder = {
  type: 'post',
  target: '/admin/order/order_now'
}
/** 我的地址地区选择 */
const getRegion = {
  type: 'get',
  target: '/admin/region/get_all_region'
}
/** 添加我的地址信息 */
const addAddress = {
  type: 'post',
  target: '/admin/address/create_my_address'
}
/** 删除我的地址 */
const delAddress = {
  type: 'get',
  target: '/admin/address/remove_by_id'
}
/** 根据id查询我的地址 */
const getAddressById = {
  type: 'get',
  target: '/admin/address/get_by_id'
}
/** 我的收藏根据主键删除 */
const delCollectById = {
  type: 'get',
  target: '/admin/collect/remove_by_id'
}
/** 批量删除我的收藏 */
const delCollectByIds = {
  type: 'post',
  target: '/admin/collect/remove_by_ids'
}
/** 删除单个我的优惠券 */
const delUserCouponById = {
  type: 'get',
  target: '/admin/user_coupon/remove_by_id'
}
/** 批量删除我的优惠券 */
const delUserCouponByIds = {
  type: 'post',
  target: '/admin/user_coupon/remove_by_ids'
}
/** 登记我的优惠券 */
const addUserCoupon = {
  type: 'post',
  target: '/admin/user_coupon/register_counpon'
}
/** 优惠券管理列表 */
const getCouponList = {
  type: 'post',
  target: '/admin/coupon/manage_list'
}
/** 删除单个优惠券 */
const delCouponById = {
  type: 'get',
  target: '/admin/coupon/remove_by_id'
}
/** 批量删除优惠券 */
const delCouponByIds = {
  type: 'post',
  target: '/admin/coupon/remove_by_ids'
}
/** 获取咨询管理列表信息 */
const getConsultManageList = {
  type: 'post',
  target: '/admin/goods_qa/qa_manage_list'
}
/** 咨询管理单个删除 */
const delConsultManageById = {
  type: 'get',
  target: '/admin/goods_qa/remove_by_id'
}
/** 咨询管理批量删除 */
const delConsultManageByIds = {
  type: 'post',
  target: '/admin/goods_qa/remove_by_ids'
}
/** 咨询管理回复 */
const replyConsultManage = {
  type: 'post',
  target: '/admin/goods_qa/update_by_id'
}
/** 新增优惠券 */
const addCoupon = {
  type: 'post',
  target: '/admin/coupon/create'
}
/** 根据id查询优惠券 */
const getCouponById = {
  type: 'get',
  target: '/admin/coupon/get_by_id'
}
/** 编辑优惠券 */
const updCoupon = {
  type: 'post',
  target: '/admin/coupon/update_by_id'
}
/** 导出优惠券号码 */
const exportCouponSn = {
  type: 'get',
  target: '/admin/coupon_sn/exportCouponSn'
}
/** 优惠券发放 */
const grantCouponSn = {
  type: 'post',
  target: '/admin/coupon_sn/grant_couponSn'
}
/** 新增配送方式 */
const addShipping = {
  type: 'post',
  target: '/admin/shipping/create_my_shipping'
}
/** 编辑配送方式 */
const updShipping = {
  type: 'post',
  target: '/admin/shipping/update_by_id'
}
/** 编辑查询配送方式 */
const getShippingById = {
  type: 'get',
  target: '/admin/shipping/get_by_id'
}
/** 删除配送方式 */
const delShippingById = {
  type: 'get',
  target: '/admin/shipping/remove_by_id'
}
/** 新增导航 */
const addArticle = {
  type: 'post',
  target: '/admin/article/my_create'
}
/** 编辑查询导航 */
const getArticleById = {
  type: 'get',
  target: '/admin/article/get_by_id'
}
/** 编辑导航 */
const updArticle = {
  type: 'post',
  target: '/admin/article/update_by_id'
}
/** 单个删除导航 */
const delArticleById = {
  type: 'get',
  target: '/admin/article/remove_by_id'
}
/** 批量删除导航 */
const delArticleByIds = {
  type: 'post',
  target: '/admin/article/remove_by_ids'
}
/** 店铺设置查询 */
const getMyStore = {
  type: 'get',
  target: '/store/get_my_store'
}
/** 店铺设置编辑 */
const updMyStore = {
  type: 'post',
  target: '/store/update_by_id'
}
/** 品牌列表查询 */
const getBrandList = {
  type: 'post',
  target: '/admin/brand/list'
}
/** 品牌申请 */
const addMyBrand = {
  type: 'post',
  target: '/admin/brand/my_create'
}
/** 品牌编辑查询 */
const getBrandById = {
  type: 'get',
  target: '/admin/brand/get_by_id'
}
/** 品牌编辑 */
const updBrandById = {
  type: 'post',
  target: '/admin/brand/update_by_id'
}
/** 云商品库列表查询 */
const getYunGoodsList = {
  type: 'post',
  target: '/admin/yun_goods/yun_goods_list'
}
/** 支付订单 */
const paymentOrder = {
  type: 'post',
  target: '/admin/order/paymentOrder'
}
/** 取消订单 */
const cancelOrder = {
  type: 'post',
  target: '/admin/order/cancel_order'
}
/** 申请退货 */
const returnOrder = {
  type: 'get',
  target: '/admin/order/apply_return'
}
/** 获取订单物品 */
const getOneOrderGoods = {
  type: 'post',
  target: '/admin/order_goods/list_order_goods'
}
/** 评价订单 */
const addOrderGoodsEvaluate = {
  type: 'post',
  target: '/admin/order_goods/order_goods_evaluate'
}
/** 商品列表 */
const getGoodsList = {
  type: 'post',
  target: '/admin/goods/list_goods_by_current'
}
/** 商品字典查询 */
const getDictList = {
  type: 'get',
  target: '/admin/goods/list_dict_param'
}
/** 商品列表查询分类 */
const getMyGcategoryList = {
  type: 'get',
  target: '/admin/gcategory/my_gcategory'
}
/** 首页商品分类 */
const homeGcategory = {
  type: 'post',
  target: '/admin/gcategory/list_iterat_third'
}
/** 添加商品 */
const addGoods = {
  type: 'post',
  target: '/admin/goods/create_good'
}
/** 查询单个商品 */
const getGoodsById = {
  type: 'get',
  target: '/admin/goods/get_by_id'
}
/** 删除单个商品 */
const delGoodsById = {
  type: 'get',
  target: '/admin/goods/remove_by_id'
}
/** 批量删除商品 */
const delAllCheckGoods = {
  type: 'post',
  target: '/admin/goods/remove_by_ids'
}
/** 获取购物车商品信息 */
const getCartList = {
  type: 'get',
  target: '/admin/order/getCartList'
}
/** 确认收货 */
const getSignOrder = {
  type: 'get',
  target: '/admin/order/signOrder'
}
/** 修改商品相关状态 */
const updGoodsById = {
  type: 'post',
  target: '/admin/goods/update_by_id'
}
/** 查询商品销售记录 */
const schOrderGoodsRecordById = {
  type: 'post',
  target: '/admin/order_goods/list_record_by_goodsid'
}
/** 查询热门商品 */
const schHotGoods = {
  type: 'get',
  target: '/admin/order_goods/list_hot'
}
/** 添加云商品 */
const addCloudGoods = {
  type: 'get',
  target: '/admin/yun_goods/add_yun_goods'
}
/** 发货时选择学生查询 */
const getStuList = {
  type: 'get',
  target: '/admin/order/list_stu'
}
/** 发货操作 */
const deliverGoods = {
  type: 'post',
  target: '/admin/order/deliver_goods'
}

export default {
  getAddress,
  getCollect,
  getConsult,
  getShipping,
  getArticle,
  getUserCoupon,
  getGoodsAndSpec,
  addGoodsOrder,
  getRegion,
  addAddress,
  delAddress,
  getAddressById,
  delCollectById,
  delUserCouponById,
  addUserCoupon,
  getCouponList,
  delCouponById,
  getConsultManageList,
  delConsultManageById,
  replyConsultManage,
  addCoupon,
  getCouponById,
  updCoupon,
  exportCouponSn,
  grantCouponSn,
  addShipping,
  updShipping,
  getShippingById,
  delShippingById,
  addArticle,
  getArticleById,
  updArticle,
  delArticleById,
  delArticleByIds,
  delCouponByIds,
  delUserCouponByIds,
  delCollectByIds,
  delConsultManageByIds,
  getMyStore,
  updMyStore,
  getBrandList,
  uploadStoreImgUrl,
  addMyBrand,
  getBrandById,
  updBrandById,
  getYunGoodsList,
  paymentOrder,
  cancelOrder,
  returnOrder,
  getOneOrderGoods,
  addOrderGoodsEvaluate,
  getGoodsList,
  getDictList,
  homeGcategory,
  addGoods,
  getGoodsById,
  delGoodsById,
  getCartList,
  getMyGcategoryList,
  delAllCheckGoods,
  getSignOrder,
  updGoodsById,
  schOrderGoodsRecordById,
  schHotGoods,
  addCloudGoods,
  getStuList,
  deliverGoods
}
