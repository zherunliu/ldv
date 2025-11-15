// 导航守卫
import router from '@/router'
import useUserStore from '@/store/auth'

const WHITE_LIST = new Set<string>(['/login'])

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (import.meta.env.DEV) {
    console.log('[guard]', 'to', to, 'from', from, Boolean(userStore.token))
  }
  // const isLogin = userStore.token
  if (!WHITE_LIST.has(to.path) && !userStore.token) {
    // 未登录
    next({ path: '/login' }) // 重定向到登录页面
    return
  }

  if (
    userStore.token &&
    (to.path === '/login' ||
      (to.meta?.needAuth &&
        // 在 @/router/basicRouteMap.ts 中, 使用 RouteMeta 接口扩展 meta 字段的类型
        // 所以这里不再需要使用类型断言
        // 后续如果有新增字段, 可以继续使用 RouteMeta 接口扩展 meta 字段的类型
        !userStore.roles.some((role: string) => to.meta.needAuth?.includes(role))))
  ) {
    if (to.path != '/login') {
      next({ path: from.path })
      return
    }

    next({ path: '/' })
    return
  }

  next()
})
