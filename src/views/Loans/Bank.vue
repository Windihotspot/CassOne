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
      <LoanStepper1 :currentStep="5" :steps="steps" />

      <main class="bg-gray-50 flex mt-4">
        <div class="w-full max-w-5xl bg-white rounded-2xl shadow-sm p-8">
          <!-- Header -->
          <div class="mb-6">
            <h2 class="text-xl font-semibold text-gray-800">Bank Details</h2>
            <p class="text-sm text-gray-500 mt-1">
              Funds will be disbursed directly to this account. Ensure details are correct.
            </p>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <!-- Bank Name -->
            <div>
              <label class="label">Bank Name <span>*</span></label>
              <v-select
                color="purple"
                v-model="form.employment_status"
                :items="['GT bank', 'UBA', 'Palmpay']"
                placeholder="Select a bank"
                variant="outlined"
                density="comfortable"
              />
              <p v-if="touched && !form.bank" class="text-red-500 text-xs mt-1">
                Please select a bank
              </p>
            </div>

            <!-- Account Number + Name -->
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="label">Account Number <span>*</span></label>
                <v-text-field
                  v-model="form.accountNumber"
                  type="text"
                  maxlength="10"
                  placeholder="10-digit account number"
                  variant="outlined"
                  color="purple"
                  density="comfortable"
                />
                <p v-if="touched && !isAccountNumberValid" class="text-red-500 text-xs mt-1">
                  Enter a valid 10-digit account number
                </p>
              </div>

              <div>
                <label class="label">Account Name</label>
                <v-text-field
                  v-model="form.accountName"
                  type="text"
                  :placeholder="
                    verifying ? 'Verifying account...' : 'Auto-filled after verification'
                  "
                  disabled
                  variant="outlined"
                  color="purple"
                  density="comfortable"
                />
                <p v-if="touched && !form.accountName" class="text-red-500 text-xs mt-1">
                  Account verification required
                </p>
              </div>
            </div>

            <!-- Info Alert -->
            <div
              class="flex items-start gap-3 p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-sm text-yellow-800"
            >
              <span class="mt-0.5">⚠️</span>
              <p>
                Account name will be verified via NIBSS before submission. Please enter your correct
                account number.
              </p>
            </div>

            <!-- Disbursement Method -->
            <div>
              <label class="label">Preferred Disbursement Method</label>

              <div class="grid md:grid-cols-2 gap-4 mt-2">
                <!-- Bank Transfer -->
                <div
                  @click="form.method = 'bank'"
                  :class="[
                    'p-4 rounded-md border cursor-pointer transition',
                    form.method === 'bank'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-300 hover:bg-gray-50'
                  ]"
                >
                  <div class="flex items-start gap-3">
                    <div
                      class="w-4 h-4 mt-1 rounded-full border flex items-center justify-center"
                      :class="form.method === 'bank' ? 'border-purple-600' : 'border-gray-400'"
                    >
                      <div
                        v-if="form.method === 'bank'"
                        class="w-2 h-2 rounded-full bg-purple-600"
                      ></div>
                    </div>

                    <div>
                      <p class="font-medium text-gray-800">Bank Transfer</p>
                      <p class="text-xs text-gray-500">Instant to account</p>
                    </div>
                  </div>
                </div>

                <!-- Wallet -->
                <div
                  @click="form.method = 'wallet'"
                  :class="[
                    'p-4 rounded-md border cursor-pointer transition',
                    form.method === 'wallet'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-300 hover:bg-gray-50'
                  ]"
                >
                  <div class="flex items-start gap-3">
                    <div
                      class="w-4 h-4 mt-1 rounded-full border flex items-center justify-center"
                      :class="form.method === 'wallet' ? 'border-purple-600' : 'border-gray-400'"
                    >
                      <div
                        v-if="form.method === 'wallet'"
                        class="w-2 h-2 rounded-full bg-purple-600"
                      ></div>
                    </div>

                    <div>
                      <p class="font-medium text-gray-800">Credmate Wallet</p>
                      <p class="text-xs text-gray-500">Withdraw anytime</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-between pt-4">
              <button
                type="button"
                @click="goBack"
                class="flex items-center gap-2 px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition"
              >
                ← Back
              </button>

              <button
                type="submit"
                :disabled="!isValid || loading || verifying"
                class="px-8 py-3 rounded-lg text-white font-medium transition bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="loading">Processing...</span>
                <span v-else-if="verifying">Verifying account...</span>
                <span v-else>Review Application →</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/components/Layouts/MainLayout.vue'
import { reactive, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { LoanService } from '@/services/Loan/loanServices'
import { useLoanApplicationStore } from '@/views/Loans/BusinessLoan/stores/loanApplication'
import LoanStepper1 from '@/components/Loans/LoanStepper1.vue'
const steps = [
  'Loan Details',
  'Employment',
  'File Upload',
  'Selfie Verification',
  'Bank Details',
  'Review & Submit'
]

const router = useRouter()
const loanStore = useLoanApplicationStore()

const loading = ref(false)
const verifying = ref(false)
const error = ref(null)
const touched = ref(false)

const form = reactive({
  bank: '',
  accountNumber: '',
  accountName: ''
  //method: 'bank'
})

const isAccountNumberValid = computed(() => {
  return /^\d{10}$/.test(form.accountNumber)
})

const isValid = computed(() => {
  return !!form.bank && isAccountNumberValid.value && !!form.accountName && !!form.method
})

const verifyAccount = async () => {
  if (!isAccountNumberValid.value || !form.bank) return

  try {
    verifying.value = true
    form.accountName = ''

    // 🔁 Replace with real API later
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // fake success
    form.accountName = 'John Doe'
  } catch (err) {
    form.accountName = ''
    error.value = 'Unable to verify account details'
  } finally {
    verifying.value = false
  }
}

watch(
  () => [form.accountNumber, form.bank],
  () => {
    if (form.accountNumber.length === 10 && form.bank) {
      verifyAccount()
    } else {
      form.accountName = ''
    }
  }
)

const handleSubmit = async () => {
  touched.value = true

  if (!isValid.value) {
    error.value = 'Please complete all required fields correctly'
    return
  }

  try {
    loading.value = true
    error.value = null

    if (!loanStore.loanId) {
      error.value = 'Loan session expired. Please start again.'
      router.push('/')
      return
    }

    const payload = {
      bank_name: form.bank,
      account_number: form.accountNumber,
      account_name: form.accountName
    }

    const response = await LoanService.submitDisbursement(payload)

    console.log('✅ Bank details submitted:', response.data)

    router.push('/review')
  } catch (err) {
    console.error('❌ Bank submission failed:', err)
    error.value = err?.response?.data?.message || 'Something went wrong'
  } finally {
    loading.value = false
  }
}
</script>
<style scoped>
.label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

.label span {
  @apply text-red-500;
}

.input {
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  /* 🔥 FORCE BORDER */
  border: 1px solid #c7c2e0 !important;

  transition: all 0.2s ease;
}

.input:hover {
  @apply border-[#a9a3d1];
}

.input:focus {
  outline: none;
  border: 1px solid #5c2ecd !important;
  box-shadow: 0 0 0 3px rgba(92, 46, 205, 0.15);
}
</style>
