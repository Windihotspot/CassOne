<template>
  <header class="bg-white mt-4">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      <!-- Logo -->
      <div @click="goHome" class="flex items-center gap-2">
        <img :src="logo" alt="" class="h-10"/>
      </div>

      <!-- Auth -->
      <div class="flex items-center gap-4">
        <!-- <a href="#" class="text-sm text-gray-600 hover:text-purple-600">Are you a new customer?</a> -->
        <v-btn
          rounded
          to="/signup"
          color="deep-purple"
          class="text-white normal-case"
          elevation="0"
        >
          Open an account
        </v-btn>
      </div>
    </div>
  </header>
  <v-container fluid class="flex items-center justify-center bg-white">
    <v-card class="w-full max-w-6xl rounded-3xl shadow-none overflow-hidden" elevation="0">
      <div class="grid grid-cols-1 md:grid-cols-2 min-h-[650px]">
        <!-- LEFT IMAGE -->
        <div
          data-aos="fade-right"
          data-aos-delay="150"
          class="relative hidden md:flex items-center justify-center bg-white"
        >
          <img
            :src="loginImage"
            alt="Login Image"
            class="rounded-2xl w-[85%] h-[85%] object-cover"
          />
        </div>

        <!-- RIGHT FORM -->
        <div
          class="flex items-center justify-center px-6 md:px-14"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <v-form v-model="formValid" class="w-full max-w-md" @submit.prevent="handleLogin">
            <!-- Header -->
            <h1 class="text-3xl font-bold mb-2">Welcome back</h1>
            <p class="text-gray-600 mb-6">Sign in to your Credmate account.</p>

            <!-- URL Warning -->
            <div class="mb-6">
              <p class="text-sm text-gray-600 mb-2">
                Please check that you are visiting the correct URL
              </p>
              <div
                class="inline-block bg-pink-100 text-pink-700 px-5 py-2 rounded-full text-sm font-medium"
              >
                https://loans.credmate.com
              </div>
            </div>

            <div v-if="errorMessage" class="mb-4">
  <v-alert
    type="error"
    variant="tonal"
    density="compact"
    class="text-sm"
  >
    {{ errorMessage }}
  </v-alert>
</div>
            <!-- Email -->
            <div class="mb-5">
              <label class="block text-sm font-medium mb-1">Email</label>
              <v-text-field
                color="#5C2ECD"
                v-model="email"
                  :rules="emailRules"
                prepend-inner-icon="mdi-email-outline"
                placeholder="email@getjupita.com"
                variant="outlined"
                density="comfortable"
                hide-details
              />
            </div>

            <!-- Password -->
            <div class="mb-6">
              <label class="block text-sm font-medium mb-1">Password</label>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock-outline"
                :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="showPassword = !showPassword"
                placeholder="Enter password"
                variant="outlined"
                density="comfortable"
                color="#5C2ECD"
              />
            </div>

            <!-- Button -->
            <v-btn
              block
              type="submit"
              color="#5c2ecd"
              class="text-white py-6 text-base font-semibold rounded-lg custom-btn"
              height="52"
              :loading="auth.loading"
               :disabled="!formValid || auth.loading"
            >
              Continue
            </v-btn>

            <!-- Forgot -->
            <div class="text-center mt-6">
              <v-btn
                to="/resetpassword"
                no-uppercase
                variant="text"
                size="small"
                color="#5C2ECD"
                class="normal-case mb-1 text-none"
              >
                Forgot password?
              </v-btn>
            </div>
          </v-form>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import loginImage from '@/assets/images/login-image.png'
import logo from '@/assets/images/new-logo.jpeg'
const formValid = ref(false)
const showPassword = ref(false)

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const goHome = () => {
  router.push('/')
}

// ✅ Validation rules
const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email address'
]

const passwordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 6 || 'Password must be at least 6 characters'
]


const handleLogin = async () => {
   if (!formValid.value) return
  errorMessage.value = '' // reset error

  const result = await auth.login({
    email: email.value,
    password: password.value
  })

  if (!result.success) {
    errorMessage.value = result.message || 'Invalid email or password'
    return
  }

  // ✅ SUCCESS FLOW
  if (auth.applicationStatus === 'verified') {
    router.push('/dashboard')
  } else if (auth.applicationPage === 2) {
    router.push('/signup?step=2')
  } else if (auth.applicationPage === 3) {
    router.push('/signup?step=3')
  } else {
    router.push('/signup')
  }
}
</script>

<style scoped>
.custom-btn {
  background-color: #5c2ecd;
}
.v-btn {
  text-transform: none;
}
</style>
