import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Login from '../views/Auth/Login.vue'
import SignupView from '@/views/Auth/SignupView.vue'
import RepaymentTracker from '@/views/Repayments/RepaymentTracker.vue'
import ApplyLoan from '@/views/Loans/ApplyLoan.vue'
import BusinessLoanForm from '@/views/Loans/BusinessLoan/views/BusinessLoanForm.vue'
import Step1BusinessInfo from '@/views/Loans/BusinessLoan/views/Step1BusinessInfo.vue'
import Step2FileUpload from '@/views/Loans/BusinessLoan/views/Step2FileUpload.vue'
import Step3Selfie from '@/views/Loans/BusinessLoan/views/Step3Selfie.vue'
import Step4DisbursementForm from '@/views/Loans/BusinessLoan/views/Step4DisbursementForm.vue'
import LoanUnderReview from '@/views/Loans/BusinessLoan/views/LoanUnderReview.vue'
import ResetPassword from '@/views/Auth/ResetPassword.vue'
import { useAuthStore } from '@/stores/auth'
import NotFoundView from '@/views/Auth/NotFoundView.vue'
import PasswordReset from '@/views/Auth/PasswordReset.vue'
import Register from '@/views/Auth/Register.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import DashboardView from '@/views/Auth/DashboardView.vue'
import Dashboard from '@/views/Auth/Dashboard.vue'
import Loan from '@/views/Loans/Loan.vue'
import Employment from '@/views/Loans/Employment.vue'
import Bank from '@/views/Loans/Bank.vue'
import Review from '@/views/Review.vue'
import OfferPage from '@/views/Loans/OfferPage.vue'
import Selfie from '@/views/Loans/BusinessLoan/Selfie.vue'
import LoanRepayment from '@/views/Repayments/LoanRepayment.vue'
import Profile from '@/views/Profile/Profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // {
    //   path: '/signin',
    //   name: 'signin',
    //   component: Login
    // },
    {
      path: '/signup',
      name: 'signup',
      component: Register
    },
    {
      path: '/resetpassword',
      name: 'resetpassword',
      component: ResetPassword
    },
    {
      path: '/passwordreset',
      name: 'passwordreset',
      component: PasswordReset
    },
    // {
    //   path: '/dashboard',
    //   name: 'dashboard',
    //   component: DashboardView,
    //   meta: { requiresAuth: true }
    // },
    {
      path: '/repayment',
      name: 'repayment',
      component: LoanRepayment,
      meta: { requiresAuth: true }
    },
    {
      path: '/apply-loan',
      name: 'applyloan',
      component: ApplyLoan,
      meta: { requiresAuth: true }
    },
    {
      path: '/business-loan',
      name: 'business-loan',
      component: BusinessLoanForm,
      meta: { requiresAuth: true }
    },
    {
      path: '/business-info',
      name: 'business-info',
      component: Step1BusinessInfo,
      meta: { requiresAuth: true }
    },
    {
      path: '/file-upload',
      name: 'file-upload',
      component: Step2FileUpload,
      meta: { requiresAuth: true }
    },
    {
      path: '/selfie',
      name: 'selfie',
      component: Selfie,
      meta: { requiresAuth: true }
    },
    {
      path: '/disburse',
      name: 'disburse',
      component: Step4DisbursementForm,
      meta: { requiresAuth: true }
    },
    {
      path: '/under-review',
      name: 'under-review',
      component: LoanUnderReview,
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    },
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: Register
    // },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/loan',
      name: 'loan',
      component: Loan
    },
    {
      path: '/employment',
      name: 'employment',
      component: Employment
    },
    {
      path: '/bank',
      name: 'bank',
      component: Bank
    },
    {
      path: '/review',
      name: 'review',
      component: Review
    },
    {
      path: '/offer',
      name: 'offer',
      component: OfferPage
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  const isAuthenticated = !!authStore.token

  // Only protect routes that require authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login')
  }

  next()
})

export default router
