<template>
  <div class="bg">
    <div class="pic">
      <img :src="login" alt="" />
    </div>
    <div class="container">
      <div class="login">
        <div class="logo">
          <img :src="logo" alt="" height="70px" />
          <h1 class="ml">能源管理平台</h1>
        </div>
        <!--这里的:model是v-bind:model的简写形式, :rules则是v-bind:rules的简写形式-->
        <el-form :model="ruleForm" :rules="rules" ref="formRef">
          <el-form-item prop="username">
            <el-input
              class="input"
              v-model="ruleForm.username"
              placeholder="请输入用户名"
              prefix-icon="User"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              class="input"
              v-model="ruleForm.password"
              placeholder="请输入密码"
              prefix-icon="Lock"
              type="password"
            />
          </el-form-item>
          <el-form-item>
            <el-button class="submit" type="primary" style="width: 100%" @click="handleLogin"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.png'
import login from '@/assets/bg.png'
import { reactive, ref } from 'vue'
import type { FormRules, FormInstance } from 'element-plus'
import { useUserStore } from '@/store/auth'
import { useRouter } from 'vue-router'

interface RuleForm {
  username: string
  password: string
}

const ruleForm: RuleForm = reactive({
  username: 'admin',
  password: 'admin',
})

const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 4, max: 8, message: '用户名要求4-8位数字字母组合', trigger: 'blur' },
  ],

  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    // { pattern: /^\d{6}$/, message: "密码必须是6位纯数字", trigger: "blur" }
  ],
})
const formRef = ref<FormInstance>()
const userStore = useUserStore()
const router = useRouter()

const handleLogin = () => {
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      await userStore.login(ruleForm)
      // 组合式函数只能用于组件(vue 中)，可以用传参的方式在 auth.ts 使用 useRouter() 跳转，或使用导航守卫
      router.push('/')
    }
  })
}
</script>

<style lang="scss" scoped>
.bg {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .pic {
    flex: 1;
    text-align: center;
    position: relative;
    img {
      height: 600px;
    }
  }

  .container {
    flex: 1;
    text-align: center;
    position: relative;
    .login {
      width: 400px;
      height: 250px;
      padding: 0 50px 100px;
      .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 40px;

        h1 {
          color: rgb(14, 53, 148);
        }
      }
    }
  }
}
</style>
