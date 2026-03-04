import { http, HttpResponse } from 'msw'
import { z } from 'zod'
import { baseUrl } from '../constants'
import { stations, revenueStations, chargingPiles } from '../store'

// Mutable stations list
let stationsList = [...stations]

const stationListSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  status: z.number().optional(),
  page: z.number().optional(),
  pageSize: z.number().optional(),
})

const stationEditSchema = z
  .object({
    id: z.string(),
  })
  .passthrough() // Allow other properties for editing

const stationDeleteSchema = z.object({
  id: z.string(),
})

const revenueListSchema = z.object({
  name: z.string().optional(),
  page: z.number().optional(),
  pageSize: z.number().optional(),
})

export const stationHandlers = [
  http.post(`${baseUrl}/stationList`, async ({ request }) => {
    const json = await request.json()
    const result = stationListSchema.safeParse(json)

    if (!result.success) {
      return HttpResponse.json({ code: 400, message: 'Invalid request body' })
    }

    const { id, name, status, page = 1, pageSize = 10 } = result.data

    let filtered = stationsList

    if (id) {
      filtered = filtered.filter((item) => item.id === id)
    }
    if (name) {
      filtered = filtered.filter((item) => item.name.includes(name))
    }
    if (status && status !== 1) {
      filtered = filtered.filter((item) => item.status === status)
    }

    const total = filtered.length
    const start = (page - 1) * pageSize
    const list = filtered.slice(start, start + pageSize)

    return HttpResponse.json({
      code: 200,
      message: '获取表格数据成功',
      data: {
        list,
        total,
      },
    })
  }),

  http.post(`${baseUrl}/station/edit`, async ({ request }) => {
    const json = await request.json()
    const result = stationEditSchema.safeParse(json)

    if (!result.success) {
      return HttpResponse.json({ code: 400, message: 'Invalid request body' })
    }

    const res = result.data
    // Update local data
    const index = stationsList.findIndex((s) => s.id === res.id)
    if (index > -1) {
      stationsList[index] = { ...stationsList[index], ...res }
    } else {
      // Add new
      // @ts-expect-error: res may not match the exact station type
      stationsList.unshift(res)
    }
    return HttpResponse.json({
      code: 200,
      message: '新增/编辑操作成功',
      data: res,
    })
  }),

  http.post(`${baseUrl}/station/delete`, async ({ request }) => {
    const json = await request.json()
    const result = stationDeleteSchema.safeParse(json)

    if (!result.success) {
      return HttpResponse.json({ code: 400, message: 'Invalid request body' })
    }

    const res = result.data
    stationsList = stationsList.filter((s) => s.id !== res.id)
    return HttpResponse.json({
      code: 200,
      message: '删除操作成功',
      data: res,
    })
  }),

  http.post(`${baseUrl}/revenueList`, async ({ request }) => {
    const json = await request.json()
    const result = revenueListSchema.safeParse(json)

    if (!result.success) {
      return HttpResponse.json({ code: 400, message: 'Invalid request body' })
    }

    const { name, page = 1, pageSize = 10 } = result.data

    let filtered = revenueStations
    if (name) {
      filtered = filtered.filter((item) => item.name.includes(name))
    }

    const total = filtered.length
    const start = (page - 1) * pageSize
    const list = filtered.slice(start, start + pageSize)

    return HttpResponse.json({
      code: 200,
      success: true,
      data: {
        list,
        total,
      },
    })
  }),

  http.post(`${baseUrl}/currentList`, () => {
    return HttpResponse.json({
      code: 200,
      success: true,
      data: chargingPiles,
    })
  }),
]
