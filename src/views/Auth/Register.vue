<template>
  <!-- INCOMPLETE APPLICATION BANNER -->
  <div
    v-if="showIncompleteBanner"
    class="m-6 flex items-start gap-3 rounded-md border border-[#5C2ECD] bg-[#f5f0ff] px-4 py-3"
  >
    <div class="w-2 h-2 mt-2 rounded-full bg-[#5C2ECD] animate-pulse"></div>

    <div class="text-left">
      <p class="text-sm font-semibold text-[#5C2ECD]">
        Application in progress (Step {{ step }} of 3)
      </p>
      <p class="text-xs text-[#6e67a0]">Kindly complete this step to continue your registration.</p>
    </div>
  </div>
  <div class="flex items-center justify-center bg-[#fafafe] p-6">
    <div
      class="w-full max-w-5xl bg-white rounded-[40px] shadow-[0_20px_64px_rgba(92,46,205,0.18)] border border-[#eceaf7] p-10"
    >
      <!-- LOGO -->
      <div class="flex justify-center mb-8">
        <!-- keep your svg exactly -->
        <slot name="logo" />
      </div>

      <!-- STEP PROGRESS -->
      <div class="flex items-center mb-8">
        <template v-for="n in 3" :key="n">
          <div class="flex flex-col items-center gap-1">
            <div
              class="w-9 h-9 flex items-center justify-center rounded-full text-[12px] font-bold transition-all"
              :class="[
                step === n
                  ? 'bg-[linear-gradient(135deg,#5C2ECD,#ED017F)] text-white shadow-[0_8px_32px_rgba(92,46,205,0.3)]'
                  : step > n
                    ? 'bg-[#f5f0ff] border border-[#5C2ECD] text-[#5C2ECD]'
                    : 'border border-[#d9d6ee] text-[#6e67a0]'
              ]"
            >
              <span v-if="step > n">✓</span>
              <span v-else>{{ n }}</span>
            </div>

            <span
              class="text-[11px] font-semibold text-center max-w-[70px]"
              :class="step === n ? 'text-[#5C2ECD]' : 'text-[#6e67a0]'"
            >
              {{ labels[n - 1] }}
            </span>
          </div>

          <div
            v-if="n !== 3"
            class="flex-1 h-[2px] mx-2 mb-5"
            :class="step > n ? 'bg-[#5C2ECD]' : 'bg-[#d9d6ee]'"
          />
        </template>
      </div>

      <!-- STEP 1 -->
      <div v-if="step === 1">
        <h2 class="text-[22px] font-extrabold text-[#1a1535] mb-1">Personal Information</h2>
        <p class="text-[13px] text-[#6e67a0] mb-6">
          Fill in your details exactly as they appear on your ID.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input v-model="form.firstName" placeholder="First Name" class="input" />
          <input v-model="form.lastName" placeholder="Last Name" class="input" />
        </div>

        <!-- CUSTOM INPUT (your exact style) -->
        <div class="relative mt-4">
          <v-menu v-model="dateMenu" :close-on-content-click="false" transition="scale-transition">
            <!-- ACTIVATOR -->
            <template #activator="{ props }">
              <div class="relative">
                <input
                  v-bind="props"
                  :value="formattedDate"
                  placeholder="Date of Birth"
                  class="input pr-10 cursor-pointer"
                  readonly
                />

                <i
                  class="mdi mdi-calendar absolute right-3 top-1/2 -translate-y-1/2 text-[#6e67a0]"
                ></i>
              </div>
            </template>

            <!-- DATE PICKER -->
            <v-date-picker
              density="compact"
              color="purple"
              v-model="form.dob"
              @update:modelValue="dateMenu = false"
            />
          </v-menu>
        </div>
        <div class="flex mt-4">
          <span
            class="flex items-center px-3 border border-r-0 border-[#c7c2e0] rounded-l-md bg-gray-50 text-sm text-[#6e67a0]"
          >
            +234
          </span>

          <input
            v-model="form.phone"
            placeholder="8012345678"
            class="input rounded-l-none"
            inputmode="numeric"
            maxlength="10"
            @input="form.phone = form.phone.replace(/\D/g, '').slice(0, 10)"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <input
              v-model="form.nin"
              maxlength="11"
              inputmode="numeric"
              @input="form.nin = form.nin.replace(/\D/g, '').slice(0, 11)"
              placeholder="NIN"
              class="input"
            />
            <p v-if="form.nin && !isNinValid" class="text-red-500 text-xs mt-1">
              NIN must be 11 digits
            </p>
          </div>

          <div>
            <input
              v-model="form.bvn"
              maxlength="11"
              inputmode="numeric"
              @input="form.bvn = form.bvn.replace(/\D/g, '').slice(0, 11)"
              placeholder="BVN"
              class="input"
            />
            <p v-if="form.bvn && !isBvnValid" class="text-red-500 text-xs mt-1">
              BVN must be 11 digits
            </p>
          </div>
        </div>

        <input v-model="form.email" placeholder="Email" class="input mt-4" />
        <p v-if="fieldErrors.email" class="text-red-500 text-xs mt-1">
          {{ fieldErrors.email }}
        </p>
        <p v-if="form.email && !isEmailValid" class="text-red-500 text-xs mt-1">
          Enter a valid email address
        </p>
        <!-- PASSWORD -->
        <!-- PASSWORD -->
        <div class="relative mt-4">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="form.password"
            placeholder="Password"
            class="input pr-10"
          />

          <span
            @click="showPassword = !showPassword"
            class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#6e67a0] hover:text-[#5C2ECD]"
          >
            👁
          </span>
        </div>

        <!-- CONFIRM PASSWORD -->
        <div class="relative mt-4">
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            v-model="form.password_confirmation"
            placeholder="Confirm Password"
            class="input pr-10"
          />

          <span
            @click="showConfirmPassword = !showConfirmPassword"
            class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#6e67a0] hover:text-[#5C2ECD]"
          >
            👁
          </span>
        </div>

        <!-- MISMATCH ERROR -->
        <p v-if="form.password_confirmation && !passwordsMatch" class="text-red-500 text-xs mt-1">
          Passwords do not match
        </p>

        <!-- PASSWORD STRENGTH -->
        <div v-if="form.password" class="mt-3 space-y-2">
          <!-- Label -->
          <div class="flex justify-between text-sm">
            <span class="font-medium">Password Strength</span>
            <span
              :class="{
                'text-red-500': passwordStrength <= 2,
                'text-orange-500': passwordStrength === 3,
                'text-blue-500': passwordStrength === 4,
                'text-green-600': passwordStrength === 5
              }"
            >
              {{ strengthLabel }}
            </span>
          </div>

          <!-- Progress bar -->
          <div class="w-full h-2 bg-gray-200 rounded">
            <div
              class="h-2 rounded transition-all"
              :class="strengthColor"
              :style="{ width: passwordStrength * 20 + '%' }"
            ></div>
          </div>

          <!-- Checklist -->
          <div class="text-xs space-y-1 mt-2">
            <div :class="passwordChecks.length ? 'text-green-600' : 'text-gray-400'">
              {{ passwordChecks.length ? '✓' : '✗' }} At least 8 characters
            </div>

            <div :class="passwordChecks.uppercase ? 'text-green-600' : 'text-gray-400'">
              {{ passwordChecks.uppercase ? '✓' : '✗' }} One uppercase letter
            </div>

            <div :class="passwordChecks.lowercase ? 'text-green-600' : 'text-gray-400'">
              {{ passwordChecks.lowercase ? '✓' : '✗' }} One lowercase letter
            </div>

            <div :class="passwordChecks.number ? 'text-green-600' : 'text-gray-400'">
              {{ passwordChecks.number ? '✓' : '✗' }} One number
            </div>

            <div :class="passwordChecks.special ? 'text-green-600' : 'text-gray-400'">
              {{ passwordChecks.special ? '✓' : '✗' }} One special character
            </div>
          </div>
        </div>

        <p v-if="error" class="text-[#ef4444] text-sm mt-2">{{ error }}</p>

        <button class="btn mt-6 w-full" @click="nextStep">
          {{ authStore.loading ? 'Processing...' : 'Save & Continue →' }}
        </button>
      </div>

      <!-- STEP 2 -->
      <div v-if="step === 2">
        <h2 class="text-[22px] font-extrabold text-[#1a1535] mb-1">Address Information</h2>

        <p class="text-[13px] text-[#6e67a0] mb-6">Provide your residential details.</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input v-model="form.house" placeholder="House No" class="input" />
          <input v-model="form.street" placeholder="Street" class="input" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <select v-model="form.state" class="input">
            <option value="">State</option>
            <option>Lagos</option>
          </select>
          <input v-model="form.lga" placeholder="LGA" class="input" />
        </div>

        <input v-model="form.busStop" placeholder="Bus Stop" class="input mt-4" />

        <!-- RADIO CARDS -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div
            @click="form.residence = 'owned'"
            class="radio-card"
            :class="form.residence === 'owned' && 'radio-active'"
          >
            <div class="radio-dot"></div>
            <div>
              <p class="font-semibold text-sm">Owned</p>
              <p class="text-[11px] text-[#6e67a0]">I own this property</p>
            </div>
          </div>

          <div
            @click="form.residence = 'rented'"
            class="radio-card"
            :class="form.residence === 'rented' && 'radio-active'"
          >
            <div class="radio-dot"></div>
            <div>
              <p class="font-semibold text-sm">Rented</p>
              <p class="text-[11px] text-[#6e67a0]">I rent this property</p>
            </div>
          </div>
        </div>

        <p v-if="error" class="text-[#ef4444] text-sm mt-2">{{ error }}</p>

        <div class="flex gap-3 mt-6">
          <button class="btn-ghost w-full" @click="step--">Back</button>
          <button
            class="btn w-full"
            :disabled="step2Loading || !isStep2Valid"
            :class="{ 'btn-disabled': step2Loading || !isStep2Valid }"
            @click="nextStep"
          >
            {{ step2Loading ? 'Saving...' : 'Continue →' }}
          </button>
        </div>
      </div>

      <!-- STEP 3 -->
      <div
        class="h-screen flex flex-col items-center justify-center text-center"
        v-if="step === 3 && !verified"
      >
        <h2 class="text-center font-extrabold text-[22px] mb-2">Verify Email</h2>

        <p class="text-center text-sm text-[#6e67a0] mb-4">
          Code sent to <strong>{{ form.email }}</strong>
        </p>

        <!-- OTP -->
        <div class="flex flex-wrap justify-center gap-2 max-w-[320px] mx-auto">
          <input
            v-for="(d, i) in otp"
            :key="i"
            v-model="otp[i]"
            maxlength="1"
            class="otp p-2 input"
            :class="otp[i] && 'otp-filled'"
          />
        </div>

        <p v-if="error" class="text-[#ef4444] text-center mt-3 text-sm">
          {{ error }}
        </p>

        <div class="text-center mt-4 text-sm">
          <span v-if="!canResend" class="text-[#6e67a0]"> Resend code in {{ countdown }}s </span>

          <button v-else @click="resendOtp" class="text-[#5C2ECD] font-semibold hover:underline">
            Resend Code
          </button>
        </div>

        <button
          class="btn w-full mt-6"
          :disabled="step3Loading"
          :class="{ 'btn-disabled': step3Loading }"
          @click="verify"
        >
          {{ step3Loading ? 'Verifying...' : 'Verify & Activate' }}
        </button>
      </div>

      <!-- SUCCESS -->
      <div v-if="verified" class="text-center">
        <h2 class="text-xl font-bold mb-3">Account Activated 🎉</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted, computed, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'
import { useDropdowns } from '@/composables/useDropdowns'

const { states, lgas, fetchDropdownList } = useDropdowns()

const router = useRouter()
const dateMenu = ref(false)

const formatDOB = (dob) => {
  if (!dob) return null

  const date = new Date(dob)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}` // ✅ safest format
}

const formattedDate = computed(() => {
  if (!form.value.dob) return ''
  return new Date(form.value.dob).toLocaleDateString()
})

const authStore = useAuthStore()

const showIncompleteBanner = computed(() => {
  return authStore.applicationStatus !== 'verified' && authStore.applicationPage > 1
})

const countdown = ref(60)
const canResend = ref(false)
let timer = null

const startCountdown = () => {
  countdown.value = 60
  canResend.value = false

  timer = setInterval(() => {
    countdown.value--

    if (countdown.value <= 0) {
      clearInterval(timer)
      canResend.value = true
    }
  }, 1000)
}
const route = useRoute()

const step = ref(Number(route.query.step) || 1)
watch(
  () => route.query.step,
  (val) => {
    if (val) {
      step.value = Number(val)
    }
  }
)
const showPassword = ref(false)
const verified = ref(false)
const error = ref('')
const fieldErrors = ref({
  email: '',
  password: '',
  first_name: '',
  last_name: ''
})
const handleApiErrors = (err) => {
  const errors = err?.response?.data?.data?.errors

  if (!errors) {
    error.value = err?.response?.data?.message || 'Something went wrong'
    return
  }

  // reset previous
  fieldErrors.value.email = ''
  fieldErrors.value.password = ''
  fieldErrors.value.first_name = ''
  fieldErrors.value.last_name = ''

  if (errors.email?.length) {
    fieldErrors.value.email = errors.email[0]
  }

  if (errors.password?.length) {
    fieldErrors.value.password = errors.password[0]
  }

  if (errors.first_name?.length) {
    fieldErrors.value.first_name = errors.first_name[0]
  }

  if (errors.last_name?.length) {
    fieldErrors.value.last_name = errors.last_name[0]
  }

  // fallback general message
  error.value = err?.response?.data?.message || 'Validation failed'
}

const labels = ['Personal Info', 'Address Info', 'Verify Email']

const form = ref({
  firstName: '',
  lastName: '',
  dob: null,
  phone: '',
  nin: '',
  bvn: '',
  email: '',
  password: '',
  password_confirmation: '',
  house: '',
  street: '',
  state: '',
  lga: '',
  busStop: '',
  residence: ''
})

const otp = ref(['', '', '', '', '', '', '', '', '', '', ''])
const goToStep = (n) => {
  router.push({
    name: 'signup',
    query: { step: n }
  })
}

const nextStep = async () => {
  error.value = ''

  try {
    // =========================
    // STEP 1 → CALL API
    // =========================
    if (step.value === 1) {
      if (!form.value.firstName || !form.value.email || !form.value.password) {
        error.value = 'Fill all required fields'
        return
      }

      // 🔥 PASSWORD VALIDATION
      if (!isPasswordValid.value) {
        error.value = 'Password does not meet requirements'
        return
      }

      const payload = {
        first_name: form.value.firstName,
        last_name: form.value.lastName,
        email: form.value.email,
        password: form.value.password,
        password_confirmation: form.value.password_confirmation,
        phone_number: form.value.phone,
        date_of_birth: formatDOB(form.value.dob),
        bvn: form.value.bvn,
        nin: form.value.nin
      }

      const res = await authStore.registerStep1(payload)

      if (!res) {
        error.value = 'Registration failed'
        return
      }

      goToStep(2)
      return
    }

    // =========================
    // STEP 2 → CALL API
    // =========================
    if (step.value === 2) {
      if (!isStep2Valid.value) {
        error.value = 'Complete address info'
        return
      }

      step2Loading.value = true

      try {
        const payload = {
          house_number: form.value.house,
          street_name: form.value.street,
          state: form.value.state,
          lga: form.value.lga,
          residence_type: form.value.residence
        }

        const res = await authStore.registerStep2(payload)

        if (!res) {
          error.value = 'Address submission failed'
          return
        }

        await authStore.sendVerification()
        startCountdown()
        goToStep(3)
      } finally {
        step2Loading.value = false
      }

      return
    }

    // fallback
    step.value++
  } catch (err) {
    console.log(err)
    handleApiErrors(err)
  }
}

const verify = async () => {
  error.value = ''
  step3Loading.value = true

  const token = otp.value.join('')

  if (token.length !== 11) {
    error.value = 'Enter full code'
    step3Loading.value = false
    return
  }
  console.log('token:', token)
  try {
    const res = await authStore.verifyEmail(token)

    verified.value = true
    console.log('res:', res)
    setTimeout(() => {
      router.push('/login')
    }, 1500)
  } catch (error) {
    console.log('error:', error)
  } finally {
    step3Loading.value = false
  }
}
const resendOtp = async () => {
  if (!canResend.value) return

  error.value = ''

  try {
    const res = await authStore.sendVerification(true)

    if (res.success) {
      startCountdown()
    }
  } catch (err) {
    error.value = err?.response?.data?.message || err.message || 'Failed to resend code'
  }
}
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
const isPhoneValid = computed(() => {
  const phone = form.value.phone || ''
  return /^[7-9][0-1]\d{8}$/.test(phone)
})
const isEmailValid = computed(() => {
  const email = form.value.email || ''
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
})
const isNinValid = computed(() => /^\d{11}$/.test(form.value.nin))
const isBvnValid = computed(() => /^\d{11}$/.test(form.value.bvn))
const passwordChecks = computed(() => {
  const pwd = form.value.password || ''

  return {
    length: pwd.length >= 8,
    uppercase: /[A-Z]/.test(pwd),
    lowercase: /[a-z]/.test(pwd),
    number: /\d/.test(pwd),
    special: /[@$!%*?&]/.test(pwd)
  }
})

const passwordStrength = computed(() => {
  return Object.values(passwordChecks.value).filter(Boolean).length
})
const strengthLabel = computed(() => {
  switch (passwordStrength.value) {
    case 0:
    case 1:
    case 2:
      return 'Weak'
    case 3:
      return 'Medium'
    case 4:
      return 'Strong'
    case 5:
      return 'Very Strong'
    default:
      return 'Weak' // ✅ fallback fixes TS error
  }
})

const strengthColor = computed(() => {
  if (passwordStrength.value <= 2) return 'bg-red-500'
  if (passwordStrength.value === 3) return 'bg-orange-500'
  if (passwordStrength.value === 4) return 'bg-blue-500'
  return 'bg-green-600'
})
const showConfirmPassword = ref(false)
// final validator (used before API call)
const isPasswordValid = computed(() => passwordStrength.value === 5)
const passwordsMatch = computed(() => {
  return (
    form.value.password &&
    form.value.password_confirmation &&
    form.value.password === form.value.password_confirmation
  )
})
const isStep1Valid = computed(() => {
  return (
    form.value.firstName &&
    form.value.lastName &&
    form.value.email &&
    isEmailValid.value &&
    form.value.phone &&
    isPhoneValid.value &&
    form.value.nin &&
    isNinValid.value &&
    form.value.bvn &&
    isBvnValid.value &&
    form.value.password &&
    isPasswordValid.value &&
    passwordsMatch.value
  )
})
const isStep2Valid = computed(() => {
  return form.value.house && form.value.state && form.value.lga && form.value.residence
})
const step2Loading = ref(false)
const step3Loading = ref(false)
</script>

<style scoped>
.input {
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  /* 🔥 FORCE BORDER */
  border: 1px solid #c7c2e0 !important;

  transition: all 0.2s ease;
}

.input:hover {
  @apply border-[#a9a3d1];
}

.input:focus {
  outline: none;
  border: 1px solid #5c2ecd !important;
  box-shadow: 0 0 0 3px rgba(92, 46, 205, 0.15);
}
.btn {
  @apply text-white py-3 rounded-md font-bold text-sm transition-all;
  background: linear-gradient(135deg, #5c2ecd, #ed017f);
  box-shadow: 0 8px 32px rgba(92, 46, 205, 0.3);
}
.btn-disabled {
  background: #e5e3f3; /* soft faded purple/gray */
  color: #9f9bbd;
  box-shadow: none;
  cursor: not-allowed;
}
.btn-ghost {
  @apply border border-[#d9d6ee] text-[#3d3870] py-3 rounded-md text-sm;
}

.radio-card {
  @apply flex items-center gap-3 border border-[#d9d6ee] p-3 rounded-md cursor-pointer w-full;
}

.radio-active {
  @apply border-[#5C2ECD] bg-[#f5f0ff];
}

.radio-dot {
  @apply w-4 h-4 rounded-full border-2 border-[#b8b2d8] flex items-center justify-center;
}
.radio-active .radio-dot {
  @apply bg-[#5C2ECD] border-[#5C2ECD];
}
.radio-active .radio-dot::after {
  content: '';
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 999px;
}

.otp {
  @apply w-[42px] h-[48px] text-center text-lg font-bold border border-[#d9d6ee] rounded-md;
}
.otp-filled {
  @apply border-[#5C2ECD] bg-[#f5f0ff];
}
</style>
