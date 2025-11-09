import { get, post } from '@/utils/http'

enum API {
  batchDelete = '/batchDelete',
  cityList = '/cityList',
}

function batchDeleteApi(order: string[]) {
  return post(API.batchDelete, { order })
}

function cityListApi() {
  return get(API.cityList)
}

export { batchDeleteApi, cityListApi }
