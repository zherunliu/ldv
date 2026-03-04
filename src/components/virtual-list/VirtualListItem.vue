<script setup lang="ts">
import formatNumberToThousands from '@/utils/to-thousands'
import { toRefs } from 'vue'

interface IRevenueItem {
  id: number
  address: string
  revenue: number
}

const props = defineProps<{
  item: IRevenueItem
  idx: number
}>()

const { item, idx } = toRefs(props)
</script>

<template>
  <div
    class="container"
    :style="{
      backgroundColor: idx % 2 === 0 ? '#ecfcca' : '#fff',
      display: 'flex',
      gap: '10px',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: '5px',
      height: '100%',
    }"
  >
    <div :style="{ flex: 1, textAlign: 'center', display: 'flex', justifyContent: 'flex-end' }">
      ￥{{ formatNumberToThousands(item.revenue) }}
    </div>
    <div :style="{ flex: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }">
      {{ item.address }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container::-webkit-scrollbar {
  display: none !important;
}
</style>
