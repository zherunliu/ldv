<script setup lang="ts">
import formatNumberToThousands from '@/utils/to-thousands'

export interface IRevenueItem {
  id: number
  address: string
  revenue: number
}

interface IProps {
  item: IRevenueItem
  idx: number
}

const props = defineProps<IProps>()
</script>

<template>
  <div class="revenue-item" :class="{ 'revenue-item--even': props.idx % 2 === 0 }">
    <span class="revenue-item__amount"> ￥{{ formatNumberToThousands(props.item.revenue) }} </span>
    <span class="revenue-item__address">
      {{ props.item.address }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.revenue-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  height: 100%;
  padding-left: 5px;
  background-color: #fff;

  &--even {
    background-color: #ecfcca;
  }

  &__amount {
    flex: 1;
    text-align: right;
  }

  &__address {
    flex: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
