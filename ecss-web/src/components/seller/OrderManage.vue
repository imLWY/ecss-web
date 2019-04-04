<template>
  <el-tabs v-model="activeTab" type="border-card" @tab-click="handleTabsClick">
    <el-tab-pane label="所有订单" name="all">
      <div class="orderend">
        <div class="orderendForm">
          <div class="orderendform orderend_num">
            <el-input v-model="searchAllOrder.orderNumber" placeholder="请输入订单号" clearable />
          </div>
          <div class="orderendform orderend_time">
            <el-date-picker
              v-model="searchAllOrder.searchDate"
              :picker-options="pickerOptions"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="yyyy-MM-dd HH:mm"
              align="right"
              style="width:328px;margin-right:10px;"/>
          </div>
          <div class="orderendform orderend_buyer">
            <el-input v-model="searchAllOrder.orderOwner" placeholder="买家信息" clearable />
          </div>
          <div class="orderendform orderend_btn">
            <input type="submit" value="搜索" @click="searchAll">
          </div>
          <div class="table_oper_btn" style="margin-top: 20px;">
            <a href="javascript:void(0);">取消订单</a>
          </div>
        </div>
        <div class="orderend_table">
          <el-table
            ref="allOrderTable"
            :data="allOrderList.dataList"
            tooltip-effect="dark"
            style="width:100%;">
            <el-table-column type="selection" width="32" />
            <el-table-column type="expand" width="32" align="right">
              <template slot-scope="props">
                <el-button
                  v-if="props.row.orderStatus == 1"
                  type="info"
                  size="small"
                  style="background-color:#f45408;border:none;"
                  @click="receivedPayment(props.row.id, props.row.orderNumber)">
                  收到货款
                </el-button>
                <el-button
                  v-if="props.row.orderStatus == 1"
                  type="info"
                  size="small"
                  style="background-color:#f45408;border:none;"
                  @click="setUpCost(props.row.id)">
                  调整费用
                </el-button>
                <el-button
                  v-if="props.row.orderStatus == 4"
                  type="info"
                  size="small"
                  style="background-color:#f45408;border:none;"
                  @click="updOrderNumber(props.row.id, props.row.orderNumber, props.row.invoiceNo)">
                  修改单号
                </el-button>
                <el-button
                  v-if="props.row.orderStatus == 7"
                  type="info"
                  size="small"
                  style="background-color:#f45408;border:none;"
                  @click="returnGoods(props.row.id, props.row.orderNumber)">
                  同意退货
                </el-button>
                <el-button
                  v-if="props.row.orderStatus == 3"
                  type="info"
                  size="small"
                  style="background-color:#f45408;border:none;"
                  @click="deliver(props.row.id, props.row.orderNumber)">
                  发货
                </el-button>
                <el-button
                  v-if="props.row.orderStatus == 1 || props.row.orderStatus == 3 || props.row.orderStatus == 4"
                  type="info"
                  size="small"
                  style="background-color:#f45408;border:none;"
                  @click="cancelOrder(props.row.id, props.row.orderNumber)">
                  取消订单
                </el-button>
                <el-button
                  type="info"
                  size="small"
                  style="background-color:#f45408;border:none;"
                  @click="viewOrder(props.row.id)">
                  查看订单
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="orderNumber" label="订单号" align="center" width="160" />
            <el-table-column prop="buyerName" label="买家" align="center" width="100" />
            <el-table-column prop="orderExtmData.consignee" label="收货人" align="center" width="100" />
            <el-table-column prop="orderExtmData.phoneTel" label="电话号码" align="center" width="110" />
            <el-table-column prop="paymentName" label="支付方式" align="center" width="100" />
            <el-table-column prop="totalPrice" label="订单总价" align="center" width="100" />
            <el-table-column prop="orderStatusName" label="订单状态" align="center" width="120" />
          </el-table>
          <div style="height:24px;"/>
          <el-pagination
            :current-page="searchAllOrder.page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="searchAllOrder.pageSize"
            :total="searchAllOrder.total"
            layout="total, sizes, prev, pager, next, jumper"
            style="text-align:center;"
            @size-change="handleAllOrderSizeChange"
            @current-change="handleAllOrderCurrentChange" />
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="待付款" name="pendingpay">
      <div class="orderend">
        <div class="orderendForm">
          <div class="orderendform orderend_num">
            <el-input v-model="searchPendingPayOrder.orderNumber" placeholder="请输入订单号" clearable />
          </div>
          <div class="orderendform orderend_time">
            <el-date-picker
              v-model="searchPendingPayOrder.searchDate"
              :picker-options="pickerOptions"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="yyyy-MM-dd HH:mm"
              align="right"
              style="width:328px;margin-right:10px;"/>
          </div>
          <div class="orderendform orderend_buyer">
            <el-input v-model="searchPendingPayOrder.orderOwner" placeholder="买家信息" clearable />
          </div>
          <div class="orderendform orderend_btn">
            <input type="submit" value="搜索" @click="searchPendingPay">
          </div>
          <div class="table_oper_btn" style="margin-top: 20px;">
            <a href="javascript:void(0);">取消订单</a>
          </div>

        </div>
        <div class="orderend_table">
          <el-table
            ref="allOrderTable"
            :data="pendingPayOrderList.dataList"
            tooltip-effect="dark"
            style="width:100%;">
            <el-table-column type="selection" width="32" />
            <el-table-column type="expand" width="32" align="right">
              <template slot-scope="props">
                <el-button
                  type="info"
                  size="small"
                  style="background-color:#f45408;border:none;"
                  @click="receivedPayment(props.row.id, props.row.orderNumber)">
                  收到货款
                </el-button>
                <el-button
                  type="info"
                  size="small"
                  style="background-color:#f45408;border:none;"
                  @click="setUpCost(props.row.id)">
                  调整费用
                </el-button>
                <el-button
                  type="info"
                  size="small"
                  style="background-color:#f45408;border:none;"
                  @click="cancelOrder(props.row.id, props.row.orderNumber)">
                  取消订单
                </el-button>
                <el-button
                  type="info"
                  size="small"
                  style="background-color:#f45408;border:none;"
                  @click="viewOrder(props.row.id)">
                  查看订单
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="orderNumber" label="订单号" align="center" width="160" />
            <el-table-column prop="buyerName" label="买家" align="center" width="100" />
            <el-table-column prop="orderExtmData.consignee" label="收货人" align="center" width="100" />
            <el-table-column prop="orderExtmData.phoneTel" label="电话号码" align="center" width="110" />
            <el-table-column prop="paymentName" label="支付方式" align="center" width="100" />
            <el-table-column prop="totalPrice" label="订单总价" align="center" width="100" />
            <el-table-column prop="orderStatusName" label="订单状态" align="center" width="120" />
          </el-table>
          <div style="height:24px;"/>
          <el-pagination
            :current-page="searchPendingPayOrder.page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="searchPendingPayOrder.pageSize"
            :total="searchPendingPayOrder.total"
            layout="total, sizes, prev, pager, next, jumper"
            style="text-align:center;"
            @size-change="handlePendingPayOrderSizeChange"
            @current-change="handlePendingPayOrderCurrentChange" />
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="已提交" name="submitted">
      <div class="orderend">
        <div class="orderendForm">
          <div class="orderendform orderend_num">
            <el-input v-model="searchSubmittedOrder.orderNumber" placeholder="请输入订单号" clearable />
          </div>
          <div class="orderendform orderend_time">
            <el-date-picker
              v-model="searchSubmittedOrder.searchDate"
              :picker-options="pickerOptions"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="yyyy-MM-dd HH:mm"
              align="right"
              style="width:328px;margin-right:10px;"/>
          </div>
          <div class="orderendform orderend_buyer">
            <el-input v-model="searchSubmittedOrder.orderOwner" placeholder="买家信息" clearable />
          </div>
          <div class="orderendform orderend_btn">
            <input type="submit" value="搜索" @click="searchSubmitted">
          </div>
          <div class="table_oper_btn" style="margin-top: 20px;">
            <a href="javascript:void(0);">取消订单</a>
          </div>

        </div>
        <div class="orderend_table">
          <el-table
            ref="allOrderTable"
            :data="submittedOrderList.dataList"
            tooltip-effect="dark"
            style="width:100%;">
            <el-table-column type="selection" width="32" />
            <el-table-column type="expand" width="32" align="right">
              <!-- <template slot-scope="props">
                <el-button
                  type="info"
                  size="small"
                  style="background-color:#f45408;border:none;"
                  @click="deliver(props.row.id)">
                  发货
                </el-button>
                <el-button
                  type="info"
                  size="small"
                  style="background-color:#f45408;border:none;"
                  @click="cancelOrder(props.row.id)">
                  取消订单
                </el-button>
                <el-button
                  type="info"
                  size="small"
                  style="background-color:#f45408;border:none;"
                  @click="viewOrder(props.row.id)">
                  查看订单
                </el-button>
              </template> -->
            </el-table-column>
            <el-table-column prop="orderNumber" label="订单号" align="center" width="160" />
            <el-table-column prop="buyerName" label="买家" align="center" width="100" />
            <el-table-column prop="orderExtmData.consignee" label="收货人" align="center" width="100" />
            <el-table-column prop="orderExtmData.phoneTel" label="电话号码" align="center" width="110" />
            <el-table-column prop="paymentName" label="支付方式" align="center" width="100" />
            <el-table-column prop="totalPrice" label="订单总价" align="center" width="100" />
            <el-table-column prop="orderStatusName" label="订单状态" align="center" width="120" />
          </el-table>
          <div style="height:24px;"/>
          <el-pagination
            :current-page="searchSubmittedOrder.page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="searchSubmittedOrder.pageSize"
            :total="searchSubmittedOrder.total"
            layout="total, sizes, prev, pager, next, jumper"
            style="text-align:center;"
            @size-change="handleSubmittedOrderSizeChange"
            @current-change="handleSubmittedOrderCurrentChange" />
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="待发货" name="delivery">
      <div class="orderend">
        <div class="orderendForm">
          <div class="orderendform orderend_num">
            <el-input v-model="searchDeliveryOrder.orderNumber" placeholder="请输入订单号" clearable />
          </div>
          <div class="orderendform orderend_time">
            <el-date-picker
              v-model="searchDeliveryOrder.searchDate"
              :picker-options="pickerOptions"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="yyyy-MM-dd HH:mm"
              align="right"
              style="width:328px;margin-right:10px;"/>
          </div>
          <div class="orderendform orderend_buyer">
            <el-input v-model="searchDeliveryOrder.orderOwner" placeholder="买家信息" clearable />
          </div>
          <div class="orderendform orderend_btn">
            <input type="submit" value="搜索" @click="searchDelivery">
          </div>
          <div class="table_oper_btn" style="margin-top: 20px;">
            <a href="javascript:void(0);">取消订单</a>
          </div>

        </div>
        <div class="orderend_table">
          <el-table
            ref="allOrderTable"
            :data="deliveryOrderList.dataList"
            tooltip-effect="dark"
            style="width:100%;">
            <el-table-column type="selection" width="32" />
            <el-table-column type="expand" width="32" align="right">
              <template slot-scope="props">
                <el-button
                  type="info"
                  size="small"
                  style="background-color:#f45408;border:none;"
                  @click="deliver(props.row.id, props.row.orderNumber)">
                  发货
                </el-button>
                <el-button
                  type="info"
                  size="small"
                  style="background-color:#f45408;border:none;"
                  @click="cancelOrder(props.row.id, props.row.orderNumber)">
                  取消订单
                </el-button>
                <el-button
                  type="info"
                  size="small"
                  style="background-color:#f45408;border:none;"
                  @click="viewOrder(props.row.id)">
                  查看订单
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="orderNumber" label="订单号" align="center" width="160" />
            <el-table-column prop="buyerName" label="买家" align="center" width="100" />
            <el-table-column prop="orderExtmData.consignee" label="收货人" align="center" width="100" />
            <el-table-column prop="orderExtmData.phoneTel" label="电话号码" align="center" width="110" />
            <el-table-column prop="paymentName" label="支付方式" align="center" width="100" />
            <el-table-column prop="totalPrice" label="订单总价" align="center" width="100" />
            <el-table-column prop="orderStatusName" label="订单状态" align="center" width="120" />
          </el-table>
          <div style="height:24px;"/>
          <el-pagination
            :current-page="searchDeliveryOrder.page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="searchDeliveryOrder.pageSize"
            :total="searchDeliveryOrder.total"
            layout="total, sizes, prev, pager, next, jumper"
            style="text-align:center;"
            @size-change="handleDeliveryOrderSizeChange"
            @current-change="handleDeliveryOrderCurrentChange" />
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="已发货" name="delivered">
      <div class="orderend">
        <div class="orderendForm">
          <div class="orderendform orderend_num">
            <el-input v-model="searchDeliveredOrder.orderNumber" placeholder="请输入订单号" clearable />
          </div>
          <div class="orderendform orderend_time">
            <el-date-picker
              v-model="searchDeliveredOrder.searchDate"
              :picker-options="pickerOptions"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="yyyy-MM-dd HH:mm"
              align="right"
              style="width:328px;margin-right:10px;"/>
          </div>
          <div class="orderendform orderend_buyer">
            <el-input v-model="searchDeliveredOrder.orderOwner" placeholder="买家信息" clearable />
          </div>
          <div class="orderendform orderend_btn">
            <input type="submit" value="搜索" @click="searchDelivered">
          </div>
          <div class="table_oper_btn" style="margin-top: 20px;">
            <a href="javascript:void(0);">取消订单</a>
          </div>

        </div>
        <div class="orderend_table">
          <el-table
            ref="allOrderTable"
            :data="deliveredOrderList.dataList"
            tooltip-effect="dark"
            style="width:100%;">
            <el-table-column type="selection" width="32" />
            <el-table-column type="expand" width="32" align="right">
              <template slot-scope="props">
                <el-button
                  type="info"
                  size="small"
                  style="background-color:#f45408;border:none;"
                  @click="updOrderNumber(props.row.id, props.row.orderNumber, props.row.invoiceNo)">
                  修改单号
                </el-button>
                <el-button
                  type="info"
                  size="small"
                  style="background-color:#f45408;border:none;"
                  @click="cancelOrder(props.row.id, props.row.orderNumber)">
                  取消订单
                </el-button>
                <el-button
                  type="info"
                  size="small"
                  style="background-color:#f45408;border:none;"
                  @click="viewOrder(props.row.id)">
                  查看订单
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="orderNumber" label="订单号" align="center" width="160" />
            <el-table-column prop="buyerName" label="买家" align="center" width="100" />
            <el-table-column prop="orderExtmData.consignee" label="收货人" align="center" width="100" />
            <el-table-column prop="orderExtmData.phoneTel" label="电话号码" align="center" width="110" />
            <el-table-column prop="paymentName" label="支付方式" align="center" width="100" />
            <el-table-column prop="totalPrice" label="订单总价" align="center" width="100" />
            <el-table-column prop="orderStatusName" label="订单状态" align="center" width="120" />
          </el-table>
          <div style="height:24px;"/>
          <el-pagination
            :current-page="searchDeliveredOrder.page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="searchDeliveredOrder.pageSize"
            :total="searchDeliveredOrder.total"
            layout="total, sizes, prev, pager, next, jumper"
            style="text-align:center;"
            @size-change="handleDeliveredOrderSizeChange"
            @current-change="handleDeliveredOrderCurrentChange" />
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="已完成" name="completed">
      <div class="orderend">
        <div class="orderendForm">
          <div class="orderendform orderend_num">
            <el-input v-model="searchCompletedOrder.orderNumber" placeholder="请输入订单号" clearable />
          </div>
          <div class="orderendform orderend_time">
            <el-date-picker
              v-model="searchCompletedOrder.searchDate"
              :picker-options="pickerOptions"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="yyyy-MM-dd HH:mm"
              align="right"
              style="width:328px;margin-right:10px;"/>
          </div>
          <div class="orderendform orderend_buyer">
            <el-input v-model="searchCompletedOrder.orderOwner" placeholder="买家信息" clearable />
          </div>
          <div class="orderendform orderend_btn">
            <input type="submit" value="搜索" @click="searchCompleted">
          </div>
          <div class="table_oper_btn" style="margin-top: 20px;">
            <a href="javascript:void(0);">取消订单</a>
          </div>

        </div>
        <div class="orderend_table">
          <el-table
            ref="allOrderTable"
            :data="completedOrderList.dataList"
            tooltip-effect="dark"
            style="width:100%;">
            <el-table-column type="selection" width="32" />
            <el-table-column type="expand" width="32" align="right">
              <template slot-scope="props">
                <el-button
                  type="info"
                  size="small"
                  style="background-color:#f45408;border:none;"
                  @click="viewOrder(props.row.id)">
                  查看订单
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="orderNumber" label="订单号" align="center" width="160" />
            <el-table-column prop="buyerName" label="买家" align="center" width="100" />
            <el-table-column prop="orderExtmData.consignee" label="收货人" align="center" width="100" />
            <el-table-column prop="orderExtmData.phoneTel" label="电话号码" align="center" width="110" />
            <el-table-column prop="paymentName" label="支付方式" align="center" width="100" />
            <el-table-column prop="totalPrice" label="订单总价" align="center" width="100" />
            <el-table-column prop="orderStatusName" label="订单状态" align="center" width="120" />
          </el-table>
          <div style="height:24px;"/>
          <el-pagination
            :current-page="searchCompletedOrder.page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="searchCompletedOrder.pageSize"
            :total="searchCompletedOrder.total"
            layout="total, sizes, prev, pager, next, jumper"
            style="text-align:center;"
            @size-change="handleCompletedOrderSizeChange"
            @current-change="handleCompletedOrderCurrentChange" />
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="已取消" name="cancelled">
      <div class="orderend">
        <div class="orderendForm">
          <div class="orderendform orderend_num">
            <el-input v-model="searchCancelledOrder.orderNumber" placeholder="请输入订单号" clearable />
          </div>
          <div class="orderendform orderend_time">
            <el-date-picker
              v-model="searchCancelledOrder.searchDate"
              :picker-options="pickerOptions"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="yyyy-MM-dd HH:mm"
              align="right"
              style="width:328px;margin-right:10px;"/>
          </div>
          <div class="orderendform orderend_buyer">
            <el-input v-model="searchCancelledOrder.orderOwner" placeholder="买家信息" clearable />
          </div>
          <div class="orderendform orderend_btn">
            <input type="submit" value="搜索" @click="searchCancelled">
          </div>
          <div class="table_oper_btn" style="margin-top: 20px;">
            <a href="javascript:void(0);">取消订单</a>
          </div>

        </div>
        <div class="orderend_table">
          <el-table
            ref="allOrderTable"
            :data="cancelledOrderList.dataList"
            tooltip-effect="dark"
            style="width:100%;">
            <el-table-column type="selection" width="32" />
            <el-table-column type="expand" width="32" align="right">
              <template slot-scope="props">
                <el-button
                  type="info"
                  size="small"
                  style="background-color:#f45408;border:none;"
                  @click="viewOrder(props.row.id)">
                  查看订单
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="orderNumber" label="订单号" align="center" width="160" />
            <el-table-column prop="buyerName" label="买家" align="center" width="100" />
            <el-table-column prop="orderExtmData.consignee" label="收货人" align="center" width="100" />
            <el-table-column prop="orderExtmData.phoneTel" label="电话号码" align="center" width="110" />
            <el-table-column prop="paymentName" label="支付方式" align="center" width="100" />
            <el-table-column prop="totalPrice" label="订单总价" align="center" width="100" />
            <el-table-column prop="orderStatusName" label="订单状态" align="center" width="120" />
          </el-table>
          <div style="height:24px;"/>
          <el-pagination
            :current-page="searchCancelledOrder.page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="searchCancelledOrder.pageSize"
            :total="searchCancelledOrder.total"
            layout="total, sizes, prev, pager, next, jumper"
            style="text-align:center;"
            @size-change="handleCancelledOrderSizeChange"
            @current-change="handleCancelledOrderCurrentChange" />
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="待退货" name="refund">
      <div class="orderend">
        <div class="orderendForm">
          <div class="orderendform orderend_num">
            <el-input v-model="searchRefundOrder.orderNumber" placeholder="请输入订单号" clearable />
          </div>
          <div class="orderendform orderend_time">
            <el-date-picker
              v-model="searchRefundOrder.searchDate"
              :picker-options="pickerOptions"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="yyyy-MM-dd HH:mm"
              align="right"
              style="width:328px;margin-right:10px;"/>
          </div>
          <div class="orderendform orderend_buyer">
            <el-input v-model="searchRefundOrder.orderOwner" placeholder="买家信息" clearable />
          </div>
          <div class="orderendform orderend_btn">
            <input type="submit" value="搜索" @click="searchRefund">
          </div>
          <div class="table_oper_btn" style="margin-top: 20px;">
            <a href="javascript:void(0);">取消订单</a>
          </div>

        </div>
        <div class="orderend_table">
          <el-table
            ref="allOrderTable"
            :data="refundOrderList.dataList"
            tooltip-effect="dark"
            style="width:100%;">
            <el-table-column type="selection" width="32" />
            <el-table-column type="expand" width="32" align="right">
              <template slot-scope="props">
                <el-button
                  type="info"
                  size="small"
                  style="background-color:#f45408;border:none;"
                  @click="returnGoods(props.row.id, props.row.orderNumber)">
                  同意退货
                </el-button>
                <el-button
                  type="info"
                  size="small"
                  style="background-color:#f45408;border:none;"
                  @click="viewOrder(props.row.id)">
                  查看订单
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="orderNumber" label="订单号" align="center" width="160" />
            <el-table-column prop="buyerName" label="买家" align="center" width="100" />
            <el-table-column prop="orderExtmData.consignee" label="收货人" align="center" width="100" />
            <el-table-column prop="orderExtmData.phoneTel" label="电话号码" align="center" width="110" />
            <el-table-column prop="paymentName" label="支付方式" align="center" width="100" />
            <el-table-column prop="totalPrice" label="订单总价" align="center" width="100" />
            <el-table-column prop="orderStatusName" label="订单状态" align="center" width="120" />
          </el-table>
          <div style="height:24px;"/>
          <el-pagination
            :current-page="searchRefundOrder.page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="searchRefundOrder.pageSize"
            :total="searchRefundOrder.total"
            layout="total, sizes, prev, pager, next, jumper"
            style="text-align:center;"
            @size-change="handleRefundOrderSizeChange"
            @current-change="handleRefundOrderCurrentChange" />
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="已退货" name="returned">
      <div class="orderend">
        <div class="orderendForm">
          <div class="orderendform orderend_num">
            <el-input v-model="searchReturnedOrder.orderNumber" placeholder="请输入订单号" clearable />
          </div>
          <div class="orderendform orderend_time">
            <el-date-picker
              v-model="searchReturnedOrder.searchDate"
              :picker-options="pickerOptions"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="yyyy-MM-dd HH:mm"
              align="right"
              style="width:328px;margin-right:10px;"/>
          </div>
          <div class="orderendform orderend_buyer">
            <el-input v-model="searchReturnedOrder.orderOwner" placeholder="买家信息" clearable />
          </div>
          <div class="orderendform orderend_btn">
            <input type="submit" value="搜索" @click="searchReturned">
          </div>
          <div class="table_oper_btn" style="margin-top: 20px;">
            <a href="javascript:void(0);">取消订单</a>
          </div>

        </div>
        <div class="orderend_table">
          <el-table
            ref="allOrderTable"
            :data="returnedOrderList.dataList"
            tooltip-effect="dark"
            style="width:100%;">
            <el-table-column type="selection" width="32" />
            <el-table-column type="expand" width="32" align="right">
              <template slot-scope="props">
                <el-button
                  type="info"
                  size="small"
                  style="background-color:#f45408;border:none;"
                  @click="viewOrder(props.row.id)">
                  查看订单
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="orderNumber" label="订单号" align="center" width="160" />
            <el-table-column prop="buyerName" label="买家" align="center" width="100" />
            <el-table-column prop="orderExtmData.consignee" label="收货人" align="center" width="100" />
            <el-table-column prop="orderExtmData.phoneTel" label="电话号码" align="center" width="110" />
            <el-table-column prop="paymentName" label="支付方式" align="center" width="100" />
            <el-table-column prop="totalPrice" label="订单总价" align="center" width="100" />
            <el-table-column prop="orderStatusName" label="订单状态" align="center" width="120" />
          </el-table>
          <div style="height:24px;"/>
          <el-pagination
            :current-page="searchReturnedOrder.page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="searchReturnedOrder.pageSize"
            :total="searchReturnedOrder.total"
            layout="total, sizes, prev, pager, next, jumper"
            style="text-align:center;"
            @size-change="handleReturnedOrderSizeChange"
            @current-change="handleReturnedOrderCurrentChange" />
        </div>
      </div>
    </el-tab-pane>
    <el-dialog :visible.sync="dialogCancelFormVisible" title="取消订单" width="20%" >
      <el-form :model="cancelForm" :inline="true" label-width="300px" >
        <el-form-item label="您是否确定要取消以下订单？"/>
        <el-form-item label="订单号：">
          <el-form-item :label="orderNumber"/>
        </el-form-item>
        <el-form-item label="取消原因：">
          <el-radio-group v-model="reason" @change="changeReason">
            <el-radio :label="1">无法备齐货物</el-radio>
            <el-radio :label="2">不是有效的订单</el-radio>
            <el-radio :label="3">买家主动要求</el-radio>
            <el-radio :label="4">其他原因</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="">
          <el-input v-if="reason == 4" v-model="cancelForm.cancelReason" type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCancelFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCancelPartner()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogDeliverFormVisible2" width="20%" >
      <el-form :model="deliverForm2" :inline="true" label-width="300px" >
        <el-form-item label="请选择发货人员"/>
        <el-form-item label="订单号：">
          <el-form-item :label="orderDeliverNumber"/>
        </el-form-item>
        <el-form-item label="学号：">
          <el-select v-model="deliverForm2.stuNumber" placeholder="请选择">
            <el-option
              v-for="item in stuList"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="操作原因：">
          <el-input v-model="deliverForm2.remark" type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDeliverFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="saveDeliverPartner2()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogDeliverFormVisible" :title="invoiceNoControl" width="20%" >
      <el-form :model="deliverForm" :inline="true" label-width="300px" >
        <el-form-item label="请输入您的物流单号"/>
        <el-form-item label="订单号：">
          <el-form-item :label="orderDeliverNumber"/>
        </el-form-item>
        <el-form-item label="物流单号：">
          <el-input v-model="deliverForm.invoiceNo"/>
        </el-form-item>
        <el-form-item label="操作原因：">
          <el-input v-model="deliverForm.remark" type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDeliverFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveDeliverPartner()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogReceivedFormVisible" title="收到货款" width="20%" >
      <el-form :model="receivedForm" :inline="true" label-width="300px" >
        <el-form-item label="您确定已经收到买家的货款了吗？"/>
        <el-form-item label="订单号：">
          <el-form-item :label="orderReceivedNumber"/>
        </el-form-item>
        <el-form-item label="操作原因：">
          <el-input v-model="receivedForm.remark" type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogReceivedFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveReceivedPartner()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogSetupCostFormVisible" title="调整费用" width="20%" >
      <el-form :model="setupCostForm" :inline="true" label-width="300px" >
        <el-form-item label="买家：">
          <el-form-item :label="buyerName"/>
        </el-form-item>
        <el-form-item label="订单号：">
          <el-form-item :label="orderSetupCostNumber"/>
        </el-form-item>
        <el-form-item label="商品总价：">
          <el-input v-model="setupCostForm.price" @keyup.native="changePrice"/>
        </el-form-item>
        <el-form-item label="配送费用：">
          <el-input v-model="setupCostForm.fee" @keyup.native="changePrice"/>
        </el-form-item>
        <el-form-item label="订单总价：">
          <el-form-item :label="orderPrice"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSetupCostFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSetupCostPartner()">确 定</el-button>
      </div>
    </el-dialog>
  </el-tabs>
</template>

<style>
/* @import '../../../static/css/element-ui.css'; */
/* @import '../../../static/css/custom-ui.css'; */

ul,li{
    list-style:none;
  }
  input,button,select{
    border:none;
    background:none;
    outline:none;
  }

/*
.el-tabs--border-card{
  border:none;
  box-shadow: none;
}
.el-tabs--border-card>.el-tabs__header{
  background:none;
  border:none;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
  border:none;
  color:#f45408;
  font-size:16px;
  font-weight:700;
  background:none;
}
.el-tabs--border-card>.el-tabs__content{
  padding:0;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover{
  color:#f45408;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item{
  border:none;
  color:#999;
  font-size:16px;
  font-weight:700;
}
*/
  .orderend{
    margin-top:10px;
    padding-top:20px;
    border-top:1px solid #eee;
    text-align:left;
  }
  .orderendForm{
    font-size:0;
  }
  .orderendform{
    display:inline-block;
    vertical-align:middle;
    font-size:0;
  }
  .orderendform label,.orderendform input{
    display:inline-block;
    vertical-align:middle;
    font-size:14px;
  }
  .orderendform input{
    margin-right:10px;
    width:135px;
    height:40px;
    line-height:40px;
    padding:0 10px;
    box-sizing:border-box;
    border:1px solid #ddd;
  }

  .orderend_btn input{
    width:100px;
    border-radius:5px;
    border:none;
    background:#f45408;
    color:#fff;
    text-align:center;
    cursor:pointer;
  }
  .orderend_table{
    margin:20px 0;
  }
  .orderend_all{
    display:block;
  }
  .orderend_all label{
    padding-right:30px;
    font-size:14px;
  }
  .orderend_all a{
    color:#f45408;
    font-size:14px;
  }
  .orderendTab{
    width:100%;
    margin:30px 0;
    border-top:1px solid #f45408;
  }
  .orderendTab th{
    font-size:14px;
    color:#333;
    height:50px;
    line-height:50px;
    text-align:center;
  }
  .orderendTab td{
    padding-top:20px;
    padding-bottom:20px;
    font-size:12px;
    color:#333;
    text-align:center;
  }
  .orderendTab .orderend_btns{
    text-align:right;
    font-size:0;
    border-bottom:1px solid #ddd;
  }
  .orderend_btns a{
    display:inline-block;
    vertical-align:middle;
    font-size:12px;
    padding:5px 15px;
    margin:0 5px;
    border-radius:5px;
    background:#f45408;
    color:#fff;
  }
  .paging{
    margin:30px auto;
    text-align:center;
  }

  .el-table__row.expanded + tr > td {
    text-align: right;
  }
</style>

<script>
import axios from 'axios'

export default {
  name: 'OrderManage',
  data() {
    return {
      activeTab: 'all',
      /** 所有订单数据 */
      allOrderList: [],
      searchAllOrder: {
        orderNumber: '',
        searchDate: ['', ''],
        orderOwner: '',
        page: 1,
        pageSize: 10,
        total: 0
      },

      /** 待付款订单数据 */
      pendingPayOrderList: [],
      searchPendingPayOrder: {
        orderNumber: '',
        orderStatus: 1,
        searchDate: ['', ''],
        orderOwner: '',
        page: 1,
        pageSize: 10,
        total: 0
      },

      /** 已提交订单数据  */
      submittedOrderList: [],
      searchSubmittedOrder: {
        orderNumber: '',
        orderStatus: 2,
        searchDate: ['', ''],
        orderOwner: '',
        page: 1,
        pageSize: 10,
        total: 0
      },

      /** 待发货订单数据 */
      deliveryOrderList: [],
      searchDeliveryOrder: {
        orderNumber: '',
        orderStatus: 3,
        searchDate: ['', ''],
        orderOwner: '',
        page: 1,
        pageSize: 10,
        total: 0
      },

      /** 已发货订单数据 */
      deliveredOrderList: [],
      searchDeliveredOrder: {
        orderNumber: '',
        orderStatus: 4,
        searchDate: ['', ''],
        orderOwner: '',
        page: 1,
        pageSize: 10,
        total: 0
      },

      /** 已完成订单数据 */
      completedOrderList: [],
      searchCompletedOrder: {
        orderNumber: '',
        orderStatus: 5,
        searchDate: ['', ''],
        orderOwner: '',
        page: 1,
        pageSize: 10,
        total: 0
      },

      /** 已取消订单数据 */
      cancelledOrderList: [],
      searchCancelledOrder: {
        orderNumber: '',
        orderStatus: 6,
        searchDate: ['', ''],
        orderOwner: '',
        page: 1,
        pageSize: 10,
        total: 0
      },

      /** 待退货订单数据 */
      refundOrderList: [],
      searchRefundOrder: {
        orderNumber: '',
        orderStatus: 7,
        searchDate: ['', ''],
        orderOwner: '',
        page: 1,
        pageSize: 10,
        total: 0
      },

      /** 已退货订单数据 */
      returnedOrderList: [],
      searchReturnedOrder: {
        orderNumber: '',
        orderStatus: 8,
        searchDate: ['', ''],
        orderOwner: '',
        page: 1,
        pageSize: 10,
        total: 0
      },

      /** 共用配置 */
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      dialogCancelFormVisible: false,
      dialogDeliverFormVisible: false,
      dialogDeliverFormVisible2: false,
      dialogReceivedFormVisible: false,
      dialogSetupCostFormVisible: false,
      cancelForm: {
        id: 0,
        cancelReason: ''
      },
      deliverForm: {
        id: 0,
        invoiceNo: '',
        remark: ''
      },
      deliverForm2: {
        id: 0,
        stuNumber: '',
        remark: ''
      },
      receivedForm: {
        id: 0,
        remark: ''
      },
      setupCostForm: {
        id: 0,
        extId: 0,
        fee: '',
        price: ''
      },
      orderNumber: '',
      orderDeliverNumber: '',
      orderReceivedNumber: '',
      orderSetupCostNumber: '',
      buyerName: '',
      orderPrice: '',
      reason: '',
      invoiceNoControl: '',
      stuList: []
    }
  },
  mounted() {
    this.getAllOrders(this.searchAllOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
    this.getStudentList(this.$Yjj.getStuList.type, this.$Yjj.getStuList.target)
    // this.getPendingPayOrders(this.$Api.myOrderList.type, this.$Api.myOrderList.target)
    // this.getSubmittedOrders(this.$Api.myOrderList.type, this.$Api.myOrderList.target)
    // this.getDeliveryOrders(this.$Api.myOrderList.type, this.$Api.myOrderList.target)
    // this.getDeliveredOrders(this.$Api.myOrderList.type, this.$Api.myOrderList.target)
    // this.getCompletedOrders(this.$Api.myOrderList.type, this.$Api.myOrderList.target)
    // this.getCancelledOrders(this.$Api.myOrderList.type, this.$Api.myOrderList.target)
    // this.getRefundOrders(this.$Api.myOrderList.type, this.$Api.myOrderList.target)
    // this.getReturnedOrders(this.$Api.myOrderList.type, this.$Api.myOrderList.target)
  },
  methods: {
    /** 所有订单方法 */
    getAllOrders: function(searchParam, type, target) {
      new Promise((resolve, reject) => {
        axios[type](target, searchParam).then(response => {
          this.allOrderList = response.data.data
          this.searchAllOrder.total = this.allOrderList.total
          console.log(this.allOrderList)
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    handleAllOrderSizeChange: function(pageSize) {
      this.searchAllOrder.pageSize = pageSize
      console.log('page' + this.searchAllOrder.pageSize)
      this.getAllOrders(this.searchAllOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
    },
    handleAllOrderCurrentChange: function(page) {
      this.searchAllOrder.page = page
      console.log('page' + this.searchAllOrder.page)
      this.getAllOrders(this.searchAllOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
    },
    searchAll: function() {
      if (this.searchAllOrder.searchDate === null) {
        this.searchAllOrder.searchDate = ['', '']
      }
      if (this.searchAllOrder.orderOwner !== null && this.searchAllOrder.orderOwner !== '' && this.searchAllOrder.orderOwner.length > 0) {
        this.getAllOrders({ page: this.searchAllOrder.page, pageSize: this.searchAllOrder.pageSize, orderNumber: this.searchAllOrder.orderNumber, orderStatus: this.searchAllOrder.orderStatus, buyerName: this.searchAllOrder.orderOwner, startTime: this.searchAllOrder.searchDate[0], endTime: this.searchAllOrder.searchDate[1] }, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      } else {
        this.getAllOrders({ page: this.searchAllOrder.page, pageSize: this.searchAllOrder.pageSize, orderNumber: this.searchAllOrder.orderNumber, orderStatus: this.searchAllOrder.orderStatus, startTime: this.searchAllOrder.searchDate[0], endTime: this.searchAllOrder.searchDate[1] }, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      }
    },
    /** 待付款订单方法 */
    getPendingPayOrders: function(searchParam, type, target) {
      new Promise((resolve, reject) => {
        axios[type](target, searchParam).then(response => {
          this.pendingPayOrderList = response.data.data
          this.searchPendingPayOrder.total = this.pendingPayOrderList.total
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data)
        })
      })
    },
    searchPendingPay: function() {
      if (this.searchPendingPayOrder.searchDate === null) {
        this.searchPendingPayOrder.searchDate = ['', '']
      }
      if (this.searchPendingPayOrder.orderOwner !== null && this.searchPendingPayOrder.orderOwner !== '' && this.searchPendingPayOrder.orderOwner.length > 0) {
        this.getPendingPayOrders({ page: this.searchPendingPayOrder.page, pageSize: this.searchPendingPayOrder.pageSize, orderNumber: this.searchPendingPayOrder.orderNumber, orderStatus: 1, buyerName: this.searchPendingPayOrder.orderOwner, startTime: this.searchPendingPayOrder.searchDate[0], endTime: this.searchPendingPayOrder.searchDate[1] }, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      } else {
        this.getPendingPayOrders({ page: this.searchPendingPayOrder.page, pageSize: this.searchPendingPayOrder.pageSize, orderNumber: this.searchPendingPayOrder.orderNumber, orderStatus: 1, startTime: this.searchPendingPayOrder.searchDate[0], endTime: this.searchPendingPayOrder.searchDate[1] }, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      }
    },
    handlePendingPayOrderSizeChange: function(pageSize) {
      this.searchPendingPayOrder.pageSize = pageSize
      this.getPendingPayOrders(this.searchPendingPayOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
    },
    handlePendingPayOrderCurrentChange: function(page) {
      this.searchPendingPayOrder.page = page
      this.getPendingPayOrders(this.searchPendingPayOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
    },
    setUpCost: function(val) {
      const type = this.$Api.setupOrderCostSch.type
      const target = this.$Api.setupOrderCostSch.target + '?id=' + val
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.setupCostForm.id = response.data.data.id
          this.setupCostForm.extId = response.data.data.orderExtmData.id
          this.setupCostForm.fee = response.data.data.orderExtmData.shippingFee
          this.setupCostForm.price = response.data.data.price
          this.orderSetupCostNumber = response.data.data.orderNumber
          this.buyerName = response.data.data.buyerName
          this.orderPrice = (Number(response.data.data.price) + Number(response.data.data.orderExtmData.shippingFee)).toFixed(2)
          this.dialogSetupCostFormVisible = true
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    changePrice: function() {
      this.orderPrice = (Number(this.setupCostForm.price) + Number(this.setupCostForm.fee)).toFixed(2)
    },
    saveSetupCostPartner: function() {
      const type = this.$Api.setupOrderCost.type
      const target = this.$Api.setupOrderCost.target + '?id=' + this.setupCostForm.id + '&extId=' + this.setupCostForm.extId + '&fee=' + this.setupCostForm.fee + '&price=' + this.setupCostForm.price + '&totalPrice=' + this.orderPrice
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.dialogSetupCostFormVisible = false
          const code = response.data.code
          if (code === '2000') {
            // 刷新列表
            this.getPendingPayOrders(this.searchPendingPayOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.buyerName = ''
            this.orderSetupCostNumber = ''
            this.setupCostForm.price = ''
            this.setupCostForm.fee = ''
            this.orderPrice = ''
            resolve(response.data)
          } else {
            this.$message({
              type: 'error',
              message: '操作失败!'
            })
          }
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    /** 已提交订单方法 */
    getSubmittedOrders: function(searchParam, type, target) {
      new Promise((resolve, reject) => {
        axios[type](target, searchParam).then(response => {
          this.submittedOrderList = response.data.data
          this.searchSubmittedOrder.total = this.submittedOrderList.total
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.erros)
        })
      })
    },
    searchSubmitted: function() {
      if (this.searchSubmittedOrder.searchDate === null) {
        this.searchSubmittedOrder.searchDate = ['', '']
      }
      if (this.searchSubmittedOrder.orderOwner !== null && this.searchSubmittedOrder.orderOwner !== '' && this.searchSubmittedOrder.orderOwner.length > 0) {
        this.getSubmittedOrders({ page: this.searchSubmittedOrder.page, pageSize: this.searchSubmittedOrder.pageSize, orderNumber: this.searchSubmittedOrder.orderNumber, orderStatus: 2, buyerName: this.searchSubmittedOrder.orderOwner, startTime: this.searchSubmittedOrder.searchDate[0], endTime: this.searchSubmittedOrder.searchDate[1] }, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      } else {
        this.getSubmittedOrders({ page: this.searchSubmittedOrder.page, pageSize: this.searchSubmittedOrder.pageSize, orderNumber: this.searchSubmittedOrder.orderNumber, orderStatus: 2, startTime: this.searchSubmittedOrder.searchDate[0], endTime: this.searchSubmittedOrder.searchDate[1] }, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      }
    },
    handleSubmittedOrderSizeChange: function(pageSize) {
      this.searchSubmittedOrder.pageSize = pageSize
      this.getSubmittedOrders(this.searchSubmittedOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
    },
    handleSubmittedOrderCurrentChange: function(page) {
      this.searchSubmittedOrder.page = page
      this.getSubmittedOrders(this.searchSubmittedOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
    },

    /** 待发货订单方法 */
    getDeliveryOrders: function(searchParam, type, target) {
      new Promise((resolve, reject) => {
        axios[type](target, searchParam).then(response => {
          this.deliveryOrderList = response.data.data
          this.searchDeliveryOrder.total = this.deliveryOrderList.total
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    searchDelivery: function() {
      if (this.searchDeliveryOrder.searchDate === null) {
        this.searchDeliveryOrder.searchDate = ['', '']
      }
      if (this.searchDeliveryOrder.orderOwner !== null && this.searchDeliveryOrder.orderOwner !== '' && this.searchDeliveryOrder.orderOwner.length > 0) {
        this.getDeliveryOrders({ page: this.searchDeliveryOrder.page, pageSize: this.searchDeliveryOrder.pageSize, orderNumber: this.searchDeliveryOrder.orderNumber, orderStatus: 3, buyerName: this.searchDeliveryOrder.orderOwner, startTime: this.searchDeliveryOrder.searchDate[0], endTime: this.searchDeliveryOrder.searchDate[1] }, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      } else {
        this.getDeliveryOrders({ page: this.searchDeliveryOrder.page, pageSize: this.searchDeliveryOrder.pageSize, orderNumber: this.searchDeliveryOrder.orderNumber, orderStatus: 3, startTime: this.searchDeliveryOrder.searchDate[0], endTime: this.searchDeliveryOrder.searchDate[1] }, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      }
    },
    handleDeliveryOrderSizeChange: function(pageSize) {
      this.searchDeliveryOrder.pageSize = pageSize
      this.getDeliveryOrders(this.searchDeliveryOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
    },
    handleDeliveryOrderCurrentChange: function(page) {
      this.searchDeliveryOrder.page = page
      this.getDeliveryOrders(this.searchDeliveryOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
    },

    /** 已发货订单方法 */
    getDeliveredOrders: function(searchParam, type, target) {
      new Promise((resolve, reject) => {
        axios[type](target, searchParam).then(response => {
          this.deliveredOrderList = response.data.data
          this.searchDeliveredOrder.total = this.deliveredOrderList.total
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    searchDelivered: function() {
      if (this.searchDeliveredOrder.searchDate === null) {
        this.searchDeliveredOrder.searchDate = ['', '']
      }
      if (this.searchDeliveredOrder.orderOwner !== null && this.searchDeliveredOrder.orderOwner !== '' && this.searchDeliveredOrder.orderOwner.length > 0) {
        this.getDeliveredOrders({ page: this.searchDeliveredOrder.page, pageSize: this.searchDeliveredOrder.pageSize, orderNumber: this.searchDeliveredOrder.orderNumber, orderStatus: 4, buyerName: this.searchDeliveredOrder.orderOwner, startTime: this.searchDeliveredOrder.searchDate[0], endTime: this.searchDeliveredOrder.searchDate[1] }, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      } else {
        this.getDeliveredOrders({ page: this.searchDeliveredOrder.page, pageSize: this.searchDeliveredOrder.pageSize, orderNumber: this.searchDeliveredOrder.orderNumber, orderStatus: 4, startTime: this.searchDeliveredOrder.searchDate[0], endTime: this.searchDeliveredOrder.searchDate[1] }, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      }
    },
    handleDeliveredOrderSizeChange: function(pageSize) {
      this.searchDeliveredOrder.pageSize = pageSize
      this.getDeliveredOrders(this.searchDeliveredOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
    },
    handleDeliveredOrderCurrentChange: function(page) {
      this.searchDeliveredOrder.page = page
      this.getDeliveredOrders(this.searchDeliveredOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
    },

    /** 已完成订单方法 */
    getCompletedOrders: function(searchParam, type, target) {
      new Promise((resolve, reject) => {
        axios[type](target, searchParam).then(response => {
          this.completedOrderList = response.data.data
          this.searchCompletedOrder.total = this.completedOrderList.total
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    searchCompleted: function() {
      if (this.searchCompletedOrder.searchDate === null) {
        this.searchCompletedOrder.searchDate = ['', '']
      }
      if (this.searchCompletedOrder.orderOwner !== null && this.searchCompletedOrder.orderOwner !== '' && this.searchCompletedOrder.orderOwner.length > 0) {
        this.getCompletedOrders({ page: this.searchCompletedOrder.page, pageSize: this.searchCompletedOrder.pageSize, orderNumber: this.searchCompletedOrder.orderNumber, orderStatus: 5, buyerName: this.searchCompletedOrder.orderOwner, startTime: this.searchCompletedOrder.searchDate[0], endTime: this.searchCompletedOrder.searchDate[1] }, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      } else {
        this.getCompletedOrders({ page: this.searchCompletedOrder.page, pageSize: this.searchCompletedOrder.pageSize, orderNumber: this.searchCompletedOrder.orderNumber, orderStatus: 5, startTime: this.searchCompletedOrder.searchDate[0], endTime: this.searchCompletedOrder.searchDate[1] }, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      }
    },
    handleCompletedOrderSizeChange: function(pageSize) {
      this.searchCompletedOrder.pageSize = pageSize
      this.getCompletedOrders(this.searchCompletedOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
    },
    handleCompletedOrderCurrentChange: function(page) {
      this.searchCompletedOrder.page = page
      this.getCompletedOrders(this.searchCompletedOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
    },

    /** 已取消订单方法 */
    getCancelledOrders: function(searchParam, type, target) {
      new Promise((resolve, reject) => {
        axios[type](target, searchParam).then(response => {
          this.cancelledOrderList = response.data.data
          this.searchCancelledOrder.total = this.cancelledOrderList.total
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    searchCancelled: function() {
      if (this.searchCancelledOrder.searchDate === null) {
        this.searchCancelledOrder.searchDate = ['', '']
      }
      if (this.searchCancelledOrder.orderOwner !== null && this.searchCancelledOrder.orderOwner !== '' && this.searchCancelledOrder.orderOwner.length > 0) {
        this.getCancelledOrders({ page: this.searchCancelledOrder.page, pageSize: this.searchCancelledOrder.pageSize, orderNumber: this.searchCancelledOrder.orderNumber, orderStatus: 6, buyerName: this.searchCancelledOrder.orderOwner, startTime: this.searchCancelledOrder.searchDate[0], endTime: this.searchCancelledOrder.searchDate[1] }, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      } else {
        this.getCancelledOrders({ page: this.searchCancelledOrder.page, pageSize: this.searchCancelledOrder.pageSize, orderNumber: this.searchCancelledOrder.orderNumber, orderStatus: 6, startTime: this.searchCancelledOrder.searchDate[0], endTime: this.searchCancelledOrder.searchDate[1] }, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      }
    },
    handleCancelledOrderSizeChange: function(pageSize) {
      this.searchCancelledOrder.pageSize = pageSize
      this.getCancelledOrders(this.searchCancelledOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
    },
    handleCancelledOrderCurrentChange: function(page) {
      this.searchCancelledOrder.page = page
      this.getCancelledOrders(this.searchCancelledOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
    },

    /** 待退货订单方法 */
    getRefundOrders: function(searchParam, type, target) {
      new Promise((resolve, reject) => {
        axios[type](target, searchParam).then(response => {
          this.refundOrderList = response.data.data
          this.searchRefundOrder.total = this.refundOrderList.total
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    searchRefund: function() {
      if (this.searchRefundOrder.searchDate === null) {
        this.searchRefundOrder.searchDate = ['', '']
      }
      if (this.searchRefundOrder.orderOwner !== null && this.searchRefundOrder.orderOwner !== '' && this.searchRefundOrder.orderOwner.length > 0) {
        this.getRefundOrders({ page: this.searchRefundOrder.page, pageSize: this.searchRefundOrder.pageSize, orderNumber: this.searchRefundOrder.orderNumber, orderStatus: 7, buyerName: this.searchRefundOrder.orderOwner, startTime: this.searchRefundOrder.searchDate[0], endTime: this.searchRefundOrder.searchDate[1] }, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      } else {
        this.getRefundOrders({ page: this.searchRefundOrder.page, pageSize: this.searchRefundOrder.pageSize, orderNumber: this.searchRefundOrder.orderNumber, orderStatus: 7, startTime: this.searchRefundOrder.searchDate[0], endTime: this.searchRefundOrder.searchDate[1] }, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      }
    },
    handleRefundOrderSizeChange: function(pageSize) {
      this.searchRefundOrder.pageSize = pageSize
      this.getRefundOrders(this.searchRefundOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
    },
    handleRefundOrderCurrentChange: function(page) {
      this.searchRefundOrder.page = page
      this.getRefundOrders(this.searchRefundOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
    },

    /** 已退货订单方法 */
    getReturnedOrders: function(searchParam, type, target) {
      new Promise((resolve, reject) => {
        axios[type](target, searchParam).then(response => {
          this.returnedOrderList = response.data.data
          this.searchReturnedOrder.total = this.returnedOrderList.total
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    searchReturned: function() {
      if (this.searchReturnedOrder.searchDate === null) {
        this.searchReturnedOrder.searchDate = ['', '']
      }
      if (this.searchReturnedOrder.orderOwner !== null && this.searchReturnedOrder.orderOwner !== '' && this.searchReturnedOrder.orderOwner.length > 0) {
        this.getReturnedOrders({ page: this.searchReturnedOrder.page, pageSize: this.searchReturnedOrder.pageSize, orderNumber: this.searchReturnedOrder.orderNumber, orderStatus: 8, buyerName: this.searchReturnedOrder.orderOwner, startTime: this.searchReturnedOrder.searchDate[0], endTime: this.searchReturnedOrder.searchDate[1] }, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      } else {
        this.getReturnedOrders({ page: this.searchReturnedOrder.page, pageSize: this.searchReturnedOrder.pageSize, orderNumber: this.searchReturnedOrder.orderNumber, orderStatus: 8, startTime: this.searchReturnedOrder.searchDate[0], endTime: this.searchReturnedOrder.searchDate[1] }, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      }
    },
    handleReturnedOrderSizeChange: function(pageSize) {
      this.searchReturnedOrder.pageSize = pageSize
      this.searchReturnedOrder(this.searchReturnedOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
    },
    handleReturnedOrderCurrentChange: function(page) {
      this.searchReturnedOrder.page = page
      this.searchReturnedOrder(this.searchReturnedOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
    },

    /** 数据表行操作功能  可共用*/
    handleTabsClick: function(tab, event) {
      if (tab.name === 'pendingpay') {
        this.getPendingPayOrders(this.searchPendingPayOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      }
      if (tab.name === 'submitted') {
        this.getSubmittedOrders(this.searchSubmittedOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      }
      if (tab.name === 'delivery') {
        this.getDeliveryOrders(this.searchDeliveryOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      }
      if (tab.name === 'delivered') {
        this.getDeliveredOrders(this.searchDeliveredOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      }
      if (tab.name === 'completed') {
        this.getCompletedOrders(this.searchCompletedOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      }
      if (tab.name === 'cancelled') {
        this.getCancelledOrders(this.searchCancelledOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      }
      if (tab.name === 'refund') {
        this.getRefundOrders(this.searchRefundOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      }
      if (tab.name === 'returned') {
        this.getReturnedOrders(this.searchReturnedOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
      }
    },
    getStudentList: function(type, target) {
      return new Promise((resolve, reject) => {
        axios[type](target).then(response => {
          this.stuList = response.data.data
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    viewOrder: function(id) {
      this.$router.push({
        name: 'MyOrderDetail',
        query: {
          orderId: id,
          type: 'showBuyer'
        }
      })
    },
    cancelOrder: function(val, orderNumber) {
      this.cancelForm.id = val
      this.reason = 1
      this.orderNumber = orderNumber
      this.dialogCancelFormVisible = true
    },
    changeReason: function(value) {
      this.reason = value
      if (value === 4) {
        this.cancelForm.cancelReason = ''
      }
    },
    saveCancelPartner: function() {
      if (this.reason === 1) {
        this.cancelForm.cancelReason = '无法备齐货物'
      } else if (this.reason === 2) {
        this.cancelForm.cancelReason = '不是有效的订单'
      } else if (this.reason === 3) {
        this.cancelForm.cancelReason = '买家主动要求'
      }
      const type = this.$Yjj.cancelOrder.type
      const target = this.$Yjj.cancelOrder.target
      return new Promise((resolve, reject) => {
        axios[type](target, this.cancelForm).then(response => {
          this.dialogCancelFormVisible = false
          const code = response.data.code
          if (code === '2000') {
            // 刷新列表
            this.getAllOrders(this.searchAllOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
            this.getPendingPayOrders(this.searchPendingPayOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
            this.getDeliveryOrders(this.searchDeliveryOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
            this.getDeliveredOrders(this.searchDeliveredOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
            this.$message({
              type: 'success',
              message: '取消成功!'
            })
            resolve(response.data)
          } else {
            this.$message({
              type: 'error',
              message: '取消失败!'
            })
          }
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    deliver: function(val, orderNumber) {
      this.deliverForm2.id = val
      this.orderDeliverNumber = orderNumber
      this.dialogDeliverFormVisible2 = true
    },
    updOrderNumber: function(val, orderNumber, invoiceNo) {
      this.deliverForm.id = val
      this.deliverForm.invoiceNo = invoiceNo
      this.deliverForm.remark = ''
      this.orderDeliverNumber = orderNumber
      this.dialogDeliverFormVisible = true
      this.invoiceNoControl = '修改单号'
    },
    saveDeliverPartner: function() {
      const type = this.$Api.orderInvoice.type
      const target = this.$Api.orderInvoice.target
      return new Promise((resolve, reject) => {
        axios[type](target, this.deliverForm).then(response => {
          this.dialogDeliverFormVisible = false
          const code = response.data.code
          if (code === '2000') {
            // 刷新列表
            this.getAllOrders(this.searchAllOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
            this.getDeliveryOrders(this.searchDeliveryOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
            this.getDeliveredOrders(this.searchDeliveredOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            resolve(response.data)
          } else {
            this.$message({
              type: 'error',
              message: '操作失败!'
            })
          }
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    saveDeliverPartner2: function() {
      const type = this.$Yjj.deliverGoods.type
      const target = this.$Yjj.deliverGoods.target
      return new Promise((resolve, reject) => {
        axios[type](target, this.deliverForm2).then(response => {
          this.dialogDeliverFormVisible2 = false
          const code = response.data.code
          if (code === '2000') {
            // 刷新列表
            this.getAllOrders(this.searchAllOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
            this.getDeliveryOrders(this.searchDeliveryOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
            this.getDeliveredOrders(this.searchDeliveredOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.orderDeliverNumber = ''
            this.deliverForm2.stuNumber = ''
            this.deliverForm2.remark = ''
            resolve(response.data)
          } else {
            this.$message({
              type: 'error',
              message: '操作失败!'
            })
          }
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    receivedPayment: function(val, orderNumber) {
      this.receivedForm.id = val
      this.orderReceivedNumber = orderNumber
      this.dialogReceivedFormVisible = true
    },
    saveReceivedPartner: function() {
      const type = this.$Api.paymentOrderReceived.type
      const target = this.$Api.paymentOrderReceived.target
      return new Promise((resolve, reject) => {
        axios[type](target, this.receivedForm).then(response => {
          this.dialogReceivedFormVisible = false
          const code = response.data.code
          if (code === '2000') {
            // 刷新列表
            this.getAllOrders(this.searchAllOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
            this.getPendingPayOrders(this.searchPendingPayOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            resolve(response.data)
          } else {
            this.$message({
              type: 'error',
              message: '操作失败!'
            })
          }
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    },
    returnGoods: function(orderId, orderNum) {
      const type = this.$Lwy.returnGoods.type
      const target = this.$Lwy.returnGoods.target
      var param = {}
      param.id = orderId
      param.orderNumber = orderNum
      return new Promise((resolve, reject) => {
        axios[type](target, param).then(response => {
          this.dialogReceivedFormVisible = false
          const code = response.data.code
          const msg = response.data.msg
          if (code === '2000') {
            // 刷新列表
            this.getAllOrders(this.searchAllOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
            this.getRefundOrders(this.searchRefundOrder, this.$Api.orderManageList.type, this.$Api.orderManageList.target)
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            resolve(response.data)
          } else {
            this.$message({
              type: 'error',
              message: msg
            })
          }
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data.errors)
        })
      })
    }
  }
}
</script>
