<template>
  <el-card>
    <el-radio-group v-model="radio">
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
        <el-button :type="item.status === 2 ? 'warning' : 'primary'">{{
          item.status === 1 ? '指派' : item.status === 2 ? '催办' : '查看'
        }}</el-button>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { alarmListApi } from '@/api/alarm'
import { getLabel } from './fieldLabelMap'

type TAlarmItem = {
  description: string
  address: string
  equNo: string
  level: number
  time: string
  code: number
  status: number
}

const radio = ref(1)
const alarmList = ref<TAlarmItem[]>([])
onMounted(async () => {
  const { data } = await alarmListApi()
  alarmList.value = data as TAlarmItem[]
})
</script>
