import { createRouter, createWebHistory } from 'vue-router'
import routes from './basic-route-map'

const router = createRouter({
  history: createWebHistory(import.meta.env.DEV ? '/' : '/ldv/'),
  routes,
})

export default router
