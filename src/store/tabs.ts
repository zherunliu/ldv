import type { MenuItem } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
// 组合式写法
export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref<MenuItem[]>([])
  const currentTab = ref<{ name: string; url: string }>({ name: '', url: '' })

  const addTab = (name: string, url: string, icon: string) => {
    if (!tabs.value.some((tab) => tab.url === url)) {
      tabs.value.push({ name, url, icon })
    }
  }
  const setCurrentTab = (name: string, url: string) => {
    currentTab.value = { name, url }
  }
  const removeTab = (name: string) => {
    const index = tabs.value.findIndex((item) => item.name === name)

    if (currentTab.value.name === name) {
      if (tabs.value.length > 1) {
        if (index === 0) {
          currentTab.value = tabs.value[1]
        } else {
          currentTab.value = tabs.value[index - 1]
        }
      } else {
        return
      }
    }

    //! 上面一段逻辑好像可以简化 ?
    // if (currentTab.value.name === name && tabs.value.length > 1) {
    //   if (index === 0) {
    //     currentTab.value = tabs.value[1]
    //   } else {
    //     currentTab.value = tabs.value[index - 1]
    //   }
    // }

    tabs.value = tabs.value.filter((tab) => tab.name !== name)
  }
  return { tabs, addTab, currentTab, setCurrentTab, removeTab }
})
