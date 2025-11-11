<template>
  <el-tabs
    v-model="currentTab.name"
    type="card"
    class="demo-tabs"
    @tab-click="handleClick"
    closable
    @tab-remove="remove"
  >
    <el-tab-pane v-for="tab in tabs" :key="tab.url" :label="tab.name" :name="tab.name">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon>
            <component :is="tab.icon" />
          </el-icon>
          <span>{{ tab.name }}</span>
        </span>
      </template>
    </el-tab-pane>
  </el-tabs>
  <RouterView v-slot="{ Component }">
    <!-- $route 是 vue2 的写法
    和 vue3 中 const route = useRoute() 返回的 router 等价 -->
    <KeepAlive>
      <component :is="Component" :key="route.name" v-if="route.meta.keepAlive" />
    </KeepAlive>
    <component :is="Component" :key="route.name" v-if="!route.meta.keepAlive" />
  </RouterView>
</template>

<script setup lang="ts">
import { useTabsStore } from '@/store/tabs'
import type { MenuItem } from '@/types/user'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/auth'
import { type TabsPaneContext, type TabPaneName } from 'element-plus'

const router = useRouter()
const route = useRoute()
const tabsStore = useTabsStore()
const userStore = useUserStore()

// ref/reactive 定义的响应式变量需要使用 storeToRefs, toRef 或 toRefs 解构
const { menu } = storeToRefs(userStore)
// currentTab 设置当前高亮
const { tabs, currentTab } = storeToRefs(tabsStore)

// 函数 (方法) 可以直接解构
const { setCurrentTab, addTab, removeTab } = tabsStore

// TabsPaneContext 标准的类型, 从 element-plus 中导入
const handleClick = ({ index: idx }: TabsPaneContext) => {
  const index = idx ? Number.parseInt(idx, 10) : NaN
  router.push(tabs.value[index].url)
  setCurrentTab(tabs.value[index].name, tabs.value[index].url)
}

// TabsPaneContext 标准的类型, 从 element-plus 中导入
// type TabPaneName = string | number
const remove = (tabPaneName: TabPaneName) => {
  removeTab(tabPaneName.toString())
  router.push(currentTab.value.url)
}

function findObjectByUrl(arr: MenuItem[], url: string): MenuItem | undefined {
  for (const item of arr) {
    if (item.url === url) {
      return item
    }
    if (item.children) {
      const found: MenuItem | undefined = findObjectByUrl(item.children, url)
      if (found) {
        return found
      }
    }
  }
  return undefined
}
const item = findObjectByUrl(menu.value, route.path)

// if (import.meta.env.DEV) {
//   console.log(route.path)
//   console.log(item)
// }

if (item) {
  const { name, url, icon } = item
  addTab(name, url, icon)
  setCurrentTab(name, url)
}
</script>

<style lang="scss" scoped>
.demo-tabs {
  :deep(.is-active) {
    background-color: rgb(34, 136, 255);
    color: white;
  }
}

.custom-tabs-label {
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
}
</style>
