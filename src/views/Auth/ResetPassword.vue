<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
      <div class="flex flex-col items-center text-center">
        <h2 class="text-2xl font-semibold mt-4">Forgot password?</h2>
        <p class="text-gray-500 text-sm mt-1">
          No worries, we'll send you a link to reset your password.
        </p>
      </div>

      <!-- Alert -->
      <transition name="fade">
        <div
          v-if="showAlert"
          :class="[
            'fixed top-6 right-6 px-4 py-3 rounded-md shadow-md text-white z-50',
            alertType === 'success' ? 'bg-green-600' : 'bg-red-600'
          ]"
        >
          {{ alertMessage }}
        </div>
      </transition>

      <form @submit.prevent="onSubmit" class="mt-6">
        <div class="mb-4">
          <v-text-field
            v-model="email"
            type="email"
            label="Email address"
            placeholder="Enter email address"
            variant="outlined"
            color="#5C2ECD"
            class="mt-4"
            :error-messages="emailError"
            @blur="validateEmail"
          />
        </div>

        <v-btn
          :loading="authStore.loading"
          :disabled="authStore.loading"
          type="submit"
          color="#5C2ECD"
          class="w-full custom-btn text-white font-medium py-2.5 rounded-md transition"
        >
          Send Reset Link
        </v-btn>
      </form>

      <div class="text-center mt-6">
        <RouterLink to="/login">
          <v-btn
            no-uppercase
            variant="text"
            size="small"
            color="#5C2ECD"
            class="normal-case mb-1 text-none"
          >
            Back to Login
          </v-btn>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
const router = useRouter()
const email = ref('')
const emailError = ref('')
const showAlert = ref(false)
const alertType = ref('success')
const alertMessage = ref('')

const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value) {
    emailError.value = 'Email is required'
    return false
  } else if (!emailPattern.test(email.value)) {
    emailError.value = 'Please enter a valid email address'
    return false
  }
  emailError.value = ''
  return true
}

const onSubmit = async () => {
  if (!validateEmail()) return

  const result = await authStore.forgotPassword(email.value)

  showAlert.value = true
  alertMessage.value = result.message
  console.log('alert message:', alertMessage.value)

  if (result.success) {
    alertType.value = 'success'
  } else {
    alertType.value = 'error'
  }

  // Auto hide alert after 4 seconds
  setTimeout(() => {
    showAlert.value = false
  }, 8000)
}
</script>

<style scoped>
.custom-btn {
  background-color: #5c2ecd;
  text-transform: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
