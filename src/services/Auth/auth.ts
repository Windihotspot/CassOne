// src/services/auth.ts
import ApiService from '@/services/Api/api'

const TENANT_ID = 'b602f75e-9fce-4a1f-8516-212d69e0081f'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterStep1Payload {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
  phone_number: string
  date_of_birth: string
  bvn: string
  nin: string
}

export interface RegisterStep2Payload {
  house_number: string
  street_name: string
  state: string
  lga: string
}

const AuthService = {
  login(payload: LoginPayload) {
    console.log('login payload:', payload)
    return ApiService.post(`/${TENANT_ID}/client/login`, payload)
  },

  logout() {
    return ApiService.post(`/${TENANT_ID}/client/logout`)
  },
  forgotPassword(email: string) {
    return ApiService.post(`/${TENANT_ID}/client/forgot-password`, { email })
  },
  resetPassword(payload: { token: string; password: string; password_confirmation: string }) {
    return ApiService.post(`/${TENANT_ID}/client/reset-password`, payload)
  },
  registerStep1(payload: RegisterStep1Payload) {
    return ApiService.post(`/${TENANT_ID}/client/register-step-1`, payload)
  },

  registerStep2(payload: RegisterStep2Payload) {
    return ApiService.post(`/${TENANT_ID}/client/register-step-2`, payload)
  },

  sendVerification(payload?: { resend?: boolean }) {
    return ApiService.post(`/${TENANT_ID}/client/send-verification`, payload)
  },

  verifyEmail(token: string) {
    return ApiService.post(`/${TENANT_ID}/client/verify-email`, { token })
  }
}

export default AuthService
