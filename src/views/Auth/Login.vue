<template>
  <div class="min-h-screen flex items-center justify-center bg-[#fafafe] px-5 py-10">
    <!-- AUTH CARD -->
    <div
      class="w-full max-w-[520px] bg-white rounded-[40px] p-10 shadow-[0_20px_64px_rgba(92,46,205,0.18)] border border-gray-100"
    >
      <!-- LOGO -->
      <div class="flex justify-center mb-8">
        <img :src="logo" class="w-30 h-20" alt="" />
      </div>

      <!-- TITLE -->
      <h2 class="text-[1.6rem] font-extrabold text-[#1a1535] mb-2 font-[Sora]">Welcome back 👋</h2>
      <p class="text-sm text-[#6e67a0] mb-8 leading-relaxed">
        Sign in to manage your loans and track your credit journey.
      </p>

      <!-- ERROR -->
      <div
        v-if="error"
        class="flex items-center gap-2 text-sm mb-4 p-3 rounded-lg bg-red-50 text-red-700 border border-red-200"
      >
        <span>⚠</span>
        {{ error }}
      </div>

      <!-- EMAIL -->
      <div class="mb-4">
        <label class="text-xs font-semibold text-[#3d3870] mb-1 block">
          Email Address <span class="text-[#ED017F]">*</span>
        </label>
        <input
          v-model="email"
          type="email"
          placeholder="you@example.com"
          class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C2ECD]/20 focus:border-[#5C2ECD]"
        />
      </div>

      <!-- PASSWORD -->
      <div class="mb-2">
        <label class="text-xs font-semibold text-[#3d3870] mb-1 block">
          Password <span class="text-[#ED017F]">*</span>
        </label>

        <div class="relative">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter your password"
            class="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C2ECD]/20 focus:border-[#5C2ECD]"
          />

          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-[#6e67a0] hover:text-[#5C2ECD]"
          >
            👁
          </button>
        </div>
      </div>

      <!-- FORGOT -->
      <div class="text-right mb-5">
        <a href="#" class="text-xs font-semibold text-[#5C2ECD] hover:underline">
          Forgot password?
        </a>
      </div>

      <!-- BUTTON -->
      <button
        @click="handleSignIn"
        class="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-bold shadow-[0_8px_32px_rgba(92,46,205,0.3)] bg-gradient-to-r from-[#5C2ECD] to-[#ED017F] hover:translate-y-[1px] transition disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="authStore.loading || !isFormValid"
      >
        <!-- LOADING STATE -->
        <span v-if="authStore.loading" class="flex items-center gap-2">
          <svg
            class="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          Signing in...
        </span>

        <!-- NORMAL STATE -->
        <span v-else class="flex items-center gap-2">
          Sign In
          <span class="transition group-hover:translate-x-1">➜</span>
        </span>
      </button>

      <!-- DIVIDER -->
      <div class="flex items-center gap-3 my-6">
        <div class="h-[1px] bg-gray-200 flex-1"></div>
        <span class="text-xs text-[#6e67a0]">OR</span>
        <div class="h-[1px] bg-gray-200 flex-1"></div>
      </div>

      <!-- BACK -->
      <button
        class="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-lg text-[#3d3870] font-semibold hover:border-[#5C2ECD] hover:text-[#5C2ECD]"
      >
        ← Back to Home
      </button>

      <!-- FOOTER -->
      <p class="text-center text-xs text-[#6e67a0] mt-6">
        Don't have an account?
        <a class="text-[#5C2ECD] font-semibold hover:underline cursor-pointer">
          Create one free →
        </a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import logo from '@/assets/images/new-logo.jpeg'
import { useRouter } from 'vue-router'
const router = useRouter()

const authStore = useAuthStore()

const isEmailValid = computed(() => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
})

const isPasswordValid = computed(() => {
  return password.value.length >= 6
})

const isFormValid = computed(() => {
  return email.value && password.value && isEmailValid.value && isPasswordValid.value
})

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = computed(() => authStore.loading)
const error = ref('')

const handleSignIn = async () => {
  error.value = ''

  if (!isFormValid.value) {
    error.value = 'Please enter a valid email and password'
    return
  }

  const res = await authStore.login({
    email: email.value,
    password: password.value
  })

  if (!res.success) {
    error.value = res.message || 'Invalid email or password'
    return
  }

  // =========================
  // ROUTING LOGIC (SAME AS OLD PAGE)
  // =========================

  const status = authStore.applicationStatus
  const page = authStore.applicationPage

  if (status === 'verified') {
    router.push('/dashboard')
    return
  }

  if (page === 2) {
    router.push('/signup?step=2')
    return
  }

  if (page === 3) {
    router.push('/signup?step=3')
    return
  }

  // default fallback
  router.push('/signup')
}

watch([email, password], () => {
  error.value = ''
})
</script>
