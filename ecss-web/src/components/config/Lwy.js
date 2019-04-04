/** 店铺图片上传 */
const uploadStoreImgUrl = {
  target: 'http://192.168.10.240:9798/fileUpload/uploadStoreImgs.action'
}

/** 个人中心-- 我的支付通（余额） */
const listZftBalanceByCurrent = {
  type: 'post',
  target: '/admin/zft_balance/get_by_current'
}

/** 个人中心-- 获取当前用户的支付通列表 */
const listZftRecordsByCurrent = {
  type: 'post',
  target: '/admin/zft_records/list_by_current'
}

/** 个人中心-- 获取合作伙伴列表 */
const listPartnerListByCurrent = {
  type: 'post',
  target: 'admin/partner/list_all_by_current'
}

/** 个人中心-- 获取合作伙伴详情 */
const getPartnerInfoByCurrent = {
  type: 'get',
  target: 'admin/partner/get_by_id'
}

/** 个人中心-- 获取合作伙伴添加 */
const addPartnerByCurrent = {
  type: 'post',
  target: 'admin/partner/create_by_current'
}

/** 个人中心-- 获取合作伙伴修改 */
const updPartnerById = {
  type: 'post',
  target: 'admin/partner/update_by_id'
}

/** 个人中心-- 获取合作伙伴修改 */
const delPartnerByIds = {
  type: 'post',
  target: 'admin/partner/remove_by_ids'
}

/** 个人中心-- 获取支付方式列表 */
const listPayMentByCurrent = {
  type: 'post',
  target: '/admin/payment/get_by_current'
}

/** 个人中心-- 添加/安装支付方式 */
const addPayMentByCurrent = {
  type: 'post',
  target: 'admin/payment/create_newPay'
}

/** 个人中心-- 删除/卸载 支付方式 */
const delPayMentbyId = {
  type: 'post',
  target: 'admin/payment/remove_by_ids'
}

/** 个人中心-- 更新 支付方式 */
const updPayMentById = {
  type: 'post',
  target: '/admin/payment/update_by_id'
}

/** 支付方式详情 */
const getPayMentInfoById = {
  type: 'post',
  target: '/admin/payment/get_by_id'
}

/** 个人中心-- 好友列表 */
const listFrendsByCurrent = {
  type: 'post',
  target: 'admin/friend/list_friend_by_current'
}

/** 个人中心-- 删除好友 */
const delFriendByIds = {
  type: 'post',
  target: 'admin/friend/del_friend_by_friendIds'
}

/** 个人中心-- 添加好友（根据用户名称） */
const addFriendByName = {
  type: 'post',
  target: 'admin/friend/creat_friend_by_friendNumber'
}

/** 获取未读消息列表 */
const listNoReadMsg = {
  type: 'post',
  target: '/admin/msg/list_noRead'
}

/** 获取私人消息列表 */
const listTalkPersonMsg = {
  type: 'post',
  target: '/admin/msg/list_talk_person'
}

/** 根据商品ID获取商铺信息 */
const getStoreBygoodId = {
  type: 'get',
  target: '/store/get_store_by_goodId'
}

/** 添加到购物车 */
const creatAddShopCar = {
  type: 'post',
  target: '/admin/cart/creat_add_shopcar'
}

/** 展示购物车列表 */
const listShopCarGood = {
  type: 'post',
  target: '/admin/cart/list_all_by_current'
}

/** 根据ID删除购物车商品 */
const delShopCarGoodById = {
  type: 'post',
  target: '/admin/cart/remove_by_id'
}

/** 根据ID更新数量 */
const updShopCarGoodNumById = {
  type: 'post',
  target: '/admin/cart/update_by_id'
}

/** 收藏商品 */
const collectGoodByCurrent = {
  type: 'post',
  target: '/admin/collect/create_good_by_current'
}

/** 获取购物车商品 */
const getShopCarGoodsNum = {
  type: 'post',
  target: '/admin/cart/get_shopCar_goodNum'
}

/** 卖家同意退货 */
const returnGoods = {
  type: 'post',
  target: '/admin/order/update_order_return_goods'
}

/** 订单详情 */
const getOrderInfo = {
  type: 'post',
  target: '/admin/order/getOrderInfo'
}

/** 检查商品是否已经下架 */
const checkGoods = {
  type: 'post',
  target: '/admin/cart/checkGoods'
}

/** 检索页检索店铺 */
const getStoreListByQuery = {
  type: 'post',
  target: '/store/list_all_by_query'
}

/** 收藏店铺 */
const collectStoreByCurrent = {
  type: 'post',
  target: '/admin/collect/create_store_by_current'
}

/** 获取咨询列表 */
const getGoodsQaList = {
  type: 'post',
  target: '/admin/goods_qa/list_by_good_detail'
}

/** 根据当前登录者添加咨询 */
const createQaByCurrent = {
  type: 'post',
  target: '/admin/goods_qa/create_by_current'
}

/** 根据店铺id获取合作伙伴 */
const getPartnerByStorId = {
  type: 'post',
  target: '/admin/partner/list_all'
}

/** 获取对话列表 */
const getMsgList = {
  type: 'post',
  target: '/admin/msg/getMsgList'
}

/** 获取系统消息 */
const getMsgListBySys = {
  type: 'post',
  target: '/admin/msg/getMsgListBySys'
}

/** 获取公共消息 */
const getMsgListByCom = {
  type: 'post',
  target: '/admin/msg/getMsgListByCom'
}

/** 批量删除列表数据 */
const removeListByUpdDels = {
  type: 'post',
  target: '/admin/msg/removeListByUpdDels'
}

/** 删除对话列表 */
const removePerByUpdDels = {
  type: 'post',
  target: '/admin/msg/removePerByUpdDels'
}

/** 发送消息 */
const sendMsgByCurrent = {
  type: 'post',
  target: '/admin/msg/createbycurrent'
}

export default {
  uploadStoreImgUrl,
  listZftRecordsByCurrent,
  listZftBalanceByCurrent,
  listPartnerListByCurrent,
  getPartnerInfoByCurrent,
  addPartnerByCurrent,
  updPartnerById,
  delPartnerByIds,
  listPayMentByCurrent,
  addPayMentByCurrent,
  delPayMentbyId,
  updPayMentById,
  getPayMentInfoById,
  listFrendsByCurrent,
  delFriendByIds,
  addFriendByName,
  listNoReadMsg,
  listTalkPersonMsg,
  getMsgList,
  getStoreBygoodId,
  creatAddShopCar,
  listShopCarGood,
  delShopCarGoodById,
  updShopCarGoodNumById,
  collectGoodByCurrent,
  getShopCarGoodsNum,
  returnGoods,
  getOrderInfo,
  checkGoods,
  getStoreListByQuery,
  collectStoreByCurrent,
  getGoodsQaList,
  createQaByCurrent,
  getPartnerByStorId,
  getMsgListBySys,
  getMsgListByCom,
  removeListByUpdDels,
  removePerByUpdDels,
  sendMsgByCurrent
}
