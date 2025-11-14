<template>
  <el-dialog
    title="权限设置"
    width="600"
    :model-value="visible"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-card>
      <template #header>
        <span>页面权限</span>
      </template>
      <el-tree
        ref="treeRef"
        style="max-width: 600px"
        show-checkbox
        :data="treeMenu"
        node-key="url"
      />
    </el-card>
    <el-card>
      <template #header>
        <span>按钮权限</span>
      </template>
      <el-checkbox-group v-model="btnAuth">
        <el-checkbox label="全部" value="all" />
        <el-checkbox label="添加" value="add" />
        <el-checkbox label="编辑" value="edit" />
        <el-checkbox label="删除" value="delete" />
      </el-checkbox-group>
    </el-card>
  </el-dialog>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/auth'
import { storeToRefs } from 'pinia'
import { transformMenu, type TTreeMenuItem } from '@/utils/transformMenu'
import { ref, toRefs } from 'vue'
import type { ElTree } from 'element-plus'

const props = defineProps<{
  visible: boolean
  checkedKeys: string[]
  btnAuth: string[]
}>()

const { visible, checkedKeys, btnAuth } = toRefs(props)

const userStore = useUserStore()
const treeRef = ref<InstanceType<typeof ElTree>>()
const { menu } = storeToRefs(userStore)
const treeMenu: TTreeMenuItem[] = transformMenu(menu.value)

const handleOpen = () => {
  treeRef.value?.setCheckedKeys(checkedKeys.value)
}
interface IEmits {
  close: []
}
const emit = defineEmits<IEmits>()
const handleClose = () => {
  emit('close')
}
</script>
