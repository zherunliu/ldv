import { post } from '@/utils/http'
enum Api {
  Auth = '/userAuth',
}
function authApi(pageAuthority: string) {
  return post(Api.Auth, { pageAuthority })
}

export { authApi }
