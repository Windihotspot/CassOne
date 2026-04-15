<script setup lang="ts">
import UserHeader from '@/components/Layouts/UserHeader.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// const navigate = () => {
//   router.push('/business-info')
// }
</script>

<template>
  <user-header />
  <div class="min-h-screen bg-gray-50 py-16 px-6">
    <div class="max-w-6xl mx-auto">
      <!-- Page Title -->
      <h1 class="text-center text-2xl font-semibold text-gray-900 mb-12">Apply for a Loan</h1>

      <!-- Cards Grid -->
      <div class="grid md:grid-cols-2 gap-10">
        <!-- Business Loan Card -->
        <div class="bg-white rounded-2xl shadow-sm p-8 flex flex-col">
          <!-- Illustration -->
          <div class="flex justify-center mb-6">
            <img
              src="/src/assets/images/business-loan.png"
              alt="Business Loan"
              class="h-40 object-contain"
            />
          </div>

          <!-- Title -->
          <h2 class="text-lg font-semibold text-gray-900 mb-6">
            Get up to ₦5,000,000.00 business loan
          </h2>

          <!-- Eligibility -->
          <div class="space-y-4 flex-1">
            <h3 class="text-sm font-semibold text-gray-900">Eligibility Criteria</h3>

            <ul class="space-y-3 text-sm text-gray-700">
              <li class="flex items-start gap-3">
                <v-icon size="18" class="text-green-500"> mdi-check-circle </v-icon>
                <span>
                  Your bank statement exists for more than 6 months and proves your business is
                  active
                </span>
              </li>

              <li class="flex items-center gap-3">
                <v-icon size="18" class="text-green-500"> mdi-check-circle </v-icon>
                <span>You have a physical store</span>
              </li>

              <li class="flex items-center gap-3">
                <v-icon size="18" class="text-green-500"> mdi-check-circle </v-icon>
                <span>Pass credit bureau check</span>
              </li>
            </ul>
          </div>

          <!-- Button -->
          <v-btn to="/business-loan" class="mt-8 !bg-purple-600 !text-white !rounded-lg !capitalize" size="large" block>
            Apply for business loan
          </v-btn>
        </div>

        <!-- Salary Loan Card -->
        <div class="bg-white rounded-2xl shadow-sm p-8 flex flex-col">
          <!-- Illustration -->
          <div class="flex justify-center mb-6">
            <img
              src="/src/assets/images/salary-loan.png"
              alt="Salary Loan"
              class="h-40 object-contain"
            />
          </div>

          <!-- Title -->
          <h2 class="text-lg font-semibold text-gray-900 mb-6">
            Need a Salary loan of at least ₦50,000.00?
          </h2>

          <!-- Eligibility -->
          <div class="space-y-4 flex-1">
            <h3 class="text-sm font-semibold text-gray-900">Eligibility Criteria</h3>

            <ul class="space-y-3 text-sm text-gray-700">
              <li class="flex items-start gap-3">
                <v-icon size="18" class="text-green-500"> mdi-check-circle </v-icon>
                <span>
                  Your bank statement exists for more than 6 months and proves your business is
                  active
                </span>
              </li>

              <li class="flex items-center gap-3">
                <v-icon size="18" class="text-green-500"> mdi-check-circle </v-icon>
                <span>You are in active employment</span>
              </li>

              <li class="flex items-center gap-3">
                <v-icon size="18" class="text-green-500"> mdi-check-circle </v-icon>
                <span>Pass credit bureau check</span>
              </li>
            </ul>
          </div>

          <!-- Button -->
          <v-btn class="mt-8 !bg-purple-600 !text-white !rounded-lg !capitalize" size="large" block>
            Apply for salary loan
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-btn {
  text-transform: none;
}
</style>
