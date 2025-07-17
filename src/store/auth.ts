import { defineStore } from 'pinia'
import { loginApi } from '@/api/user'
import type { MenuItem } from '@/types/user'

interface LoginParams {
  username: string
  password: string
}

// 选项式写法
export const useUserStore = defineStore('user', {
  state: () => ({
    //token 首次登录后端返回，携带token发送请求避免重复身份验证
    token: sessionStorage.getItem('token') || '',
    roles: (sessionStorage.getItem('roles')
      ? JSON.parse(sessionStorage.getItem('roles')!)
      : []) as string[],
    username: sessionStorage.getItem('username') || '',
    menu: (sessionStorage.getItem('menu')
      ? JSON.parse(sessionStorage.getItem('menu')!)
      : []) as MenuItem[],
  }),
  actions: {
    async login(data: LoginParams) {
      try {
        const {
          data: {
            token,
            user: { username, roles },
            menulist,
          },
        } = await loginApi(data)
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
      } catch (error) {
        console.log(error)
      }
    },
  },
})
