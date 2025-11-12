<!-- 定义 menu-item 组件的递归 -->
<template>
  <el-sub-menu v-if="item?.children" :index="item.url">
    <template #title>
      <el-icon>
        <component :is="item.icon" />
      </el-icon>
      <span> {{ item.name }} </span>
    </template>
    <my-menu v-for="child of item.children" :item="child" :key="child.url" />
  </el-sub-menu>
  <el-menu-item
    v-else
    :index="item?.url"
    @click="add(item.name, item.url, item.icon)"
    v-show="item.name !== '订单详情'"
  >
    <el-icon>
      <component :is="item?.icon" />
    </el-icon>
    <span> {{ item?.name }} </span>
  </el-menu-item>
</template>

<!-- <script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { type MenuItem as MenuItemType } from '@/types/user'
export default defineComponent({
  name: 'MyMenu',
  props: {
    item: {
      type: Object as PropType<MenuItemType>,
      require: true,
    },
  },
})
</script> -->

<script setup lang="ts">
import { type MenuItem as MenuItemType } from '@/types/user'
import { useTabsStore } from '@/store/tabs'

defineProps<{
  item: MenuItemType
}>()
defineOptions({
  name: 'MyMenu',
})
const tabsStore = useTabsStore()
const { addTab, setCurrentTab } = tabsStore
const add = (name: string, url: string, icon: string) => {
  addTab(name, url, icon)
  setCurrentTab(name, url)
}
</script>

<style scoped lang="scss">
.is-active {
  background-color: rgb(34, 136, 255);
  color: white !important;

  div {
    i {
      color: white;
    }

    span {
      color: white;
    }
  }
}

.el-menu-item:hover {
  background-color: rgb(34, 136, 255) !important;
  color: white !important;
}

// 样式穿透(使样式突破当前组件)
// ::v-deep 已过时，使用 :deep()

// ::v-deep .el-sub-menu__title:hover {
:deep(.el-sub-menu__title:hover) {
  background-color: rgb(34, 136, 255) !important;
  color: white !important;
}
</style>
