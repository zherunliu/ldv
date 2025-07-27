<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="formParams.input" placeholder="请输入站点名称/ID">
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
          <el-option label="空间中" :value="3"></el-option>
          <el-option label="维护中" :value="4"></el-option>
          <el-option label="待维修" :value="5"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="mt">
    <template #header>
      <el-button type="primary" icon="Plus">新增</el-button>
    </template>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" type="index" label="序号" width="80" />
      <el-table-column align="center" prop="name" label="站点名称" />
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
        <el-button type="primary" size="small">编辑</el-button>
        <el-button type="danger" size="small" style="margin: 0">删除</el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { listApi } from '@/api/chargingstation'
import { reactive, ref } from 'vue'

const select = ref('name')
const formParams = reactive({
  input: '',
  value: 1,
})

const tableData = ref([])
const loadData = async () => {
  const {
    data: { list, total },
  } = await listApi({ page: 1, pageSize: 10, status: 1 })
  tableData.value = list
}
loadData()
</script>
