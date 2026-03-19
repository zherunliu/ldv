import type { IRowType } from '@/types/station'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStationStore = defineStore('station', () => {
  const rowData = ref<IRowType>({
    name: '',
    id: '',
    city: '',
    person: '',
    tel: '',
    fast: '',
    slow: '',
    status: 1,
    now: '',
    fault: '',
  })

  const setRowData = (row: IRowType) => {
    rowData.value = row
  }

  return {
    rowData,
    setRowData,
  }
})
