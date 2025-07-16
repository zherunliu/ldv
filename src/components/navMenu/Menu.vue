<template>
    <el-menu>
        <menu-item v-for="item in menuitems" :item="item" :key="item.url"></menu-item>
    </el-menu>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/auth';
import MenuItem from './MenuItem.vue';
const userStore = useUserStore()
console.log(userStore.menu)
const menuitems = userStore.menu
</script>