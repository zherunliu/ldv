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
          @node-click="handleNodeClick"
        />
      </el-card>
    </el-col>
    <el-col :span="18"
      ><el-card>
        <template #header>
          <div class="card-header">
            <h4>{{ title }}：计费模板</h4>
          </div>
        </template>
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto">
          <el-form-item prop="name" label="模板名称：">
            <el-input
              style="max-width: 200px"
              v-model="ruleForm.name"
              placeholder="请输入模板名称"
            />
          </el-form-item>
          <el-form-item
            :label="'时间区间' + (index + 1) + '：'"
            v-for="(timeSlot, index) in ruleForm.date"
            :key="index"
          >
            <el-col :span="8">
              <el-form-item
                :prop="'date.' + index + '.dateStart'"
                :rules="[{ required: true, message: '开始时间不能为空', trigger: 'change' }]"
              >
                <el-time-picker
                  v-model="timeSlot.dateStart"
                  style="width: 100%"
                  value-format="hh:mm:ss"
                  placeholder="选择开始时间"
                />
              </el-form-item>
            </el-col>
            <el-col :span="1" style="text-align: center">--</el-col>
            <el-col :span="8">
              <el-form-item
                :prop="'date.' + index + '.dateEnd'"
                :rules="[{ required: true, message: '结束时间不能为空', trigger: 'change' }]"
              >
                <el-time-picker
                  v-model="timeSlot.dateEnd"
                  style="width: 100%"
                  value-format="hh:mm:ss"
                  placeholder="选择结束时间"
                /> </el-form-item
            ></el-col>
            <el-col :span="7">
              <el-form-item
                :prop="'date.' + index + '.electricity'"
                :rules="[{ required: true, message: '电费不能为空', trigger: 'blur' }]"
                label="电费："
              >
                <el-input v-model="timeSlot.electricity" placeholder="请输入电费" />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-button class="mb" type="primary" @click="addTimeSlot">添加时间区间</el-button>
          <el-form-item prop="service" label="服务费：">
            <el-input
              style="max-width: 200px"
              v-model="ruleForm.service"
              placeholder="请输入服务费"
            />
          </el-form-item>
          <el-form-item prop="parking" label="停车费：">
            <el-input
              style="max-width: 200px"
              v-model="ruleForm.parking"
              placeholder="请输入停车费"
            />
          </el-form-item>
          <el-form-item prop="remark" label="备注：">
            <el-input
              style="max-width: 200px"
              type="textarea"
              v-model="ruleForm.remark"
              placeholder="请输入备注"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">保存</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { cityListApi } from '@/api/operations'
import type { ElTree, FilterNodeMethodFunction, FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
type TRuleForm = {
  name: string
  service: string
  parking: string
  remark: string
  date: { dateStart: string; dateEnd: string; electricity: string }[]
}

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
/* 计费模板 */
const title = ref<string>('')
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入模板名称', trigger: 'blur' }],
  service: [{ required: true, message: '请输入服务费', trigger: 'blur' }],
  parking: [{ required: true, message: '请输入停车费', trigger: 'blur' }],
})

const ruleForm = ref<TRuleForm>({
  name: '',
  service: '',
  parking: '',
  remark: '',
  date: [{ dateStart: '', dateEnd: '', electricity: '' }],
})

const addTimeSlot = () => {
  ruleForm.value.date.push({ dateStart: '', dateEnd: '', electricity: '' })
}

const submitForm = () => {
  ruleFormRef.value?.validate((valid) => {
    if (valid) {
      ElMessage({
        message: '提交成功！',
        type: 'success',
      })
    }
  })
}

const handleNodeClick = (data: Tree) => {
  if (!data.children) {
    title.value = data.label!
    resetForm()
  }
}

const resetForm = () => {
  ruleForm.value = {
    name: '',
    service: '',
    parking: '',
    remark: '',
    date: [{ dateStart: '', dateEnd: '', electricity: '' }],
  }
}
</script>
