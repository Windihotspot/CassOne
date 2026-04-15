<template>
  <MainLayout>
    <div class="p-6 space-y-6 min-h-screen">
      <!-- HEADER -->
      <div>
        <h1 class="text-xl font-bold text-gray-800">Loan Repayments</h1>
        <p class="text-xs text-gray-500">
          Track your repayment schedule, clear outstanding balances, and avoid late payment
          penalties.
        </p>
      </div>

      <!-- ALERT -->
      <div class="flex items-center justify-between bg-red-700 text-white rounded-lg p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 flex items-center justify-center bg-red-600 rounded-full">
            <i class="mdi mdi-alert-outline text-xl"></i>
          </div>
          <div>
            <p class="font-semibold">You have 1 defaulted payment on your account</p>
            <p class="text-sm opacity-90">
              Instalment 2 (Feb 15, 2026) is 42 days overdue. A late fee of ₦8,500 has been applied.
            </p>
          </div>
        </div>
        <button
          @click="openPayment(93500)"
          class="bg-white text-red-700 px-4 py-2 rounded-lg font-semibold"
        >
          Pay Now
        </button>
      </div>

      <!-- STATS -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- TOTAL -->
        <div class="bg-white p-5 rounded-xl shadow-sm relative">
          <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-3">
            <i class="mdi mdi-currency-ngn text-purple-600 text-lg"></i>
          </div>

          <p class="text-xs text-gray-500 mb-1">Total Loan Amount</p>
          <h2 class="text-xl font-bold text-gray-800">₦1,500,000</h2>
          <p class="text-xs text-gray-400 mt-1">Personal loan - Jan 2026</p>
        </div>

        <!-- REPAID -->
        <div class="bg-white p-5 rounded-xl shadow-sm relative">
          <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-3">
            <i class="mdi mdi-check-circle-outline text-green-600 text-lg"></i>
          </div>

          <p class="text-xs text-gray-500 mb-1">Amount Repaid</p>
          <h2 class="text-xl font-bold text-green-600">₦255,000</h2>
          <p class="text-xs text-green-500 mt-1 font-medium">3 of 12 instalments</p>
        </div>

        <!-- OUTSTANDING -->
        <div class="bg-orange-50 p-5 rounded-xl border border-orange-200 relative">
          <div class="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center mb-3">
            <i class="mdi mdi-alert-outline text-orange-600 text-lg"></i>
          </div>

          <p class="text-xs text-gray-500 mb-1">Outstanding Balance</p>
          <h2 class="text-xl font-bold text-orange-600">₦1,253,500</h2>
          <p class="text-xs text-orange-500 mt-1 font-medium">Includes ₦8,500 late fee</p>
        </div>

        <!-- NEXT DUE -->
        <div class="bg-white p-5 rounded-xl shadow-sm relative">
          <div class="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center mb-3">
            <i class="mdi mdi-calendar-month-outline text-pink-600 text-lg"></i>
          </div>

          <p class="text-xs text-gray-500 mb-1">Next Due Date</p>
          <h2 class="text-xl font-bold text-gray-800">Apr 15, 2026</h2>
          <p class="text-xs text-pink-500 mt-1 font-medium">Instalment 4 • ₦85,000</p>
        </div>
      </div>

      <!-- TABS -->
      <div class="flex gap-3">
        <button
          class="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm"
        >
          Personal Loan – Jan 2026 (Active)
        </button>
        <button class="px-4 py-2 rounded-full border text-gray-500 text-sm">
          Emergency Loan – Aug 2025 (Closed)
        </button>
        <button class="px-4 py-2 rounded-full border text-gray-500 text-sm">
          Personal Loan – Jan 2025 (Closed)
        </button>
      </div>

      <!-- TABLE -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="p-4 border-b">
          <h3 class="font-semibold text-gray-700">Repayment Schedule</h3>
          <p class="text-xs text-gray-500">
            Loan ID: CM-2026-00847 • ₦1,500,000 @ 4.5%/month • 12 instalments
          </p>
        </div>

        <table class="w-full text-sm">
          <thead class="bg-purple-50 text-gray-500">
            <tr>
              <th class="p-3 text-left">#</th>
              <th class="p-3 text-left">Due Date</th>
              <th class="p-3 text-left">Principal</th>
              <th class="p-3 text-left">Interest</th>
              <th class="p-3 text-left">Total</th>
              <th class="p-3 text-left">Penalty</th>
              <th class="p-3 text-left">Paid On</th>
              <th class="p-3 text-left">Status</th>
              <th class="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            <!-- ROW -->
            <tr class="border-t">
              <td class="p-3">01</td>
              <td class="p-3">Feb 15, 2026</td>
              <td class="p-3">72,250</td>
              <td class="p-3">12,750</td>
              <td class="p-3 font-semibold">85,000</td>
              <td class="p-3">—</td>
              <td class="p-3 text-green-600">Feb 12, 2026</td>
              <td class="p-3">
                <span class="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">Paid</span>
              </td>
              <td class="p-3">—</td>
            </tr>

            <!-- DEFAULTED -->
            <tr class="border-t bg-red-50">
              <td class="p-3 text-red-600">02</td>
              <td class="p-3">
                Mar 15, 2026
                <p class="text-xs text-red-500">42 days overdue</p>
              </td>
              <td class="p-3">72,250</td>
              <td class="p-3">12,750</td>
              <td class="p-3 font-semibold">85,000</td>
              <td class="p-3 text-red-500">+₦8,500</td>
              <td class="p-3 text-red-500">Not paid</td>
              <td class="p-3">
                <span class="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs"
                  >Defaulted</span
                >
              </td>
              <td class="p-3">
                <button
                  @click="openPayment(93500)"
                  class="bg-red-600 text-white px-3 py-1 rounded-lg text-xs"
                >
                  Pay ₦93,500
                </button>
              </td>
            </tr>

            <!-- PAID LATE -->
            <tr class="border-t">
              <td class="p-3">03</td>
              <td class="p-3">Mar 15, 2026</td>
              <td class="p-3">72,250</td>
              <td class="p-3">12,750</td>
              <td class="p-3 font-semibold">85,000</td>
              <td class="p-3 text-orange-500">+₦4,250</td>
              <td class="p-3 text-orange-500">
                Mar 24, 2026
                <span class="ml-2 bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-xs">
                  9 days late
                </span>
              </td>
              <td class="p-3">
                <span class="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs">
                  Paid Late
                </span>
              </td>
              <td class="p-3">—</td>
            </tr>

            <!-- DUE -->
            <tr class="border-t bg-purple-50">
              <td class="p-3">04</td>
              <td class="p-3">
                Apr 15, 2026
                <p class="text-xs text-purple-500">Due in 17 days</p>
              </td>
              <td class="p-3">72,250</td>
              <td class="p-3">12,750</td>
              <td class="p-3 font-semibold text-purple-600">85,000</td>
              <td class="p-3">—</td>
              <td class="p-3 text-gray-400">Pending</td>
              <td class="p-3">
                <span class="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">
                  Due
                </span>
              </td>
              <td class="p-3">
                <button
                  @click="openPayment(85000)"
                  class="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-1 rounded-lg text-xs"
                >
                  Pay ₦85,000
                </button>
              </td>
            </tr>

            <!-- UPCOMING -->
            <tr class="border-t" v-for="i in 3" :key="i">
              <td class="p-3">0{{ i + 4 }}</td>
              <td class="p-3">May {{ i }}5, 2026</td>
              <td class="p-3">72,250</td>
              <td class="p-3">12,750</td>
              <td class="p-3">85,000</td>
              <td class="p-3">—</td>
              <td class="p-3">—</td>
              <td class="p-3">
                <span class="bg-gray-100 text-gray-500 px-2 py-1 rounded-full text-xs">
                  Upcoming
                </span>
              </td>
              <td class="p-3">—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- =========================
   LATE PAYMENT POLICY
========================= -->
      <div class="bg-white rounded-xl p-5 shadow-sm space-y-4">
        <!-- HEADER -->
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-md bg-orange-100 flex items-center justify-center">
            <i class="mdi mdi-alert-outline text-orange-600"></i>
          </div>
          <h3 class="font-semibold text-gray-800">Late Payment Policy</h3>
        </div>

        <!-- POLICY CARDS -->
        <div class="grid md:grid-cols-3 gap-4">
          <!-- 1-7 DAYS -->
          <div class="bg-gray-100 rounded-md p-4">
            <p class="text-xs text-gray-500 mb-1">1–7 DAYS LATE</p>
            <h4 class="font-bold text-orange-600">0.5% fee</h4>
            <p class="text-xs text-gray-500">of outstanding balance</p>
          </div>

          <!-- 8-30 DAYS -->
          <div class="bg-orange-50 border border-orange-200 rounded-md p-4">
            <p class="text-xs text-orange-500 mb-1">8–30 DAYS LATE</p>
            <h4 class="font-bold text-orange-600">1% fee</h4>
            <p class="text-xs text-orange-500">per 14-day period</p>
          </div>

          <!-- 31+ -->
          <div class="bg-red-50 border border-red-200 rounded-md p-4">
            <p class="text-xs text-red-500 mb-1">31+ DAYS (DEFAULT)</p>
            <h4 class="font-bold text-red-600">2% + CBN report</h4>
            <p class="text-xs text-red-500">Credit bureau flagged</p>
          </div>
        </div>

        <!-- TIP -->
        <div
          class="bg-purple-50 border border-purple-200 rounded-lg p-3 flex items-center gap-2 text-sm text-purple-700"
        >
          <i class="mdi mdi-lightbulb-on-outline"></i>
          <span>
            Tip: Set up Auto-Debit from your GTBank account to never miss a payment. Go to
            <span class="font-medium underline cursor-pointer">Settings → Auto-Debit</span> to
            enable.
          </span>
        </div>
      </div>

      <!-- =========================
   PAYMENT ACTIVITY LOG
========================= -->
      <div class="bg-white rounded-xl p-5 shadow-sm mt-6">
        <!-- HEADER -->
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-semibold text-gray-800">Payment Activity Log</h3>
          <button class="text-sm text-purple-600 font-medium hover:underline">
            Download Statement
          </button>
        </div>

        <!-- LIST -->
        <div class="divide-y">
          <!-- ITEM -->
          <div class="flex justify-between items-start py-4">
            <div class="flex gap-3">
              <span class="w-2.5 h-2.5 mt-2 rounded-full bg-green-500"></span>
              <div>
                <p class="text-sm font-medium text-gray-800">Instalment 1 paid — On time</p>
                <p class="text-xs text-gray-500">
                  Feb 12, 2026 · GTBank debit · Ref: TXN-CM-2026-001A
                </p>
              </div>
            </div>
            <p class="text-green-600 font-semibold">-₦85,000</p>
          </div>

          <!-- ITEM -->
          <div class="flex justify-between items-start py-4">
            <div class="flex gap-3">
              <span class="w-2.5 h-2.5 mt-2 rounded-full bg-orange-500"></span>
              <div>
                <p class="text-sm font-medium text-gray-800">Late penalty applied — Instalment 2</p>
                <p class="text-xs text-gray-500">
                  Mar 29, 2026 · System generated · 42 days overdue
                </p>
              </div>
            </div>
            <p class="text-red-500 font-semibold">+₦8,500</p>
          </div>

          <!-- ITEM -->
          <div class="flex justify-between items-start py-4">
            <div class="flex gap-3">
              <span class="w-2.5 h-2.5 mt-2 rounded-full bg-purple-600"></span>
              <div>
                <p class="text-sm font-medium text-gray-800">Credit bureau notification sent</p>
                <p class="text-xs text-gray-500">
                  Mar 17, 2026 · Credit Bureau · 2 days after default threshold
                </p>
              </div>
            </div>
            <p class="text-gray-500 font-medium">Notice</p>
          </div>

          <!-- ITEM -->
          <div class="flex justify-between items-start py-4">
            <div class="flex gap-3">
              <span class="w-2.5 h-2.5 mt-2 rounded-full bg-orange-500"></span>
              <div>
                <p class="text-sm font-medium text-gray-800">Instalment 3 paid — 9 days late</p>
                <p class="text-xs text-gray-500">
                  Mar 24, 2026 · GTBank debit · Ref: TXN-CM-2026-003B · Late fee included
                </p>
              </div>
            </div>
            <p class="text-green-600 font-semibold">-₦89,250</p>
          </div>

          <!-- ITEM -->
          <div class="flex justify-between items-start py-4">
            <div class="flex gap-3">
              <span class="w-2.5 h-2.5 mt-2 rounded-full bg-green-500"></span>
              <div>
                <p class="text-sm font-medium text-gray-800">Loan disbursed</p>
                <p class="text-xs text-gray-500">
                  Jan 15, 2026 · GTBank ••••4892 · Ref: DISB-CM-2026-00847
                </p>
              </div>
            </div>
            <p class="text-purple-600 font-semibold">+₦1,500,000</p>
          </div>
        </div>
      </div>
    </div>

    <MakePaymentDialog v-model="showPayment" :amount="selectedAmount" />
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/components/Layouts/MainLayout.vue'
import MakePaymentDialog from '@/components/Repayments/MakePaymentDialog.vue'
import { ref } from 'vue'

const showPayment = ref(false)
const selectedAmount = ref(0)

const openPayment = (amount) => {
  selectedAmount.value = amount
  showPayment.value = true
}
</script>
