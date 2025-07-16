<!-- 定义 menu-item 组件的递归 -->
<template>
    <el-sub-menu v-if="item?.children" :index="item.url">
        <template #title>
            <el-icon>
                <document />
            </el-icon>
            <span> {{ item.name }} </span>
        </template>
        <my-menu v-for="child in item.children" :item="child" :key="child.url"></my-menu>
    </el-sub-menu>
    <el-menu-item v-else :index="item?.url">
        <el-icon>
            <document />
        </el-icon>
        <span> {{ item?.name }} </span>
    </el-menu-item>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { type MenuItem as MenuItemType } from "@/types/user"
export default defineComponent({
    name: "MyMenu",
    props: {
        item: {
            type: Object as PropType<MenuItemType>,
            require: true
        }
    }

})
</script>