<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    width="560"
  >
    <div class="bg-white rounded-2xl p-6 overflow-hidden">

      <!-- Animated Wrapper -->
      <Transition name="slide-fade" mode="out-in">
        
        <!-- ================= LOAN DETAILS VIEW ================= -->
        <div v-if="step === 'details'" key="details" class="space-y-6">

          <h3 class="text-base font-semibold text-gray-900">
            Loan Details
          </h3>

          <!-- Purple Info Card -->
          <div class="bg-purple-200/70 rounded-lg p-6 grid grid-cols-2 gap-y-6 text-sm">

            <div>
              <p class="text-gray-600">Loan Type</p>
              <p class="font-semibold mt-1">Personal</p>
            </div>

            <div>
              <p class="text-gray-600">Status</p>
              <p class="font-semibold mt-1">Active</p>
            </div>

            <div>
              <p class="text-gray-600">Amount</p>
              <p class="font-semibold mt-1">₦30,000</p>
            </div>

            <div>
              <p class="text-gray-600">Tenure</p>
              <p class="font-semibold mt-1">3 months</p>
            </div>

            <div>
              <p class="text-gray-600">Interest Rate</p>
              <p class="font-semibold mt-1">7% / month</p>
            </div>

            <div>
              <p class="text-gray-600">Monthly Repayment</p>
              <p class="font-semibold mt-1">₦30,000</p>
            </div>

          </div>

          <!-- Loan Schedule -->
          <div class="bg-[#FAFAFA] rounded-lg p-6 space-y-6">
            <h4 class="text-sm font-semibold text-purple-700">
              Loan Schedule
            </h4>

            <div v-for="(item, i) in schedule" :key="i" class="flex justify-between items-center">
              <div>
                <p class="font-medium">₦120,000</p>
                <p class="text-xs text-gray-500 mt-1">
                  Due: 27 Jan 2026
                </p>
              </div>

              <span
                :class="[
                  'text-xs font-medium px-4 py-1.5 rounded-full',
                  item.status === 'Paid'
                    ? 'bg-green-300 text-green-900'
                    : 'bg-yellow-200 text-yellow-800'
                ]"
              >
                {{ item.status }}
              </span>
            </div>
          </div>

          <!-- Notice -->
          <div class="bg-yellow-100 rounded-lg p-4 text-xs text-gray-700">
            Transfer the exact amount to the virtual account above.
            Your payment will be automatically confirmed within 5 minutes.
          </div>

          <!-- Actions -->
          <div class="flex gap-4 pt-2">
            <v-btn
              variant="outlined"
              class="flex-1 !rounded-lg !capitalize"
              @click="$emit('update:modelValue', false)"
            >
              Cancel
            </v-btn>

            <v-btn
              class="flex-1 !bg-purple-600 !text-white !rounded-lg !capitalize"
              @click="step = 'payment'"
            >
              Make Repayment
            </v-btn>
          </div>

        </div>


        <!-- ================= PAYMENT VIEW ================= -->
        <div v-else key="payment" class="space-y-6">

          <h3 class="text-base font-semibold text-gray-900">
            Make Payment
          </h3>

          <!-- Transfer Card -->
          <div class="bg-purple-200/70 rounded-lg p-5 space-y-3">
            <div class="text-sm font-medium text-gray-900">
              Transfer to this account
            </div>

            <div class="grid grid-cols-2 gap-y-2 text-sm">
              <span class="text-gray-700">Bank</span>
              <span class="text-right font-medium">{{ bank }}</span>

              <span class="text-gray-700">Account Number</span>
              <span class="text-right font-medium">{{ accountNumber }}</span>

              <span class="text-gray-700">Account Name</span>
              <span class="text-right font-medium">{{ accountName }}</span>
            </div>
          </div>

          <!-- Payment Summary -->
          <div class="bg-[#FAFAFA] rounded-lg p-5 space-y-4">
            <h4 class="text-sm font-semibold text-gray-900">
              Payment Summary
            </h4>

            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Principal Amount</span>
                <span class="font-medium">₦{{ principal.toLocaleString() }}</span>
              </div>

              <div class="flex justify-between">
                <span class="text-gray-600">Interest Amount</span>
                <span class="font-medium">₦{{ interest.toLocaleString() }}</span>
              </div>

              <div class="flex justify-between font-semibold pt-2">
                <span>Total Amount</span>
                <span>₦{{ total.toLocaleString() }}</span>
              </div>
            </div>
          </div>

          <!-- Back + Confirm -->
          <div class="flex gap-4 pt-2">
            <v-btn
              variant="outlined"
              class="flex-1 !rounded-lg !capitalize"
              @click="step = 'details'"
            >
              Back
            </v-btn>

            <v-btn
              class="flex-1 !bg-purple-600 !text-white !rounded-lg !capitalize"
              @click="confirmPayment"
            >
              I've Made The Transfer
            </v-btn>
          </div>

        </div>

      </Transition>
    </div>
  </v-dialog>
</template>


<script setup>
import { ref, computed } from 'vue'
const step = ref('details')

const schedule = [
  { status: 'Paid' },
  { status: 'Pending' },
  { status: 'Pending' }
]
const props = defineProps({
  modelValue: Boolean,
  bank: String,
  accountNumber: String,
  accountName: String,
  principal: Number,
  interest: Number
})

const emit = defineEmits(['update:modelValue', 'confirmed'])

const total = computed(() => props.principal + props.interest)

const confirmPayment = () => {
  emit('confirmed')
  emit('update:modelValue', false)
}
</script>
