<template>
  <MainLayout>
    <v-container fluid class="bg-[#F4F6FA] min-h-screen pa-6">
      <!-- HEADER -->
      <div class="flex justify-between items-start mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Gap Analysis Engine</h1>
          <p class="text-sm text-gray-500">
            Identify compliance gaps, risk exposures, and onboarding blockers
          </p>
        </div>

        <div class="flex gap-2">
          <v-btn variant="outlined" prepend-icon="mdi-download"> Export Report </v-btn>
          <v-btn color="#1565C0" prepend-icon="mdi-check"> Finalize Analysis </v-btn>
        </div>
      </div>

      <v-row>
        <!-- LEFT PANEL -->
        <v-col cols="12" md="8">
          <!-- CLIENT CONTEXT -->
          <v-card class="rounded-2xl pa-5 mb-6 shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold">📌 Client Context</h3>
              <v-chip :color="riskColor" variant="tonal"> {{ client.riskLevel }} Risk </v-chip>
            </div>

            <v-row dense>
              <v-col cols="12" md="6">
                <v-text-field v-model="client.name" label="Company" readonly variant="outlined" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="client.country"
                  label="Country"
                  readonly
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="client.industry"
                  label="Industry"
                  readonly
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="client.status" label="Status" readonly variant="outlined" />
              </v-col>
            </v-row>
          </v-card>

          <!-- GAP DETECTION -->
          <v-card class="rounded-2xl pa-5 mb-6 shadow-sm">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold">🧩 Gap Detection Engine</h3>
              <v-btn size="small" color="primary" @click="runGapAnalysis"> Run Analysis </v-btn>
            </div>

            <div class="space-y-3">
              <div
                v-for="gap in gaps"
                :key="gap.id"
                class="p-4 rounded-xl border flex justify-between items-start"
                :class="gapBorder(gap.severity)"
              >
                <div class="flex gap-3">
                  <v-icon :color="gapIconColor(gap.severity)">
                    {{ gap.icon }}
                  </v-icon>

                  <div>
                    <p class="font-semibold text-gray-800">{{ gap.title }}</p>
                    <p class="text-xs text-gray-500">{{ gap.description }}</p>

                    <div class="flex gap-2 mt-2">
                      <v-chip size="x-small" :color="gapColor(gap.severity)" variant="tonal">
                        {{ gap.severity }}
                      </v-chip>
                      <v-chip size="x-small" variant="outlined">
                        +{{ gap.impact }} Risk Points
                      </v-chip>
                    </div>
                  </div>
                </div>

                <v-switch v-model="gap.resolved" color="success" hide-details />
              </div>
            </div>
          </v-card>

          <!-- COMPLIANCE CATEGORIES -->
          <v-card class="rounded-2xl pa-5 shadow-sm">
            <h3 class="text-lg font-semibold mb-4">📊 Compliance Coverage</h3>

            <div class="space-y-4">
              <div v-for="cat in categories" :key="cat.name">
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-medium">{{ cat.name }}</span>
                  <span class="text-xs text-gray-500">{{ cat.score }}%</span>
                </div>

                <v-progress-linear
                  :model-value="cat.score"
                  height="8"
                  rounded
                  :color="cat.score > 80 ? 'success' : cat.score > 50 ? 'warning' : 'error'"
                />
              </div>
            </div>
          </v-card>
        </v-col>

        <!-- RIGHT PANEL -->
        <v-col cols="12" md="4">
          <!-- SUMMARY SCORE -->
          <v-card class="rounded-2xl pa-6 mb-6 shadow-md text-center">
            <div class="text-4xl font-bold" :class="riskText">
              {{ totalGapScore }}
            </div>
            <div class="text-sm text-gray-500">Total Gap Exposure</div>

            <v-divider class="my-4" />

            <v-alert :type="riskAlert">
              {{ riskMessage }}
            </v-alert>
          </v-card>

          <!-- BLOCKERS -->
          <v-card class="rounded-2xl pa-5 mb-6 shadow-sm">
            <h3 class="text-sm font-bold mb-3">🚨 Critical Blockers</h3>

            <ul class="text-xs space-y-2">
              <li v-for="b in blockers" :key="b">• {{ b }}</li>
            </ul>
          </v-card>

          <!-- RECOMMENDATION -->
          <v-card class="rounded-2xl pa-5 shadow-sm">
            <h3 class="text-sm font-bold mb-3">💡 Recommendation</h3>

            <v-select
              v-model="recommendation"
              :items="['Reject', 'On Hold', 'Conditional Approval', 'Proceed to Onboarding']"
              label="Decision"
              variant="outlined"
            />

            <v-textarea
              v-model="notes"
              label="Analyst Notes"
              rows="4"
              variant="outlined"
              class="mt-3"
            />

            <v-btn block color="#1565C0" class="mt-4" prepend-icon="mdi-content-save">
              Save Decision
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </MainLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import MainLayout from '@/components/Layouts/MainLayout.vue'

/**
 * CLIENT
 */
const client = ref({
  name: 'CryptoNova NG',
  country: 'Nigeria',
  industry: 'Crypto Business',
  status: 'Under Review',
  riskLevel: 'High'
})

/**
 * GAPS ENGINE
 */
const gaps = ref([
  {
    id: 1,
    title: 'Missing AML Policy',
    description: 'No formal AML/CFT policy submitted',
    severity: 'High',
    impact: 25,
    icon: 'mdi-shield-alert',
    resolved: false
  },
  {
    id: 2,
    title: 'Unverified Ownership Structure',
    description: 'Beneficial ownership not fully disclosed',
    severity: 'Severe',
    impact: 35,
    icon: 'mdi-account-alert',
    resolved: false
  },
  {
    id: 3,
    title: 'Weak Transaction Monitoring',
    description: 'No evidence of real-time monitoring system',
    severity: 'Medium',
    impact: 15,
    icon: 'mdi-chart-line',
    resolved: false
  }
])

/**
 * CATEGORIES
 */
const categories = ref([
  { name: 'AML Compliance', score: 45 },
  { name: 'Regulatory Standing', score: 70 },
  { name: 'Operational Risk', score: 60 },
  { name: 'Geographic Exposure', score: 40 }
])

/**
 * BLOCKERS
 */
const blockers = computed(() =>
  gaps.value.filter((g) => g.severity === 'Severe' && !g.resolved).map((g) => g.title)
)

/**
 * SUMMARY SCORE
 */
const totalGapScore = computed(() =>
  gaps.value.reduce((sum, g) => sum + (g.resolved ? 0 : g.impact), 0)
)

/**
 * RECOMMENDATION STATE
 */
const recommendation = ref('')
const notes = ref('')

/**
 * ENGINE
 */
const runGapAnalysis = () => {
  console.log('Running gap analysis...')
}

/**
 * UI HELPERS
 */
const gapColor = (s) => (s === 'Severe' ? 'error' : s === 'High' ? 'warning' : 'info')

const gapBorder = (s) =>
  s === 'Severe'
    ? 'border-red-300 bg-red-50'
    : s === 'High'
      ? 'border-orange-300 bg-orange-50'
      : 'border-yellow-300 bg-yellow-50'

const gapIconColor = (s) => (s === 'Severe' ? 'red' : s === 'High' ? 'orange' : 'amber')

const riskText = computed(() => {
  if (totalGapScore.value > 80) return 'text-red-600'
  if (totalGapScore.value > 50) return 'text-orange-500'
  return 'text-yellow-600'
})

const riskAlert = computed(() => {
  if (totalGapScore.value > 80) return 'error'
  if (totalGapScore.value > 50) return 'warning'
  return 'info'
})

const riskMessage = computed(() => {
  if (totalGapScore.value > 80) return 'Critical compliance failure risk'
  if (totalGapScore.value > 50) return 'Moderate compliance exposure'
  return 'Low compliance risk'
})
</script>

<style scoped>
.v-btn {
  text-transform: none;
}
</style>
