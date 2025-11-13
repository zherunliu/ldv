<template>
  <el-card>
    <el-radio-group v-model="radio" @change="changeAlarmList">
      <el-radio-button label="所有告警" :value="0" />
      <el-radio-button label="一般告警" :value="1" />
      <el-radio-button label="紧急告警" :value="2" />
      <el-radio-button label="严重告警" :value="3" />
    </el-radio-group>
  </el-card>
  <el-card class="mt" v-for="item of alarmList" :key="item.equNo">
    <el-alert :title="`${item.address}充电异常！`" type="warning" show-icon />
    <el-descriptions :column="4" direction="vertical" border>
      <el-descriptions-item v-for="(val, key) of item" :key="key" :label="getLabel(key)">
        <el-tag
          v-if="key === 'level'"
          :type="val === 3 ? 'danger' : val === 2 ? 'warning' : 'info'"
        >
          {{ val === 3 ? '严重' : val === 2 ? '紧急' : '一般' }}
        </el-tag>
        <el-text type="danger" v-else-if="key === 'status'">
          {{ val === 1 ? '待指派' : val === 2 ? '处理中' : '处理异常' }}
        </el-text>
        <span v-else>{{ val }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="操作">
        <el-button
          @click="((drawer = true), (opDeviceNo = item.equNo), (known = false))"
          :type="item.status === 2 ? 'warning' : 'primary'"
          >{{ item.status === 1 ? '指派' : item.status === 2 ? '催办' : '查看' }}</el-button
        >
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
  <el-drawer v-model="drawer" title="报警任务指派">
    <step-form :steps="steps" :formRefs="formRefs" @handle-submit="handleSubmit">
      <template #step-0>
        <el-form :model="basicInfo" :rules="basicRules" ref="basicRef">
          <el-form-item prop="name" label="姓名">
            <el-input v-model="basicInfo.name"
          /></el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="basicInfo.email"
          /></el-form-item>
          <el-form-item prop="tel" label="电话"> <el-input v-model="basicInfo.tel" /></el-form-item>
          <el-form-item prop="workNo" label="工号">
            <el-input v-model="basicInfo.workNo"
          /></el-form-item>
          <el-form-item label="是否加急"> <el-switch v-model="basicInfo.urgent" /></el-form-item>
          <el-form-item label="其他选项">
            <el-checkbox-group v-model="basicInfo.other">
              <el-checkbox label="仅维修" value="1" />
              <el-checkbox label="需更换" value="2" />
              <el-checkbox label="需报备" value="3" />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="basicInfo.remark" />
          </el-form-item>
        </el-form>
      </template>
      <template #step-1>
        <el-form :model="approvalInfo" :rules="approvalRules" ref="approvalRef">
          <el-form-item prop="approveApart" label="审批部门">
            <el-select v-model="approvalInfo.approveApart" placeholder="请选择审批部门"
              ><el-option label="总裁办" value="1" />
              <el-option label="运营部" value="2" />
              <el-option label="维修部" value="3" />
              <el-option label="市场部" value="4" />
              <el-option label="财务部" value="5" />
            </el-select>
          </el-form-item>
          <el-form-item prop="copyApart" label="抄送部门">
            <el-select v-model="approvalInfo.copyApart" placeholder="请选择抄送部门"
              ><el-option label="总裁办" value="1" />
              <el-option label="运营部" value="2" />
              <el-option label="维修部" value="3" />
              <el-option label="市场部" value="4" />
              <el-option label="财务部" value="5" /> </el-select
          ></el-form-item>
        </el-form>
      </template>
      <template #step-2>
        <el-form :model="principleInfo" :rules="principleRules" ref="principleRef">
          <el-form-item prop="principle" label="负责人">
            <el-input v-model="principleInfo.principle"
          /></el-form-item>
          <el-form-item prop="principleTel" label="负责人电话">
            <el-input v-model="principleInfo.principleTel"
          /></el-form-item>
        </el-form>
      </template>
    </step-form>
    <el-result
      v-if="!known"
      icon="warning"
      :title="opDeviceNo"
      sub-title="该设备已催促2次，请抓紧处理"
    >
      <template #extra>
        <el-button @click="known = true" type="primary">我已知晓</el-button>
      </template>
    </el-result>
  </el-drawer>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue'
import { alarmListApi } from '@/api/alarm'
import { getLabel } from './fieldLabelMap'
import { type FormInstance, type FormRules, ElMessage } from 'element-plus'
import StepForm from '@/components/step-form/StepForm.vue'

type TAlarmItem = {
  description: string
  address: string
  equNo: string
  level: number
  time: string
  code: number
  status: number
}

const radio = ref(0)
const alarmList = ref<TAlarmItem[]>([])
const alarmListCopy = ref<TAlarmItem[]>([])

const changeAlarmList = () => {
  if (radio.value !== 0) {
    alarmList.value = alarmListCopy.value.filter((item) => item.level === radio.value)
  } else {
    alarmList.value = alarmListCopy.value
  }
}
onMounted(async () => {
  const { data } = await alarmListApi()
  alarmListCopy.value = data as TAlarmItem[]
  changeAlarmList()
})

const drawer = ref(false)
const known = ref(false)
const opDeviceNo = ref('')
const steps = [{ title: '指派任务' }, { title: '处理任务' }, { title: '完成任务' }]
const basicInfo = ref({
  name: '',
  email: '',
  tel: '',
  workNo: '',
  urgent: true,
  other: [], // TODO: Add type assertion (e.g. [] as string[])
  remark: '',
})
const approvalInfo = ref({
  approveApart: '',
  copyApart: '',
})
const principleInfo = ref({
  principle: '',
  principleTel: '',
})

const basicRules: FormRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
  ],
  tel: [{ required: true, message: '请输入电话', trigger: 'blur' }],
  workNo: [{ required: true, message: '请输入工号', trigger: 'blur' }],
}

const approvalRules: FormRules = {
  approveApart: [{ required: true, message: '审批部门不能为空', trigger: 'blur' }],
  copyApart: [{ required: true, message: '抄送部门不能为空', trigger: 'blur' }],
}

const principleRules: FormRules = {
  principle: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
  principleTel: [{ required: true, message: '请输入负责人电话', trigger: 'blur' }],
}
const basicRef = ref<FormInstance | null>(null)
const approvalRef = ref<FormInstance | null>(null)
const principleRef = ref<FormInstance | null>(null)
const formRefs: Ref<FormInstance | null>[] = [basicRef, approvalRef, principleRef]

const handleSubmit = () => {
  // console.log('指派任务信息：', basicInfo.value)
  // console.log('处理任务信息：', approvalInfo.value)
  // console.log('完成任务信息：', principleInfo.value)
  ElMessage({
    message: '提交成功！',
    type: 'success',
  })
  drawer.value = false
}
</script>
