import { post, type ResponseData } from '@/utils/http'

enum Api {
  Login = '/login',
}

interface LoginParams {
  username: string
  password: string
}

function loginApi(data: LoginParams): Promise<ResponseData> {
  return post(Api.Login, data)
}

export { loginApi } // export 可以导出多个， export default 只能导出一个
