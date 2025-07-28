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

//充电站监控接口
let chargingStation = [
  {
    name: '北京西单充电站',
    id: 'VXZ10001',
    city: '北京',
    fast: 95,
    slow: 40,
    status: 3,
    now: 10,
    fault: 1,
    person: '张伟',
    tel: 17876554801,
  },
  {
    name: '上海陆家嘴充电站',
    id: 'VXZ10002',
    city: '上海',
    fast: 90,
    slow: 35,
    status: 2,
    now: 20,
    fault: 2,
    person: '李娜',
    tel: 17876554802,
  },
  {
    name: '广州花城广场充电站',
    id: 'VXZ10003',
    city: '广州',
    fast: 85,
    slow: 38,
    status: 2,
    now: 5,
    fault: 0,
    person: '王强',
    tel: 17876554803,
  },
  {
    name: '深圳大梅沙充电站',
    id: 'VXZ10004',
    city: '深圳',
    fast: 80,
    slow: 30,
    status: 3,
    now: 15,
    fault: 1,
    person: '赵敏',
    tel: 17876554804,
  },
  {
    name: '成都天府广场充电站',
    id: 'VXZ10005',
    city: '成都',
    fast: 88,
    slow: 37,
    status: 5,
    now: 12,
    fault: 2,
    person: '李晓华',
    tel: 17876554805,
  },
  {
    name: '西安钟楼充电站',
    id: 'VXZ10006',
    city: '西安',
    fast: 82,
    slow: 33,
    status: 4,
    now: 8,
    fault: 0,
    person: '刘伟',
    tel: 17876554806,
  },
  {
    name: '杭州西湖充电站',
    id: 'VXZ10007',
    city: '杭州',
    fast: 75,
    slow: 29,
    status: 3,
    now: 18,
    fault: 3,
    person: '陈芳',
    tel: 17876554807,
  },
  {
    name: '南京夫子庙充电站',
    id: 'VXZ10008',
    city: '南京',
    fast: 89,
    slow: 40,
    status: 2,
    now: 22,
    fault: 1,
    person: '黄伟',
    tel: 17876554808,
  },
  {
    name: '天津意大利风情区充电站',
    id: 'VXZ10009',
    city: '天津',
    fast: 87,
    slow: 36,
    status: 2,
    now: 6,
    fault: 0,
    person: '吴敏',
    tel: 17876554809,
  },
  {
    name: '青岛栈桥充电站',
    id: 'VXZ10010',
    city: '青岛',
    fast: 91,
    slow: 32,
    status: 3,
    now: 25,
    fault: 1,
    person: '杨杰',
    tel: 17876554810,
  },
  {
    name: '武汉黄鹤楼充电站',
    id: 'VXZ10011',
    city: '武汉',
    fast: 74,
    slow: 28,
    status: 2,
    now: 11,
    fault: 2,
    person: '周丽',
    tel: 17876554811,
  },
  {
    name: '福州三坊七巷充电站',
    id: 'VXZ10012',
    city: '福州',
    fast: 76,
    slow: 31,
    status: 4,
    now: 19,
    fault: 1,
    person: '林涛',
    tel: 17876554812,
  },
  {
    name: '合肥包公园充电站',
    id: 'VXZ10013',
    city: '合肥',
    fast: 70,
    slow: 30,
    status: 2,
    now: 3,
    fault: 0,
    person: '高峰',
    tel: 17876554813,
  },
  {
    name: '重庆解放碑充电站',
    id: 'VXZ10014',
    city: '重庆',
    fast: 83,
    slow: 34,
    status: 2,
    now: 14,
    fault: 2,
    person: '邓超',
    tel: 17876554814,
  },
  {
    name: '桂林漓江充电站',
    id: 'VXZ10015',
    city: '桂林',
    fast: 77,
    slow: 29,
    status: 2,
    now: 9,
    fault: 1,
    person: '李曼',
    tel: 17876554815,
  },
  {
    name: '苏州园区充电站',
    id: 'VXZ10016',
    city: '苏州',
    fast: 80,
    slow: 35,
    status: 2,
    now: 7,
    fault: 0,
    person: '王琦',
    tel: 17876554816,
  },
  {
    name: '昆明滇池充电站',
    id: 'VXZ10017',
    city: '昆明',
    fast: 79,
    slow: 33,
    status: 3,
    now: 21,
    fault: 1,
    person: '陈超',
    tel: 17876554817,
  },
  {
    name: '南宁青秀山充电站',
    id: 'VXZ10018',
    city: '南宁',
    fast: 81,
    slow: 36,
    status: 2,
    now: 13,
    fault: 0,
    person: '蔡徐坤',
    tel: 17876554818,
  },
  {
    name: '长沙橘子洲头充电站',
    id: 'VXZ10019',
    city: '长沙',
    fast: 78,
    slow: 34,
    status: 2,
    now: 4,
    fault: 0,
    person: '李安',
    tel: 17876554819,
  },
  {
    name: '哈尔滨中央大街充电站',
    id: 'VXZ10020',
    city: '哈尔滨',
    fast: 75,
    slow: 32,
    status: 2,
    now: 23,
    fault: 1,
    person: '林雨',
    tel: 17876554820,
  },
  {
    name: '石家庄正定古城充电站',
    id: 'VXZ10021',
    city: '石家庄',
    fast: 72,
    slow: 31,
    status: 4,
    now: 16,
    fault: 2,
    person: '郑明',
    tel: 17876554821,
  },
  {
    name: '兰州黄河桥充电站',
    id: 'VXZ10022',
    city: '兰州',
    fast: 88,
    slow: 38,
    status: 5,
    now: 5,
    fault: 0,
    person: '李伟',
    tel: 17876554822,
  },
  {
    name: '济南大明湖充电站',
    id: 'VXZ10023',
    city: '济南',
    fast: 93,
    slow: 39,
    status: 3,
    now: 17,
    fault: 1,
    person: '刘洋',
    tel: 17876554823,
  },
  {
    name: '沈阳故宫充电站',
    id: 'VXZ10024',
    city: '沈阳',
    fast: 76,
    slow: 32,
    status: 4,
    now: 19,
    fault: 1,
    person: '张博',
    tel: 17876554824,
  },
  {
    name: '福州西湖充电站',
    id: 'VXZ10025',
    city: '福州',
    fast: 79,
    slow: 34,
    status: 2,
    now: 6,
    fault: 0,
    person: '周扬',
    tel: 17876554825,
  },
  {
    name: '无锡灵山大佛充电站',
    id: 'VXZ10026',
    city: '无锡',
    fast: 85,
    slow: 38,
    status: 3,
    now: 12,
    fault: 1,
    person: '江海',
    tel: 17876554826,
  },
  {
    name: '郑州二七广场充电站',
    id: 'VXZ10027',
    city: '郑州',
    fast: 84,
    slow: 36,
    status: 3,
    now: 20,
    fault: 2,
    person: '胡丽',
    tel: 17876554827,
  },
  {
    name: '大连星海广场充电站',
    id: 'VXZ10028',
    city: '大连',
    fast: 82,
    slow: 35,
    status: 2,
    now: 7,
    fault: 0,
    person: '李涛',
    tel: 17876554828,
  },
  {
    name: '宁波天一广场充电站',
    id: 'VXZ10029',
    city: '宁波',
    fast: 90,
    slow: 40,
    status: 4,
    now: 15,
    fault: 1,
    person: '程伟',
    tel: 17876554829,
  },
  {
    name: '贵阳甲秀楼充电站',
    id: 'VXZ10030',
    city: '贵阳',
    fast: 81,
    slow: 33,
    status: 1,
    now: 14,
    fault: 2,
    person: '马云',
    tel: 17876554830,
  },
  {
    name: '珠海长隆海洋王国充电站',
    id: 'VXZ10031',
    city: '珠海',
    fast: 78,
    slow: 36,
    status: 1,
    now: 11,
    fault: 3,
    person: '王超',
    tel: 17876554831,
  },
  {
    name: '天津滨海新区充电站',
    id: 'VXZ10032',
    city: '天津',
    fast: 92,
    slow: 37,
    status: 2,
    now: 8,
    fault: 0,
    person: '黄华',
    tel: 17876554832,
  },
]
// 原始的深拷贝
const originalChargingStation = JSON.parse(JSON.stringify(chargingStation))
// 定义 API 接口
Mock.mock('https://www.demo.com/stationList', 'post', (options) => {
  chargingStation = originalChargingStation
  const { id, name, status, page, pageSize } = options.body ? JSON.parse(options.body) : {}
  // 根据条件过滤数据
  if (id) {
    chargingStation = chargingStation.filter((item) => item.id === id)
  }
  if (name) {
    chargingStation = chargingStation.filter((item) => item.name.includes(name))
  }
  if (status !== 1) {
    chargingStation = chargingStation.filter((item) => item.status === status)
  }
  // 实现分页
  const total = chargingStation.length
  const start = (page - 1) * pageSize
  const paginatedItems = chargingStation.slice(start, start + pageSize)
  return {
    code: 200,
    message: '获取表格数据成功',
    data: {
      list: paginatedItems,
      total,
    },
  }
})

Mock.mock('https://www.demo.com/station/edit', 'post', (options) => {
  const res = JSON.parse(options.body)
  console.log(res)
  return {
    code: 200,
    message: '新增/编辑操作成功',
    data: res,
  }
})

Mock.mock('https://www.demo.com/station/delete', 'post', (options) => {
  const res = JSON.parse(options.body)
  console.log(res)
  return {
    code: 200,
    message: '删除操作成功',
    data: res,
  }
})
