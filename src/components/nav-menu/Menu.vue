<template>
  <div class="logo">
    <img :src="logo" width="34px" height="34px" />
    <h1>管理平台</h1>
  </div>

  <!-- $route.path 是 vue2 常用的写法 -->
  <!-- const route = useRoute(); route.path 更推荐 -->
  <el-menu :router="true" :default-active="route.path">
    <menu-item v-for="item of menuitems" :item="item" :key="item.url" />
  </el-menu>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/auth'
import MenuItem from './MenuItem.vue'
import logo from '@/assets/logo.png'
import { useRoute } from 'vue-router'

const userStore = useUserStore()

// if (import.meta.env.DEV /** 开发环境, 输出日志 */) {
//   console.log(userStore.menu)
// }

const menuitems = userStore.menu
const route = useRoute()
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  padding: 5px 0;
  img {
    margin-left: -10px;
  }
  h1 {
    color: #333;
    margin-left: 10px;
    font-size: 22px;
  }
}
.el-menu {
  border-right: none;
}
</style>
