<script generic="T extends { id: number }" setup lang="ts">
import { computed, inject, onMounted, reactive, ref, toRefs, type Ref, type VNode } from 'vue'

/**
 * 虚拟列表组件 Props
 */
interface IVirtualListProps {
  /** 可视区高度 (px) */
  height: number
  /** 列表项高度 (px) */
  itemHeight: number
  /** 获取列表数据的异步函数 */
  fetchLargeList: () => Promise<T[]>
  /** 列表项渲染函数 */
  renderFunc: (props: { item: T; idx: number }) => VNode
}

const props = defineProps<IVirtualListProps>()

const { height, itemHeight } = toRefs(props)

// 数据源
const virtualListLength = inject<Ref<number>>('virtual-list-length', ref(0))
const largeList = ref<T[]>([]) as Ref<T[]>

onMounted(async () => {
  largeList.value = await props.fetchLargeList()
  virtualListLength.value = largeList.value.length
})

// 可视区计算
/** 可视区可容纳的列表项数量 */
const visibleCount = computed(() => Math.ceil(height.value / itemHeight.value))

/** 可视区索引范围 */
const visibleRange = reactive({
  startIdx: 0,
  endIdx: visibleCount.value,
})

/** 可视区数据切片 */
const visibleItems = computed(() =>
  largeList.value.slice(
    visibleRange.startIdx,
    Math.min(visibleRange.endIdx, largeList.value.length),
  ),
)

/** 起始偏移量（从 offsetY 处开始渲染可视区，一定是 itemHeight 的倍数） */
const offsetY = ref(0)

function handleScroll(event: Event) {
  const { scrollTop } = event.target as HTMLDivElement
  visibleRange.startIdx = Math.floor(scrollTop / itemHeight.value)
  visibleRange.endIdx = visibleRange.startIdx + visibleCount.value
  // 上方有 startIdx 个完整项
  offsetY.value = visibleRange.startIdx * itemHeight.value
}

async function updateLargeList() {
  largeList.value = await props.fetchLargeList()
  virtualListLength.value = largeList.value.length
}

defineExpose({ updateLargeList })

// CSS 变量绑定
const containerHeight = computed(() => `${height.value}px`)
const totalHeight = computed(() => `${largeList.value.length * itemHeight.value}px`)
const contentTransform = computed(() => `translateY(${offsetY.value}px)`)
const itemLineHeight = computed(() => `${itemHeight.value}px`)
</script>

<template>
  <div class="virtual-list" @scroll="handleScroll">
    <!-- 占位元素：撑起滚动区域 -->
    <div class="virtual-list__placeholder" />

    <!-- 内容区：仅渲染可视项 -->
    <ul class="virtual-list__content">
      <li v-for="(item, idx) in visibleItems" :key="item.id" class="virtual-list__item">
        <props.renderFunc :item="item" :idx="idx" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.virtual-list {
  position: relative;
  height: v-bind(containerHeight);
  overflow: auto;
  background-color: #fff;

  // 隐藏滚动条
  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none; // Firefox
  -ms-overflow-style: none; // IE/Edge

  &__placeholder {
    height: v-bind(totalHeight);
    width: 0;
  }

  &__content {
    position: absolute;
    inset: 0 0 auto;
    transform: v-bind(contentTransform);
    background-color: #fff;
  }

  &__item {
    box-sizing: border-box;
    height: v-bind(itemLineHeight);
    line-height: v-bind(itemLineHeight);
  }
}
</style>
