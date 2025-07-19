<template>
  <div class="header">
    <div class="personal">
      <el-badge :is-dot="info > 0">
        <el-icon>
          <Bell />
        </el-icon>
      </el-badge>
      <el-avatar icon="UserFilled" class="ml mr"/>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          欢迎您，{{ username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="User" command="user">个人中心</el-dropdown-item>
            <el-dropdown-item icon="SwitchButton" command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store/auth'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const info = ref(5)
const userStore = useUserStore()
const { username } = storeToRefs(userStore)
const router = useRouter()

const handleCommand = (command: string) => {
  if (command === 'user') {
    router.push('/personal')
  } else if (command === 'logout') {
    userStore.logout()
    router.push('/login')
  }
}

</script>

<style lang="less" scoped>
.header {
  background-color: white;
  height: 60px;
  padding: 0 20px;
  .personal{
    display: flex;
    float: right;
    height: 60px;
    align-items: center;
  }
}
</style>