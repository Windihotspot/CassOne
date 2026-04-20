import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Auth/Dashboard.vue'
import Clients from '@/views/Clients/Clients.vue'
import RiskAssessment from '@/views/Risk/RiskAssessment.vue'

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
    },
    {
      path: '/risk',
      name: 'risk',
      component: RiskAssessment
    }
  ]
})

export default router
