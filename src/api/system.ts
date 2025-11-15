import { post } from '@/utils/http'
enum Api {
  Auth = '/userAuth',
  SetAuth = '/setAuth',
}
function authApi(pageAuthority: string) {
  return post(Api.Auth, { pageAuthority })
}

function setAuthApi(account: string, btnList: string[], pageList: string[]) {
  return post(Api.SetAuth, { account, btnList, pageList })
}

export { authApi, setAuthApi }
