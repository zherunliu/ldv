import { http, HttpResponse } from 'msw'
import { stations } from '../store'
import { baseUrl } from '../constants'

export const mapHandlers = [
  http.post(`${baseUrl}/mapList`, () => {
    return HttpResponse.json({
      code: 200,
      success: true,
      data: stations,
    })
  }),

  http.get(`${baseUrl}/cityList`, () => {
    return HttpResponse.json({
      code: 200,
      message: '操作成功',
      data: [
        {
          label: '北京总部',
          children: [
            {
              label: '东城区',
              children: [
                { label: '东城区充电站01' },
                { label: '东城区充电站02' },
                { label: '东城区充电站03' },
                { label: '东城区充电站04' },
              ],
            },
            {
              label: '西城区',
              children: [
                { label: '西城区充电站01' },
                { label: '西城区充电站02' },
                { label: '西城区充电站03' },
              ],
            },
            {
              label: '朝阳区',
              children: [
                { label: '朝阳区充电站01' },
                { label: '朝阳区充电站02' },
                { label: '朝阳区充电站03' },
              ],
            },
            {
              label: '海淀区',
              children: [{ label: '海淀区充电站01' }, { label: '海淀区充电站02' }],
            },
            {
              label: '丰台区',
              children: [{ label: '丰台区充电站01' }, { label: '丰台区充电站02' }],
            },
          ],
        },
        {
          label: '深圳总部',
          children: [
            {
              label: '福田区',
              children: [
                { label: '福田区充电站01' },
                { label: '福田区充电站02' },
                { label: '福田区充电站03' },
                { label: '福田区充电站04' },
              ],
            },
            {
              label: '南山区',
              children: [
                { label: '南山区充电站01' },
                { label: '南山区充电站02' },
                { label: '南山区充电站03' },
              ],
            },
            {
              label: '罗湖区',
              children: [
                { label: '罗湖区充电站01' },
                { label: '罗湖区充电站02' },
                { label: '罗湖区充电站03' },
              ],
            },
            {
              label: '宝安区',
              children: [{ label: '宝安区充电站01' }, { label: '宝安区充电站02' }],
            },
          ],
        },
      ],
    })
  }),
]
