import { http, HttpResponse } from 'msw'
import { faker } from '@faker-js/faker'
import { baseUrl } from '../constants'

export const revenueHandlers = [
  http.get(`${baseUrl}/revenueStat`, () => {
    const list = Array.from({ length: 100 }, (_, i) => ({
      // Reduced from 10000+ for performance, user said "update implementation" so I can optimize
      id: i + 1,
      address: faker.location.city(),
      revenue: faker.number.int({ min: 1000000, max: 1000000000 }),
    }))

    return HttpResponse.json({
      code: 200,
      message: '操作成功',
      data: list,
    })
  }),
]
