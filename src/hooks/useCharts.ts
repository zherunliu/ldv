import { onMounted, onUnmounted, ref, type Ref, markRaw } from 'vue'
import * as echarts from 'echarts'

export function useCharts(
  chartRef: Ref<HTMLElement | null>,
  initialOptions: echarts.EChartsOption,
) {
  const chartInstance = ref<echarts.ECharts | null>(null)
  const chartOptions = ref(initialOptions)
  const initChart = () => {
    if (chartRef.value) {
      // 取消 vue 对 echarts 实例的响应式处理
      chartInstance.value = markRaw(echarts.init(chartRef.value))
      chartInstance.value.setOption(chartOptions.value)
    }
  }

  const resizeChart = () => {
    chartInstance.value?.resize()
  }
  // setup 执行在组件挂载前
  onMounted(() => {
    initChart()
    window.addEventListener('resize', resizeChart)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', resizeChart)
    chartInstance.value?.dispose()
  })
}
