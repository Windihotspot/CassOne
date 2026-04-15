<template>
  <MainLayout>
    <div class="min-h-screen p-6">
      <!-- HEADER -->
      <div class="mb-6">
        <h1 class="text-md font-bold text-[#1f1b3a]">Apply for a Loan</h1>
        <p class="text-xs text-gray-500 mt-1">
          Complete the steps below to submit your loan application. Decisions in under 60 seconds.
        </p>
      </div>

      <!-- STEPPER -->
      <LoanStepper1 :currentStep="1" :steps="steps" />

      <!-- CARD -->
      <div class="bg-white rounded-2xl mt-6 p-8 shadow-sm">
        <h2 class="text-lg font-semibold text-[#1f1b3a]">Loan Details</h2>
        <p class="text-sm text-gray-500 mb-6">How much do you need and for how long?</p>

        <!-- LOAN AMOUNT -->
        <label class="text-sm font-medium text-gray-600">Loan Amount</label>

        <div class="text-center my-6">
          <span class="text-3xl font-bold text-purple-600"> ₦{{ formatMoney(amount) }} </span>
        </div>

        <input
          type="range"
          min="50000"
          max="5000000"
          step="50000"
          v-model="amount"
          class="w-full loan-range"
        />

        <div class="flex justify-between text-xs text-gray-400 mt-2">
          <span>₦50,000</span>
          <span>₦5,000,000</span>
        </div>

        <!-- TENOR -->
        <div class="mt-8">
          <label class="text-sm font-medium text-gray-600">Loan Tenor</label>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-3">
            <div
              v-for="t in tenures"
              :key="t"
              @click="tenure = t"
              class="border rounded-lg py-3 text-center cursor-pointer text-sm font-medium transition-all"
              :class="
                tenure === t
                  ? 'border-purple-600 text-purple-600 bg-purple-50'
                  : 'border-gray-200 text-gray-500'
              "
            >
              {{ t }} months
            </div>
          </div>
        </div>

        <!-- PURPOSE -->
        <div class="mt-8">
          <label class="text-sm font-medium text-gray-600">Loan Purpose</label>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3">
            <div
              v-for="p in purposes"
              :key="p.label"
              @click="purpose = p.label"
              class="border rounded-md p-4 cursor-pointer flex items-center gap-3 transition-all"
              :class="purpose === p.label ? 'border-purple-600 bg-purple-50' : 'border-gray-200'"
            >
              <!-- ICON -->
              <div
                class="w-8 h-8 flex items-center justify-center rounded-lg"
                :class="purpose === p.label ? 'bg-purple-100' : 'bg-purple-50'"
              >
                <i
                  :class="[
                    'mdi text-lg',
                    p.icon,
                    purpose === p.label ? 'text-purple-600' : 'text-gray-500'
                  ]"
                ></i>
              </div>

              <!-- LABEL -->
              <span class="text-sm font-medium text-gray-700">
                {{ p.label }}
              </span>
            </div>
          </div>
        </div>

        <!-- ESTIMATE -->
        <div
          class="mt-8 bg-purple-50 border border-purple-100 rounded-md p-4 flex justify-between items-center"
        >
          <div>
            <p class="text-xs text-gray-500">Estimated Monthly Repayment</p>
            <p class="text-lg font-bold text-purple-700"></p>
          </div>

          <div class="text-right">
            <p class="text-xs text-gray-500">Interest Rate</p>
            <p class="text-sm font-semibold text-gray-700">7% / month</p>
          </div>
        </div>

        <!-- BUTTON -->
        <button
          @click="submitLoan"
          :disabled="!isValid || loading"
          class="mt-8 w-full py-4 rounded-md text-white font-semibold transition bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading">Processing...</span>
          <span v-else>Continue to Employment Info →</span>
        </button>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import LoanStepper1 from '@/components/Loans/LoanStepper1.vue'
import MainLayout from '@/components/Layouts/MainLayout.vue'
import { useRouter } from 'vue-router'
import { LoanService } from '@/services/Loan/loanServices'

const steps = [
  'Loan Details',
  'Employment',
  'File Upload',
  'Selfie Verification',
  'Bank Details',
  'Review & Submit'
]

const loading = ref(false)
const error = ref(null)
const router = useRouter()

// validation state
const touched = ref(false)

const isValid = computed(() => {
  return amount.value >= 50000 && amount.value <= 5000000 && !!tenure.value && !!purpose.value
})

const amount = ref(500000)
const tenure = ref(3)

const tenures = [3, 6, 9, 12]

const purposes = [
  { label: 'Home Improvement', icon: 'mdi-home-outline' },
  { label: 'Business Capital', icon: 'mdi-briefcase-outline' },
  { label: 'Education', icon: 'mdi-school-outline' },
  { label: 'Bill Payment', icon: 'mdi-receipt-text-outline' },
  { label: 'Medical', icon: 'mdi-hospital-box-outline' },
  { label: 'Personal Use', icon: 'mdi-account-outline' }
]

const purpose = ref('Home Improvement')

const monthly = computed(() => {
  const rate = 0.045
  return (amount.value + amount.value * rate * tenure.value) / tenure.value
})

const formatMoney = (val) => {
  return Number(val).toLocaleString()
}

const submitLoan = async () => {
  touched.value = true

  if (!isValid.value) {
    error.value = 'Please complete all required fields correctly'
    return
  }

  try {
    loading.value = true
    error.value = null

    const payload = {
      loan_amount: amount.value,
      loan_tenor: tenure.value,
      loan_type: 'business',
      purpose: purpose.value
    }
    console.log('🎯 Loan initiated payload:', payload)
    const response = await LoanService.initiateLoan(payload)

    console.log('🎯 Loan initiated:', response.data)

    router.push('/employment')
  } catch (err) {
    console.log('❌ Loan initiation failed:', err)
    error.value = err?.response?.data?.message || 'Something went wrong'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Base */
.loan-range {
  -webkit-appearance: none;
  appearance: none;
  height: 4px; /* 🔥 controls track height */
  border-radius: 9999px;
  background: #e5e7eb; /* gray-200 */
  outline: none;
}

/* Track (Chrome) */
.loan-range::-webkit-slider-runnable-track {
  height: 4px;
  border-radius: 9999px;
}

/* Thumb (Chrome) */
.loan-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #7c3aed;
  border: 2px solid #7c3aed;
  margin-top: -5px; /* 🔥 aligns thumb with thin track */
  cursor: pointer;
}

/* Firefox */
.loan-range::-moz-range-track {
  height: 4px;
  border-radius: 9999px;
  background: #7c3aed;
}

.loan-range::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #7c3aed;
  border: 2px solid #7c3aed;
  cursor: pointer;
}
</style>
