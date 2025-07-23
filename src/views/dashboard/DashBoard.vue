<template>
  <el-row>
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
      <el-card> </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import flash from '@/assets/flash.png'
import flash2 from '@/assets/flash2.png'
import flash3 from '@/assets/flash3.png'
import { onMounted, onUnmounted, ref } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let myChart: echarts.ECharts | null = null
let option: echarts.EChartsOption

interface IEvent {
  axesInfo: { value: number }[]
}

onMounted(() => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value)

    option = {
      legend: {},
      tooltip: {
        trigger: 'axis',
        showContent: true,
      },
      dataset: {
        source: [
          ['period', '0:00', '6:00', '12:00', '18:00', '24:00'],
          ['充电桩', 56.5, 82.1, 88.7, 70.1, 85.1],
          ['充电柜', 51.1, 51.4, 53.3, 73.8, 68.7],
          ['充电站', 40.1, 69.5, 36.4, 45.2, 32.5],
        ],
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
          radius: '30%',
          center: ['20%', '50%'],
          emphasis: {
            focus: 'self',
          },
          label: {
            formatter: '{b}: {@0:00} ({d}%)',
          },
          encode: {
            itemName: 'period',
            value: '0:00',
            tooltip: '0:00',
          },
        },
      ],
    }

    myChart.setOption(option)
    // FIXME: 首先是这个类型，其次写了一个 useCharts.ts 但是没用上
    myChart.on('updateAxisPointer', function (event) {
      const xAxisInfo = (event as IEvent).axesInfo[0]
      if (xAxisInfo) {
        const dimension = xAxisInfo.value + 1
        myChart?.setOption<echarts.EChartsOption>({
          series: {
            id: 'pie',
            label: {
              formatter: '{b}: {@[' + dimension + ']} ({d}%)',
            },
            encode: {
              value: dimension,
              tooltip: dimension,
            },
          },
        })
      }
    })

    const handleResize = () => {
      myChart?.resize()
    }

    window.addEventListener('resize', handleResize)

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
      myChart?.dispose()
      myChart = null
    })
  }
})
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
