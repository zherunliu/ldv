import { onMounted, reactive, ref, unref } from 'vue'
import { post } from '@/utils/http'

export function useTable<T, U>(url: string, initialParams: U, pageSize?: number) {
  const dataList = ref<T[]>([])
  const loading = ref<boolean>(false)
  const total = ref<number>(0)
  const pageInfo = reactive({
    page: 1,
    pageSize: pageSize ? pageSize : 5,
  })

  const loadData = async () => {
    loading.value = true
    try {
      const { data } = (await post(url, { ...unref(initialParams), ...pageInfo })) as {
        data: { list: T[]; total: number }
      }
      dataList.value = data.list
      total.value = data.total
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      loading.value = false
    }
  }
  onMounted(() => {
    loadData()
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
    pageInfo.pageSize = pageSize ? pageSize : 5
    loadData()
  }

  return {
    dataList,
    loading,
    total,
    pageInfo,
    handleSizeChange,
    handleCurrentChange,
    resetPagination,
    loadData,
  }
}
