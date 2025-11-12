<template>
  <div style="max-width: 600px">
    <el-steps :active="currentStep" finish-status="success" align-center>
      <el-step v-for="(step, index) in steps" :key="index" :title="step.title" />
    </el-steps>

    <div v-for="(_, index) in steps" :key="index" class="mt">
      <div v-if="currentStep === index">
        <slot :name="`step-${index}`" />
      </div>
    </div>
    <div v-if="currentStep < steps.length">
      <el-button v-if="currentStep > 0" @click="currentStep--">上一步</el-button>
      <el-button type="primary" @click="nextStep">{{
        currentStep === steps.length - 1 ? '提交' : '下一步'
      }}</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type FormInstance } from 'element-plus'
import { ref } from 'vue'
const { steps, formRefs } = defineProps(['steps', 'formRefs'])
const emit = defineEmits(['handleSubmit'])

const currentStep = ref(0)
const nextStep = () => {
  const formRef = formRefs[currentStep.value].value as FormInstance
  formRef.validate((valid: boolean) => {
    if (valid) {
      currentStep.value++
      if (currentStep.value === steps.length) {
        emit('handleSubmit')
        currentStep.value = 0
      }
    }
  })
}
</script>
