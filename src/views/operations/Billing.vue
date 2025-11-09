<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <el-card>
        <el-input style="width: 80%" placeholder="请输入关键词" v-model="filterText">
          <template #append>
            <el-button icon="Search" />
          </template>
        </el-input>
        <el-tree
          ref="treeRef"
          style="max-width: 600px"
          :data="treeData"
          class="mt"
          :filter-node-method="filterNode"
          :props="defaultProps"
        ></el-tree>
      </el-card>
    </el-col>
    <el-col :span="18"><el-card></el-card> </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { cityListApi } from '@/api/operations'
import type { ElTree, FilterNodeMethodFunction } from 'element-plus'

const filterText = ref<string>('')
interface Tree {
  label?: string
  children?: Tree[]
}

const defaultProps = {
  children: 'children',
  label: 'label',
}

const treeData = ref<Tree[]>([])
onMounted(async () => {
  const { data } = await cityListApi()
  treeData.value = data as Tree[]
})

const treeRef = ref<InstanceType<typeof ElTree>>()
watch(filterText, (val) => {
  treeRef.value?.filter(val)
})

const filterNode: FilterNodeMethodFunction = (value: string, data: Tree) => {
  if (!value) return true
  return data.label!.includes(value)
}
</script>
