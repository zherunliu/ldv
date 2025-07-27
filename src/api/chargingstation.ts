import { post } from '@/utils/http'

interface IListType {
  page: number
  pageSize: number
  name?: string
  id?: string
  status?: number
}

enum Api {
  List = '/stationList',
}

function listApi(data: IListType) {
  return post(Api.List, data)
}

export { listApi }
