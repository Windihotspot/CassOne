<template>
  <MainLayout>
    <div class="min-h-screen p-6">
      <!-- HEADER -->
      <div class="mb-6">
        <h1 class="text-md font-bold text-[#1f1b3a]">Apply for a Loan</h1>
        <p class="text-xs text-gray-500 mt-1">
          Complete the steps below to submit your loan application. Decisions in under 60 seconds.
        </p>
      </div>

      <!-- STEPPER -->
      <LoanStepper1 :currentStep="2" :steps="steps" />
      <div class="flex">
        <div class="w-full mt-4 bg-white rounded-2xl shadow-sm p-8">
          <!-- Header -->
          <div class="mb-6">
            <h2 class="text-xl font-semibold text-gray-800">Employment Information</h2>
            <p class="text-sm text-gray-500 mt-1">
              Tell us about your income source so we can determine your eligibility.
            </p>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div class="grid md:grid-cols-2 gap-4">
              <!-- Employment Status -->
              <div>
                <label class="label">Employment Status <span>*</span></label>
                <v-select
                  color="purple"
                  v-model="form.employment_status"
                  :items="['Employed', 'Self Employed', 'Unemployed']"
                  label="Employment Status"
                  variant="outlined"
                  density="comfortable"
                />
              </div>

              <div>
                <label class="label">Business Name <span>*</span></label>
                <v-text-field
                  variant="outlined"
                  color="purple"
                  v-model="form.business_name"
                  placeholder="e.g. ABC Ventures"
                  density="comfortable"
                />
              </div>
            </div>

            <!-- Employer + Job Title -->
            <!-- <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="label">Employer / Business Name <span>*</span></label>
                <input
                  v-model="form.employer"
                  type="text"
                  placeholder="e.g. Dangote Group"
                  class="input"
                />
              </div>

              <div>
                <label class="label">Job Title <span>*</span></label>
                <input
                  v-model="form.jobTitle"
                  type="text"
                  placeholder="e.g. Software Engineer"
                  class="input"
                />
              </div>
            </div> -->

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="label">Business Sector <span>*</span></label>
                <v-select
                  v-model="form.business_sector"
                  :items="businessSectors"
                  placeholder="Select business sector"
                  variant="outlined"
                  searchable
                  clearable
                  color="purple"
                  density="comfortable"
                />
              </div>

              <div>
                <label class="label">CAC Number <span>*</span></label>
                <v-text-field
                  variant="outlined"
                  color="purple"
                  v-model="form.cac_number"
                  placeholder="e.g. 1111111"
                  density="comfortable"
                />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="label">Business Start Date <span>*</span></label>
                <v-menu v-model="dateMenu" :close-on-content-click="false" location="bottom">
                  <template #activator="{ props }">
                    <v-text-field
                      color="purple"
                      v-bind="props"
                      :model-value="displayDate"
                      placeholder="Business Start Date"
                      readonly
                      variant="outlined"
                      density="comfortable"
                    />
                  </template>

                  <v-date-picker
                    color="purple"
                    v-model="form.business_start_date"
                    @update:modelValue="dateMenu = false"
                  />
                </v-menu>
              </div>

              <div>
                <label class="label">Business Type <span>*</span></label>
                <v-select
                  color="purple"
                  v-model="form.business_type"
                  :items="['Sole Proprietorship', 'Partnership', 'Limited Liability Company']"
                  variant="outlined"
                  density="comfortable"
                />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="label">Business Address <span>*</span></label>
                <v-text-field
                  variant="outlined"
                  color="purple"
                  v-model="form.business_address"
                  density="comfortable"
                />
              </div>

              <div>
                <label class="label">State <span>*</span></label>
                <v-select
                  color="purple"
                  v-model="form.state"
                  :items="states"
                  item-title="label"
                  item-value="value"
                  placeholder="Select state"
                  variant="outlined"
                  density="comfortable"
                />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="label">LGA <span>*</span></label>
                <v-select
                  color="purple"
                  v-model="form.lcga"
                  :items="lgas[form.state] || []"
                  item-title="name"
                  item-value="id"
                  placeholder="Select LGA"
                  variant="outlined"
                  density="comfortable"
                />
              </div>

              <div>
                <label class="label">Nearest Bus Stop <span>*</span></label>
                <v-text-field
                  variant="outlined"
                  color="purple"
                  v-model="form.nearest_bus_stop"
                  density="comfortable"
                />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="label">Business Email <span>*</span></label>
                <v-text-field
                  variant="outlined"
                  color="purple"
                  v-model="form.business_email"
                  type="email"
                  density="comfortable"
                />
              </div>

              <div>
                <label class="label">Your Role <span>*</span></label>
                <v-select
                  v-model="form.company_role"
                  :items="roleOptions"
                  placeholder="Select your role"
                  variant="outlined"
                  color="purple"
                  density="comfortable"
                />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="label">Monthly Revenue (₦) <span>*</span></label>
                <v-text-field
                  variant="outlined"
                  color="purple"
                  v-model="form.monthly_revenue"
                  placeholder="e.g. 500000"
                  density="comfortable"
                />
              </div>

              <div>
                <label class="label">Years of Employment <span>*</span></label>
                <v-select
                  v-model="form.years_of_employment"
                  :items="['0 - 1 year', '1 - 3 years', '3 - 5 years', '5+ years']"
                  label="Years of Employment"
                  variant="outlined"
                  color="purple"
                  density="comfortable"
                />
              </div>
            </div>

            <!-- Address -->
            <!-- <div>
              <label class="label">Employer Address</label>
              <input
                v-model="form.address"
                type="text"
                placeholder="e.g. 1 Banana Island Road, Lagos"
                class="input"
              />
            </div> -->

            <!-- Actions -->
            <div class="flex items-center justify-between pt-4">
              <button
                type="button"
                @click="goBack"
                class="flex items-center gap-2 px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition"
              >
                ← Back
              </button>

              <button
                type="submit"
                :disabled="!isValid || loading"
                class="px-8 py-3 rounded-lg text-white font-medium transition bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="loading">Processing...</span>
                <span v-else>Continue to File Upload →</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/components/Layouts/MainLayout.vue'
import LoanStepper1 from '@/components/Loans/LoanStepper1.vue'
import { reactive, ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { LoanService } from '@/services/Loan/loanServices'
import { useLoanApplicationStore } from '@/views/Loans/BusinessLoan/stores/loanApplication'
import { useDropdowns } from '@/composables/useDropdowns'

const { states, lgas, fetchDropdownList } = useDropdowns()

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

const steps = [
  'Loan Details',
  'Employment',
  'File Upload',
  'Selfie Verification',
  'Bank Details',
  'Review & Submit'
]
const displayDate = computed(() => {
  if (!form.business_start_date) return ''

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(form.business_start_date)
})
const router = useRouter()
const loanStore = useLoanApplicationStore()
const error = ref(null)
const loading = ref(false)

const touched = ref(false)
const dateMenu = ref(false)
const form = reactive({
  business_name: '',
  business_sector: '',
  business_start_date: null,
  business_address: '',
  lcga: '',
  business_type: '',
  state: '',
  nearest_bus_stop: '',
  business_email: '',
  company_role: '',
  monthly_revenue: ''
})

const isValid = computed(() => {
  return (
    !!form.business_name &&
    !!form.business_sector &&
    !!form.business_start_date &&
    !!form.business_address &&
    !!form.lcga &&
    !!form.business_type &&
    !!form.state &&
    !!form.nearest_bus_stop &&
    !!form.business_email &&
    !!form.company_role &&
    Number(form.monthly_revenue) > 0
  )
})

onMounted(async () => {
  await fetchDropdownList()
})
watch(
  () => form.state,
  () => {
    form.lcga = ''
  }
)
const handleSubmit = async () => {
  touched.value = true

  if (!isValid.value) {
    error.value = 'Please complete all required fields'
    return
  }

  try {
    loading.value = true
    error.value = null

    if (!loanStore.loanId) {
      error.value = 'Loan session expired. Please start again.'
      router.push('/')
      return
    }

    const payload = {
      ...form,
      business_start_date: form.business_start_date
        ? form.business_start_date.toISOString().split('T')[0]
        : null
    }

    const response = await LoanService.submitBusinessInfo(payload)

    console.log('✅ Business info submitted:', response.data)

    router.push('/file-upload')
  } catch (err) {
    console.log('❌ Submission failed:', err)
    error.value = err?.response?.data?.data.message || 'Something went wrong'
  } finally {
    loading.value = false
  }
}
</script>
<style scoped>
.label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

.label span {
  @apply text-red-500;
}

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
</style>
