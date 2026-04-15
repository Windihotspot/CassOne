import ApiService from '@/services/Api/api'
import { useLoanApplicationStore } from '@/views/Loans/BusinessLoan/stores/loanApplication'

const TENANT = 'b602f75e-9fce-4a1f-8516-212d69e0081f'

export const LoanService = {
  async initiateLoan(payload: any) {
    console.log('🚀 Initiate Loan Payload:', payload)

    const response = await ApiService.post(
      `/${TENANT}/client/loan/initiate-loan-application`,
      payload
    )

    console.log('✅ Initiate Loan Response:', response)

    // ❌ Move this inside the function
    const loanStore = useLoanApplicationStore()
    loanStore.setLoan(response.data)

    console.log('Loan Store after setLoan:', loanStore.$state)

    return response
  },

  async submitBusinessInfo(payload: any) {
    console.log('🏢 Business Info Payload:', payload)

    const response = await ApiService.post(
      `/${TENANT}/client/loan/submit-business-information`,
      payload
    )

    console.log('✅ Business Info Response:', response)

    return response
  },

  async submitDocument(loanId: number, formData: FormData) {
    console.log('📄 Submit Document Loan ID:', loanId)

    console.log('📄 Submit Document Files:')
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1])
    }

    const response = await ApiService.upload(
      `/${TENANT}/client/loan/submit-document?loan_id=${loanId}`,
      formData
    )

    console.log('✅ Submit Document Response:', response)

    return response
  },

  async submitDisbursement(payload: any) {
    console.log('💳 Disbursement Payload:', payload)

    const response = await ApiService.post(`/${TENANT}/client/loan/submit-bank-details`, payload)

    console.log('✅ Disbursement Response:', response)

    return response
  },

  async initiateBiometricKyc(images: string[]) {
    const payload = {
      event: {
        images
      }
    }

    console.log('📸 Biometric KYC Payload:', payload)

    const response = await ApiService.post(`/${TENANT}/client/loan/initiate-biometric-kyc`, payload)

    console.log('✅ Biometric KYC Response:', response)

    return response
  },
  /** NEW: Fetch loan application data by page */
  async getLoanApplicationData(loan_id: number, application_page: number) {
    const payload = {
      loan_id,
      application_page
    }

    console.log('📄 Get Loan Application Data Payload:', payload)

    const response = await ApiService.get(
      `/${TENANT}/client/loan/get-loan-application-data`,
      { params: payload } // GET request expects query params
    )

    console.log('✅ Loan Application Data Response:', response)

    // Update store
    const loanStore = useLoanApplicationStore()
    loanStore.setLoanApplication(response.data)

    return response
  }
}
