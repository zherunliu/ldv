import { type RouteRecordRaw } from 'vue-router'

// 扩展 meta 字段的类型
// 参考 https://router.vuejs.org/zh/guide/advanced/meta.html#TypeScript
declare module 'vue-router' {
  interface RouteMeta {
    needAuth?: string[]
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/layouts/DefaultLayout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/DashBoard.vue'),
      },
      {
        path: '/chargingstation/monitor',
        name: 'Monitor',
        component: () => import('@/views/charging-station/Monitor.vue'),
      },
      {
        path: '/chargingstation/revenue',
        name: 'Revenue',
        component: () => import('@/views/charging-station/Revenue.vue'),
      },
      {
        path: '/chargingstation/chargingpile',
        name: 'ChargingPile',
        component: () => import('@/views/charging-station/ChargingPile.vue'),
      },
      {
        path: '/map',
        name: 'ElectronicMap',
        component: () => import('@/views/map/ElectronicMap.vue'),
      },
      {
        path: '/operations/orders',
        name: 'Orders',
        component: () => import('@/views/operations/Orders.vue'),
      },
      {
        path: '/operations/detail',
        name: 'Detail',
        component: () => import('@/views/operations/Detail.vue'),
      },
      {
        path: '/operations/billing',
        name: 'Billing',
        component: () => import('@/views/operations/Billing.vue'),
      },
      {
        path: '/alarm',
        name: 'Alarm',
        component: () => import('@/views/alarm/Alarm.vue'),
      },
      {
        path: '/associator',
        name: 'Associator',
        component: () => import('@/views/associator/Associator.vue'),
      },
      {
        path: '/investment',
        name: 'Investment',
        component: () => import('@/views/investment/Investment.vue'),
        meta: { needAuth: ['admin', 'manager'] },
      },
      {
        path: '/system',
        name: 'System',
        component: () => import('@/views/system/System.vue'),
        meta: { needAuth: ['admin'] },
      },
      {
        path: '/personal',
        name: 'Personal',
        component: () => import('@/views/personal/Personal.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
]

export default routes

/*
页面权限控制方法：
  1. 前段不创建完整路由表，后端返回权限名称，前端静态路由表文件中每个路由写明该路由需要的权限，再创建路由
  2. 前端创建完整路由表，后端返回权限名称，路由表文件设置 meta，写明是否需要权限，以及权限名称
*/
