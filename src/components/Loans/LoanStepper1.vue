<template>
  <div class="stepper-wrapper">
    <!-- Mobile: Vertical layout -->
    <div class="stepper-mobile">
      <div v-for="(item, i) in steps" :key="'m-' + i" class="step-row">
        <div class="step-left">
          <div
            class="step-circle"
            :class="[
              currentStep > i + 1
                ? 'step-done'
                : currentStep === i + 1
                  ? 'step-active'
                  : 'step-pending'
            ]"
          >
            <i v-if="currentStep > i + 1" class="mdi mdi-check"></i>
            <span v-else>{{ i + 1 }}</span>
          </div>
          <div
            v-if="i !== steps.length - 1"
            class="step-vline"
            :class="currentStep > i + 1 ? 'vline-done' : 'vline-pending'"
          />
        </div>
        <span class="step-label" :class="currentStep >= i + 1 ? 'label-active' : 'label-pending'">
          {{ item }}
        </span>
      </div>
    </div>

    <!-- Desktop: Horizontal layout -->
    <div class="stepper-desktop">
      <template v-for="(item, i) in steps" :key="'d-' + i">
        <div class="step-col">
          <div
            class="step-circle"
            :class="[
              currentStep > i + 1
                ? 'step-done'
                : currentStep === i + 1
                  ? 'step-active'
                  : 'step-pending'
            ]"
          >
            <i v-if="currentStep > i + 1" class="mdi mdi-check"></i>
            <span v-else>{{ i + 1 }}</span>
          </div>
          <span class="step-label" :class="currentStep >= i + 1 ? 'label-active' : 'label-pending'">
            {{ item }}
          </span>
        </div>

        <div
          v-if="i !== steps.length - 1"
          class="step-hline"
          :class="currentStep > i + 1 ? 'hline-done' : 'hline-pending'"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentStep: Number,
  steps: Array
})
</script>

<style scoped>
.stepper-wrapper {
  width: 100%;
  background: white;
  border-radius: 1rem;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

/* ── Shared circle ── */
.step-circle {
  width: 2rem;
  height: 2rem;
  min-width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.2s;
}
.step-done {
  background: white;
  color: #9333ea;
  border: 1.5px solid #9333ea;
}
.step-active {
  background: linear-gradient(to right, #9333ea, #ec4899);
  color: white;
}
.step-pending {
  background: white;
  color: #9ca3af;
  border: 1.5px solid #d1d5db;
}

/* ── Shared label ── */
.step-label {
  font-size: 0.75rem;
  font-weight: 500;
}
.label-active {
  color: #9333ea;
}
.label-pending {
  color: #9ca3af;
}

/* ════════════════════════════
   MOBILE  (default, < 640px)
   ════════════════════════════ */
.stepper-desktop {
  display: none;
}

.stepper-mobile {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.step-row {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
}

.step-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.step-vline {
  width: 2px;
  flex: 1;
  min-height: 1.5rem;
  margin: 4px 0;
}
.vline-done {
  background: #c084fc;
}
.vline-pending {
  background: #e5e7eb;
}

.step-row .step-label {
  padding-top: 0.35rem; /* vertically align with circle centre */
  padding-bottom: 1.25rem;
}

/* ════════════════════════════
   DESKTOP  (≥ 640px)
   ════════════════════════════ */
@media (min-width: 640px) {
  .stepper-mobile {
    display: none;
  }
  .stepper-desktop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;
  }

  .step-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 10;
  }

  .step-col .step-label {
    margin-top: 0.5rem;
  }

  .step-hline {
    flex: 1;
    height: 2px;
    margin: 0 1rem;
    margin-bottom: 1.25rem; /* nudge up to circle level */
  }
  .hline-done {
    background: #c084fc;
  }
  .hline-pending {
    background: #e5e7eb;
  }
}
</style>
