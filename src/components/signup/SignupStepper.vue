<template>
  <div class="min-h-screen bg-white flex flex-col items-center py-16 px-6">
    <!-- Application In Progress Alert -->
    <div v-if="showProgressAlert" class="fixed top-6 left-6 z-50">
      <div
        class="w-full px-6 py-4 mx-auto justify-center text-center rounded-md text-white font-medium shadow-md bg-gradient-to-r from-amber-500 to-orange-500"
      >
        Your application is in progress. Kindly complete the
        <span class="font-semibold">
          {{ currentStepTitle }}
        </span>
        step.
      </div>
    </div>
    <!-- Header -->
    <div data-aos="fade-down" class="text-center mb-8">
      <h1 class="text-2xl font-semibold mb-2">Create Your Account</h1>
      <p class="text-gray-500">Complete your profile to start your loan application</p>
    </div>

    <!-- Custom Stepper -->
    <div data-aos="fade-up" data-aos-delay="100" class="max-w-xl w-full mb-12">
      <div class="relative flex items-center justify-between">
        <!-- Background Line -->
        <div class="ml-2 mr-2 absolute top-4 left-10 right-10 h-[2px] bg-gray-100"></div>

        <div
          v-for="(label, index) in steps"
          :key="index"
          class="flex flex-col items-center relative z-10"
        >
          <div
            :class="[
              'w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300',
              step > index + 1
                ? 'bg-green-600 text-white'
                : step === index + 1
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600 border'
            ]"
          >
            {{ index + 1 }}
          </div>

          <p
            class="mt-3 text-sm"
            :class="step === index + 1 ? 'text-gray-800 font-medium' : 'text-gray-500'"
          >
            {{ label }}
          </p>
        </div>
      </div>
    </div>

    <!-- Step Content Wrapper -->
    <div data-aos="fade-left" data-aos-delay="100" class="max-w-5xl w-full bg-[#F9FAFB80] rounded-2xl p-10 overflow-hidden">
      <Transition name="fade-slide" mode="out-in">
        <!-- Step 1 -->
        <div v-if="step === 1" key="1">
          <PersonalInfoStep v-model="form" @next="step = 2" />
        </div>

        <!-- Step 2 -->
        <div v-else-if="step === 2" key="2">
          <AddressInfoStep v-model="form" @back="step = 1" @next="step = 3" />
        </div>

        <!-- Step 3 -->
        <div v-else key="3">
          <EmailVerificationStep @back="step = 2" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

import PersonalInfoStep from '../steps/PersonalInfoStep.vue'
import AddressInfoStep from '../steps/AddressInfoStep.vue'
import EmailVerificationStep from '../steps/EmailVerificationStep.vue'
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

const showProgressAlert = computed(() => {
  return auth.applicationStatus === 'draft'
})

const currentStepTitle = computed(() => {
  return steps[step.value - 1]
})

import { useRoute } from 'vue-router'

const route = useRoute()
const step = ref(1)

const steps = ['Personal Info', 'Address Information', 'Email Verification']

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  dob: '',
  bvn: '',
  nin: '',
  houseNumber: '',
  streetName: '',
  state: '',
  lga: ''
})

onMounted(() => {
  if (route.query.step) {
    step.value = Number(route.query.step)
  }
})
</script>
