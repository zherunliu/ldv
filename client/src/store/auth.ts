import { defineStore } from 'pinia'
import { loginApi } from '@/api/user'
import type { IMenuItem } from '@/types/user'

interface LoginParams {
  username: string
  password: string
}

// 选项式写法
const useUserStore = defineStore('user', {
  state: () => ({
    //token 首次登录后端返回，携带token发送请求避免重复身份验证
    token: sessionStorage.getItem('token') || '',
    roles: (sessionStorage.getItem('roles')
      ? JSON.parse(sessionStorage.getItem('roles')!)
      : []) as string[],
    username: sessionStorage.getItem('username') || '',
    menu: (sessionStorage.getItem('menu')
      ? JSON.parse(sessionStorage.getItem('menu')!)
      : []) as IMenuItem[],
  }),
  actions: {
    async login(data: LoginParams) {
      try {
        const res = (await loginApi(data)) as {
          // 断言 await 得到的对象类型
          data: {
            token: string
            user: { username: string; roles: string[] }
            menulist: IMenuItem[]
          }
        }

        // 解构赋值
        // 参考 https://wangdoc.com/es6/destructuring#%E5%AF%B9%E8%B1%A1%E7%9A%84%E8%A7%A3%E6%9E%84%E8%B5%8B%E5%80%BC
        const {
          token,
          user: { username, roles },
          menulist,
        } = res.data

        this.token = token
        this.roles = roles
        this.username = username
        this.menu = menulist
        // pinia 中数据(响应式)刷新会丢失，需要结合本地存储(非响应式)
        // (localStorage 永久存储，sessionStorage 页面关闭后释放)
        sessionStorage.setItem('token', token)
        sessionStorage.setItem('roles', JSON.stringify(roles))
        sessionStorage.setItem('username', username)
        sessionStorage.setItem('menu', JSON.stringify(menulist))
      } catch (err) {
        console.error(err)
      }
    },
    // 登出，清空数据
    logout() {
      this.token = ''
      this.roles = []
      this.username = ''
      this.menu = []
      sessionStorage.clear()
    },
  },
})

export default useUserStore
