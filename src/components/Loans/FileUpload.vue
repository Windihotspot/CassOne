<template>
  <div class="flex items-center space-x-4">
    <!-- Image preview -->
    <div v-if="previewUrl" class="w-16 h-16 border rounded overflow-hidden flex-shrink-0">
      <img :src="previewUrl" alt="Preview" class="w-full h-full object-cover" />
    </div>

    <!-- Label + Input -->
    <div class="flex-1">
      <!-- Label -->
      <label class="block text-sm font-medium text-gray-700 mb-2">
        {{ label }}
      </label>

      <!-- File Input -->
      <v-file-input
        v-model="internalFile"
        variant="outlined"
        density="comfortable"
        hide-details="auto"
        append-inner-icon="mdi-upload"
        show-size
        :accept="accept"
        :rules="rules"
        class="h-16"
        style="line-height: 1.5; padding-bottom: 0.5rem"
        @update:modelValue="emitFile"
      />

      <!-- Optional helper text -->
      <p v-if="hint" class="text-xs text-gray-400 mt-1">
        {{ hint }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  label: String,
  modelValue: File,
  accept: {
    type: String,
    default: '.jpg,.jpeg,.png,.pdf'
  },
  hint: String,
  rules: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const internalFile = ref(props.modelValue || null)

// Generate preview URL for images
const previewUrl = computed(() => {
  if (!internalFile.value) return null
  const file = internalFile.value
  // Only preview image files
  if (file.type.startsWith('image/')) {
    return URL.createObjectURL(file)
  }
  return null
})

watch(
  () => props.modelValue,
  (val) => {
    internalFile.value = val
  }
)

const emitFile = (file) => {
  internalFile.value = file
  emit('update:modelValue', file)
}
</script>