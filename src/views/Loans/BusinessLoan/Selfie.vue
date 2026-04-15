<script setup>
import { ref, computed } from 'vue'
import MainLayout from '@/components/Layouts/MainLayout.vue'
import LoanStepper1 from '@/components/Loans/LoanStepper1.vue'
import LivenessCheck from '@/components/Loans/LivenessCheck.vue'
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
const verifying = ref(false)
const goBack = () => {
  window.history.back()
}
const isValid = computed(() => verificationComplete.value)

const verificationComplete = ref(false)
const loading = ref(false)

const handleSuccess = () => {
  loading.value = false
  verificationComplete.value = true

  router.push('/bank')
}
</script>

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
      <LoanStepper1 :currentStep="4" :steps="steps" />

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
            <span v-else-if="verifying">Verifying selfie...</span>
            <span v-else>Submit Selfie →</span>
          </button>
        </div>
      </div>
    </div>
  </MainLayout>
</template>
