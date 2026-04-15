<template>
  <div class="w-full">
    <label v-if="label" class="form-label">{{ label }}</label>

    <el-date-picker
      v-model="internalValue"
      type="date"
      size="large"
      class="custom-purple-date w-full"
      style="width: 100%; height: 50px;"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  },
  label: {
    type: String,
    default: ""
  },
  placeholder: {
    type: String,
    default: "Select date"
  }
})

const emit = defineEmits(["update:modelValue"])

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val)
})
</script>

<style scoped>
.custom-purple-date :deep(.el-input__wrapper) {
  height: 50px;
  border-radius: 8px;
}

.custom-purple-date :deep(.el-input__inner) {
  color: #7c3aed;
}
</style>