<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <div class="title">
            <div class="round">
              <el-icon>
                <Document />
              </el-icon>
            </div>
            <h4>今日总收入</h4>
          </div>
          <div class="total">
            <h1>{{ formatNumberToThousands(3243259) }}</h1>
            <div class="percent green">+21%</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="title">
            <div class="round">
              <el-icon>
                <Document />
              </el-icon>
            </div>
            <h4>会员卡储值金额</h4>
          </div>
          <div class="total">
            <h1>{{ formatNumberToThousands(47328593) }}</h1>
            <div class="percent green">+17%</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="title">
            <div class="round">
              <el-icon>
                <Document />
              </el-icon>
            </div>
            <h4>设备费金额</h4>
          </div>
          <div class="total">
            <h1>{{ formatNumberToThousands(624378) }}</h1>
            <div class="percent red">-3%</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="title">
            <div class="round">
              <el-icon>
                <Document />
              </el-icon>
            </div>
            <h4>服务费金额</h4>
          </div>
          <div class="total">
            <h1>{{ formatNumberToThousands(43624) }}</h1>
            <div class="percent red">-24%</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="mt">
      <div ref="chartRef" style="width: 100%; height: 250px"></div>
    </el-card>
    <el-card class="mt">
      <el-input v-model="name" style="width: 300px" placeholder="请输入站点名称">
        <template #append>
          <el-button icon="search" @click="loadData"></el-button>
        </template>
      </el-input>
      <el-table :data="tableData" v-loading="loading">
        <el-table-column align="center" type="index" label="序号" width="80" />
        <el-table-column align="center" prop="name" label="站点名称" width="180" />
        <el-table-column align="center" prop="id" label="站点ID" />
        <el-table-column align="center" prop="city" label="所属城市" />
        <el-table-column align="center" prop="count" label="站点总量" />
        <el-table-column align="center" prop="day" label="单日收入" sortable>
          <template #default="scope">
            <span style="display: block">{{ scope.row.day }}</span>
            <el-tag :type="scope.row.percent > 0 ? 'success' : 'danger'">
              {{ scope.row.percent > 0 ? '+' : '' }}{{ scope.row.percent }}%
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="month" label="月度收入">
          <template #default="scope">
            <span style="display: block">{{ scope.row.month }}</span>
            <el-tag :type="scope.row.mpercent > 0 ? 'success' : 'danger'">
              {{ scope.row.mpercent > 0 ? '+' : '' }}{{ scope.row.mpercent }}%
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="electricity" label="电费营收" />
        <el-table-column align="center" prop="parkingFee" label="停车费营收" />
        <el-table-column align="center" prop="serviceFee" label="服务费营收" />
        <el-table-column align="center" prop="member" label="会员储值金" />
      </el-table>
      <el-pagination
        class="mt fr mb"
        v-model:current-page="pageInfo.page"
        v-model:page-size="pageInfo.pageSize"
        :page-sizes="[5, 10, 15, 20]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="totals"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Document } from '@element-plus/icons-vue'
import formatNumberToThousands from '@/utils/to-thousands'
import { onMounted, ref } from 'vue'
import { type ECOption } from '@/utils/typed-echarts'
import { useCharts } from '@/hooks/use-charts'
import { chartApi, revenueApi } from '@/api/charging-station'
import { usePagination } from '@/hooks/use-pagination'
import { type IRevenueType } from '@/types/station'

const chartRef = ref(null)
const setChartData = async () => {
  const xAxisData = [
    '00:00',
    '01:15',
    '02:30',
    '03:45',
    '05:00',
    '06:15',
    '07:30',
    '08:45',
    '10:00',
    '11:15',
    '12:30',
    '13:45',
    '15:00',
    '16:15',
    '17:30',
    '18:45',
    '20:00',
    '21:15',
    '22:30',
    '23:45',
  ]
  const options: ECOption & {
    series: Array<{ data: number[] }>
  } = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} W',
      },
      axisPointer: {
        snap: true,
      },
    },
    visualMap: {
      show: false,
      dimension: 0,
      pieces: [
        {
          lte: 6,
          color: 'green',
        },
        {
          gt: 6,
          lte: 8,
          color: 'red',
        },
        {
          gt: 8,
          lte: 14,
          color: 'green',
        },
        {
          gt: 14,
          lte: 17,
          color: 'red',
        },
        {
          gt: 17,
          color: 'green',
        },
      ],
    },
    series: [
      {
        name: 'Electricity',
        type: 'line',
        smooth: true,
        data: [],
      },
    ],
  }
  const res = await chartApi()
  options.series[0].data = res.data as number[]
  return options
}
useCharts(chartRef, setChartData)

const tableData = ref<IRevenueType[]>([])
const loading = ref<boolean>(false)
const name = ref('')
const loadData = async () => {
  loading.value = true
  const { data } = await revenueApi({ ...pageInfo, name: name.value })
  const { list, total } = data as { list: IRevenueType[]; total: number }
  loading.value = false
  setTotals(total)
  tableData.value = list.map((item: IRevenueType) => ({
    ...item,
    day: item.electricity + item.parkingFee + item.serviceFee + item.member,
  }))
}

const { totals, pageInfo, handleSizeChange, handleCurrentChange, setTotals } =
  usePagination(loadData)

onMounted(() => {
  loadData()
})
</script>

<style scoped lang="less">
.title {
  display: flex;
  align-items: center;

  .round {
    margin-right: 20px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgb(235, 236, 245);
    line-height: 30px;
    text-align: center;
  }

  h4 {
    color: #666;
  }
}

.total {
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  h1 {
    font-size: 25px;
    margin-right: 15px;
  }

  .percent {
    display: inline-block;
    padding-left: 5;
    height: 20px;
    font-size: 12px;
    border-radius: 2px;
    line-height: 20px;
  }

  .green {
    background-color: rgb(235, 247, 239);
    color: green;
  }

  .red {
    background-color: rgb(255, 235, 235);
    color: red;
  }
}
</style>
