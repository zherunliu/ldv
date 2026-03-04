import { http, HttpResponse } from 'msw'
import { faker } from '@faker-js/faker'
import { baseUrl } from '../constants'

const alarmList = Array.from({ length: 10 }, () => ({
  description: faker.helpers.arrayElement([
    '充电桩拿不下来',
    '电动车无法充电',
    '充电结束未通知',
    '设备显示屏故障',
    '无法启动充电',
    '充电枪接触不良',
    '设备漏电报警',
  ]),
  address: `${faker.location.city()}${faker.location.streetAddress()}`,
  equNo: `CD${faker.number.int({ min: 1000, max: 2000 })}`,
  level: faker.number.int({ min: 1, max: 3 }),
  time: faker.date.recent().toLocaleString(),
  code: faker.number.int({ min: 10000, max: 10050 }),
  status: faker.number.int({ min: 1, max: 3 }),
}))

export const alarmHandlers = [
  http.get(`${baseUrl}/alarmList`, () => {
    return HttpResponse.json({
      code: 200,
      message: '操作成功',
      data: alarmList,
    })
  }),
]
