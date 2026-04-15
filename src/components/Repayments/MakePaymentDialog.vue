<template>
  <v-dialog v-model="model" max-width="420" persistent>
    <v-card class="rounded-2xl pa-5">
      <!-- CLOSE -->
      <div class="flex justify-end">
        <button @click="close">
          <i class="mdi mdi-close text-gray-500 text-xl"></i>
        </button>
      </div>

      <!-- TITLE -->
      <div class="mb-1">
        <h2 class="text-lg font-bold text-gray-800">Make a Payment</h2>
        <p class="text-xs text-gray-500">Instalment 2</p>
      </div>

      <!-- AMOUNT CARD -->
      <div class="bg-purple-50 rounded-xl p-4 mt-4 text-center">
        <p class="text-xs text-gray-500">Total Amount Due</p>

        <h1 class="text-3xl font-extrabold text-purple-700 mt-1">₦{{ amount.toLocaleString() }}</h1>

        <p class="text-xs text-gray-500 mt-2">
          Principal: ₦85,000 + Late penalty:
          <span class="text-red-500 font-semibold">₦8,500</span>
        </p>
      </div>

      <!-- PAYMENT METHODS -->
      <div class="mt-5">
        <p class="text-xs font-semibold text-gray-500 uppercase mb-3">Select Payment Method</p>

        <v-radio-group v-model="paymentMethod" class="space-y-6">
          <!-- GTBANK -->
          <div class="border rounded-md p-3 mb-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <i class="mdi mdi-bank text-purple-600 text-xl"></i>
              <div>
                <p class="text-sm font-semibold text-gray-800">GTBank ••••4892</p>
                <p class="text-xs text-gray-500">Savings Account · Auto-Debit enabled</p>
              </div>
            </div>
          </div>

          <!-- WALLET -->
          <div class="border rounded-md p-4 p-3 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <i class="mdi mdi-wallet text-gray-600 text-xl"></i>
              <div>
                <p class="text-sm font-semibold text-gray-800">Credmate Wallet</p>
                <p class="text-xs text-gray-500">
                  Balance: ₦12,400 — Insufficient for this payment
                </p>
              </div>
            </div>
          </div>

          <!-- BANK TRANSFER -->
          <div class="border rounded-md mb-4 p-3 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <i class="mdi mdi-bank-transfer text-gray-600 text-xl"></i>
              <div>
                <p class="text-sm font-semibold text-gray-800">USSD / Bank Transfer</p>
                <p class="text-xs text-gray-500">Pay via *737# or direct bank transfer</p>
              </div>
            </div>
          </div>
        </v-radio-group>
      </div>

      <!-- SECURITY NOTICE -->
      <div class="mt-4 bg-gray-50 border rounded-lg p-3 flex items-center gap-2">
        <i class="mdi mdi-lock text-gray-500"></i>
        <p class="text-xs text-gray-500">
          256-bit SSL encrypted. Your payment details are never stored on our servers.
        </p>
      </div>

      <!-- CTA -->
      <button
        class="w-full mt-5 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center gap-2"
      >
        <i class="mdi mdi-flash"></i>
        Pay Now (Overdue)
      </button>

      <!-- CANCEL -->
      <button class="w-full mt-3 py-2 border rounded-xl text-gray-600" @click="close">
        Cancel
      </button>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  amount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const paymentMethod = ref('gtbank')

const close = () => {
  model.value = false
}
</script>
