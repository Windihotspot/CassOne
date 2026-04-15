<template>
  <MainLayout>
    <v-container fluid class="p-6 bg-[#FAFAFA] min-h-screen mt-4">
      <!-- Header -->
      <div
        class="m-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-0"
      >
        <!-- Title and subtitle -->
        <div class="flex flex-col">
          <h1 class="text-xl sm:text-2xl font-semibold text-gray-900">Repayment Tracker</h1>
          <p class="text-gray-500 text-sm sm:text-base">
            Manage your loan repayments and track payment history
          </p>
        </div>

        <!-- Back button -->
        <router-link
          to="/dashboard"
          class="flex items-center text-[#5C2ECD] hover:underline text-sm sm:text-md font-semibold gap-1 mt-2 md:mt-0"
        >
          <v-icon size="20">mdi-arrow-left</v-icon>
          Back to Dashboard
        </router-link>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 m-4 bg-gray">
        <div class="p-6 rounded-lg bg-white border">
          <p class="text-gray-500 text-sm">Pending Payments</p>
          <p class="text-lg font-bold mt-4">0</p>
        </div>
        <div class="p-6 rounded-lg bg-white border">
          <p class="text-gray-500 text-sm">Amount Due</p>
          <p class="text-lg font-bold text-purple-600 mt-4">₦0</p>
        </div>
        <div class="p-6 rounded-lg bg-white border">
          <p class="text-gray-500 text-sm">Amount Repaid</p>
          <p class="text-lg font-bold text-green-600 mt-4">₦0.00</p>
        </div>
        <div class="p-6 rounded-lg bg-white border">
          <p class="text-gray-500 text-sm">Amount Overdue</p>
          <p class="text-lg font-bold text-red-600 mt-4">₦0.00</p>
        </div>
      </div>
      <!-- Tabs -->
      <div class="m-4">
        <div class="flex gap-2 mt-6 mb-6">
          <button
            :class="[
              'px-4 py-2 font-medium transition-all duration-200 rounded-md',
              activeTab === 'upcoming'
                ? 'bg-purple-600 text-white'
                : 'text-gray-500 hover:text-gray-700 border border-gray-300'
            ]"
            @click="activeTab = 'upcoming'"
          >
            Upcoming (0)
          </button>

          <button
            :class="[
              'px-4 py-2 font-medium transition-all duration-200 rounded-md',
              activeTab === 'history'
                ? 'bg-purple-600 text-white'
                : 'text-gray-500 hover:text-gray-700 border border-gray-300'
            ]"
            @click="activeTab = 'history'"
          >
            Payment History
          </button>
        </div>

        <transition name="fade" mode="out-in">
          <div
            :key="activeTab"
            class="p-6 m-4 bg-white border min-h-screen rounded-lg text-center items-center justify-center my-auto mx-auto"
          >
            <div key="upcoming" v-if="activeTab === 'upcoming'">
              <div v-if="installments.length > 0" class="max-w-7xl space-y-10">
                <!-- Header -->
                <div class="flex justify-between items-start">
                  <!-- Left -->
                  <div class="space-y-1">
                    <h3 class="text-base font-semibold text-gray-900">Business Loan</h3>
                    <p class="text-sm text-gray-600"></p>
                  </div>

                  <!-- Right -->
                  <div class="text-right space-y-1">
                    <p class="text-sm font-medium text-gray-900">Payment Account</p>
                    <p class="text-sm text-gray-600"></p>
                  </div>
                </div>

                <!-- Installments -->
                <div class="space-y-6">
                  <div
                    v-for="(item, index) in installments"
                    :key="index"
                    class="flex items-center justify-between"
                  >
                    <!-- Left -->
                    <div class="flex items-center gap-6">
                      <!-- Number -->
                      <div
                        class="w-8 h-8 rounded-full bg-[#E2E8F0] flex items-center justify-center text-xs text-gray-600"
                      >
                        {{ item.sn }}
                      </div>

                      <!-- Info -->
                      <div class="space-y-1">
                        <p class="text-sm font-semibold text-gray-900">
                          {{ item.title }}
                        </p>
                        <p class="text-xs text-gray-500">Due: {{ item.dueDate }}</p>
                      </div>
                    </div>

                    <!-- Amount -->
                    <p class="text-sm font-semibold text-gray-900">
                      ₦{{ item.epected_amount.toLocaleString() }}
                    </p>

                    <!-- Status -->
                    <span class="px-4 py-1 text-xs rounded-full" :class="statusClass(item.status)">
                      {{ item.status }}
                    </span>

                    <!-- Action -->
                    <v-btn
                      @click="openPayment"
                      :disabled="!item.canPay"
                      class="!capitalize !rounded-lg px-6"
                      :class="
                        item.canPay ? '!bg-purple-600 !text-white' : '!bg-[#E2E8F0] !text-gray-600'
                      "
                    >
                      Pay Now
                    </v-btn>
                  </div>
                </div>

                <!-- Footer Action -->
                <div class="justify-start flex">
                  <v-btn class="!bg-purple-600 !text-white !capitalize px-8 rounded-md">
                    Liquidate Loan
                  </v-btn>
                </div>
              </div>

              <!-- Empty state -->
              <div
                v-else
                class="flex flex-col items-center justify-center py-16 text-center text-gray-500"
              >
                <img
                  class="w-45 h-40"
                  src="/src/assets/images/noloan.jpg"
                  alt="No upcoming loans"
                />
                <p class="text-sm mt-4">No upcoming payments</p>
              </div>
            </div>

            <div key="history" v-else>
              <div
                class="flex flex-col items-center justify-center py-16 text-center text-gray-500"
              >
                <img class="w-45 h-40" src="/src/assets/images/noloan.jpg" alt="" />
                <p class="text-sm">No payment history</p>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <PaymentDialog
        v-model="showPayment"
        bank="Wema Bank"
        accountNumber="0052025975"
        accountName="Credmate/Williams Adeyemi"
        :principal="100000"
        :interest="32050"
      />
    </v-container>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PaymentDialog from '@/components/Repayments/PaymentDialog.vue'
import UserHeader from '@/components/Layouts/UserHeader.vue'
import { RepaymentService } from '@/services/Repayment/repayment'
import DashNavBar from '@/components/Layouts/DashNavBar.vue'
import MainLayout from '@/components/Layouts/MainLayout.vue'

const activeTab = ref('upcoming')

const installments = ref([])

const fetchRepayments = async () => {
  try {
    const response = await RepaymentService.getRepaymentSchedule()
    console.log('repayment response:', response)
    installments.value = response
  } catch (err) {
    console.log('Failed to load repayments:', err)
  }
}

const statusClass = (status) => {
  if (status === 'Pending') return 'bg-yellow-100 text-yellow-800'
  if (status === 'Paid') return 'bg-green-100 text-green-700'
  return 'bg-gray-200 text-gray-700'
}

const showPayment = ref(false)

const openPayment = () => {
  showPayment.value = true
}

onMounted(fetchRepayments)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.v-btn {
  text-transform: none;
}
</style>
