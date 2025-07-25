import { onMounted, onUnmounted, ref, type Ref, markRaw, reactive } from 'vue'
import echarts, { type ECOption } from '@/utils/typedEcharts'

export interface IEvent {
  axesInfo: { value: number }[]
}

export interface ChartEventConfig {
  eventName: string
  handler: (event: IEvent) => void
}

export function useCharts(
  chartRef: Ref<HTMLElement | null>,
  setChartData: () => Promise<ECOption>,
  customEvents: ChartEventConfig[] = [],
) {
  const chartInstance = ref<echarts.ECharts | null>(null)

  const initChart = async () => {
    if (chartRef.value) {
      // 取消 vue 对 echarts 实例的响应式处理
      chartInstance.value = markRaw(echarts.init(chartRef.value))
      // 获取接口数据
      const options = reactive(await setChartData())
      chartInstance.value.setOption(options)
      // 注册自定义事件
      customEvents.forEach(({ eventName, handler }) => {
        chartInstance.value?.on(eventName, (...args: unknown[]) => {
          handler(args[0] as IEvent)
        })
      })
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
    // 卸载时移除所有事件监听器
    customEvents.forEach(({ eventName }) => {
      chartInstance.value?.off(eventName)
    })
    chartInstance.value?.dispose()
  })

  // 暴露图表实例供外部使用
  return {
    chartInstance,
  }
}
