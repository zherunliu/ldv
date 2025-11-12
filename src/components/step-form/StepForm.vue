<template>
  <div style="max-width: 600px">
    <el-steps :active="currentStep" finish-status="success" align-center>
      <el-step v-for="(step, index) in steps" :key="index" :title="step.title" />
    </el-steps>

    <div v-for="(_, index) in steps" :key="index" class="mt">
      <div v-if="currentStep === index">
        <slot :name="`step-${index}`"></slot>
      </div>
    </div>
    <div v-if="currentStep < steps.length">
      <el-button v-if="currentStep > 0" @click="currentStep--">上一步</el-button>
      <el-button type="primary" @click="currentStep++">{{
        currentStep === steps.length - 1 ? '提交' : '下一步'
      }}</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
defineProps(['steps'])

const currentStep = ref(0)
</script>
