import type { IRowType } from '@/types/station'
import { post } from '@/utils/http'

interface IListType {
  page: number
  pageSize: number
  name?: string
  id?: string
  status: number
}

enum Api {
  List = '/stationList',
  Edit = '/station/edit',
  Delete = '/station/delete',
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

export { listApi, editApi, deleteApi }
