import { reactive, ref } from 'vue'

export default function usePagination(loadData: () => Promise<unknown>, initialPageSize = 5) {
  const totals = ref(0)
  const pageInfo = reactive({
    page: 1,
    pageSize: initialPageSize,
  })

  const handleSizeChange = (size: number) => {
    pageInfo.pageSize = size
    loadData()
  }

  const handleCurrentChange = (page: number) => {
    pageInfo.page = page
    loadData()
  }

  const resetPagination = () => {
    pageInfo.page = 1
    pageInfo.pageSize = 5
  }

  const setTotals = (total: number) => {
    totals.value = total
  }

  return { pageInfo, totals, handleSizeChange, handleCurrentChange, resetPagination, setTotals }
}
