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
        url: '/operations/total',
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
    url: '/equipment',
    icon: 'Magnet',
  },
  {
    name: '招商管理',
    url: '/document',
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
        url: '/operations/total',
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
    url: '/equipment',
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
