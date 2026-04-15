<template>
  <v-dialog v-model="dialog" max-width="420" persistent>
    <v-card class="rounded-xl pa-6 text-center">
      <!-- ICON -->
      <div class="flex justify-center mb-4">
        <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <i class="mdi mdi-close text-2xl text-red-600"></i>
        </div>
      </div>

      <!-- TITLE -->
      <h2 class="text-lg font-semibold text-gray-800">Application Declined</h2>

      <!-- MESSAGE -->
      <p class="text-sm text-gray-500 mt-2">
        We're sorry, your loan application was not approved at this time. You can try again later or
        contact support for more details.
      </p>

      <!-- OPTIONAL REASON -->
      <div v-if="reason" class="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 text-left">
        <p class="text-xs font-semibold text-red-600 uppercase mb-1">Reason</p>
        <p class="text-sm text-gray-600">
          {{ reason }}
        </p>
      </div>

      <!-- ACTIONS -->
      <div class="mt-6 flex gap-3">
        <button
          @click="close"
          class="flex-1 py-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
        >
          Close
        </button>

        <button
          @click="goDashboard"
          class="flex-1 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  modelValue: boolean
  reason?: string
}>()

const emit = defineEmits(['update:modelValue'])

const router = useRouter()

// ✅ THIS FIXES YOUR ERROR
const dialog = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val)
})

const close = () => {
  dialog.value = false
}

const goDashboard = () => {
  dialog.value = false
  router.push('/dashboard')
}
</script>
