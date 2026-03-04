import type { IMenuItem } from '@/types/user'

export const baseUrl = '*'

export const menulist_admin: IMenuItem[] = [
  {
    name: '数据看板',
    url: '/dashboard',
    icon: 'DataLine',
  },
  {
    name: '充电站管理',
    url: '/chargingstation',
    icon: 'Lightning',
    children: [
      {
        name: '充电站监控',
        url: '/chargingstation/monitor',
        icon: 'VideoCamera',
      },
      {
        name: '营收统计',
        url: '/chargingstation/revenue',
        icon: 'DataAnalysis',
      },
      {
        name: '充电桩管理',
        url: '/chargingstation/chargingpile',
        icon: 'Warning',
      },
    ],
  },
  {
    name: '电子地图',
    url: '/map',
    icon: 'MapLocation',
  },
  {
    name: '运营管理',
    url: '/operations',
    icon: 'Files',
    children: [
      {
        name: '订单管理',
        url: '/operations/orders',
        icon: 'DocumentCopy',
      },
      {
        name: '订单详情',
        url: '/operations/detail',
        icon: 'Share',
      },
      {
        name: '计费管理',
        url: '/operations/billing',
        icon: 'Money',
      },
    ],
  },
  {
    name: '报警管理',
    url: '/alarm',
    icon: 'Phone',
  },
  {
    name: '会员卡管理',
    url: '/associator',
    icon: 'Magnet',
  },
  {
    name: '招商管理',
    url: '/investment',
    icon: 'Document',
  },
  {
    name: '系统设置',
    url: '/system',
    icon: 'Setting',
  },

  {
    name: '个人中心',
    url: '/personal',
    icon: 'User',
  },
]

export const menulist_manager: IMenuItem[] = [
  {
    name: '数据看板',
    url: '/dashboard',
    icon: 'DataLine',
  },
  {
    name: '充电站管理',
    url: '/chargingstation',
    icon: 'Lightning',
    children: [
      {
        name: '充电站监控',
        url: '/chargingstation/monitor',
        icon: 'VideoCamera',
      },
      {
        name: '营收统计',
        url: '/chargingstation/revenue',
        icon: 'DataAnalysis',
      },
      {
        name: '充电桩管理',
        url: '/chargingstation/chargingpile',
        icon: 'Warning',
      },
    ],
  },
  {
    name: '电子地图',
    url: '/map',
    icon: 'MapLocation',
  },
  {
    name: '运营管理',
    url: '/operations',
    icon: 'Files',
    children: [
      {
        name: '订单管理',
        url: '/operations/orders',
        icon: 'DocumentCopy',
      },
      {
        name: '订单详情',
        url: '/operations/detail',
        icon: 'Share',
      },
      {
        name: '计费管理',
        url: '/operations/billing',
        icon: 'Money',
      },
    ],
  },
  {
    name: '报警管理',
    url: '/alarm',
    icon: 'Phone',
  },
  {
    name: '会员卡管理',
    url: '/associator',
    icon: 'Magnet',
  },
  {
    name: '个人中心',
    url: '/personal',
    icon: 'User',
  },
]

export const menulist_user: IMenuItem[] = [
  {
    name: '数据看板',
    url: '/dashboard',
    icon: 'DataLine',
  },
  {
    name: '充电站管理',
    url: '/chargingstation',
    icon: 'Lightning',
    children: [
      {
        name: '充电站监控',
        url: '/chargingstation/monitor',
        icon: 'VideoCamera',
      },

      {
        name: '充电桩管理',
        url: '/chargingstation/fault',
        icon: 'Warning',
      },
    ],
  },
  {
    name: '电子地图',
    url: '/map',
    icon: 'MapLocation',
  },

  {
    name: '报警管理',
    url: '/alarm',
    icon: 'Phone',
  },

  {
    name: '会员卡管理',
    url: '/equipment',
    icon: 'Magnet',
  },
  {
    name: '个人中心',
    url: '/personal',
    icon: 'User',
  },
]
