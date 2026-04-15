<template>
  <v-form ref="formRef" v-model="isValid" @submit.prevent="handleStep2">
    <p class="text-md font-semibold mb-1">Residential Address</p>

    <div class="bg-[#F9FAFB80] rounded-2xl p-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- House Number -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> House Number </label>
          <v-text-field
            v-model="localForm.houseNumber"
            placeholder="Enter house number"
            variant="outlined"
            prepend-inner-icon="mdi-home-outline"
            density="comfortable"
            :rules="[rules.required]"
            hide-details="auto"
          />
        </div>

        <!-- Street Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> Street Name </label>
          <v-text-field
            v-model="localForm.streetName"
            placeholder="Enter street name"
            prepend-inner-icon="mdi-road-variant"
            variant="outlined"
            density="comfortable"
            :rules="[rules.required]"
            hide-details="auto"
          />
        </div>

        <!-- State -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> State </label>
          <v-select
            v-model="localForm.state"
            :items="states"
            item-title="label"
            item-value="value"
            placeholder="Select state"
            variant="outlined"
            prepend-inner-icon="mdi-map-marker-outline"
            density="comfortable"
            :rules="[rules.required]"
            hide-details="auto"
            @update:modelValue="onStateChange"
          />
        </div>

        <!-- LGA -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> LGA </label>
          <v-select
            v-model="localForm.lga"
            :items="lgas[localForm.state] || []"
            item-title="name"
            item-value="name"
            placeholder="Select LGA"
            variant="outlined"
            prepend-inner-icon="mdi-city"
            density="comfortable"
            :rules="[rules.required]"
            :disabled="!localForm.state"
            hide-details="auto"
          />
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-10 flex justify-between gap-4">
        <v-btn variant="outlined" size="large" rounded="lg" @click="$emit('back')"> Back </v-btn>

        <v-btn
          type="submit"
          :loading="loading"
          :disabled="!isValid || loading"
          color="#5C2ECD"
          size="large"
          rounded="lg"
        >
          Save and Continue
        </v-btn>
      </div>
    </div>
  </v-form>

  <AppToast
    :show="showToast"
    :message="toastMessage"
    :type="toastType"
    @close="showToast = false"
  />
</template>

<script setup>
import { useDropdowns } from '@/composables/useDropdowns'
import { reactive, watch, ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AppToast from '@/components/Ui/AppToast.vue'

const authStore = useAuthStore()

const props = defineProps({
  modelValue: Object
})
const { states, lgas, fetchDropdownList } = useDropdowns()

const emit = defineEmits(['update:modelValue', 'next', 'back'])

const localForm = reactive({ ...props.modelValue })

const loading = ref(false)
const isValid = ref(false)
const formRef = ref(null)

const rules = {
  required: (v) => !!v || 'This field is required'
}

const handleStep2 = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true

  try {
    await authStore.registerStep2({
      house_number: localForm.houseNumber,
      street_name: localForm.streetName,
      state: localForm.state,
      lga: localForm.lga,
      residence_type: "Owned"
    })

    await authStore.sendVerification()
    emit('next')
  } catch (error) {
    console.log('error:', error.response.data.data.message)
    const message =
      error?.response?.data?.data?.message ||
      error?.response?.data?.message ||
      'Something went wrong. Please try again.'

    triggerToast(message, 'error')
  } finally {
    loading.value = false
  }
}

watch(localForm, (val) => emit('update:modelValue', val), { deep: true })

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

const onStateChange = () => {
  localForm.lga = ''
}

onMounted(() => {
  fetchDropdownList()
})
</script>

<style scoped>
.v-btn {
  text-transform: none;
}
</style>
