// src/services/dashboard.ts
import ApiService from '../Api/api'
import { useLoanApplicationStore } from '@/views/Loans/BusinessLoan/stores/loanApplication'
const TENANT_ID = 'b602f75e-9fce-4a1f-8516-212d69e0081f'

export interface DashboardPayload {
  start_date: string
  end_date: string
}

export interface LoanEvent {
  id: number
  loan_id: number
  event_type: string
  amount: string
  principal_component: string
  interest_component: string
  reference: string
  source: string
  created_at: string
}

export interface ActiveLoan {
  id: number
  loan_type: string
  loan_status: string
  created_at: string
  approval_level_1: boolean
  approval_level_2: boolean
  approval_level_3: boolean
}

export interface DashboardData {
  loan_balance: number
  next_repayment_amount: number
  total_repaid_amount: string
  active_loan: ActiveLoan | null
  loan_history: Record<string, LoanEvent[]>
}

export interface DashboardParams {
  start_date: string
  end_date: string
}

const DashboardService = {
  getDashboardData(params: DashboardParams) {
    const endpoint = `/${TENANT_ID}/client/get-dashboard-data`

    // Build query string
    // const query = new URLSearchParams(params).toString()
    // const fullUrl = `${endpoint}?${query}`

    // ✅ Logs
    console.log('Dashboard params:', params)
    // console.log('Dashboard full URL:', fullUrl)

    return ApiService.get(endpoint, { params })
  },

  deleteLoan(loan_id: number) {
    const endpoint = `/${TENANT_ID}/client/loan/delete-incomplete-loan-application`

    return ApiService.delete(endpoint, {
      data: { loan_id } 
    })
  },

  /** NEW: Fetch loan application data by page */
  async getLoanApplicationPage(loan_id: number, application_page: number) {
    const payload = {
      loan_id,
      application_page
    }

    console.log('📄 Get Loan Application Data Payload:', payload)

    const response = await ApiService.get(
      `/${TENANT_ID}/client/loan/get-loan-application-data`,
      { params: payload } // GET request expects query params
    )

    console.log('✅ Loan Application Data Response:', response)

    // Update store
    // const loanStore = useLoanApplicationStore()
    // loanStore.setLoanApplication(response.data)

    return response
  }
}

export default DashboardService
