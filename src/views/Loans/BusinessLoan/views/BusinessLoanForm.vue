<template>
  <user-header />
  <div class="min-h-screen bg-gray-50 py-16 px-6">
    <!-- Page Title -->
    <h1 class="text-center text-xl font-semibold text-gray-900 mb-10">Business Loan</h1>

    <!-- Main Card -->
    <div class="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm p-12">
      <div class="grid md:grid-cols-2 gap-16 items-center">
        <!-- Illustration -->
        <div class="flex justify-center">
          <img
            src="/src/assets/images/business-loan.png"
            alt="Business Loan"
            class="h-80 object-contain"
          />
        </div>

        <!-- Form -->
        <div class="space-y-6">
          <!-- Loan Amount -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              How much do you need?
            </label>

            <v-text-field
              placeholder="enter loan amount"
              variant="outlined"
              density="comfortable"
              hide-details
              v-model="formattedAmount"
              maxlength="10"
            />
          </div>

          <!-- Loan Tenor -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              How long do you need the loan for?
            </label>

            <v-select
              :items="loanTenors"
              item-title="label"
              item-value="value"
              placeholder="select loan tenor"
              variant="outlined"
              density="comfortable"
              hide-details
              v-model="form.tenor"
            />
          </div>

          <!-- Repayment Frequency (optional field from your screenshot duplicate) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"> Reason for loan </label>

            <v-text-field
              placeholder="What is the reason of your loan"
              variant="outlined"
              density="comfortable"
              hide-details
              v-model="form.reason"
            />
          </div>

          <!-- Continue Button -->
          <v-btn
            block
            size="large"
            class="!bg-purple-600 !text-white !rounded-lg !capitalize mt-6 flex items-center justify-center"
            :disabled="!isValid || loading"
            @click="submitForm"
          >
            <span v-if="!loading">Continue</span>
            <v-icon v-else class="mdi-spin">mdi-loading</v-icon>
          </v-btn>

          <!-- <v-btn
            block
            size="large"
            class="!bg-purple-600 !text-white !rounded-lg !capitalize mt-6 flex items-center justify-center"
           to="business-info"
          >
            <span v-if="!loading">Continue</span>
            <v-icon v-else class="mdi-spin">mdi-loading</v-icon>
          </v-btn> -->
        </div>
      </div>
    </div>

    <!-- Toast -->
    <AppToast
      :show="showToast"
      :message="toastMessage"
      :type="toastType"
      @close="showToast = false"
    />
  </div>
</template>

<script setup>
import UserHeader from '@/components/Layouts/UserHeader.vue'
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFormattedFields } from '@/composables/useFormattedFields'
import { LoanService } from '@/services/Loan/loanServices'
import { useLoanApplicationStore } from '@/views/Loans/BusinessLoan/stores/loanApplication'
import AppToast from '@/components/Ui/AppToast.vue'
import { useDropdowns } from '@/composables/useDropdowns'
const { loanTenors, fetchDropdownList } = useDropdowns()

onMounted(() => {
  fetchDropdownList()
})
const router = useRouter()

const form = ref({
  amount: null,
  tenor: null,
  reason: '',
  loan_type: 'business',
  purpose: ''
})

const formattedAmount = useFormattedFields(form, 'amount', { currency: true, max: 2_000_000 })
const tenorOptions = computed(() =>
  tenors.value?.map((t) => ({
    title: `${t} Months`,
    value: t
  }))
)

// Add loading state
const loading = ref(false)

// Computed: form is valid if amount and tenor are filled
const isValid = computed(() => form.value.amount && form.value.tenor && form.value.reason)

const repaymentOptions = ['Weekly', 'Bi-weekly', 'Monthly']

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

const loanStore = useLoanApplicationStore()

const submitForm = async () => {
  if (!isValid.value) {
    triggerToast('Please fill all required fields', 'error')
    return
  }

  loading.value = true // start spinner

  const payload = {
    loan_tenor: form.value.tenor,
    loan_amount: form.value.amount,
    purpose: form.value.reason,
    loan_type: 'business'
  }

  try {
    const res = await LoanService.initiateLoan(payload)
    if (!res?.data) throw new Error('No data returned')

    //loanStore.setLoan(res.data)
    // ✅ ALWAYS go to step 1
    loanStore.setStep(1)
    router.push('/business-info')
  } catch (err) {
    const errMsg = err?.response?.data?.data?.message || err.message || 'Loan initiation failed.'
    triggerToast(errMsg, 'error')
  } finally {
    loading.value = false // stop spinner
  }
}
</script>
