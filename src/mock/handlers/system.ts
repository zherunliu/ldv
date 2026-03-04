import { http, HttpResponse } from 'msw'
import { z } from 'zod'
import { faker } from '@faker-js/faker'
import { baseUrl } from '../constants'

const permissionListSchema = z.object({
  pageSize: z.number().optional(),
})

export const systemHandlers = [
  http.get(`${baseUrl}/document`, () => {
    return HttpResponse.json({
      code: 200,
      message: '操作成功',
      data: {
        type: ['招商类', '广告类', '公告类', '提示类', '日常类', '告警类', '其他'],
        important: ['一级', '二级', '三级', '四级'],
        publish: ['站内信息', '公众号', '小程序', 'H5', '官网'],
      },
    })
  }),

  http.post(`${baseUrl}/permissionList`, async ({ request }) => {
    const json = await request.json()
    const result = permissionListSchema.safeParse(json)

    if (!result.success) {
      return HttpResponse.json({ code: 400, message: 'Invalid request body' })
    }

    const { pageSize = 10 } = result.data

    const list = Array.from({ length: pageSize }, () => ({
      name: faker.person.fullName(),
      account: faker.internet.username(),
      phone: faker.phone.number(),
      idNo: faker.string.alphanumeric(18),
      position: faker.helpers.arrayElement([
        '客服专员',
        '客服经理',
        '市场专员',
        '市场经理',
        '运营专员',
        '运营经理',
        '技术工程师',
        '技术经理',
        'Boss',
      ]),
      department: faker.helpers.arrayElement([
        '总裁办',
        '技术部',
        '市场部',
        '维修部',
        '运营部',
        '客服部',
      ]),
      pageAuthority: faker.helpers.arrayElement(['admin', 'manager', 'user', '自定义权限']),
      btnAuthority: faker.helpers.arrayElement(['add', 'delete', 'edit', 'all', '自定义权限']),
    }))

    return HttpResponse.json({
      code: 200,
      message: '操作成功',
      data: {
        list,
        total: 41,
      },
    })
  }),
]
