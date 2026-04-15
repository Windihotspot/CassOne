// src/stores/auth.ts
import { defineStore } from 'pinia'
import AuthService from '@/services/Auth/auth'

interface AuthState {
  token: string | null
  loading: boolean
  user: any | null
  registeredEmail: string
  applicationStatus: string | null
  applicationPage: number | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token'),
    loading: false,
    user: null,
    registeredEmail: '',
    applicationStatus: null,
    applicationPage: null
  }),

  actions: {
    // ✅ LOGIN
    async login(payload: { email: string; password: string }) {
      console.log('STORE LOGIN STARTED')

      try {
        this.loading = true

        const response = await AuthService.login(payload)
        console.log('login response from auth:', response)

        const data = response?.data.client
        console.log('login response data:', data)
        // ✅ Save
        this.token = response.data.token
        localStorage.setItem('token', response.data.token)
        // ✅ Save full client object
        this.user = data
        localStorage.setItem('user', JSON.stringify(data))
        console.log('login response application status:', data.application_status)
        // ✅ Save application state (FROM CLIENT!)
        this.applicationStatus = data.application_status
        this.applicationPage = data.application_page

        console.log('Saved status:', this.applicationStatus)
        console.log('Saved page:', this.applicationPage)

        return { success: true }
      } catch (error: any) {
        console.error('LOGIN ERROR:', error)

        return {
          success: false,
          message:
            error?.response?.data?.message || error.message || 'Login failed. Please try again.'
        }
      } finally {
        this.loading = false
      }
    },
    async registerStep1(payload: any) {
      try {
        this.loading = true
        console.log('personal info payload:', payload)
        const response = await AuthService.registerStep1(payload)
        console.log('personal info response:', response)
        const token = response.data.token

        this.token = token
        localStorage.setItem('token', token)

        this.user = response.data.client

        // Save email in store
        this.registeredEmail = payload.email
        return response
      } finally {
        this.loading = false
      }
    },

    async registerStep2(payload: any) {
      try {
        this.loading = true
        console.log('address info payload:', payload)
        const response = await AuthService.registerStep2(payload)
        console.log('address info response:', payload)
        this.user = response.data.client

        return response
      } finally {
        this.loading = false
      }
    },

    async sendVerification(resend = false) {
      try {
        this.loading = true

        const response = await AuthService.sendVerification(resend ? { resend: true } : {})

        return {
          success: true,
          message: response?.data?.message || 'Verification email sent'
        }
      } catch (error: any) {
        return {
          success: false,
          message:
            error?.response?.data?.message || error.message || 'Failed to send verification email'
        }
      } finally {
        this.loading = false
      }
    },

    async verifyEmail(token: string) {
      return await AuthService.verifyEmail(token)
    },
    async forgotPassword(email: string) {
      try {
        this.loading = true
        const response = await AuthService.forgotPassword(email)
        console.log('reset password response:', response)
        return {
          success: true,
          message: response.message
        }
      } catch (error: any) {
        return {
          success: false,
          message: error?.response?.data?.message || error.message || 'Something went wrong.'
        }
      } finally {
        this.loading = false
      }
    },
    async resetPassword(payload: {
      token: string
      password: string
      password_confirmation: string
    }) {
      try {
        this.loading = true

        const response = await AuthService.resetPassword(payload)

        return {
          success: true,
          message: response.message || 'Password reset successful'
        }
      } catch (error: any) {
        return {
          success: false,
          message: error?.response?.data?.message || error.message || 'Unable to reset password'
        }
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        this.loading = true

        // Call backend logout
        await AuthService.logout()
      } catch (error) {
        console.error('Logout API failed:', error)
        // Even if API fails, we still clear local session
      } finally {
        // Clear everything
        this.token = null
        this.user = null
        this.applicationStatus = null
        this.applicationPage = null

        localStorage.removeItem('token')
        localStorage.removeItem('user')

        this.loading = false
      }
    }
  },
  persist: true
})
