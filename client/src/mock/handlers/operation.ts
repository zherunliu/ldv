import { http, HttpResponse } from 'msw'
import { z } from 'zod'
import { faker } from '@faker-js/faker'
import { baseUrl } from '../constants'

const orderListSchema = z.object({
  pageSize: z.number().optional(),
})

const batchDeleteSchema = z.object({
  order: z.array(z.string()),
})

export const operationHandlers = [
  http.post(`${baseUrl}/orderList`, async ({ request }) => {
    const json = await request.json()
    const result = orderListSchema.safeParse(json)

    if (!result.success) {
      return HttpResponse.json({ code: 400, message: 'Invalid request body' })
    }

    const { pageSize = 10 } = result.data

    const list = Array.from({ length: pageSize }, () => ({
      orderNo: faker.string.numeric(6),
      date: faker.date.recent().toISOString().split('T')[0],
      startTime: faker.date.recent().toLocaleTimeString(),
      endTime: faker.date.recent().toLocaleTimeString(),
      deviceNo: faker.helpers.arrayElement(['B109', 'C227', 'C106', 'D158']),
      money: faker.helpers.arrayElement([66.5, 88.9, 22.7, 36.5, 42.0]),
      pay: faker.helpers.arrayElement(['微信', '支付宝', '储值卡']),
      status: faker.helpers.arrayElement([2, 3, 4]),
    }))

    return HttpResponse.json({
      code: 200,
      message: '成功',
      data: {
        list,
        total: 54, // Hardcoded total to match mock behavior or can be random
      },
    })
  }),

  http.post(`${baseUrl}/batchDelete`, async ({ request }) => {
    const json = await request.json()
    const result = batchDeleteSchema.safeParse(json)

    if (!result.success) {
      return HttpResponse.json({ code: 400, message: 'Invalid request body' })
    }

    const { order } = result.data
    if (import.meta.env.DEV) {
      console.log('订单管理批量删除接口', order)
    }
    return HttpResponse.json({
      code: 200,
      message: '成功',
      data: '批量删除操作成功',
    })
  }),
]
