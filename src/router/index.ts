import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Auth/Dashboard.vue'
import Clients from '@/views/Clients/Clients.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/clients',
      name: 'clients',
      component: Clients
    }
  ]
})

export default router
