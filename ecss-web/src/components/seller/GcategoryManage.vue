<template>
  <el-tabs type="border-card">
    <el-tab-pane label="分类管理">
      <div class="flgl">
        <div class="flgl_btn">
          <a href="javascript:void(0);" @click="openAddDialog">新增分类</a>
          <!-- <a href="javascript:void(0);">导入</a>
          <a href="javascript:void(0);">导出</a> -->
        </div>
        <div class="flgl_table">
          <el-table :data="userGcategory" :row-class-name="rowClassNameHandler" style="width:100%;">
            <!-- <el-table-column type="selection" align="center" width="32"/> -->
            <el-table-column label="分类名称" align="left" width="240">
              <template slot-scope="props">
                <span :style="{ marginLeft: props.row.level * 18 + 'px' }"/>
                <i v-if="props.row.hasChildren" :class="{'el-icon-arrow-right': !props.row.showChildren, 'el-icon-arrow-down': props.row.showChildren }" :style="{cursor: props.row.hasChildren ? 'pointer' : 'normal'}" @click="onExpand(props.row)" />
                <span :data-level="props.row.level" :style="{marginLeft: 8 + 'px'}">{{ props.row.cateName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="排序" prop="sortOrder" align="center" width="100"/>
            <el-table-column label="显示" prop="ifShowLabel" align="center" width="80"/>
            <el-table-column label="操作" align="center" width="360">
              <template slot-scope="scopes">
                <el-button
                  v-if="scopes.row.parentId === 0"
                  type="info"
                  size="mini"
                  style="background-color:#f45408;border:none;"
                  @click="handleAddChildGcategory(scopes.row.id, scopes.row.cateName)">新增下级</el-button>
                <el-button
                  type="info"
                  size="mini"
                  style="background-color:#f45408;border:none;"
                  @click="handleEditGcategory(scopes.row.id, scopes.row.parentId, scopes.row.cateName, scopes.row.sortOrder, scopes.row.ifShow)"
                >编辑</el-button>
                <el-button
                  type="info"
                  size="mini"
                  style="background-color:#f45408;border:none;"
                  @click="handleDeleteGcategory(scopes.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog
          :visible.sync="addDialogVisible"
          title="新增分类"
          width="30%">
          <el-form
            ref="addForm"
            :model="addForm"
            :inline="true"
            :rules="formRules"
            label-width="120px">
            <el-form-item label="分类名称：" prop="cateName">
              <el-input v-model="addForm.cateName" autocomplete="off" placeholder="请输入分类名称" />
            </el-form-item>
            <el-form-item label="排序：">
              <el-input-number v-model="addForm.sortOrder" :min="1" :max="255" style="width:202px;" />
            </el-form-item>
            <el-form-item label="显示：" style="width:100%;">
              <el-radio-group v-model="addForm.ifShow">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeAddDialog">取消</el-button>
            <el-button @click="submitAddForm('addForm')">保存</el-button>
          </div>
        </el-dialog>
        <el-dialog
          :visible.sync="addChildDialogVisible"
          title="新增子分类"
          width="30%">
          <el-form
            ref="addChildForm"
            :model="addChildForm"
            :inline="true"
            :rules="formRules"
            label-width="120px">
            <el-form-item label="分类名称：" prop="cateName">
              <el-input v-model="addChildForm.cateName" autocomplete="off" placeholder="请输入分类名称" />
            </el-form-item>
            <el-form-item label="上级分类：" style="display:none;">
              <el-input v-model="addChildForm.parentId" />
            </el-form-item>
            <el-form-item label="上级分类：">
              <el-input v-model="addChildForm.parentName" disabled />
            </el-form-item>
            <el-form-item label="排序：">
              <el-input-number v-model="addChildForm.sortOrder" :min="1" :max="255" style="width:202px;" />
            </el-form-item>
            <el-form-item label="显示：" style="width:100%;">
              <el-radio-group v-model="addChildForm.ifShow">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeAddChildDialog">取消</el-button>
            <el-button @click="submitAddChildForm('addChildForm')">保存</el-button>
          </div>
        </el-dialog>
        <el-dialog
          :visible.sync="editDialogVisible"
          title="编辑分类"
          width="30%">
          <el-form
            ref="editForm"
            :model="editForm"
            :inline="true"
            :rules="formRules"
            label-width="120px">
            <el-form-item label="分类名称：" prop="cateName">
              <el-input v-model="editForm.cateName" autocomplete="off" placeholder="请输入分类名称" />
            </el-form-item>
            <!-- <el-form-item label="上级分类：" style="display:none;">
              <el-input v-model="editForm.parentId" />
            </el-form-item>
            <el-form-item label="上级分类：" style="display:none;">
              <el-input v-model="editForm.parentName" disabled />
            </el-form-item> -->
            <el-form-item label="排序：">
              <el-input-number v-model="editForm.sortOrder" :min="1" :max="255" style="width:202px;" />
            </el-form-item>
            <el-form-item label="显示：" style="width:100%;">
              <el-radio-group v-model="editForm.ifShow">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeEditDialog">取消</el-button>
            <el-button @click="submitEditForm('editForm')">保存</el-button>
          </div>
        </el-dialog>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<style>

.paging {
  margin: 30px auto;
  text-align: center;
  font-size: 14px;
}
.height10 {
  height: 10px;
  border-bottom: 1px solid #eee;
}
ul,
li {
  list-style: none;
}
input,
button,
select {
  border: none;
  background: none;
  outline: none;
}
.el-tabs--border-card {
  border: none;
  box-shadow: none;
}
.el-tabs--border-card > .el-tabs__header {
  background: none;
  border: none;
}
.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  border: none;
  color: #f45408;
  font-size: 16px;
  font-weight: 700;
  background: none;
}
.el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
.el-tabs--border-card
  > .el-tabs__header
  .el-tabs__item:not(.is-disabled):hover {
  color: #f45408;
}
.el-tabs--border-card > .el-tabs__header .el-tabs__item {
  border: none;
  color: #999;
  font-size: 16px;
  font-weight: 700;
}
.flgl {
  margin-top: 20px;
  padding: 20px 0;
  border-top: 1px solid #eee;
  text-align: left;
}
.flgl_btn {
  font-size: 0;
}
.flgl_btn a {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  padding: 8px 20px;
  background: #f45408;
  color: #fff;
  border-radius: 5px;
  font-size: 14px;
}
.flglTable {
  margin-top: 20px;
  width: 100%;
}
.flglTable th {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  text-align: center;
}
.flglTable th span {
  padding-right: 30px;
}
.flglTable th a {
  color: #f45408;
}
.flglTable thead tr:first-child th {
  text-align: left;
}
.flglTable td {
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.flglBtnes {
  padding: 5px 10px;
  margin: 0 3px;
  background: #f45408;
  color: #fff;
  border-radius: 5px;
}
.flglTable tbody tr td:nth-child(2) {
  text-align: left;
}
.flgl_big {
  margin-right: 8px;
  display: inline-block;
  vertical-align: middle;
  width: 14px;
  height: 14px;
  border-radius: 2px;
  background: #ddd;
}
.flgl_small {
  display: inline-block;
  vertical-align: middle;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background: #ddd;
  margin-right: 8px;
}
.flglTable .flgl_padding-left td:nth-child(2) {
  padding-left: 20px;
}
</style>

<script>
import axios from 'axios'

export default {
  name: 'GcategoryManage',
  data() {
    return {
      store: {},
      userGcategory: [],
      addDialogVisible: false,
      addChildDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        cateName: '',
        sortOrder: 1,
        ifShow: 1
      },
      addChildForm: {
        parentId: null,
        parentName: null,
        cateName: null,
        sortOrder: 1,
        ifShow: 1
      },
      editForm: {
        id: null,
        // parentId: null,
        cateName: null,
        // parentName: null,
        sortOrder: 1,
        ifShow: 1
      },
      formRules: {
        cateName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getMyStore()
  },
  methods: {
    getMyStore: function() {
      return new Promise((resolve, reject) => {
        axios[this.$Api.myStore.type](this.$Api.myStore.target).then(response => {
          this.store = response.data.data
          if (response.data.code === '2000') {
            this.getGcategoryByStore()
          }
          console.log('storeId' + this.store.id)
          resolve(response.data.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    getGcategoryByStore: function(type, target) {
      new Promise((resolve, reject) => {
        axios[this.$Api.gcategoryByStore.type](this.$Api.gcategoryByStore.target, { 'storeId': this.store.id })
          .then(response => {
            this.userGcategory = response.data.data
            this.userGcategory = this.processLevelGcategoryData(this.userGcategory)
            this.userGcategory = this.sortUserGcategory(this.userGcategory)
            console.log(this.userGcategory)
            this.sortUserGcategory(this.userGcategory)
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response.data.errors)
          })
      })
    },
    sortUserGcategory: function(dataArray) {
      var resultArray = []
      var level1Array = []
      for (var i = 0; i < dataArray.length; i++) {
        if (dataArray[i].parentId === 0) {
          level1Array.push(dataArray[i])
        }
      }
      level1Array.sort(function(item1, item2) {
        if (item1.sortOrder < item2.sortOrder) {
          return -1
        }
        if (item1.sortOrder > item2.sortOrder) {
          return 1
        }
        return 0
      })
      for (var j = 0; j < level1Array.length; j++) {
        resultArray.push(level1Array[j])
        var level2Array = []
        for (var k = 0; k < dataArray.length; k++) {
          if (dataArray[k].parentId === level1Array[j].id) {
            level2Array.push(dataArray[k])
          }
        }
        level2Array.sort(function(item1, item2) {
          if (item1.sortOrder < item2.sortOrder) {
            return -1
          }
          if (item1.sortOrder > item2.sortOrder) {
            return 1
          }
          return 0
        })
        resultArray = resultArray.concat(level2Array)
      }
      return resultArray
    },
    processLevelGcategoryData: function(dataArray) {
      var resultArray = []
      var level = 1
      for (var i = 0; i < dataArray.length; i++) {
        var item = dataArray[i]
        if (item.parentId === 0) {
          item['level'] = level
          resultArray.push(item)
          this.loadChildrenData(resultArray, dataArray, item, level + 1)
        }
      }
      return resultArray
    },
    loadChildrenData: function(resultArray, originArray, item, level) {
      for (var i = 0; i < originArray.length; i++) {
        var originItem = originArray[i]
        if (originItem.parentId === item.id) {
          item['hasChildren'] = true
          item['showChildren'] = false
          originItem['level'] = level
          originItem['visible'] = false
          resultArray.push(originItem)
        }
      }
    },
    rowClassNameHandler: function({ row, rowIndex }) {
      var className = 'pid-' + row.parentId
      if (row.parentId !== 0 && row['visible'] !== true) {
        className += ' hiddenRow'
      }
      return className
    },
    onExpand: function(row) {
      var isShowChildren = !row['showChildren']
      row['showChildren'] = isShowChildren
      // if (row['showChildren'] === 0) {
      //   this.loadAllSubItems(row, true, 1)
      // }
      this.userGcategory = this.loadAllSubItems(row, isShowChildren)
      console.log('showChildren' + isShowChildren)
    },
    loadAllSubItems: function(item, isShowChildren) {
      var dataArray = []
      for (var i = 0; i < this.userGcategory.length; i++) {
        var tempItem = this.userGcategory[i]
        if (tempItem.parentId === item.id) {
          tempItem['visible'] = !tempItem['visible']
          // tempItem['hidden'] = !isShowChildren
        }
        dataArray.push(tempItem)
      }
      return dataArray
    },
    handleAddChildGcategory: function(parentId, parentName) {
      console.log(parentId)
      this.addChildDialogVisible = true
      this.addChildForm.parentId = parentId
      this.addChildForm.parentName = parentName
    },
    handleEditGcategory: function(id, parentId, cateName, sortOrder, ifShow) {
      this.editDialogVisible = true
      this.editForm.id = id
      this.editForm.parentId = parentId
      this.editForm.cateName = cateName
      this.editForm.sortOrder = sortOrder
      this.editForm.ifShow = ifShow
    },
    handleDeleteGcategory: function(row) {
      var isHasChildren = row.hasChildren
      if (isHasChildren) {
        this.$message({
          type: 'error',
          message: '含有子级分类，无法直接删除!'
        })
        return
      }
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          // 确认按钮按下
          // const type = this.$Zxy.removeGcategory.type
          // const target = this.$Zxy.removeGcategory.target
          return new Promise((resolve, reject) => {
            axios[this.$Api.delGcategoryById.type](this.$Api.delGcategoryById.target + '?id=' + row.id)
              .then(response => {
                // 刷新列表
                // this.getUserGcategory(
                //   this.$Zxy.listGcategoryRecordsByCurrent.type,
                //   this.$Zxy.listGcategoryRecordsByCurrent.target
                // )
                if (response.status === 200) {
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  })
                  this.getMyStore()
                }
                resolve(response.data)
              })
              .catch(error => {
                reject(error.response.data.errors)
              })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    openAddDialog: function() {
      this.addDialogVisible = true
    },
    closeAddDialog: function() {
      this.addDialogVisible = false
    },
    closeAddChildDialog: function() {
      this.addChildDialogVisible = false
    },
    closeEditDialog: function() {
      this.editDialogVisible = false
    },
    submitAddForm: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios[this.$Api.addGcategoryForStore.type](this.$Api.addGcategoryForStore.target, this.addForm).then(response => {
            console.log(response)
            if (response.data.code === '2000') {
              this.addDialogVisible = false
              this.getMyStore()
            }
          }).catch(error => {
            console.log(error)
          })
        } else {
          return false
        }
      })
    },
    submitAddChildForm: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios[this.$Api.addGcategoryForStore.type](this.$Api.addGcategoryForStore.target, this.addChildForm).then(response => {
            console.log(response)
            if (response.data.code === '2000') {
              this.addChildForm.cateName = null
              this.addChildForm.parentId = null
              this.addChildForm.parentName = null
              this.addChildForm.ifShow = 1
              this.addChildForm.sortOrder = 1
              this.addChildDialogVisible = false
              this.getMyStore()
            }
          }).catch(error => {
            console.log(error)
          })
        } else {
          return false
        }
      })
    },
    submitEditForm: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios[this.$Api.updGcategoryById.type](this.$Api.updGcategoryById.target, this.editForm).then(response => {
            console.log(response)
            if (response.data.code === '2000') {
              this.editForm.cateName = null
              this.editForm.parentId = null
              this.editForm.parentName = null
              this.editForm.ifShow = 1
              this.editForm.sortOrder = 1
              this.editDialogVisible = false
              this.getMyStore()
            }
          }).catch(error => {
            console.log(error)
          })
        } else {
          return false
        }
      })
    }

  }
}
</script>
