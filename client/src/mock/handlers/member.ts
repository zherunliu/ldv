import { http, HttpResponse } from 'msw'
import { z } from 'zod'
import { faker } from '@faker-js/faker'
import { baseUrl } from '../constants'

const memberSchema = z.object({
  pageSize: z.number().optional(),
})

export const memberHandlers = [
  http.post(`${baseUrl}/member`, async ({ request }) => {
    const json = await request.json()
    const result = memberSchema.safeParse(json)

    if (!result.success) {
      return HttpResponse.json({ code: 400, message: 'Invalid request body' })
    }

    const { pageSize = 10 } = result.data

    const list = Array.from({ length: pageSize }, () => ({
      memberCardNumber: faker.string.alphanumeric(10),
      cardType: faker.helpers.arrayElement(['普通卡', 'VIP卡', '季卡']),
      issueDate: faker.date.past().toISOString().split('T')[0],
      holderName: faker.person.fullName(),
      holderPhone: faker.phone.number(),
      cardBalance: faker.finance.amount({ min: 100, max: 10000, dec: 2 }),
      transactionRecords: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
        transactionDate: faker.date.recent().toISOString().split('T')[0],
        transactionAmount: faker.finance.amount({ min: 10, max: 500, dec: 2 }),
        transactionType: faker.helpers.arrayElement([
          '充电扣款',
          '服务费扣款',
          '停车费扣款',
          '其他',
        ]),
      })),
      validUntil: faker.date.future().toISOString().split('T')[0],
    }))

    return HttpResponse.json({
      code: 200,
      message: '操作成功',
      data: {
        list,
        total: 53,
      },
    })
  }),
]
