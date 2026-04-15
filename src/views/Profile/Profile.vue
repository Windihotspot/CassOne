<template>
  <MainLayout>
    <div class="bg-[#f6f7ff] min-h-screen p-6 space-y-6">
      <!-- HEADER CARD -->
      <div
        class="rounded-2xl p-6 flex items-center justify-between text-white relative overflow-hidden"
        style="background: linear-gradient(90deg, #6a11cb, #ff2d95)"
      >
        <!-- LEFT -->
        <div class="flex items-center gap-4">
          <div
            class="w-14 h-14 rounded-full bg-white/30 flex items-center justify-center font-bold text-lg"
          >
            CO
          </div>

          <div>
            <h2 class="text-lg font-semibold">Chidi Emmanuel Okonkwo</h2>

            <p class="text-sm opacity-90">[email protected] · 08034567890</p>

            <!-- BADGES -->
            <div class="flex gap-2 mt-2 flex-wrap">
              <span class="bg-yellow-400 text-xs px-3 py-1 rounded-full text-black font-medium">
                ★ Premium Member
              </span>
              <span class="bg-white/20 text-xs px-3 py-1 rounded-full"> ✔ KYC Verified </span>
              <span class="bg-white/20 text-xs px-3 py-1 rounded-full">
                Member since Jan 2024
              </span>
            </div>
          </div>
        </div>

        <!-- BUTTON -->
        <button class="bg-white/20 hover:bg-white/30 transition px-4 py-2 rounded-md text-sm">
          ✎ Edit Profile
        </button>
      </div>

      <!-- STATS -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white rounded-xl p-4 text-center shadow-sm">
          <h3 class="text-xl font-bold text-[#5C2ECD]">742</h3>
          <p class="text-xs text-gray-500">Credit Score</p>
        </div>

        <div class="bg-white rounded-xl p-4 text-center shadow-sm">
          <h3 class="text-xl font-bold text-gray-800">₦2.05M</h3>
          <p class="text-xs text-gray-500">Total Borrowed</p>
        </div>

        <div class="bg-white rounded-xl p-4 text-center shadow-sm">
          <h3 class="text-xl font-bold text-green-500">₦255K</h3>
          <p class="text-xs text-gray-500">Total Repaid</p>
        </div>

        <div class="bg-white rounded-xl p-4 text-center shadow-sm">
          <h3 class="text-xl font-bold text-gray-800">3</h3>
          <p class="text-xs text-gray-500">Loans Taken</p>
        </div>
      </div>

      <!-- PERSONAL INFO -->
      <div class="bg-white rounded-2xl p-6 shadow-sm">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-semibold text-gray-800">Personal Information</h3>
          <button class="text-sm text-[#5C2ECD]">✎ Edit</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 text-sm">
          <div>
            <p class="text-gray-400 text-xs">FIRST NAME</p>
            <p class="font-medium">Chidi</p>
          </div>

          <div>
            <p class="text-gray-400 text-xs">LAST NAME</p>
            <p class="font-medium">Okonkwo</p>
          </div>

          <div>
            <p class="text-gray-400 text-xs">DATE OF BIRTH</p>
            <p class="font-medium">March 14, 1992</p>
          </div>

          <div>
            <p class="text-gray-400 text-xs">GENDER</p>
            <p class="font-medium">Male</p>
          </div>

          <div>
            <p class="text-gray-400 text-xs">PHONE NUMBER</p>
            <p class="font-medium">08034567890</p>
          </div>

          <div>
            <p class="text-gray-400 text-xs">EMAIL ADDRESS</p>
            <p class="font-medium text-blue-600">[email protected]</p>
          </div>

          <div>
            <p class="text-gray-400 text-xs">NIN</p>
            <p class="font-medium">•••••• 4521</p>
          </div>

          <div>
            <p class="text-gray-400 text-xs">BVN</p>
            <p class="font-medium">•••••• 8832</p>
          </div>
        </div>
      </div>

      <!-- ADDRESS -->
      <div class="bg-white rounded-2xl p-6 shadow-sm">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-semibold text-gray-800">Residential Address</h3>
          <button class="text-sm text-[#5C2ECD]">✎ Edit</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 text-sm">
          <div>
            <p class="text-gray-400 text-xs">HOUSE NUMBER</p>
            <p class="font-medium">14B</p>
          </div>

          <div>
            <p class="text-gray-400 text-xs">STREET NAME</p>
            <p class="font-medium">Adeola Odeku Street</p>
          </div>

          <div>
            <p class="text-gray-400 text-xs">STATE</p>
            <p class="font-medium">Lagos</p>
          </div>

          <div>
            <p class="text-gray-400 text-xs">LGA</p>
            <p class="font-medium">Victoria Island</p>
          </div>

          <div>
            <p class="text-gray-400 text-xs">NEAREST BUS STOP</p>
            <p class="font-medium">Lekki Phase 1 Gate</p>
          </div>

          <div>
            <p class="text-gray-400 text-xs">RESIDENCE TYPE</p>
            <p class="font-medium">Rented</p>
          </div>
        </div>
      </div>
    </div>
    <!-- EMPLOYMENT -->
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <div class="flex justify-between items-center mb-4">
        <h3 class="font-semibold text-gray-800">Employment Information</h3>
        <button class="text-sm text-[#5C2ECD]">✎ Edit</button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 text-sm">
        <div>
          <p class="text-gray-400 text-xs">EMPLOYMENT STATUS</p>
          <p class="font-medium">Employed (Full-time)</p>
        </div>

        <div>
          <p class="text-gray-400 text-xs">COMPANY</p>
          <p class="font-medium">Flutterwave Inc.</p>
        </div>

        <div>
          <p class="text-gray-400 text-xs">JOB TITLE</p>
          <p class="font-medium">Senior Product Manager</p>
        </div>

        <div>
          <p class="text-gray-400 text-xs">MONTHLY INCOME</p>
          <p class="font-medium">₦650,000</p>
        </div>

        <div>
          <p class="text-gray-400 text-xs">YEARS OF EMPLOYMENT</p>
          <p class="font-medium">3–5 years</p>
        </div>

        <div>
          <p class="text-gray-400 text-xs">WORK ADDRESS</p>
          <p class="font-medium">Plot 1, Bourdillon Rd, Ikoyi</p>
        </div>
      </div>
    </div>

    <!-- BANK INFO -->
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <div class="flex justify-between items-center mb-4">
        <h3 class="font-semibold text-gray-800">Bank Information</h3>
        <button class="text-sm text-[#5C2ECD]">✎ Edit</button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 text-sm">
        <div>
          <p class="text-gray-400 text-xs">BANK NAME</p>
          <p class="font-medium">GTBank</p>
        </div>

        <div>
          <p class="text-gray-400 text-xs">ACCOUNT NUMBER</p>
          <p class="font-medium">••••••4892</p>
        </div>

        <div>
          <p class="text-gray-400 text-xs">ACCOUNT NAME</p>
          <p class="font-medium">OKONKWO CHIDI EMMANUEL</p>
        </div>

        <div>
          <p class="text-gray-400 text-xs">ACCOUNT TYPE</p>
          <p class="font-medium">Savings</p>
        </div>
      </div>
    </div>

    <!-- DOCUMENTS -->
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <div class="flex justify-between items-center mb-6">
        <h3 class="font-semibold text-gray-800">Documents & KYC</h3>

        <button class="border text-sm px-4 py-2 rounded-md text-[#5C2ECD]">
          + Upload Document
        </button>
      </div>

      <div class="space-y-4">
        <!-- ITEM -->
        <div class="flex items-center justify-between border-b pb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              📄
            </div>

            <div>
              <p class="text-sm font-medium">National ID Card (NIN Slip)</p>
              <p class="text-xs text-gray-400">Uploaded Jan 10, 2024</p>
            </div>
          </div>

          <span class="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
            ✔ Verified
          </span>
        </div>

        <!-- ITEM -->
        <div class="flex items-center justify-between border-b pb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              📄
            </div>

            <div>
              <p class="text-sm font-medium">Bank Statement (Last 6 months)</p>
              <p class="text-xs text-gray-400">Uploaded Jan 10, 2024</p>
            </div>
          </div>

          <span class="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
            ✔ Verified
          </span>
        </div>

        <!-- ITEM -->
        <div class="flex items-center justify-between border-b pb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              🏠
            </div>

            <div>
              <p class="text-sm font-medium">Utility Bill (Proof of Address)</p>
              <p class="text-xs text-gray-400">Uploaded Mar 2, 2026</p>
            </div>
          </div>

          <span class="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
            ✔ Verified
          </span>
        </div>

        <!-- ITEM -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              💼
            </div>

            <div>
              <p class="text-sm font-medium">Employment Letter</p>
              <p class="text-xs text-gray-400">Requested · Not yet uploaded</p>
            </div>
          </div>

          <span class="text-xs bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full">
            ⏳ Pending
          </span>
        </div>
      </div>
    </div>

    <!-- SECURITY -->
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h3 class="font-semibold text-gray-800 mb-6">Security & Privacy</h3>

      <div class="space-y-6">
        <!-- CHANGE PASSWORD -->
        <div class="flex justify-between items-center border-b pb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              🔒
            </div>

            <div>
              <p class="text-sm font-medium">Change Password</p>
              <p class="text-xs text-gray-400">Last changed 3 months ago</p>
            </div>
          </div>

          <button class="text-sm text-[#5C2ECD]">Update →</button>
        </div>

        <!-- 2FA -->
        <div class="flex justify-between items-center border-b pb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              🔐
            </div>

            <div>
              <p class="text-sm font-medium">Two-Factor Authentication</p>
              <p class="text-xs text-gray-400">Protect your account with SMS OTP</p>
            </div>
          </div>

          <el-switch v-model="twoFactor" />
        </div>

        <!-- REMINDERS -->
        <div class="flex justify-between items-center border-b pb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              🔔
            </div>

            <div>
              <p class="text-sm font-medium">Loan Reminders</p>
              <p class="text-xs text-gray-400">SMS and email repayment alerts</p>
            </div>
          </div>

          <el-switch v-model="reminders" />
        </div>

        <!-- CLOSE ACCOUNT -->
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">🗑️</div>

            <div>
              <p class="text-sm font-medium text-red-500">Close Account</p>
              <p class="text-xs text-gray-400">Permanently delete your account and data</p>
            </div>
          </div>

          <button class="border border-red-400 text-red-500 px-4 py-1 rounded-md text-sm">
            Request
          </button>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref } from 'vue'
import MainLayout from '@/components/Layouts/MainLayout.vue'

const twoFactor = ref(true)
const reminders = ref(true)
</script>
