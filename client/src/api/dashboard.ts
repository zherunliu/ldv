import { get } from '@/utils/http'

enum Api {
  ChartData = '/chartData',
  ChartRadarData = '/chartRadarData',
}

function chartDataApi() {
  return get(Api.ChartData)
}

function chartRadarDataApi() {
  return get(Api.ChartRadarData)
}

export { chartDataApi, chartRadarDataApi }
