<template>
  <MainLayout>
    <div class="min-h-screen py-12 px-6">
      <!-- Title -->
      <h1 class="text-center text-xl font-semibold text-gray-900 mb-6">Business Loan Documents</h1>

      <!-- Stepper -->
      <LoanStepper1 :currentStep="3" :steps="steps" />

      <!-- Form Container -->
      <div class="mt-4 bg-white rounded-2xl shadow-sm p-12">
        <div class="grid md:grid-cols-2 gap-8 items-start">
          <FileUpload
            v-model="files.cacCertificate"
            :existingFile="existingDocs.cacCertificate"
            label="CAC Certificate"
          />

          <FileUpload
            v-model="files.cacForm7"
            :existingFile="existingDocs.cacForm7"
            label="CAC Form 7"
          />

          <FileUpload
            v-model="files.frontViewStore"
            :existingFile="existingDocs.frontViewStore"
            label="Front View of Store"
          />

          <FileUpload
            v-model="files.picturesView1"
            :existingFile="existingDocs.picturesView1"
            label="Pictures of What you Sell - View 1"
          />

          <FileUpload
            v-model="files.picturesView2"
            :existingFile="existingDocs.picturesView2"
            label="Pictures of What you Sell - View 2"
          />

          <FileUpload
            v-model="files.ownerPicture"
            :existingFile="existingDocs.ownerPicture"
            label="Picture of Business Owner in Store"
          />

          <FileUpload
            v-model="files.streetView"
            :existingFile="existingDocs.streetView"
            label="Street View"
          />

          <FileUpload
            v-model="files.governmentId"
            :existingFile="existingDocs.governmentId"
            label="Government ID"
          />

          <FileUpload
            v-model="files.bankStatement"
            :existingFile="existingDocs.bankStatement"
            label="Bank Statement"
          />

          <FileUpload
            v-model="files.additionalDoc"
            :existingFile="existingDocs.additionalDoc"
            label="Additional Document"
          />
        </div>

        <!-- Buttons -->

        <div class="flex items-center justify-between pt-4">
          <button
            type="button"
            @click="goBack"
            class="flex items-center gap-2 px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition"
          >
            ← Back
          </button>

          <button
            @click="submitDocuments"
            type="submit"
            :disabled="!isValid || loading"
            class="px-8 py-3 rounded-lg text-white font-medium transition bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Processing...</span>
            <span v-else>Continue to Selfie check →</span>
          </button>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import UserHeader from '@/components/Layouts/UserHeader.vue'
import LoanStepper from '@/components/Loans/LoanStepper.vue'
import FileUpload from '@/components/Loans/FileUpload.vue'
import LoanStepper1 from '@/components/Loans/LoanStepper1.vue'
import MainLayout from '@/components/Layouts/MainLayout.vue'
import { useRouter, useRoute } from 'vue-router'
import { LoanService } from '@/services/Loan/loanServices'
import { useLoanApplicationStore } from '@/views/Loans/BusinessLoan/stores/loanApplication'
import DashNavBar from '@/components/Layouts/DashNavBar.vue'

const steps = [
  'Loan Details',
  'Employment',
  'File Upload',
  'Selfie Verification',
  'Bank Details',
  'Review & Submit'
]

const route = useRoute()

const loanStore = useLoanApplicationStore()

const loanId = computed(() => loanStore.loanId)
const router = useRouter()
const currentStep = ref(2)
const loading = ref(false)

const existingDocs = reactive({
  cacCertificate: null,
  cacForm7: null,
  frontViewStore: null,
  picturesView1: null,
  picturesView2: null,
  ownerPicture: null,
  streetView: null,
  governmentId: null,
  bankStatement: null,
  additionalDoc: null
})

// reactive object to hold file inputs
const files = reactive({
  cacCertificate: null,
  cacForm7: null,
  frontViewStore: null,
  picturesView1: null,
  picturesView2: null,
  ownerPicture: null,
  streetView: null,
  governmentId: null,
  bankStatement: null,
  additionalDoc: null
})
const loan = useLoanApplicationStore()

const goBack = () => {
  window.history.back()
}

const submitDocuments = async () => {
  loading.value = true

  try {
    const formData = new FormData()

    // append each file with document + document_name
    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        formData.append('document', file)
        formData.append('document_name', key) // ✅ correct
      }
    })

    console.log('📄 FormData entries being sent:')
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1])
    }

    const response = await LoanService.submitDocument(loanId.value, formData)
    console.log('✅ Document Submission Response:', response)

    // move to next step after success
    currentStep.value = 3
    router.push('/selfie')
  } catch (error) {
    console.error('❌ Error submitting documents:', error)
  } finally {
    loading.value = false
  }
}

const mapDocsToFields = (docs) => {
  docs.forEach((doc) => {
    const name = doc.document_name?.toLowerCase() || ''

    if (name.includes('cac certificate')) existingDocs.cacCertificate = doc
    else if (name.includes('form 7')) existingDocs.cacForm7 = doc
    else if (name.includes('front')) existingDocs.frontViewStore = doc
    else if (name.includes('view 1')) existingDocs.picturesView1 = doc
    else if (name.includes('view 2')) existingDocs.picturesView2 = doc
    else if (name.includes('owner')) existingDocs.ownerPicture = doc
    else if (name.includes('street')) existingDocs.streetView = doc
    else if (name.includes('government')) existingDocs.governmentId = doc
    else if (name.includes('bank')) existingDocs.bankStatement = doc
    else existingDocs.additionalDoc = doc
  })
}

onMounted(() => {
  const docs = loanStore.previousData?.loan_documents || []

  if (docs.length) {
    mapDocsToFields(docs)
  }
})

const isValid = computed(() => {
  return Object.values(files).some((file) => file !== null)
})
</script>

<style scoped>
.v-btn {
  text-transform: none;
}
</style>
