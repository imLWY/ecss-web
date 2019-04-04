/** 个人中心-- 分类管理（分类列表） */
const listGcategoryRecordsByCurrent = {
  type: 'post',
  target: '/admin/gcategory/list_all_by_current'
}

/** 个人中心-- 分类管理（分类添加） */
const createGcategory = {
  type: 'post',
  target: '/admin/gcategory/create'
}

/** 个人中心-- 分类管理（分类修改） */
const updateGcategory = {
  type: 'post',
  target: '/admin/gcategory/update_by_id'
}

/** 个人中心-- 分类管理（分类删除） */
const removeGcategory = {
  type: 'post',
  target: '/admin/gcategory/remove_by_ids'
}

export default {
  listGcategoryRecordsByCurrent,
  createGcategory,
  updateGcategory,
  removeGcategory
}
