<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="searchParams.orderNo" placeholder="请输入订单号"></el-input>
      </el-col>
      <el-col :span="6">
        <el-select v-model="searchParams.status" placeholder="订单状态">
          <el-option label="全部" :value="1"></el-option>
          <el-option label="进行中" :value="2"></el-option>
          <el-option label="已完成" :value="3"></el-option>
          <el-option label="异常" :value="4"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-input v-model="searchParams.deviceNo" placeholder="设备编号"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-col>
      <el-col class="mt" :span="6">
        <el-input v-model="searchParams.name" placeholder="请输入站点名称"></el-input>
      </el-col>
      <el-col class="mt" :span="6">
        <el-date-picker
          v-model="datePicker"
          type="daterange"
          range-separator="/"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
          @change="handleDataChange"
        >
        </el-date-picker>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="mt">
    <el-button type="danger">批量删除</el-button>
    <el-button icon="Download" type="primary">导出订单数据到Excel</el-button>
  </el-card>
  <el-card class="mt">
    <el-table :data="dataList" v-loading="loading">
      <el-table-column align="center" label="订单号" prop="orderNo"></el-table-column>
      <el-table-column align="center" label="设备编号" prop="orderNo"></el-table-column>
      <el-table-column align="center" label="订单日期" prop="orderNo"></el-table-column>
      <el-table-column align="center" label="开始时间" prop="orderNo"></el-table-column>
      <el-table-column align="center" label="结束时间" prop="orderNo"></el-table-column>
      <el-table-column align="center" label="金额" prop="orderNo"></el-table-column>
      <el-table-column align="center" label="支付方式" prop="orderNo"></el-table-column>
      <el-table-column align="center" label="订单状态" prop="orderNo"></el-table-column>
      <el-table-column align="center" width="150px" label="操作">
        <!-- <template #default="scope"> -->
        <template #default>
          <el-button type="primary" size="small">详情</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt fr mb"
      v-model:current-page="pageInfo.page"
      v-model:page-size="pageInfo.pageSize"
      :page-sizes="[5, 10, 15, 20]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useTable } from '@/hooks/useTable'

interface ISearchType {
  orderNo: string
  status: number
  deviceNo: string
  name: string
  startDate: string
  endDate: string
}
interface IOrderType {
  orderNo: string
  deviceNo: string
  date: string
  startTime: string
  endTime: string
  money: number
  pay: string
  status: number
}
const searchParams = ref<ISearchType>({
  orderNo: '',
  status: 1,
  deviceNo: '',
  name: '',
  startDate: '',
  endDate: '',
})
const datePicker = ref()
const handleDataChange = (val: string[]) => {
  searchParams.value.startDate = val[0]
  searchParams.value.endDate = val[1]
}

const {
  dataList,
  loading,
  total,
  pageInfo,
  handleSizeChange,
  handleCurrentChange,
  resetPagination,
  loadData,
} = useTable<IOrderType, Ref<ISearchType>>('/orderList', searchParams)

const handleReset = () => {
  datePicker.value = ''
  searchParams.value = {
    orderNo: '',
    status: 1,
    deviceNo: '',
    name: '',
    startDate: '',
    endDate: '',
  }
  resetPagination()
}
</script>
