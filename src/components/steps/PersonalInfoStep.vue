<template>
  <div class="bg-gray-50 rounded-2xl p-4">
    <v-form ref="formRef" v-model="isFormValid" @submit.prevent="handleStep1">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> First Name </label>
          <v-text-field
            v-model="localForm.firstName"
            prepend-inner-icon="mdi-account-outline"
            placeholder="Enter first name"
            variant="outlined"
            density="comfortable"
            color="#5C2ECD"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> Last Name </label>
          <v-text-field
            color="#5C2ECD"
            prepend-inner-icon="mdi-account-outline"
            v-model="localForm.lastName"
            placeholder="Enter last name"
            variant="outlined"
            density="comfortable"
          />
        </div>

        <div>
          <DatePicker
            label="Date of Birth"
            v-model="localForm.dob"
            placeholder="Select date of birth"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> Phone Number </label>
          <v-text-field
            color="#5C2ECD"
            v-model="localForm.phone"
            prepend-inner-icon="mdi-phone-outline"
            placeholder="Enter phone number"
            variant="outlined"
            density="comfortable"
            maxlength="11"
            counter="11"
            :rules="[onlyDigits, exactlyEleven]"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> NIN </label>
          <v-text-field
            v-model="localForm.nin"
            prepend-inner-icon="mdi-card-account-details-outline"
            placeholder="Enter NIN"
            variant="outlined"
            density="comfortable"
            color="#5C2ECD"
            maxlength="11"
            counter="11"
            :rules="[onlyDigits, exactlyEleven]"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> BVN </label>
          <v-text-field
            v-model="localForm.bvn"
            prepend-inner-icon="mdi-bank-outline"
            placeholder="Enter BVN"
            variant="outlined"
            density="comfortable"
            color="#5C2ECD"
            maxlength="11"
            counter="11"
            :rules="[onlyDigits, exactlyEleven]"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> Email Address </label>
          <v-text-field
            v-model="localForm.email"
            prepend-inner-icon="mdi-email-outline"
            placeholder="Enter email address"
            type="email"
            variant="outlined"
            density="comfortable"
            color="#5C2ECD"
            :rules="[validEmail]"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> Password </label>
          <v-text-field
            v-model="localForm.password"
            :type="showPassword ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            @click:append-inner="showPassword = !showPassword"
            placeholder="Enter password"
            variant="outlined"
            density="comfortable"
            color="#5C2ECD"
            :rules="[strongPassword]"
          />
          <div v-if="localForm.password && localForm.password.length > 0" class="mt-2 space-y-2">
            <!-- Strength Label -->
            <div class="flex justify-between items-center text-sm">
              <span class="font-medium">Password Strength:</span>
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

            <!-- Progress -->
            <v-progress-linear
              :model-value="passwordStrength * 20"
              :color="strengthColor"
              height="6"
              rounded
            />

            <!-- Requirement Checklist -->
            <div class="grid grid-cols-1 text-xs space-y-1 mt-2">
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
                {{ passwordChecks.special ? '✓' : '✗' }} One special character (@$!%*?&)
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <!-- CTA -->
      <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div></div>

        <v-btn
          type="submit"
          :loading="loading"
          :disabled="!isFormValid || loading"
          color="#5C2ECD"
          size="large"
          rounded="lg"
          class="w-full"
        >
          Save and Continue
        </v-btn>
      </div>
    </v-form>
  </div>

  <!-- Toast -->
 
</template>

<script setup>
import DatePicker from '../Ui/DatePicker.vue'
import { reactive, watch, ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
const loading = ref(false)
const showPassword = ref(false)
import { ElNotification } from 'element-plus'

const showToast = ref(false)
const toastMessage = ref('')
let toastTimeout = null

const triggerNotification = (message, type = 'error') => {
  ElNotification({
    // title: type === 'error' ? 'Error' : 'Success',
    message: message,
    type: type,
    duration: 5000, // auto dismiss after 5s
    position: 'top-right'
  })
}

const isFormValid = ref(false)

const props = defineProps({
  modelValue: Object
})

const emit = defineEmits(['update:modelValue', 'next'])

const localForm = reactive({
  ...props.modelValue,
  dob: props.modelValue?.dob ? new Date(props.modelValue.dob) : null
})

const authStore = useAuthStore()

const formRef = ref()

const dobMenu = ref(false)

const maxDate = computed(() => {
  const today = new Date()
  today.setFullYear(today.getFullYear() - 18)
  return today
})

const formattedDob = computed({
  get() {
    if (!localForm.dob) return ''
    return new Intl.DateTimeFormat('en-GB').format(localForm.dob)
  },
  set() {}
})

const handleStep1 = async () => {
  console.log('Register Step 1 start:')
  const { valid } = await formRef.value.validate()

  if (!valid) return
  loading.value = true

  try {
    const payload = {
      first_name: localForm.firstName,
      last_name: localForm.lastName,
      email: localForm.email,
      password: localForm.password,
      password_confirmation: localForm.password,
      phone_number: localForm.phone,
      date_of_birth: localForm.dob ? new Date(localForm.dob).toISOString().split('T')[0] : null,
      bvn: localForm.bvn,
      nin: localForm.nin
    }

    // 🔎 Log payload
    console.log('Register Step 1 Payload:', payload)

    await authStore.registerStep1(payload)

    emit('next')
  } catch (error) {
    console.log('Register Step 1 Error:', error.response.data.data.errors)

    const apiErrors = error?.response?.data?.data?.errors

    if (apiErrors) {
      const firstKey = Object.keys(apiErrors)[0]
      triggerNotification(apiErrors[firstKey][0], 'error')
    } else {
      triggerNotification('Something went wrong. Please try again.', 'error')
    }
  } finally {
    loading.value = false
  }
}

// Sync local -> parent
watch(localForm, (val) => emit('update:modelValue', val), { deep: true })

const handleNext = () => {
  // 🔥 Add validation here if needed
  emit('next')
}

const onlyDigits = (v) => /^\d*$/.test(v) || 'Only numbers are allowed'

const exactlyEleven = (v) => v.length === 11 || 'Must be exactly 11 digits'

const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email address'

const strengthColor = computed(() => {
  if (passwordStrength.value <= 2) return 'red'
  if (passwordStrength.value === 3) return 'orange'
  if (passwordStrength.value === 4) return 'blue'
  return 'green'
})

const passwordChecks = computed(() => {
  const pwd = localForm.password || ''

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
  }
})

const strongPassword = (v) =>
  passwordStrength.value === 5 || 'Password must meet all strength requirements'
</script>

<style scoped>
.v-btn {
  text-transform: none;
}
</style>
