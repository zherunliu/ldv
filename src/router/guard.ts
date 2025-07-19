// 导航守卫
import router from '.'
import { useUserStore } from '@/store/auth'

router.beforeEach((to) => {
  const userStore = useUserStore()
  const isLogin = userStore.token
  if (!isLogin) {
    // 未登录
    if (to.path !== '/login') {
      return { path: '/login' }
    }
  } else {
    // 已登录但仍想访问首页
    if (to.path === '/login') {
      return { path: '/' }
    }
    if (
      to.meta.needAuth &&
      // 在 @/router/index.ts 中, 使用 RouteMeta 接口扩展 meta 字段的类型
      // 所以这里不再需要使用类型断言了
      // 后续如果有新增字段, 可以继续使用 RouteMeta 接口扩展 meta 字段的类型
      !userStore.roles.some((role: string) => to.meta.needAuth?.includes(role))
    ) {
      // 已登录但无权访问
      return { path: '/' }
    }
  }
})
