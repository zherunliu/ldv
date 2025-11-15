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
    <el-card class="mt">
      <template #header>
        <span>按钮权限</span>
      </template>
      <el-checkbox-group v-model="initBtnAuth">
        <el-checkbox label="全部" value="all" />
        <el-checkbox label="添加" value="add" />
        <el-checkbox label="编辑" value="edit" />
        <el-checkbox label="删除" value="delete" />
      </el-checkbox-group>
    </el-card>
    <template #footer>
      <div>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/auth'
import { storeToRefs } from 'pinia'
import { transformMenu, type TTreeMenuItem } from '@/utils/transformMenu'
import { ref, toRefs } from 'vue'
import { type ElTree, ElMessage } from 'element-plus'
import { setAuthApi } from '@/api/system'

const props = defineProps<{
  visible: boolean
  checkedKeys: string[]
  btnAuth: string[]
  accountNo: string
}>()

/* 父元素通过 props 传的值是 readonly 的 */
const { visible, checkedKeys, btnAuth, accountNo } = toRefs(props)

const initBtnAuth = ref<string[]>([])
initBtnAuth.value = btnAuth.value.slice()
const userStore = useUserStore()
const treeRef = ref<InstanceType<typeof ElTree>>()
const { menu } = storeToRefs(userStore)
const treeMenu: TTreeMenuItem[] = transformMenu(menu.value)

const handleOpen = () => {
  treeRef.value?.setCheckedKeys(checkedKeys.value)
}
interface IEmits {
  close: []
  reload: []
}
const emit = defineEmits<IEmits>()
const handleClose = () => {
  emit('close')
}

const handleConfirm = async () => {
  const res = await setAuthApi(
    accountNo.value,
    treeRef.value?.getCheckedKeys(true) as string[],
    initBtnAuth.value,
  )
  if (res.code === 200) {
    ElMessage.success('权限设置成功')
    handleClose()
    emit('reload')
  }
}
</script>
