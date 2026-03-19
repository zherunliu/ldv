import service from './axios'

export interface ResponseData {
  code: number
  data: unknown
  message: string
}

function get(url: string, params?: unknown): Promise<ResponseData> {
  return service.get(url, { params })
}

function post(url: string, data?: unknown): Promise<ResponseData> {
  return service.post(url, data)
}

export { get, post }
