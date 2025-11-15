<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="searchParams.no" placeholder="请输入会员卡号" />
      </el-col>
      <el-col :span="6">
        <el-input v-model="searchParams.tel" placeholder="请输入持有人手机号" />
      </el-col>
      <el-col :span="6">
        <el-input v-model="searchParams.name" placeholder="请输入持有人姓名" />
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="loadData">搜索</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="mt">
    <el-table :data="dataList" v-loading="loading">
      <el-table-column align="center" type="index" label="序号" width="80" />
      <el-table-column align="center" prop="memberCardNumber" label="会员卡号" />
      <el-table-column align="center" prop="cardType" label="会员卡类型" />
      <el-table-column align="center" prop="issueDate" label="开卡日期" />
      <el-table-column align="center" prop="holderName" label="持有人姓名" />
      <el-table-column align="center" prop="holderPhone" label="持有人手机号" />
      <el-table-column align="center" prop="cardBalance" label="会员卡余额" /><el-table-column
        align="center"
        prop="transactionRecords"
        label="消费记录"
      >
        <template #default="scope">
          <el-popover
            placement="top-start"
            title="消费记录"
            width="200"
            trigger="hover"
            content="this is content, this is content, this is content"
          >
            <template #reference>
              <el-button class="m-2">当日消费记录</el-button>
            </template>
            <el-timeline>
              <el-timeline-item
                v-for="(item, index) of scope.row.transactionRecords"
                color="#9fed80"
                :timestamp="item.transactionDate"
                :key="index"
              >
                <p>消费金额：{{ item.transactionAmount }}</p>
                <p>消费类型：{{ item.transactionType }}</p>
              </el-timeline-item>
            </el-timeline>
          </el-popover>
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

<script lang="ts" setup>
import { ref } from 'vue'
import useTable from '@/hooks/use-table'

const searchParams = ref({
  no: '',
  tel: '',
  name: '',
})

const {
  dataList,
  loading,
  total,
  pageInfo,
  handleSizeChange,
  handleCurrentChange,
  resetPagination,
  loadData,
} = useTable('/member', searchParams, 10)

const handleReset = () => {
  searchParams.value = {
    no: '',
    tel: '',
    name: '',
  }
  resetPagination()
}
</script>
