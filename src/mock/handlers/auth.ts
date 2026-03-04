import { http, HttpResponse } from 'msw'
import { z } from 'zod'
import { baseUrl, menulist_admin, menulist_manager, menulist_user } from '../constants'

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
})

const userAuthSchema = z.object({
  pageAuthority: z.string(),
})

const setAuthSchema = z.object({
  btnList: z.array(z.string()),
  pageList: z.array(z.string()),
  account: z.string(),
})

export const authHandlers = [
  http.post(`${baseUrl}/login`, async ({ request }) => {
    const json = await request.json()
    const result = loginSchema.safeParse(json)

    if (!result.success) {
      return HttpResponse.json({ code: 400, message: 'Invalid request body' })
    }

    const { username, password } = result.data

    if (username === 'admin' && password === 'admin') {
      return HttpResponse.json({
        code: 200,
        message: '管理员登录成功',
        data: {
          token: 'daguhxnkjdocs',
          user: {
            username: 'rico',
            roles: ['admin'],
          },
          menulist: menulist_admin,
        },
      })
    } else if (username === 'manager' && password === 'manager') {
      return HttpResponse.json({
        code: 200,
        message: '运营专员登录成功',
        data: {
          token: 'fsanncdoso',
          user: {
            username: 'rice',
            roles: ['manager'],
          },
          menulist: menulist_manager,
        },
      })
    } else if (username === 'user' && password === 'user') {
      return HttpResponse.json({
        code: 200,
        message: '普通用户登录成功',
        data: {
          token: 'asdmmkofff',
          user: {
            username: 'white',
            roles: ['user'],
          },
          menulist: menulist_user,
        },
      })
    } else {
      return HttpResponse.json({
        code: 401,
        message: '用户名密码错误',
      })
    }
  }),

  http.post(`${baseUrl}/userAuth`, async ({ request }) => {
    const json = await request.json()
    const result = userAuthSchema.safeParse(json)

    if (!result.success) {
      return HttpResponse.json({ code: 400, message: 'Invalid request body' })
    }

    const { pageAuthority } = result.data

    if (import.meta.env.DEV) {
      console.log('后端收到当前权限', pageAuthority)
    }

    let list = menulist_admin
    let btn: string[] = ['add', 'edit', 'all', 'delete']

    if (pageAuthority === 'user') {
      list = menulist_user
      btn = ['add']
    } else if (pageAuthority === 'manager') {
      list = menulist_manager
      btn = ['add', 'edit']
    }

    return HttpResponse.json({
      code: 200,
      message: '操作成功',
      data: {
        list,
        btn,
      },
    })
  }),

  http.post(`${baseUrl}/setAuth`, async ({ request }) => {
    const json = await request.json()
    const result = setAuthSchema.safeParse(json)

    if (!result.success) {
      return HttpResponse.json({ code: 400, message: 'Invalid request body' })
    }

    const { btnList, pageList, account } = result.data
    if (import.meta.env.DEV) {
      console.log('权限设置接口修改账号权限', account, btnList, pageList)
    }
    return HttpResponse.json({
      code: 200,
      message: '操作成功',
      data: null,
    })
  }),
]
