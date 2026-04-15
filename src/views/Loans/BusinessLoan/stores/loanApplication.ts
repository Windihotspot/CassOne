import { defineStore } from "pinia"

export const useLoanApplicationStore = defineStore("loanApplication", {
  state: () => ({
    loanId: null as number | null,
    loanUUID: null as string | null,
    step: 1,

    // ✅ NEW
    status: null as string | null,
    previousData: null as any
  }),

  actions: {
    setLoan(data: any) {
      const loan = data.loan

      this.loanUUID = loan.id
      this.loanId = loan.id
      this.step = loan.loan_application_page || 1
      this.status = loan.loan_application_status || null

      // ✅ store previous data
      this.previousData = data.previous_loan_data || null
    },

    setStep(step: number) {
      this.step = step
    },

    reset() {
      this.loanId = null
      this.loanUUID = null
      this.step = 1
      this.status = null
      this.previousData = null
    }
  },

  persist: true
})