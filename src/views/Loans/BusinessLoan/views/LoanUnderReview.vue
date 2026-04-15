<template>
  <main-layout>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div class="w-full max-w-3xl text-center">
        <!-- ICON -->
        <div class="flex justify-center mb-6">
          <div class="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center">
            <i class="mdi mdi-check text-3xl text-purple-600"></i>
          </div>
        </div>

        <!-- TITLE -->
        <h1 class="text-2xl font-semibold text-gray-800">Application Submitted! 🎉</h1>

        <!-- DESCRIPTION -->
        <p class="mt-2 text-sm text-gray-500 max-w-md mx-auto">
          Your loan application (ID:
          <span class="text-purple-600 font-medium">CM-2026-01024</span>) has been received. Our
          team will review it and you'll get a decision within 60 seconds to 24 hours.
        </p>

        <!-- WHAT HAPPENS NEXT -->
        <div class="mt-8 bg-purple-50 border border-purple-200 rounded-xl p-6 text-left">
          <h2 class="text-xs font-semibold text-purple-700 mb-4 uppercase tracking-wide">
            What happens next?
          </h2>

          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <span class="step">1</span>
              <p class="text-sm text-gray-600">Credit bureau check via BVN & NIN</p>
            </div>

            <div class="flex items-center gap-3">
              <span class="step">2</span>
              <p class="text-sm text-gray-600">Automated risk assessment</p>
            </div>

            <div class="flex items-center gap-3">
              <span class="step">3</span>
              <p class="text-sm text-gray-600">Approval notification sent via SMS & email</p>
            </div>

            <div class="flex items-center gap-3">
              <span class="step">4</span>
              <p class="text-sm text-gray-600">Funds disbursed to your account</p>
            </div>
          </div>
        </div>

        <!-- BUTTON -->
        <button
          @click="goDashboard"
          class="mt-8 w-full py-4 rounded-xl text-white font-medium bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 transition shadow-lg"
        >
          Back to Dashboard
          <i class="mdi mdi-home ml-1"></i>
        </button>
      </div>
    </div>
  </main-layout>
</template>

<script setup>
import MainLayout from '@/components/Layouts/MainLayout.vue'
import DashNavBar from '@/components/Layouts/DashNavBar.vue'
import UserHeader from '@/components/Layouts/UserHeader.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const goDashboard = () => {
  router.push('/dashboard')
}
</script>

<style scoped>
.step {
  @apply w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold text-white;
  background: linear-gradient(135deg, #7c3aed, #ec4899);
}
</style>
