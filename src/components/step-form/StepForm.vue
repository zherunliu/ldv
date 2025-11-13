<template>
  <div style="max-width: 600px">
    <el-steps :active="currentStep" finish-status="success" align-center>
      <!-- in => of -->
      <el-step v-for="(step, index) of steps" :key="index" :title="step.title" />
    </el-steps>

    <!-- in => of -->
    <div v-for="(_, index) of steps" :key="index" class="mt">
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
import { ref, toRefs, type Ref } from 'vue'
// const { steps, formRefs } = defineProps(['steps', 'formRefs'])

/**
 * 使用推荐的子组件，写法 3
 *
 * @see {@link https://161043261.github.io/frontend/vue#%E7%88%B6%E4%BC%A0%E5%AD%90-defineprops-%E5%AF%B9%E6%AF%94-useattrs}
 */
interface IProps {
  steps: {
    title: string
  }[]
  formRefs: Ref<FormInstance | undefined>[]
}

const props = defineProps<IProps>()
const { steps, formRefs } = toRefs(props)

// const emit = defineEmits(['handleSubmit'])

/**
 * 使用推荐的子组件，写法 3
 *
 * @see {@link https://161043261.github.io/frontend/vue#%E5%AD%90%E4%BC%A0%E7%88%B6}
 * @see {@link https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits}
 */
interface IEmits {
  handleSubmit: []
}
const emit = defineEmits<IEmits>()

const currentStep = ref(0)

const nextStep = () => {
  const formRef = formRefs.value[currentStep.value]
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      currentStep.value++
      if (currentStep.value === steps.value.length) {
        emit('handleSubmit')
        currentStep.value = 0
      }
    }
  })
}
</script>
