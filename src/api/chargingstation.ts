import type { IRowType } from '@/types/station'
import { get, post } from '@/utils/http'

interface IListType {
  page: number
  pageSize: number
  name?: string
  id?: string
  status: number
}

interface IRevenueList {
  page: number
  pageSize: number
  name: string
}

enum Api {
  List = '/stationList',
  Edit = '/station/edit',
  Delete = '/station/delete',
  RevenueChart = '/revenueChart',
  Revenue = '/revenueList',
}

function listApi(data: IListType) {
  return post(Api.List, data)
}

function editApi(data: IRowType) {
  return post(Api.Edit, data)
}

function deleteApi(id: string) {
  return post(Api.Delete, { id })
}

function chartApi() {
  return get(Api.RevenueChart)
}

function revenueApi(data: IRevenueList) {
  return post(Api.Revenue, data)
}

export { listApi, editApi, deleteApi, chartApi, revenueApi }
