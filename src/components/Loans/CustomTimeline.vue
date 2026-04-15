<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  steps: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="max-w-xl w-full mb-12">
    <div class="relative flex items-center justify-between">

      <div class="absolute top-4 left-10 right-10 h-[2px] bg-gray-100"></div>

      <div
        v-for="(label, index) in steps"
        :key="index"
        class="flex flex-col items-center relative z-10"
      >
        <div
          class="w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium"
          :class="index + 1 <= modelValue
            ? 'bg-green-600 text-white'
            : 'bg-white text-gray-600 border'"
        >
          {{ index + 1 }}
        </div>

        <p
          class="mt-3 text-sm"
          :class="index + 1 === modelValue
            ? 'text-gray-800 font-medium'
            : 'text-gray-500'"
        >
          {{ label }}
        </p>
      </div>

    </div>
  </div>
</template>