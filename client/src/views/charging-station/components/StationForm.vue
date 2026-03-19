<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="title"
    draggable
    destroy-on-close
    @close="handleCancel"
  >
    <el-form :rules="rules" :model="ruleForm" ref="formRef">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="站点名称:" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="站点ID:" prop="id">
            <el-input v-model="ruleForm.id" :disabled="disable" />
          </el-form-item>
          <el-form-item label="所属城市:" prop="city">
            <el-input v-model="ruleForm.city" />
          </el-form-item>
          <el-form-item label="负责人:" prop="person">
            <el-input v-model="ruleForm.person" />
          </el-form-item>
          <el-form-item label="负责人电话:" prop="tel">
            <el-input v-model="ruleForm.tel" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="快充数:" prop="fast">
            <el-input v-model="ruleForm.fast" />
          </el-form-item>
          <el-form-item label="慢充数:" prop="slow">
            <el-input v-model="ruleForm.slow" />
          </el-form-item>
          <el-form-item label="充电站状态:" prop="status">
            <el-select placeholder="充电站状态" v-model="ruleForm.status" :disabled="disable">
              <el-option label="全部" :value="1" />
              <el-option label="使用中" :value="2" />
              <el-option label="空闲中" :value="3" />
              <el-option label="维护中" :value="4" />
              <el-option label="待维修" :value="5" />
            </el-select>
          </el-form-item>
          <el-form-item label="正在充电:" prop="now">
            <el-input v-model="ruleForm.now" :disabled="disable" />
          </el-form-item>
          <el-form-item label="故障数:" prop="fault">
            <el-input v-model="ruleForm.fault" :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { IRowType } from '@/types/station'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { reactive, ref, watch } from 'vue'
import { useStationStore } from '@/store/station'
import { storeToRefs } from 'pinia'
import { editApi } from '@/api/charging-station'

const ruleForm = ref<IRowType>({
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

// 过时的, 不推荐的写法
// 可以参考 https://161043261.github.io/t/vue#%E7%88%B6%E4%BC%A0%E5%AD%90-defineprops-%E5%AF%B9%E6%AF%94-useattrs
// 父传子中, 子组件的 4 中写法 (推荐写法 3, 只需了解写法 3, 定义一个 IProps 接口即可)
// const props = defineProps({
//   dialogVisible: {
//     type: Boolean,
//     rquired: true,
//   },
// })

// 推荐的写法
interface IProps {
  dialogVisible: boolean
}

const props = defineProps<IProps>()

// 不推荐的写法, 不能得到良好的类型提示, 即使这里不需要提示
// 可以参考 https://161043261.github.io/t/vue#%E5%AD%90%E4%BC%A0%E7%88%B6
// 子传父中, 子组件的 3 种写法 (推荐写法 3, 只需了解写法 3, 定义一个 IEmit 接口即可)
// 因为这里的自定义事件很简单, 所以保留了基础写法
const emit = defineEmits(['close', 'reload'])

// 推荐的写法
// interface IEmit {
//   close /** eventName */: [/** arg1: TArg1, arg2: TArg2 */],
//   reload /** eventName */: [/** arg1: TArg1, arg2: TArg2 */],
// }
// const emit = defineEmits<IEmit>()

const rules = reactive<FormRules<IRowType>>({
  name: [{ required: true, message: '请输入站点名称', trigger: 'blur' }],
  id: [{ required: true, message: '请输入站点ID', trigger: 'blur' }],
  city: [{ required: true, message: '请输入所属城市', trigger: 'blur' }],
  person: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
  tel: [{ required: true, message: '请输入负责人电话', trigger: 'blur' }],
  fast: [{ required: true, message: '请输入快充数', trigger: 'blur' }],
  slow: [{ required: true, message: '请输入慢充数', trigger: 'blur' }],
  status: [{ required: true, message: '请选择充电站状态', trigger: 'change' }],
  now: [{ required: true, message: '请输入正在充电', trigger: 'blur' }],
  fault: [{ required: true, message: '请输入故障数', trigger: 'blur' }],
})

const handleCancel = () => {
  emit('close')
}
const stationStore = useStationStore()
const disable = ref(false)
const { rowData } = storeToRefs(stationStore)
const title = ref<string>()
watch(
  () => props.dialogVisible,
  () => {
    if (rowData.value.name) {
      ruleForm.value = rowData.value
      title.value = '编辑充电站信息'
      disable.value = true
    } else {
      ruleForm.value = rowData.value
      title.value = '新增充电站信息'
      disable.value = false
    }
  },
)
const formRef = ref<FormInstance>()
const handleConfirm = () => {
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      const res = await editApi(rowData.value)
      if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: res.message,
        })
        emit('close')
        emit('reload')
      }
    }
  })
}
</script>
