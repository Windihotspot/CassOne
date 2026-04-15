<template>
  <transition name="slide-fade">
    <div
      v-if="show"
      class="fixed top-6 right-6 z-50 min-w-[300px] max-w-sm px-5 py-4 rounded-lg shadow-xl text-white"
      :class="typeClass"
    >
      <div class="flex items-start justify-between gap-3">
        <div class="text-sm font-medium">
          {{ message }}
        </div>

        <button
          @click="$emit('close')"
          class="text-white/80 hover:text-white text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  show: Boolean,
  message: String,
  type: {
    type: String,
    default: "error"
  }
})

defineEmits(["close"])

const typeClass = computed(() => {
  if (props.type === "success") return "bg-green-600"
  if (props.type === "warning") return "bg-orange-500"
  return "bg-red-600"
})
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>