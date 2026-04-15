<template>
  <div class="max-w-4xl mx-auto mb-10">
    <div class="flex items-center justify-between relative">

      <template v-for="(step, index) in steps" :key="index">
        
        <!-- Timeline -->
        <div class="flex flex-col items-center flex-1 relative">

          <!-- Connecting Line -->
          <div
            v-if="index !== steps.length - 1"
            class="absolute top-4 left-1/2 w-full h-[1px] ml-4 mr-4"
            :class="index + 1 < modelValue ? 'bg-green-500' : 'bg-gray-200'"
          ></div>

          <!-- Circle -->
          <div
            :class="[
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
              index + 1 <= modelValue
                ? 'bg-green-500 text-white'
                : 'bg-white border text-gray-500'
            ]"
          >
            {{ index + 1 }}
          </div>

          <!-- Label -->
          <p
            :class="[
              'mt-3 text-xs font-medium text-center',
              index + 1 <= modelValue
                ? 'text-gray-900'
                : 'text-gray-400'
            ]"
          >
            {{ step }}
          </p>

        </div>

      </template>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Number,
    required: true
  }
})

const steps = [
  'Business Information',
  'File Upload',
  'Selfie Verification',
  'Disbursement Account'
]
</script>
