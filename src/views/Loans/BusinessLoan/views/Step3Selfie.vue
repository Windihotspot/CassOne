<template>
  <UserHeader />
  <div class="min-h-screen bg-gray-50 py-12 px-6">
    <!-- Title -->
    <h1 class="text-center text-xl font-semibold text-gray-900 mb-6">Business Loan</h1>

    <!-- Stepper -->
    <LoanStepper :modelValue="3" />

    <!-- Main Container -->
    <div class="max-w-6xl mx-auto bg-white min-h-screen rounded-2xl shadow-sm p-16">
      <!-- Selfie Preview Area -->
      <div class="flex justify-center">
        <div class="relative">
          <!-- smile id web component -->
          <LivenessCheck
            @uploadStart="loading = true"
            @uploadSuccess="handleSuccess"
            @uploadError="loading = false"
          />
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex justify-between mt-16">
        <v-btn
          variant="outlined"
          class="!border-purple-600 !text-purple-600 !rounded-lg !capitalize px-10"
          @click="goBack"
        >
          Back
        </v-btn>

        <v-btn
          :disabled="!verificationComplete"
          class="!bg-purple-600 !text-white !rounded-lg !capitalize px-20"
          @click="continueStep"
        >
          Continue
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoanStepper from '@/components/Loans/LoanStepper.vue'
import { useRouter } from 'vue-router'
import UserHeader from '@/components/Layouts/UserHeader.vue'
import LivenessCheck from '@/components/Loans/LivenessCheck.vue'

const verificationComplete = ref(false)
const loading = ref(false)

const handleSuccess = () => {
  loading.value = false
  verificationComplete.value = true
}

const router = useRouter()

const goBack = () => {
  window.history.back()
}

const continueStep = () => {
  router.push('/disburse')
  console.log('Proceeding to Step 4')
}
</script>
