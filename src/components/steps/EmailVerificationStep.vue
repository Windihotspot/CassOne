<template>
  <div class="bg-[#F9FAFB80] flex flex-col items-center justify-center px-4">
    <!-- Card Wrapper -->
    <div class="w-full max-w-xl text-center">
      <!-- Icon -->
      <div class="flex justify-center mb-6">
        <div
          class="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center shadow-sm"
        >
          <v-icon size="28" color="purple-darken-1"> mdi-email-outline </v-icon>
        </div>
      </div>

      <!-- Title -->
      <h1 class="text-2xl font-semibold text-gray-800 mb-3">Check your email</h1>

      <!-- Subtitle -->
      <p class="text-gray-500 mb-8 leading-relaxed">
        Please check your email, a code has been sent to your email address
        <span class="text-red-500 font-medium"> {{ authStore.registeredEmail }}</span>
      </p>

      <!-- Code Input -->
      <div class="mb-10">
        <v-text-field
          v-model="code"
          placeholder="Enter Code"
          variant="outlined"
          density="comfortable"
          hide-details
          class="rounded-xl"
        />
      </div>

      <!-- Buttons -->
      <div class="mt-10 flex justify-between gap-4">
        <button
          @click="$emit('back')"
          class="border border-purple text-gray-700 px-8 py-3 rounded-lg font-semibold"
        >
          Back
        </button>
        <v-btn
          @click="handleSubmit"
          :loading="loading"
          :disabled="loading"
          color="#5C2ECD"
          size="large"
          rounded="lg"
          class="max-w-md"
        >
          Save and Continue
        </v-btn>
      </div>

      <!-- Resend -->
      <div class="text-sm mt-8">
        <span class="text-gray-500">Didn’t receive the code?</span>
        <button
          @click="handleResend"
          :disabled="resendLoading || countdown > 0"
          class="text-purple-600 font-medium ml-1 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ countdown > 0 ? `Resend in ${countdown}s` : 'Click to resend' }}
        </button>
      </div>
    </div>
  </div>

  <v-dialog v-model="showSuccess" max-width="500">
    <v-card class="pa-6 text-center items-center justify-center mx-auto rounded-md">
      <v-icon size="50" color="green" class="mb-4"> mdi-check-circle </v-icon>

      <h2 class="text-xl font-semibold mb-2">Email Verified Successfully 🎉</h2>

      <p class="text-gray-500 mb-4">Your account has been verified. Redirecting to login...</p>

      <v-progress-linear indeterminate color="green" height="4" rounded />
    </v-card>
  </v-dialog>
</template>

<script setup>
import { onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import confetti from 'canvas-confetti'
import AppToast from '@/components/Ui/AppToast.vue'
import { ElNotification } from 'element-plus'

const resendLoading = ref(false)
const countdown = ref(0)
let countdownTimer = ref(null)

const authStore = useAuthStore()
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const showSuccess = ref(false)
const code = ref('')

const loading = ref(false)

const emit = defineEmits(['submit', 'back'])

const fireConfetti = () => {
  const duration = 2 * 1000
  const end = Date.now() + duration

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    })
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }

  frame()
}

const handleResend = async () => {
  if (countdown.value > 0) return

  resendLoading.value = true

  const res = await authStore.sendVerification(true)

  if (res.success) {
    ElNotification({
      message: res.message,
      type: 'success'
    })

    // ✅ start 60s cooldown
    countdown.value = 60
    countdownTimer.value = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(countdownTimer)
      }
    }, 1000)
  } else {
    ElNotification({
      title: 'Error',
      message: res.message,
      type: 'error'
    })
  }

  resendLoading.value = false
}

const handleSubmit = async () => {
  loading.value = true
  try {
    await authStore.verifyEmail(code.value)

    showSuccess.value = true
    fireConfetti() // 🎉 FIRE HERE

    // Redirect after 5 seconds
    setTimeout(() => {
      showSuccess.value = false
      router.push('/login')
    }, 5000)
  } catch (error) {
    console.log(error.response.data.message)
    const message =
      error?.response?.data?.data?.message ||
      error?.response?.data?.message ||
      'Verification failed. Please try again.'

    ElNotification({
      message,
      type: 'error',
      duration: 6000
    })
  } finally {
    loading.value = false
  }
}

const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('error')

let toastTimer = null

const triggerToast = (message, type = 'error') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true

  clearTimeout(toastTimer)

  toastTimer = setTimeout(() => {
    showToast.value = false
  }, 4000)
}

onUnmounted(() => {
  if (countdownTimer.value) clearInterval(countdownTimer)
})
</script>

<style scoped>
.v-btn {
  text-transform: none;
}
</style>
