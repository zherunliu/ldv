import { post } from '@/utils/http'

enum API {
  batchDelete = '/batchDelete',
}

function batchDeleteApi(order: string[]) {
  return post(API.batchDelete, { order })
}

export { batchDeleteApi }
