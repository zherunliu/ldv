<script setup lang="ts">
import { useVirtualizer } from '@tanstack/vue-virtual'
import { computed, inject, onMounted, ref, toRefs, useTemplateRef, type Ref } from 'vue'
import VirtualListItem from './VirtualListItem.vue'

interface IRevenueItem {
  id: number
  address: string
  revenue: number
}

const props = defineProps<{
  // 可视区高度
  height: number
  // 列表项高度
  itemHeight: number
  // 获取列表项数组的函数
  fetchLargeList: () => Promise<IRevenueItem[]>
}>()

const virtualListLength = inject<Ref<number>>('virtual-list-length', ref(0) /** defaultVal */)

// 组件暴露接口
defineExpose<{
  updateLargeList: () => Promise<void>
}>({
  updateLargeList: async () => {
    largeList.value = await props.fetchLargeList()
    virtualListLength.value = largeList.value.length
  },
})

const { fetchLargeList } = props
const { height, itemHeight } = toRefs(props)

const containerHeight = computed(() => `${height.value}px`)

const largeList = ref<IRevenueItem[]>([])

onMounted(async () => {
  largeList.value = await fetchLargeList()
  virtualListLength.value = largeList.value.length
})

const containerRef = useTemplateRef('container')

const virtualizerConfig = computed(() => ({
  count: largeList.value.length,
  overscan: 5,
  estimateSize: () => itemHeight.value,
  getScrollElement: () => containerRef.value,
}))

const virtualizer = useVirtualizer(virtualizerConfig)

const virtualHeight = computed(() => `${virtualizer.value.getTotalSize()}px`)
</script>

<template>
  <!-- The scrollable element for your list
          overflow-auto: Make it scroll! -->
  <div
    ref="container"
    class="container"
    :style="{
      width: '100%',
      overflow: 'auto',
    }"
  >
    <!-- The large inner element to hold all of the items -->
    <div
      class="virtual-list"
      :style="{
        position: 'relative',
        width: '100%',
      }"
    >
      <!-- Only the visible items in the virtualizer, manually positioned to be in view -->
      <div
        v-for="virtualItem of virtualizer.getVirtualItems()"
        :key="largeList[virtualItem.index]!.id"
        :style="{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: `${virtualItem.size}px`,
          transform: `translateY(${virtualItem.start}px)`,
        }"
      >
        <VirtualListItem :item="largeList[virtualItem.index]!" :idx="virtualItem.index" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: v-bind(containerHeight);

  &::-webkit-scrollbar {
    display: none;
  }
}

.virtual-list {
  height: v-bind(virtualHeight);
}
</style>
