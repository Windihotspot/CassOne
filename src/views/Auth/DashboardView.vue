<script setup>
import { computed, ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import UserHeader from '@/components/Layouts/UserHeader.vue'
import DashboardService from '@/services/Dashboard/dashboard'
import AppToast from '@/components/Ui/AppToast.vue'
import { ElMessageBox } from 'element-plus'
const authStore = useAuthStore()
const router = useRouter()

// Toast state
const toastMessage = ref('')
const toastType = ref('error')
const showToast = ref(false)

const triggerToast = (message, type = 'error') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true

  // Auto-hide after 4 seconds
  setTimeout(() => (showToast.value = false), 4000)
}

// Safe computed name
const firstName = computed(() => {
  return authStore.user?.first_name || 'User'
})

// State
const loading = ref(false)
const dashboard = ref(null)

// Generate ISO strings for start and end dates
const getISODateRange = () => {
  const start = new Date()
  start.setMonth(start.getMonth() - 12) // 1 year ago
  const end = new Date() // today
  return {
    start_date: start.toISOString(),
    end_date: end.toISOString()
  }
}

// Fetch dashboard data
const fetchDashboard = async () => {
  loading.value = true
  try {
    const { start_date, end_date } = getISODateRange()
    // Log payload
    const payload = { start_date, end_date }
    console.log('Dashboard request payload:', payload)

    const res = await DashboardService.getDashboardData(payload)
    console.log('dashboard data:', res)
    dashboard.value = {
      active_loan: res.data?.active_loan ?? null,
      loan_balance: res.data?.loan_balance ?? 0,
      next_repayment_amount: res.data?.next_repayment_amount ?? 0,
      total_repaid_amount: res.data?.total_repaid_amount ?? 0,
      loan_history: res.data?.loan_history ?? []
    }
    console.log("active loan:", res.data.active_loan)
  } catch (error) {
    console.error('Dashboard error:', error)
    const errMsg = error?.response?.data?.message || 'Failed to load dashboard.'
    console.error('Dashboard error:', errMsg)

    // Trigger toast
    triggerToast(errMsg, 'error')
  } finally {
    loading.value = false
  }
}

const trackerSteps = [
  { key: 'submitted', label: 'Submitted' },
  { key: 'under_review', label: 'Under review' },
  { key: 'approved', label: 'Approved' },
  { key: 'disbursed', label: 'Disbursed' }
]

const currentTrackerStep = computed(() => {
  if (!activeLoan.value?.tracker_status) return 0

  return trackerSteps.findIndex((step) => step.key === activeLoan.value.tracker_status)
})
onMounted(fetchDashboard)

// Computed helpers
const loanBalance = computed(() =>
  dashboard.value ? `₦${dashboard.value.loan_balance.toLocaleString()}` : '₦0'
)

const nextRepayment = computed(() =>
  dashboard.value ? `₦${dashboard.value.next_repayment_amount.toLocaleString()}` : '₦0'
)

const totalRepaid = computed(() =>
  dashboard.value ? `₦${Number(dashboard.value.total_repaid_amount).toLocaleString()}` : '₦0'
)

const activeLoan = computed(() => dashboard.value?.active_loan)

const loanHistory = computed(() => dashboard.value?.loan_history || [])

const hasLoanHistory = computed(() => {
  return loanHistory.value.length > 0
})

const showLoanDetails = ref(false)
const deletingLoan = ref(false)
const handleDeleteLoan = async () => {
  try {
    await ElMessageBox.confirm(
      'Are you sure you want to delete this loan application?',
      'Delete Confirmation',
      {
        confirmButtonText: 'Yes, Delete',
        cancelButtonText: 'Cancel',
        type: 'warning',
        confirmButtonClass: 'el-button--danger'
      }
    )

    if (!activeLoan.value?.id) {
      triggerToast('No loan found to delete', 'error')
      return
    }

    deletingLoan.value = true // ✅ START LOADING

    console.log('Deleting loan ID:', activeLoan.value.id)

    await DashboardService.deleteLoan(activeLoan.value.id)

    dashboard.value.active_loan = null

    triggerToast('Loan application deleted successfully', 'success')

    await fetchDashboard()

  } catch (err) {
    console.log('error:', err)
    if (err !== 'cancel') {
      const errMsg =
        err?.response?.data?.data.message || 'Failed to delete loan application'
      triggerToast(errMsg, 'error')
    }
  } finally {
    deletingLoan.value = false // ✅ STOP LOADING
  }
}
const loadingLoanApplication = ref(false)

const showCompleteApplicationButton = computed(() => {
  return (activeLoan.value?.loan_application_page || 0) < 5
})



const handleCompleteApplication = async () => {
  if (!activeLoan.value?.id) {
    triggerToast('No active loan found', 'error')
    return
  }

  loadingLoanApplication.value = true

  try {
    const loanId = activeLoan.value.id
    const applicationPage = activeLoan.value.loan_application_page || 1

    console.log('Resuming loan application:', loanId, 'Page:', applicationPage)

    const res = await DashboardService.getLoanApplicationPage(
      loanId,
      applicationPage
    )
     console.log('Fetched loan application data:', res)
   

    // ✅ Route mapping
    const routeMap = {
      2: '/business-info',
      3: '/file-upload',
      4: '/selfie',
      5: '/disburse'
    }

    const nextRoute = routeMap[applicationPage]

    if (nextRoute) {
        router.push({
    path: nextRoute,
    query: { loan_id: loanId } // ✅ IMPORTANT
  })
    } else {
      // fallback (e.g. page 1 or unknown)
       router.push({
    path: '/apply-loan',
    query: { loan_id: loanId }
  })
    }

  } catch (error) {
    console.log(error)
    const errMsg =
      error?.response?.data?.message || 'Failed to load loan application'
    triggerToast(errMsg, 'error')
  } finally {
    loadingLoanApplication.value = false
  }
}

</script>

<template>
  <UserHeader />

  <!-- Toast -->
  <AppToast
    :show="showToast"
    :message="toastMessage"
    :type="toastType"
    @close="showToast = false"
  />

  <!-- New application -->
  <section class="mx-auto bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600">
    <div class="px-6 mx-auto py-10 flex flex-col md:flex-row md:items-center md:justify-between">
      <!-- Left Content -->
      <div>
        <h1 class="text-xl md:text-3xl font-semibold text-white">Welcome back, {{ firstName }}!</h1>
        <p class="mt-2 text-purple-100 text-sm md:text-base">
          Manage your loans and track repayments
        </p>
      </div>

      <!-- Right Button -->
      <div class="mt-6 md:mt-0">
        <v-btn
          to="apply-loan"
          size="medium"
          color="pink"
          elevation="0"
          class="!text-white !rounded-md !px-6 !py-4 font-medium"
        >
          <v-icon start size="18">mdi-plus</v-icon>
          New Loan Application
        </v-btn>
      </div>
    </div>
  </section>

  <section class="bg-[#FAFAFA] p-6 w-full">
    <!-- LOADING SKELETON -->
    <div v-if="loading" class="mx-auto space-y-8">
      <!-- Stats Cards Skeleton -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <v-skeleton-loader type="card" height="100" />
        <v-skeleton-loader type="card" height="100" />
        <v-skeleton-loader type="card" height="100" />
      </div>

      <!-- Active Loan Skeleton -->
      <v-card class="rounded-lg p-6">
        <v-skeleton-loader type="heading" width="200" class="mb-6" />
        <v-skeleton-loader type="text" width="60%" />
        <v-skeleton-loader type="text" width="40%" />
        <v-skeleton-loader type="text" width="30%" />
      </v-card>

      <!-- Loan History Skeleton -->
      <v-card class="rounded-lg p-6">
        <v-skeleton-loader type="heading" width="200" class="mb-6" />

        <div class="space-y-4">
          <v-skeleton-loader type="list-item-two-line" />
          <v-skeleton-loader type="list-item-two-line" />
          <v-skeleton-loader type="list-item-two-line" />
        </div>
      </v-card>
    </div>

    <div v-else>
      <!-- TOP STATS CARDS -->
      <div class="mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Loan Balance -->

        <div class="p-6 rounded-lg bg-white border">
          <p class="text-gray-500 text-sm">Loan Balance</p>
          <p class="text-lg font-bold mt-4">{{ loanBalance }}</p>
        </div>

        <div class="p-6 rounded-lg bg-white border">
          <p class="text-gray-500 text-sm">Next Repayment amount</p>
          <p class="text-lg font-bold mt-4">{{ nextRepayment }}</p>
        </div>

        <div class="p-6 rounded-lg bg-white border">
          <p class="text-gray-500 text-sm">Total Amount Repaid</p>
          <p class="text-lg font-bold mt-4">{{ totalRepaid }}</p>
        </div>
      </div>

      <!-- ACTIVE LOANS empty state -->

      <div v-if="!activeLoan" class="mx-auto mt-8">
        <v-card class="rounded-lg">
          <v-card-text>
            <h3 class="text-lg font-semibold m-2">Active Loans</h3>

            <div class="flex flex-col items-center justify-center py-16 text-center text-gray-500">
              <img class="w-45 h-40" src="/src/assets/images/nodata.jpg" alt="" />
              <p class="text-sm">No active loans</p>
            </div>
          </v-card-text>
        </v-card>
      </div>

      <!-- Active loans data -->
      <div v-else class="mx-auto mt-8">
        <div class="bg-white rounded-lg p-6 border">
       <!-- Header -->
<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
  
  <!-- Title -->
  <h3 class="text-lg font-semibold text-gray-900">
    Active Loan
  </h3>

  <!-- Actions -->
  <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
    
    <button
      @click="showLoanDetails = true"
      class="w-full sm:w-auto bg-purple-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-purple-700 transition"
    >
      View details
    </button>

    <div class="flex gap-6">
      <v-btn
  v-if="showCompleteApplicationButton"
  @click="handleCompleteApplication"
  :loading="loadingLoanApplication"
  :disabled="loadingLoanApplication"
  color="green"
  class="!text-white !rounded-md !px-4 !py-2 !capitalize"
>
  Complete Application
</v-btn>
      <v-btn
  @click="handleDeleteLoan"
  :loading="deletingLoan"
  :disabled="deletingLoan"
  color="red"
  class="!text-white !rounded-md !px-4 !py-2 !capitalize"
>
  Delete application
</v-btn>
    </div>
    

  </div>
</div>

          <!-- Loan Info Row -->
          <div class="flex flex-col md:flex-row md:items-start md:justify-between">
            <!-- Left Side -->
            <div>
              <div class="flex items-center gap-4">
                <h4 class="font-semibold text-sm text-gray-900">
                  {{ activeLoan?.loan_type.replace('_', ' ').toUpperCase() }}
                </h4>

                <!-- Status Badge -->
                <span
                  :class="{
                    'bg-yellow-400 text-white': activeLoan?.loan_status === 'pending',
                    'bg-green-400 text-white': activeLoan?.loan_status === 'approved',
                    'bg-gray-200 text-white': activeLoan?.loan_status === 'draft'
                  }"
                  class="text-xs font-medium px-3 py-1 rounded-full"
                >
                  {{ activeLoan?.loan_status }}
                </span>
              </div>

              <p class="text-sm text-gray-500 mt-2">
                Applied on {{ new Date(activeLoan?.created_at).toDateString() }}
              </p>

              <p class="text-sm text-gray-500 mt-1">
                Bank: {{ activeLoan?.bank_name }} ({{ activeLoan?.bank_account_number }})
              </p>
            </div>

            <!-- Right Side -->
            <div class="mt-6 md:mt-0 md:text-right">
              <h2 class="text-lg font-bold text-gray-900">
                ₦{{ Number(activeLoan?.extras?.loan_amount || 0).toLocaleString() }}
              </h2>
              <p class="text-sm text-gray-500 mt-1">{{ activeLoan?.extras?.loan_tenor }} months</p>
            </div>
          </div>

          <!-- Progress Steps -->
          <div class="mt-10 relative max-w-4xl">
            <!-- Background Line -->
            <div class="absolute top-4 left-8 right-8 h-0.5 bg-gray-100"></div>

            <div class="relative flex justify-between items-start">
              <div
                v-for="(step, index) in trackerSteps"
                :key="step.key"
                class="flex flex-col items-center"
              >
                <div
                  :class="[
                    'w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium z-10',
                    index <= currentTrackerStep
                      ? 'bg-green-600 text-white'
                      : 'border bg-white text-gray-600'
                  ]"
                >
                  {{ index + 1 }}
                </div>

                <p class="mt-3 text-sm text-gray-500">
                  {{ step.label }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- LOAN HISTORY empty state-->
      <div v-if="!hasLoanHistory" class="mx-auto mt-8">
        <v-card class="rounded-lg">
          <v-card-text>
            <h3 class="text-lg font-semibold mb-6">Loan History</h3>

            <div class="flex flex-col items-center justify-center py-16 text-center text-gray-500">
              <img class="w-45 h-40" src="/src/assets/images/nodata.jpg" alt="" />
              <p class="text-sm">No loan history</p>
            </div>
          </v-card-text>
        </v-card>
      </div>

      <!-- LOAN HISTORY DATA -->
      <div v-else class="bg-white border rounded-lg mt-8 p-4 mx-auto">
        <h3 class="text-lg font-semibold p-4 mb-8">Loan History</h3>

        <div class="space-y-6">
          <div
            v-for="(event, index) in loanHistory"
            :key="event.loan_id"
            class="flex items-center justify-between"
          >
            <div class="flex items-start gap-4">
              <div
                class="w-8 h-8 flex items-center justify-center rounded-full bg-[#E2E8F0] text-gray-600 text-sm font-medium"
              >
                {{ index + 1 }}
              </div>

              <div>
                <p class="font-semibold text-gray-900">
                  ₦{{ Number(event.loan_amount).toLocaleString() }}
                </p>
                <p class="text-sm text-gray-500 mt-1">
                  {{ new Date(event.requested_at).toDateString() }}
                </p>
              </div>
            </div>

            <span
              class="text-white text-xs font-medium px-4 py-1.5 rounded-full"
              :class="{
                'bg-green-500': event.loan_status === 'closed',
                'bg-yellow-400': event.loan_status === 'pending'
              }"
            >
              {{ event.loan_status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <v-dialog v-model="showLoanDetails" max-width="520">
    <div class="bg-white rounded-lg p-6">
      <!-- Title -->
      <h3 class="text-lg font-semibold mb-6">Loan Details</h3>

      <!-- Loan Summary -->
      <div class="bg-purple-200/60 rounded-lg p-6 grid grid-cols-2 gap-6">
        <div>
          <p class="text-xs text-gray-500">Loan Type</p>
          <p class="text-xs font-semibold">
            {{ activeLoan?.loan_type?.replace('_', ' ') || 'N/A' }}
          </p>
        </div>

        <div>
          <p class="text-xs text-gray-500">Status</p>
          <p class="text-xs font-semibold capitalize">
            {{ activeLoan?.loan_status || 'N/A' }}
          </p>
        </div>

        <div>
          <p class="text-xs text-gray-500">Amount</p>
          <p class="text-xs font-semibold">
            ₦{{
              activeLoan?.extras?.loan_amount
                ? Number(activeLoan.extras.loan_amount).toLocaleString()
                : 'N/A'
            }}
          </p>
        </div>

        <div>
          <p class="text-xs text-gray-500">Tenure</p>
          <p class="text-xs font-semibold">
            {{ activeLoan?.extras?.loan_tenor ? activeLoan.extras.loan_tenor + ' months' : 'N/A' }}
          </p>
        </div>

        <div>
          <p class="text-xs text-gray-500">Bank</p>
          <p class="text-xs font-semibold">
            {{ activeLoan?.bank_name || 'N/A' }}
          </p>
        </div>

        <div>
          <p class="text-xs text-gray-500">Account Number</p>
          <p class="text-xs font-semibold">
            {{ activeLoan?.bank_account_number || 'N/A' }}
          </p>
        </div>

        <div>
          <p class="text-xs text-gray-500">Purpose</p>
          <p class="text-xs font-semibold">
            {{ activeLoan?.purpose || 'N/A' }}
          </p>
        </div>

        <div>
          <p class="text-xs text-gray-500">Applied On</p>
          <p class="text-xs font-semibold">
            {{ activeLoan?.created_at ? new Date(activeLoan.created_at).toDateString() : 'N/A' }}
          </p>
        </div>
      </div>

      <!-- Info -->
      <div class="bg-yellow-100 rounded-md p-4 text-xs text-gray-700 mt-6">
        Transfer the exact amount to the virtual account above. Your payment will be automatically
        confirmed within 5 minutes.
      </div>

      <!-- Actions -->
      <div class="flex justify-between mt-8">
        <v-btn
          variant="outlined"
          class="!border-purple-600 !text-purple-600"
          @click="showLoanDetails = false"
        >
          Cancel
        </v-btn>

        <v-btn
          class="!bg-purple-600 !text-white"
          :disabled="activeLoan?.loan_status !== 'approved'"
        >
          Make Repayment
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<style scoped>
.v-btn {
  text-transform: none;
}
</style>
