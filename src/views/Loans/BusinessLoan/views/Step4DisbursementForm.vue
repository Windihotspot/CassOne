<template>
  <UserHeader />
  <div class="min-h-screen bg-gray-50 py-12 px-6">
    <!-- Title -->
    <h1 class="text-center text-xl font-semibold text-gray-900 mb-6">Business Loan</h1>

    <!-- Stepper -->
    <LoanStepper :modelValue="4" />

    <!-- Main Container -->
    <div class="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm p-16">
      <!-- Alert Notice -->
      <div class="bg-red-100 text-sm text-gray-800 px-6 py-3 rounded mb-10">
        Upon approval, this is the account the loan would be sent to, ensure it is accurate
      </div>

      <!-- Form Grid -->
      <div class="grid md:grid-cols-2 gap-8 max-w-3xl">
        <!-- Bank Name -->
        <div>
          <label class="form-label">Bank Name</label>
          <v-select
            :items="banks"
            placeholder="Select bank"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            v-model="form.bank"
            :error="!!errors.bank"
            :error-messages="errors.bank"
          />
        </div>

        <!-- Account Number -->
        <div>
          <label class="form-label">Account Number</label>
          <v-text-field
            placeholder="Enter account number"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            maxlength="10"
            v-model="form.accountNumber"
            :error="!!errors.accountNumber"
            :error-messages="errors.accountNumber"
          />
        </div>

        <!-- Account Name -->
        <div class="md:col-span-2">
          <label class="form-label">Account Name</label>
          <v-text-field
            placeholder="Enter account name"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            v-model="form.accountName"
            :error="!!errors.accountName"
            :error-messages="errors.accountName"
          />
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex justify-between mt-16 max-w-3xl">
        <v-btn
          variant="outlined"
          class="!border-purple-600 !text-purple-600 !rounded-lg !capitalize px-10"
          @click="goBack"
        >
          Back
        </v-btn>

        <v-btn
          class="!bg-purple-600 !text-white !rounded-lg !capitalize px-20"
          :loading="loading"
          :disabled="loading"
          @click="submitLoan"
        >
          Submit Loan Request
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import LoanStepper from '@/components/Loans/LoanStepper.vue'
import UserHeader from '@/components/Layouts/UserHeader.vue'
import { LoanService } from '@/services/Loan/loanServices'
import { useLoanApplicationStore } from '@/views/Loans/BusinessLoan/stores/loanApplication'
const loanStore = useLoanApplicationStore()
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)

const form = reactive({
  bank: '',
  accountNumber: '',
  accountName: ''
})

// Error messages for each field
const errors = reactive({
  bank: '',
  accountNumber: '',
  accountName: ''
})

const banks = ['Access Bank', 'GTBank', 'First Bank', 'UBA', 'Zenith Bank', 'Wema Bank']

const goBack = () => {
  window.history.back()
}

// Validate fields and submit
const submitLoan = async () => {
  // Clear previous errors
  errors.bank = ''
  errors.accountNumber = ''
  errors.accountName = ''

  // Simple validation
  let hasError = false
  if (!form.bank) {
    errors.bank = 'Bank is required.'
    hasError = true
  }
  if (!form.accountNumber) {
    errors.accountNumber = 'Account number is required.'
    hasError = true
  } else if (form.accountNumber.length !== 10) {
    errors.accountNumber = 'Account number must be 10 digits.'
    hasError = true
  }
  if (!form.accountName) {
    errors.accountName = 'Account name is required.'
    hasError = true
  }

  if (hasError) return

  // Submit to backend
  loading.value = true
  try {
    const payload = {
      bank_name: form.bank,
      account_number: form.accountNumber,
      account_name: form.accountName
    }

    console.log('💳 Submitting Bank Details:', payload)

    await LoanService.submitDisbursement(payload)

    console.log('✅ Bank Details submitted successfully')
    router.push('/under-review')
  } catch (err) {
    console.log('❌ Error submitting bank details:', err)
    // optionally, you could set a general error field to show above the form
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const account = loanStore.previousData?.account_info?.[0]

  if (account) {
    form.bank = account.bank_name
    form.accountNumber = account.bank_account_number
  }
})
</script>
