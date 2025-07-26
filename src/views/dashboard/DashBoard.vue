<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <el-card>
        <template #header>
          <div class="title">
            <h4>设备运行状态</h4>
            <p class="ml">更新时间</p>
            <!-- TODO: 点击图标的时间 -->
            <el-icon color="#86909c" style="margin-left: 5px">
              <Refresh />
            </el-icon>
          </div>
        </template>
        <div class="equipment">
          <div class="item">
            <h4 class="mb">充电桩使用率</h4>
            <img :src="flash" alt="" />
            <h1>872 / 1000</h1>
            <div class="statistic-card">
              <el-statistic :value="9">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    异常设备
                    <el-tooltip effect="dark" content="设备异常情况" placement="top">
                      <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
              </el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>相较昨日</span>
                  <span class="green">
                    24%
                    <el-icon>
                      <CaretTop />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <h4 class="mb">充电柜使用率</h4>
            <img :src="flash2" alt="" />
            <h1>432 / 500</h1>
            <div class="statistic-card">
              <el-statistic :value="2">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    异常设备
                    <el-tooltip effect="dark" content="设备异常情况" placement="top">
                      <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
              </el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>相较昨日</span>
                  <span class="green">
                    33%
                    <el-icon>
                      <CaretTop />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <h4 class="mb">充电站使用率</h4>
            <img :src="flash3" alt="" />
            <h1>42 / 50</h1>
            <div class="statistic-card">
              <el-statistic :value="1">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    异常设备
                    <el-tooltip effect="dark" content="设备异常情况" placement="top">
                      <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
              </el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>相较昨日</span>
                  <span class="green">
                    14%
                    <el-icon>
                      <CaretTop />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="mt">
        <template #header>
          <div class="title">
            <h4>能源统计</h4>
          </div>
        </template>
        <div ref="chartRef" style="height: 350px; width: 100%"></div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card>
        <template #header>
          <div class="title">
            <h4>设备总览</h4>
          </div>
        </template>
        <div ref="chartRadarRef" style="height: 240px; width: 100%"></div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import flash from '@/assets/flash.png'
import flash2 from '@/assets/flash2.png'
import flash3 from '@/assets/flash3.png'
import { chartDataApi, chartRadarDataApi } from '@/api/dashboard'
import { type ECOption } from '@/utils/typedEcharts'
import { useCharts, type ChartEventConfig } from '@/hooks/useCharts'
import { ref } from 'vue'

type TValue = (string | number)[]
type TSource = (string | number)[][]
interface IDataSet {
  source: TSource
}

const chartRef = ref(null)
const chartRadarRef = ref(null)
const setChartData = async () => {
  const options: ECOption & {
    dataset: IDataSet
  } = {
    legend: {},
    tooltip: {
      trigger: 'axis',
      showContent: true,
    },
    dataset: {
      source: [],
    },
    xAxis: { type: 'category' },
    yAxis: { type: 'value', axisLabel: { formatter: '{value}kw' } },
    grid: { top: '20%', bottom: '20%', left: '40%' },
    series: [
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' },
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' },
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' },
      },
      {
        type: 'pie',
        id: 'pie',
        radius: '40%',
        center: ['20%', '50%'],
        emphasis: {
          focus: 'self',
        },
        label: {
          show: false,
        },
        tooltip: {
          trigger: 'item',
          formatter: `{b}: {d}%`,
        },
        encode: {
          itemName: 'period',
          value: '0:00',
          tooltip: '0:00',
        },
      },
    ],
  }
  const res = await chartDataApi()
  options.dataset.source = (res.data as { list: TSource }).list
  return options
}
const setChartRadarData = async () => {
  const options: ECOption & {
    series: Array<{ data: Array<{ value: TValue }> }>
  } = {
    radar: {
      radius: 75,
      indicator: [
        // max 不一致, echarts 会打印警告信息
        // [ECharts] The ticks may be not readable when set min: 0, max: 👉520👈 and alignTicks: true
        { name: '闲置数', max: 100 },
        { name: '使用数', max: 100 },
        { name: '故障数', max: 100 },
        { name: '维修数', max: 100 },
        { name: '更换数', max: 100 },
        { name: '报废数', max: 100 },
      ],
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [],
          },
        ],
      },
    ],
  }
  const res = await chartRadarDataApi()
  options.series[0].data[0].value = (res.data as { list: TValue }).list
  return options
}

// 定义特定图表的事件处理
const customEvents: ChartEventConfig[] = [
  {
    // 监听鼠标悬停在图表上的位置
    eventName: 'updateAxisPointer',
    // [tiancheng] @/hooks/useChart 第 31 行传递的 chartInstance
    handler: (event, chartInstance) => {
      const xAxisInfo = event.axesInfo[0]
      if (xAxisInfo) {
        const dimension = xAxisInfo.value + 1
        chartInstance?.setOption({
          series: {
            id: 'pie',
            label: {
              show: false,
            },
            tooltip: {
              trigger: 'item',
              formatter: `{b}: {d}%`,
            },
            encode: {
              value: dimension,
              tooltip: dimension,
            },
          },
        })
      }
    },
  },
]

useCharts(chartRef, setChartData, customEvents)
useCharts(chartRadarRef, setChartRadarData)
</script>

<style lang="less" scoped>
.title {
  display: flex;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  align-items: flex-end;

  p {
    font-size: medium;
    color: #86909c;
  }
}

.equipment {
  display: flex;
  justify-content: space-between;
  text-align: center;
  padding: 0 50px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 8px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
</style>
