<script setup lang="ts">
import { useVirtualizer } from '@tanstack/vue-virtual'
import { computed, inject, onMounted, ref, toRefs, useTemplateRef, type Ref } from 'vue'
import VirtualListItem, { type IRevenueItem } from './VirtualListItem.vue'

/**
 * 基于 @tanstack/vue-virtual 的虚拟列表组件 Props
 */
interface VirtualListV2Props {
  /** 可视区高度 (px) */
  height: number
  /** 列表项高度 (px) */
  itemHeight: number
  /** 获取列表数据的异步函数 */
  fetchLargeList: () => Promise<IRevenueItem[]>
}

const props = defineProps<VirtualListV2Props>()

const { height, itemHeight } = toRefs(props)

// 数据源
const virtualListLength = inject<Ref<number>>('virtual-list-length', ref(0))
const largeList = ref<IRevenueItem[]>([])

onMounted(async () => {
  largeList.value = await props.fetchLargeList()
  virtualListLength.value = largeList.value.length
})

// 虚拟化配置
const containerRef = useTemplateRef<HTMLDivElement>('container')

const virtualizer = useVirtualizer(
  computed(() => ({
    count: largeList.value.length,
    overscan: 5,
    estimateSize: () => itemHeight.value,
    getScrollElement: () => containerRef.value,
  })),
)

async function updateLargeList() {
  largeList.value = await props.fetchLargeList()
  virtualListLength.value = largeList.value.length
}

defineExpose({ updateLargeList })

// CSS 变量绑定
const containerHeight = computed(() => `${height.value}px`)
const virtualHeight = computed(() => `${virtualizer.value.getTotalSize()}px`)

/**
 * 获取虚拟项的定位样式
 */
function getItemStyle(start: number, size: number) {
  return {
    height: `${size}px`,
    transform: `translateY(${start}px)`,
  }
}
</script>

<template>
  <div ref="container" class="virtual-container">
    <div class="virtual-list">
      <div
        v-for="virtualItem in virtualizer.getVirtualItems()"
        :key="largeList[virtualItem.index]!.id"
        class="virtual-list__item"
        :style="getItemStyle(virtualItem.start, virtualItem.size)"
      >
        <VirtualListItem :item="largeList[virtualItem.index]!" :idx="virtualItem.index" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.virtual-container {
  width: 100%;
  height: v-bind(containerHeight);
  overflow: auto;

  // 隐藏滚动条
  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none; // Firefox
  -ms-overflow-style: none; // IE/Edge
}

.virtual-list {
  position: relative;
  width: 100%;
  height: v-bind(virtualHeight);

  &__item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
