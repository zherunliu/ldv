import { createRouter, createWebHistory } from 'vue-router'
import routes from './basicRouteMap'

const router = createRouter({
  history: createWebHistory('/ldv/'),
  routes,
})

export default router
