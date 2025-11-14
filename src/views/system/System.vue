<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model.trim="searchParams.name" placeholder="请输入姓名" />
      </el-col>
      <el-col :span="6">
        <el-select v-model="searchParams.department" placeholder="请选择部门">
          <el-option label="全部" value="" />
          <el-option label="总裁办" value="1" />
          <el-option label="运营部" value="2" />
          <el-option label="维修部" value="3" />
          <el-option label="市场部" value="4" />
          <el-option label="财务部" value="5" />
        </el-select>
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
      <el-table-column align="center" prop="name" label="姓名" />
      <el-table-column align="center" prop="account" label="账户" />
      <el-table-column align="center" prop="phone" label="手机号" />
      <el-table-column align="center" width="200" prop="idNo" label="身份证号" />
      <el-table-column align="center" prop="position" label="职位">
        <template #default="scope">
          <el-tag type="primary">{{ scope.row.position }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="department" label="部门" />
      <el-table-column align="center" prop="pageAuthority" label="页面权限">
        <template #default="scope">
          <el-tag type="success">{{ scope.row.pageAuthority }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="btnAuthority" label="按钮权限">
        <template #default="scope">
          <el-tag type="info">{{ scope.row.btnAuthority }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template #default="scope">
          <el-button type="primary" size="small" @click="setAuth(scope.row.pageAuthority)"
            >编辑</el-button
          >
          <el-button type="warning" size="small">禁用</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt fr mb"
      v-model:current-page="pageInfo.page"
      v-model:page-size="pageInfo.pageSize"
      :page-sizes="[5, 10, 15, 20]"
      :total="total"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
  <AuthModal
    :visible="visible"
    :checkedKeys="checkedKeys"
    :btn-auth="btn"
    @close="visible = false"
  />
</template>

<script setup lang="ts">
import { useTable } from '@/hooks/use-table'
import { ref } from 'vue'
import { type IMenuItem } from '@/types/user'
import AuthModal from './AuthModal.vue'
import { authApi } from '@/api/system'

type TSearchParams = {
  name: string
  department: string
}
const searchParams = ref<TSearchParams>({
  name: '',
  department: '',
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
} = useTable('/permissionList', searchParams)

const handleReset = () => {
  searchParams.value = {
    name: '',
    department: '',
  }
  resetPagination()
}

const collectedUrls = (menuList: IMenuItem[]) => {
  let urls: string[] = []
  menuList.forEach((item) => {
    if (item.children && item.children.length > 0) {
      urls = urls.concat(collectedUrls(item.children))
    } else {
      urls.push(item.url)
    }
  })
  return urls
}

const visible = ref(false)
const btn = ref<string[]>([])
const checkedKeys = ref<string[]>([])

const setAuth = async (pageAuthority: string) => {
  const res = await authApi(pageAuthority)
  const data = res.data as { list: IMenuItem[]; btn: string[] }
  btn.value = data.btn
  checkedKeys.value = collectedUrls(data.list)
  visible.value = true
}
</script>
