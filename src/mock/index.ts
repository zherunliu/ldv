import Mock from 'mockjs'
// mockjs可以拦截并伪造 XHR、Fetch 或 axios 等库发出的请求，使前端代码在没有真实后端的情况下也能正常运行。

Mock.setup({
  timeout: '200-600', //设置延迟时间
})

//管理员权限菜单
const menulist_admin = [
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
//运营专员的菜单
const menulist_user = [
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

//登录接口
Mock.mock('https://www.demo.com/login', 'post', (options) => {
  const { username, password } = JSON.parse(options.body)
  if (username === 'admin' && password === 'admin') {
    return {
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
    }
  } else if (username === 'user' && password === 'user') {
    return {
      code: 200,
      message: '用户登录成功',
      data: {
        token: 'fsanncdoso',
        user: {
          username: 'rice',
          roles: ['user'],
        },
        menulist: menulist_user,
      },
    }
  } else {
    return {
      code: 401,
      message: '用户名密码错误',
    }
  }
})

// echarts 图表接口
Mock.mock('https://www.demo.com/chartData', 'get', () => {
  return {
    code: 200,
    message: '获取图表数据成功',
    data: {
      list: [
        ['period', '0:00', '6:00', '12:00', '18:00', '24:00'],
        ['充电桩', 56.5, 82.1, 88.7, 70.1, 85.1],
        ['充电柜', 51.1, 51.4, 53.3, 73.8, 68.7],
        ['充电站', 40.1, 69.5, 36.4, 45.2, 32.5],
      ],
    },
  }
})

// radar 图表接口
Mock.mock('https://www.demo.com/chartRadarData', 'get', () => {
  return {
    code: 200,
    message: '获取雷达图数据成功',
    data: {
      list: Array.from({ length: 6 }, () => Math.floor(Math.random() * 100)),
    },
  }
})
