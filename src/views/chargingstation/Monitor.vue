<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="6">
        <!-- trim 去除首尾空格 -->
        <el-input v-model.trim="formParams.input" placeholder="请输入站点名称/ID">
          <template #append>
            <el-select v-model="select" style="width: 115px">
              <el-option label="按名称查询" value="name" />
              <el-option label="按ID查询" value="id" />
            </el-select>
          </template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-select v-model="formParams.value" placeholder="充电站状态">
          <el-option label="全部" :value="1"></el-option>
          <el-option label="使用中" :value="2"></el-option>
          <el-option label="空闲中" :value="3"></el-option>
          <el-option label="维护中" :value="4"></el-option>
          <el-option label="待维修" :value="5"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="mt">
    <template #header>
      <el-button type="primary" icon="Plus" @click="handleAdd">新增</el-button>
    </template>
    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column align="center" type="index" label="序号" width="80" />
      <el-table-column align="center" prop="name" label="站点名称" width="180" />
      <el-table-column align="center" prop="id" label="站点ID" />
      <el-table-column align="center" prop="city" label="所属城市" />
      <el-table-column align="center" prop="fast" label="快充数" />
      <el-table-column align="center" prop="slow" label="慢充数" />
      <el-table-column align="center" prop="status" label="状态">
        <template #default="scope">
          <el-tag v-if="scope.row.status == 2" type="primary">使用中</el-tag>
          <el-tag v-if="scope.row.status == 3" type="success">空闲中</el-tag>
          <el-tag v-if="scope.row.status == 4" type="warning">维护中</el-tag>
          <el-tag v-if="scope.row.status == 5" type="danger">待维修</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="now" label="正在充电" />
      <el-table-column align="center" prop="fault" label="故障数" />
      <el-table-column align="center" prop="person" label="负责人" />
      <el-table-column align="center" prop="tel" label="负责人电话" width="110" />
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-popconfirm title="确定删除该充电站吗？" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button type="danger" size="small" style="margin: 0">删除</el-button>
            </template>
          </el-popconfirm>
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
      :total="totals"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
  <station-form :dialog-visible="visible" @close="visible = false" @reload="loadData" />
</template>

<script setup lang="ts">
import { listApi, deleteApi } from '@/api/chargingstation'
import { onMounted, reactive, ref } from 'vue'
import StationForm from './components/StationForm.vue'
import type { IRowType } from '@/types/station'
import { useStationStore } from '@/store/station'
import { ElMessage } from 'element-plus'

const select = ref('name')
const formParams = reactive({
  input: '',
  value: 1,
})
const totals = ref(0)
const loading = ref<boolean>(false)
const tableData = ref<IRowType[]>([])
const pageInfo = reactive({
  page: 1,
  pageSize: 5,
})
const loadData = async () => {
  loading.value = true
  const { data } = await listApi(
    {
      ...pageInfo,
      status: formParams.value,
      // 这里 [select.value], 是将 select.value 这个字符串
      // 作为 data 对象 (listApi 函数的参数) 的一个属性名 (id 或 name)
      [select.value]: formParams.input,
    } /** data */,
  )

  const { list, total } = data as { list: IRowType[]; total: number }
  loading.value = false
  tableData.value = list
  totals.value = total
}
onMounted(() => {
  loadData()
})

const handleSizeChange = (size: number) => {
  pageInfo.pageSize = size
  loadData()
}

const handleCurrentChange = (page: number) => {
  pageInfo.page = page
  loadData()
}

const handleReset = () => {
  formParams.input = ''
  formParams.value = 1
  select.value = 'name'
  pageInfo.page = 1
  pageInfo.pageSize = 5
  loadData()
}

const visible = ref<boolean>(false)
const stationStore = useStationStore()
const { setRowData } = stationStore
const edit = (row: IRowType) => {
  setRowData(row)
  visible.value = true
}
const handleAdd = () => {
  setRowData({
    name: '',
    id: '',
    city: '',
    person: '',
    tel: '',
    fast: '',
    slow: '',
    status: 1,
    now: '',
    fault: '',
  })
  visible.value = true
}
const handleDelete = async (id: string) => {
  const res = await deleteApi(id)
  if (res.code === 200) {
    ElMessage.success(res.message)
    loadData()
  }
}
</script>
