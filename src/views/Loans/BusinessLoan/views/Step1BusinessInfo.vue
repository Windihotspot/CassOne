<template>
  <user-header />
  <div class="min-h-screen bg-gray-50 py-12 px-6">
    <!-- Page Title -->
    <h1 class="text-center text-xl font-semibold text-gray-900 mb-8">Business Loan</h1>

    <!-- Stepper -->
    <LoanStepper v-model="currentStep" />

    <!-- Main Form Container -->
    <div class="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm p-12">
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Business Name -->
        <div>
          <label class="form-label">Business Name</label>
          <v-text-field
            prepend-inner-icon="mdi-domain"
            :items="businessTypes"
            placeholder="Enter business name"
            variant="outlined"
            density="comfortable"
            hide-details
            v-model="form.businessName"
          />
        </div>
        <!-- Business Type -->
        <div>
          <label class="form-label">Business Type</label>
          <v-select
            prepend-inner-icon="mdi-briefcase"
            :items="businessTypes"
            placeholder="select business type"
            variant="outlined"
            density="comfortable"
            hide-details
            v-model="form.businessType"
          />
        </div>

        <!-- Business Sector -->
        <div>
          <label class="form-label">Business Sector</label>
          <v-select
            :items="businessSectors"
            prepend-inner-icon="mdi-factory"
            placeholder="select business sector"
            variant="outlined"
            density="comfortable"
            hide-details
            searchable
            v-model="form.businessSector"
          />
        </div>

        <!-- Registration Number -->
        <div>
          <label class="form-label">Business Registration Number</label>
          <v-text-field
            prepend-inner-icon="mdi-identifier"
            placeholder="Enter business registration number"
            variant="outlined"
            density="comfortable"
            hide-details
            v-model="form.registrationNumber"
          />
        </div>

        <!-- Start Date -->
        <!-- Business Start Date -->
        <div>
          <div>
            <label class="form-label">Business Start Date</label>
            <br />
            <el-date-picker
              style="width: 100%; height: 50px; border: 0.3px; border-radius: 4px"
              class="custom-purple-date"
              color="black"
              size="large"
              v-model="form.startDate"
              type="date"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              placeholder="Select start date"
            />
          </div>
        </div>

        <!-- Monthly Revenue -->
        <div>
          <label class="form-label">Monthly Revenue</label>
          <v-text-field
            prepend-inner-icon="mdi-cash"
            placeholder="Enter monthly revenue"
            variant="outlined"
            density="comfortable"
            hide-details
            v-model="formattedRevenue"
          />
        </div>

        <!-- Business email address -->
        <div>
          <label class="form-label">Business email address</label>
          <v-text-field
            prepend-inner-icon="mdi-email"
            placeholder="Enter business email address"
            variant="outlined"
            density="comfortable"
            v-model="form.businessEmail"
            @blur="emailTouched = true"
            :error="emailTouched && !emailValid"
            :error-messages="emailTouched && !emailValid ? 'Invalid email address' : ''"
          />
        </div>

        <!-- Role -->
        <div>
          <label class="form-label">Role</label>
          <v-select
            prepend-inner-icon="mdi-account-badge"
            :items="roleOptions"
            placeholder="Select your role in the business"
            variant="outlined"
            density="comfortable"
            hide-details
            v-model="form.role"
          />
        </div>

        <!-- Address -->
        <div>
          <label class="form-label">Business Address</label>
          <v-text-field
            prepend-inner-icon="mdi-map-marker"
            placeholder="Enter full business address"
            variant="outlined"
            density="comfortable"
            hide-details
            v-model="form.address"
          />
        </div>

        <!-- State -->
        <div>
          <label class="form-label">State</label>
          <v-select
            prepend-inner-icon="mdi-map"
            variant="outlined"
            density="comfortable"
            :items="states"
            item-title="label"
            item-value="value"
            hide-details
            placeholder="Select state"
            v-model="form.state"
          />
        </div>
        <!-- LGA -->
        <div>
          <label class="form-label">Local Government Area</label>

          <v-select
            prepend-inner-icon="mdi-city"
            placeholder="Select local government area"
            variant="outlined"
            density="comfortable"
            hide-details
            :items="lgas[form.state] || []"
            item-title="name"
            item-value="id"
            v-model="form.lga"
          />
        </div>

        <!-- Landmark -->
        <div>
          <label class="form-label">Nearest Bus Stop</label>
          <v-text-field
            prepend-inner-icon="mdi-map-marker-outline"
            placeholder="Enter nearest bus stop or landmark"
            variant="outlined"
            density="comfortable"
            hide-details
            v-model="form.landmark"
          />
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex justify-between mt-10">
        <v-btn
          variant="outlined"
          class="!border-purple-600 !text-purple-600 !rounded-lg !capitalize px-10"
          @click="goBack"
        >
          Back
        </v-btn>

        <v-btn
          :loading="loading"
          :disabled="!isFormValid || loading"
          class="!bg-purple-600 !text-white !rounded-lg !capitalize px-16"
          @click="saveAndContinue"
        >
          Save and Continue
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref, onMounted, computed } from 'vue'
import LoanStepper from '@/components/Loans/LoanStepper.vue'
import { useRouter } from 'vue-router'
import UserHeader from '@/components/Layouts/UserHeader.vue'
import { LoanService } from '@/services/Loan/loanServices'
import { useLoanApplicationStore } from '@/views/Loans/BusinessLoan/stores/loanApplication'
import { useFormattedFields } from '@/composables/useFormattedFields'
import { useDropdowns } from '@/composables/useDropdowns'
const { states, lgas, fetchDropdownList } = useDropdowns()
const loading = ref(false)

const loanStore = useLoanApplicationStore()
const router = useRouter()
const currentStep = ref(1)
const dateMenu = ref(false)
const emailTouched = ref(false)

const emailValid = computed(() => {
  const email = form.value.businessEmail
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
})

// const steps = ['Business Information', 'File Upload', 'Selfie Verification', 'Disbursement Account']

const form = ref({
  businessName: '',
  businessType: '',
  businessSector: '',
  registrationNumber: '',
  startDate: '',
  monthlyRevenue: '',
  businessEmail: '',
  role: '',
  address: '',
  state: '',
  lga: '',
  landmark: ''
})

const isFormValid = computed(() => {
  return (
    form.value.businessName &&
    form.value.businessType &&
    form.value.businessSector &&
    form.value.registrationNumber &&
    form.value.startDate &&
    form.value.monthlyRevenue &&
    form.value.businessEmail &&
    emailValid.value &&
    form.value.role &&
    form.value.address &&
    form.value.state &&
    form.value.lga &&
    form.value.landmark
  )
})

const businessTypes = ['Sole Proprietorship', 'Partnership', 'Limited Liability Company']
const businessSectors = [
  'Agriculture & Farming',
  'Food Processing',
  'Retail & Trading',
  'Wholesale Distribution',
  'Manufacturing',
  'Construction',
  'Real Estate',
  'Transportation & Logistics',
  'Hospitality & Tourism',
  'Restaurants & Catering',
  'Fashion & Apparel',
  'Beauty & Personal Care',
  'Healthcare & Pharmacy',
  'Education & Training',
  'Information Technology',
  'Telecommunications',
  'Media & Entertainment',
  'Financial Services',
  'Professional Services (Legal, Accounting, Consulting)',
  'Automobile Sales & Repairs',
  'Import & Export',
  'Oil & Gas Services',
  'Energy & Utilities',
  'Cleaning & Maintenance Services',
  'Event Planning & Decorations',
  'Digital Marketing & Advertising',
  'E-commerce',
  'Other'
]
const roleOptions = [
  'Owner / Founder',
  'Co-Owner',
  'Managing Director',
  'Executive Director',
  'Operations Manager',
  'Finance Manager',
  'Partner',
  'Authorized Representative'
]
const goBack = () => {
  window.history.back()
}

const formattedRevenue = useFormattedFields(form, 'monthlyRevenue', { currency: true })

const saveAndContinue = async () => {
  if (!isFormValid.value) return

  loading.value = true

  try {
    const payload = {
      business_name: form.value.businessName,
      business_sector: form.value.businessSector,
      business_start_date: form.value.startDate,
      business_email: form.value.businessEmail,
      business_address: form.value.address,
      lcga: form.value.lga,
      business_type: form.value.businessType,
      cac_number: form.value.registrationNumber,
      monthly_revenue: form.value.monthlyRevenue,
      state: form.value.state,
      nearest_bus_stop: form.value.landmark,
      company_role: form.value.role
    }

    await LoanService.submitBusinessInfo(payload)

    loanStore.setStep(2)
    router.push('/file-upload')
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchDropdownList()
  console.log('States dropdown:', states.value)
  console.log('LGAs dropdown:', lgas.value)
})

watch(
  () => form.value.state,
  (newState) => {
    form.value.lga = ''
    console.log('Selected state:', newState, 'Available LGAs:', lgas.value[newState])
  }
)
</script>

<style scoped>
.custom-date .el-input__wrapper {
  height: 100px;
}

.custom-date .el-input__inner {
  height: 100px;
}
.custom-purple-date >>> .el-input__inner {
  color: #7c3aed !important; /* purple text */
}
</style>
