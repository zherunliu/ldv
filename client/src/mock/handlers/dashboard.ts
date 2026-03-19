import { http, HttpResponse } from 'msw'
import { faker } from '@faker-js/faker'
import { baseUrl } from '../constants'

export const dashboardHandlers = [
  http.get(`${baseUrl}/chartData`, () => {
    return HttpResponse.json({
      code: 200,
      message: '获取图表数据成功',
      data: {
        list: [
          ['period', '0:00', '6:00', '12:00', '18:00', '24:00'],
          [
            '充电桩',
            faker.number.float({ min: 30, max: 90, fractionDigits: 1 }),
            faker.number.float({ min: 30, max: 90, fractionDigits: 1 }),
            faker.number.float({ min: 30, max: 90, fractionDigits: 1 }),
            faker.number.float({ min: 30, max: 90, fractionDigits: 1 }),
            faker.number.float({ min: 30, max: 90, fractionDigits: 1 }),
          ],
          [
            '充电柜',
            faker.number.float({ min: 30, max: 90, fractionDigits: 1 }),
            faker.number.float({ min: 30, max: 90, fractionDigits: 1 }),
            faker.number.float({ min: 30, max: 90, fractionDigits: 1 }),
            faker.number.float({ min: 30, max: 90, fractionDigits: 1 }),
            faker.number.float({ min: 30, max: 90, fractionDigits: 1 }),
          ],
          [
            '充电站',
            faker.number.float({ min: 30, max: 90, fractionDigits: 1 }),
            faker.number.float({ min: 30, max: 90, fractionDigits: 1 }),
            faker.number.float({ min: 30, max: 90, fractionDigits: 1 }),
            faker.number.float({ min: 30, max: 90, fractionDigits: 1 }),
            faker.number.float({ min: 30, max: 90, fractionDigits: 1 }),
          ],
        ],
      },
    })
  }),

  http.get(`${baseUrl}/chartRadarData`, () => {
    return HttpResponse.json({
      code: 200,
      message: '获取雷达图数据成功',
      data: {
        list: Array.from({ length: 6 }, () => faker.number.int({ min: 0, max: 100 })),
      },
    })
  }),

  http.get(`${baseUrl}/revenueChart`, () => {
    return HttpResponse.json({
      code: 200,
      message: '获取数据成功',
      data: Array.from({ length: 20 }, () => faker.number.int({ min: 200, max: 800 })),
    })
  }),
]
