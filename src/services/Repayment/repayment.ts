// src/services/RepaymentService.ts
import ApiService from '@/services/Api/api'
import { useLoanApplicationStore } from '@/views/Loans/BusinessLoan/stores/loanApplication'

const TENANT = 'b602f75e-9fce-4a1f-8516-212d69e0081f'

export const RepaymentService = {
  /**
   * Fetch repayment schedule for the active loan
   */
  async getRepaymentSchedule() {
    try {
      const loanStore = useLoanApplicationStore()
      const loanId = loanStore.loanId

      if (!loanId) throw new Error('Loan ID not available')

      console.log('Fetching repayment schedule for loan_id:', loanId)

      // GET request with loan_id as query parameter
      const response = await ApiService.get(
        `/${TENANT}/client/loan/repayment-schedule?loan_id=${loanId}`
      )
       console.log('repayment schedule response:', response)
      // Return the repayment schedules array
      return response.data?.repayment_schedules || []
    } catch (error: any) {
      console.error(
        'Error fetching repayment schedule:',
        error?.response?.data?.message || error.message
      )
      throw error
    }
  }
}