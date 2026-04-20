import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Auth/Dashboard.vue'
import Clients from '@/views/Clients/Clients.vue'
import RiskAssessment from '@/views/Risk/RiskAssessment.vue'
import Analysis from '@/views/Gap-Analysis/Analysis.vue'

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
    },
    {
      path: '/analysis',
      name: 'analysis',
      component: Analysis
    }
  ]
})

export default router
