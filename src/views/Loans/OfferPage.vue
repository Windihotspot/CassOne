<template>
  <MainLayout>
    <div v-if="!accepted" class="min-h-screen p-6">
      <div class="max-w-full space-y-6">
        <!-- Header -->
        <div>
          <div
            class="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium"
          >
            <span>●</span>
            Conditional Approval — Action Required
          </div>

          <h1 class="text-xl font-bold mt-3">We have an offer for you! 🎉</h1>
          <p class="text-gray-500 text-sm mt-1">
            Your application was reviewed. Based on your credit profile, we can approve a different
            amount from what you requested.
          </p>
        </div>

        <!-- Info Box -->
        <div class="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-sm text-yellow-800">
          <strong>Why is the amount lower?</strong>
          <p class="mt-1">
            Our automated risk model considered your credit bureau score, debt-to-income ratio, and
            repayment history.
          </p>
        </div>

        <!-- Offer Comparison -->
        <div class="grid md:grid-cols-2 gap-4 items-center">
          <!-- Requested -->
          <div class="bg-white rounded-lg border p-6 text-center">
            <p class="text-xs text-gray-400 uppercase">You requested</p>
            <p class="text-xl line-through text-gray-400 mt-2">₦500,000</p>
            <p class="text-xs text-gray-400 mt-1">Original request</p>
          </div>

          <!-- Approved -->
          <div class="bg-purple-50 border-2 border-purple-500 rounded-lg p-6 text-center">
            <p class="text-xs text-purple-500 uppercase font-semibold">Approved offer</p>
            <p class="text-2xl font-bold text-purple-700 mt-2">₦300,000</p>
            <p class="text-xs text-purple-500 mt-1">60% of requested</p>
          </div>
        </div>

        <!-- Loan Details -->
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-white border rounded-md p-4">
            <p class="text-xs text-gray-400">Loan Tenor</p>
            <p class="font-semibold mt-1">6 months</p>
            <p class="text-xs text-gray-400">6 equal instalments</p>
          </div>

          <div class="bg-white border rounded-md p-4">
            <p class="text-xs text-gray-400">Interest Rate</p>
            <p class="font-semibold mt-1">4.5% / month</p>
            <p class="text-xs text-gray-400">Flat rate</p>
          </div>

          <div class="bg-white border rounded-md p-4">
            <p class="text-xs text-gray-400">Monthly Repayment</p>
            <p class="font-semibold mt-1">≈ ₦52,250</p>
            <p class="text-xs text-gray-400">Principal + interest</p>
          </div>

          <div class="bg-white border rounded-md p-4">
            <p class="text-xs text-gray-400">Disbursement</p>
            <p class="font-semibold mt-1">Bank Transfer</p>
            <p class="text-xs text-gray-400">Within 5 minutes</p>
          </div>
        </div>

        <!-- Cost Breakdown -->
        <div class="bg-purple-50 border rounded-md p-5 space-y-3">
          <h2 class="text-sm font-semibold text-gray-500 uppercase">Cost Breakdown</h2>

          <div class="flex justify-between text-sm">
            <span>Approved Loan Amount</span>
            <span>₦300,000</span>
          </div>

          <div class="flex justify-between text-sm">
            <span>Processing Fee (1%)</span>
            <span>₦3,000</span>
          </div>

          <div class="flex justify-between text-sm">
            <span>Amount You Receive</span>
            <span>₦297,000</span>
          </div>

          <div class="flex justify-between text-sm">
            <span>Total Interest</span>
            <span>₦81,000</span>
          </div>

          <div class="border-t pt-3 flex justify-between font-semibold text-purple-700">
            <span>Total Repayable</span>
            <span>₦381,000</span>
          </div>
        </div>

        <!-- Expiry -->
        <div
          class="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg flex justify-between"
        >
          <span>This offer expires in 23:59:47 — act before it lapses</span>
          <span class="font-semibold">23:57:59</span>
        </div>

        <!-- Actions -->
        <div class="flex gap-4 items-center">
          <button
            @click="accepted = true"
            class="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-md font-semibold"
          >
            Accept Offer & Get Funded
          </button>

          <button
            @click="showDecline = true"
            class="border border-gray-300 px-6 py-3 rounded-md text-red-600 border-red-600"
          >
            Decline
          </button>
        </div>

        <!-- Footer -->
        <p class="text-xs text-gray-400 text-center">
          By accepting, you agree to the Loan Agreement and authorise monthly repayment deductions.
        </p>
      </div>
    </div>

    <!-- Offer accepted -->
    <div v-else class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div class="w-full max-w-3xl text-center">
        <!-- SUCCESS ICON -->
        <div class="flex justify-center mb-6">
          <div class="relative w-24 h-24 flex items-center justify-center">
            <div class="absolute inset-0 rounded-full bg-green-100 opacity-40 scale-125"></div>
            <div class="absolute inset-0 rounded-full bg-green-100 opacity-60 scale-110"></div>
            <div
              class="relative w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"
            >
              <i class="mdi mdi-check text-3xl text-green-600"></i>
            </div>
          </div>
        </div>

        <!-- TITLE -->
        <h1 class="text-2xl font-semibold text-gray-800">Offer Accepted! 🚀</h1>

        <!-- DESCRIPTION -->
        <p class="mt-2 text-sm text-gray-500 max-w-md mx-auto">
          Your loan of
          <span class="text-purple-600 font-semibold">₦300,000</span>
          has been approved. Funds are being disbursed to your account right now.
        </p>

        <!-- DISBURSEMENT CARD -->
        <div class="mt-8 flex justify-center">
          <div class="w-full max-w-md bg-green-50 border border-green-200 rounded-xl p-6 text-left">
            <h2 class="text-xs font-semibold text-green-700 mb-4 uppercase tracking-wide">
              Disbursement Details
            </h2>

            <div class="space-y-3 text-sm">
              <div class="flex justify-between text-gray-600">
                <span>Amount to Account</span>
                <span class="font-semibold text-gray-800">₦297,000</span>
              </div>

              <div class="flex justify-between text-gray-600">
                <span>Processing Fee Deducted</span>
                <span class="font-semibold text-gray-800">₦3,000</span>
              </div>

              <div class="flex justify-between text-gray-600">
                <span>Estimated Arrival</span>
                <span class="font-semibold text-green-600">Within 5 minutes</span>
              </div>

              <div class="flex justify-between text-gray-600">
                <span>First Repayment Due</span>
                <span class="font-semibold text-gray-800">May 10, 2026</span>
              </div>
            </div>
          </div>
        </div>

        <!-- BUTTON -->
        <button
          @click="goDashboard"
          class="mt-8 px-10 py-4 rounded-xl text-white font-medium bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 transition shadow-lg"
        >
          Go to Dashboard
          <i class="mdi mdi-home ml-1"></i>
        </button>
      </div>
    </div>

    <!--  -->
    <DeclineDialog v-model="showDecline" reason="Low credit score and high existing obligations." />
  </MainLayout>
</template>

<script setup>
import DeclineDialog from '@/components/Loans/DeclineDialog.vue'
import MainLayout from '@/components/Layouts/MainLayout.vue'
import { ref } from 'vue'

const showDecline = ref(false)
const accepted = ref(false)
</script>
