// 导航守卫
import router from ".";
import { useUserStore } from "@/store/auth";

router.beforeEach((to) => {
    const userStore = useUserStore()
    const isLogin = userStore.token
    if (!isLogin) {
        // 未登录
        if (to.path !== "/login") {
            return { path: "/login" }
        }
    } else {
        // 已登录但仍想访问首页
        if (to.path === "/login") {
            return { path: "/" }
        }
    }
})