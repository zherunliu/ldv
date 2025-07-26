import { onMounted, onUnmounted, type Ref, markRaw, reactive } from 'vue'
import echarts, { type ECOption } from '@/utils/typedEcharts'

export interface IEvent {
  axesInfo: { value: number }[]
}

export interface ChartEventConfig {
  eventName: string
  handler: (event: IEvent, chartInstance: echarts.ECharts | null) => void
}

export function useCharts(
  chartRef: Ref<HTMLElement | null>,
  setChartData: () => Promise<ECOption>,
  customEvents: ChartEventConfig[] = [],
) {
  let chartInstance: echarts.ECharts | null = null

  const initChart = async () => {
    if (chartRef.value) {
      // 取消 vue 对 echarts 实例的响应式处理
      chartInstance = markRaw(echarts.init(chartRef.value))
      // 获取接口数据
      const options = reactive(await setChartData())
      chartInstance.setOption(options)
      // 注册自定义事件
      customEvents.forEach(({ eventName, handler }) => {
        chartInstance?.on(eventName, (...args: unknown[]) => {
          // [tiancheng] 可以在这里传递 chartInstance, 这样就不需要暴露啦
          // 请看 @/views/DashBoard.vue 第 201 行!
          handler(args[0] as IEvent, chartInstance)
        })
      })
    }
  }

  const resizeChart = () => {
    chartInstance?.resize()
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
      chartInstance?.off(eventName)
    })
    chartInstance?.dispose()
  })
}
