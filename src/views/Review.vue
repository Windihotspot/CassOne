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
      <LoanStepper1 :currentStep="6" :steps="steps" />
      <!-- HEADER -->

      <!-- DETAILS -->
      <div class="bg-white rounded-2xl mt-6 p-6 shadow-sm space-y-6">
        <div class="mb-6">
          <h1 class="text-md font-bold text-[#1f1b3a]">Review & Submit</h1>
          <p class="text-xs text-gray-500 mt-1">
            Please review your application carefully before submitting.
          </p>
        </div>

        <!-- SUMMARY BAR -->
        <div
          class="rounded-2xl p-6 text-white flex justify-between items-center bg-gradient-to-r from-purple-600 to-pink-500"
        >
          <div>
            <p class="text-xs opacity-80">Loan Amount</p>
            <p class="text-lg font-semibold">₦</p>
          </div>

          <div>
            <p class="text-xs opacity-80">Tenor</p>
            <p class="text-lg font-semibold">months</p>
          </div>

          <div>
            <p class="text-xs opacity-80">Monthly Repayment</p>
            <p class="text-lg font-semibold">≈ ₦</p>
          </div>

          <div>
            <p class="text-xs opacity-80">Total Repayable</p>
            <p class="text-lg font-semibold">≈ ₦</p>
          </div>
        </div>
        <!-- LOAN DETAILS -->
        <div>
          <h3 class="section-title">LOAN DETAILS</h3>

          <div class="row">
            <span>Purpose</span>
            <strong></strong>
          </div>

          <div class="row">
            <span>Interest Rate</span>
            <strong></strong>
          </div>

          <div class="row">
            <span>Processing Fee</span>
            <strong></strong>
          </div>
        </div>

        <!-- EMPLOYMENT -->
        <div>
          <h3 class="section-title">EMPLOYMENT</h3>

          <div class="row">
            <span>Status</span>
            <strong></strong>
          </div>

          <div class="row">
            <span>Employer</span>
            <strong></strong>
          </div>

          <div class="row">
            <span>Monthly Income</span>
            <strong>₦</strong>
          </div>
        </div>

        <!-- BANK DETAILS -->
        <div>
          <h3 class="section-title">BANK DETAILS</h3>

          <div class="row">
            <span>Bank</span>
            <strong></strong>
          </div>

          <div class="row">
            <span>Account Number</span>
            <strong>••••••</strong>
          </div>

          <div class="row">
            <span>Disbursement</span>
            <strong></strong>
          </div>
        </div>

        <!-- AGREEMENT -->
        <div class="bg-gray-100 rounded-lg p-4 flex items-start gap-3 text-sm">
          <input type="checkbox" v-model="agreed" class="mt-1" />

          <p class="text-gray-600">
            I confirm that all information provided is accurate and I agree to the
            <span class="text-purple-600 font-medium cursor-pointer">Loan Agreement Terms</span>,
            <span class="text-purple-600 font-medium cursor-pointer">Privacy Policy</span>, and
            authorise Credmate to conduct a credit check via my BVN and NIN.
          </p>
        </div>

        <!-- ACTIONS -->
        <div class="flex items-center justify-between pt-2">
          <button
            @click="goBack"
            class="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
          >
            ← Back
          </button>

          <button
            @click="router.push('/under-review')"
            :disabled="!agreed"
            class="px-8 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-purple-600 to-pink-500 transition"
            :class="!agreed && 'opacity-50 cursor-not-allowed'"
          >
            Submit Application 🚀
          </button>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import MainLayout from '@/components/Layouts/MainLayout.vue'
import LoanStepper1 from '@/components/Loans/LoanStepper1.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const steps = [
  'Loan Details',
  'Employment',
  'File Upload',
  'Selfie Verification',
  'Bank Details',
  'Review & Submit'
]

// MOCK DATA (replace with Pinia / API later)
const amount = ref(2250000)
const tenure = ref(6)
const purpose = ref('Home Improvement')

const employment = ref({
  status: 'Employed (Part-time)',
  employer: 'fghge',
  income: 1231313131
})

const bank = ref({
  bank: 'GTBank',
  accountNumber: '1234561111',
  method: 'bank'
})

const agreed = ref(false)

// calculations
const monthly = computed(() => {
  const rate = 0.045
  return (amount.value + amount.value * rate * tenure.value) / tenure.value
})

const total = computed(() => monthly.value * tenure.value)

const formatMoney = (val) => {
  return Number(val).toLocaleString()
}

const goBack = () => window.history.back()
</script>

<style scoped>
.section-title {
  @apply text-xs font-semibold text-gray-400 mb-3 tracking-wide;
}

.row {
  @apply flex justify-between py-3 border-b last:border-none text-sm text-gray-600;
}

.row strong {
  @apply text-gray-800 font-medium;
}
</style>
