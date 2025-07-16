import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Home",
        component: () => import("@/layouts/DefaultLayout.vue")
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login.vue")
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/views/NotFound.vue")
    }
]

export default routes;