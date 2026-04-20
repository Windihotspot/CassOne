<template>
  <MainLayout>
    <v-container fluid class="bg-gray-50 min-h-screen pa-4">
      <!-- HEADER -->
      <div class="flex justify-between items-start mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Risk Assessment Workspace</h1>
          <p class="text-sm text-gray-500">
            Compliance decision engine — classify, score, and define onboarding risk
          </p>
        </div>

        <v-chip :color="riskColor" class="text-white px-4 py-2">
          {{ riskLevel }}
        </v-chip>
      </div>

      <v-row>
        <!-- LEFT PANEL -->
        <v-col cols="12" md="8">
          <!-- 1. CLIENT SNAPSHOT -->
          <v-card class="rounded-2xl pa-5 shadow-md mb-6">
            <h3 class="text-lg font-semibold mb-4">📌 Client Snapshot</h3>

            <v-row dense>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="client.name"
                  label="Company Name"
                  variant="outlined"
                  readonly
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="client.regNo"
                  label="Registration Number"
                  variant="outlined"
                  readonly
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="client.country"
                  variant="outlined"
                  label="Country of Registration"
                  readonly
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="client.industry"
                  variant="outlined"
                  label="Industry Classification"
                  readonly
                />
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="client.businessModel"
                  label="Business Model (Read-only)"
                  readonly
                  rows="2"
                  variant="outlined"
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                  variant="outlined"
                  v-model="client.status"
                  label="Onboarding Status"
                  readonly
                />
              </v-col>
            </v-row>
          </v-card>

          <!-- 2. RISK INPUT ENGINE -->
          <v-card class="rounded-2xl pa-5 shadow-md mb-6">
            <h3 class="text-lg font-semibold mb-4">🧩 Risk Inputs Engine</h3>

            <v-row dense>
              <!-- Industry -->
              <v-col cols="12" md="6">
                <v-select
                  v-model="risk.industry"
                  :items="industryOptions"
                  label="Industry Risk"
                  variant="outlined"
                />
              </v-col>

              <!-- Regulatory -->
              <v-col cols="12" md="6">
                <v-select
                  v-model="risk.regulatory"
                  :items="regulatoryOptions"
                  label="Regulatory Standing"
                  variant="outlined"
                />
              </v-col>

              <!-- Geography -->
              <v-col cols="12" md="6">
                <v-select
                  v-model="risk.geography"
                  :items="geoOptions"
                  label="Geographic Risk"
                  variant="outlined"
                />
              </v-col>

              <!-- Activity -->
              <v-col cols="12">
                <v-select
                  v-model="risk.activities"
                  :items="activityOptions"
                  label="Business Activity Risk"
                  multiple
                  chips
                  variant="outlined"
                />
              </v-col>

              <!-- Transaction Profile -->
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="risk.monthlyVolume"
                  variant="outlined"
                  label="Expected Monthly Volume"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="risk.avgTxn"
                  variant="outlined"
                  label="Average Transaction Size"
                />
              </v-col>
            </v-row>
          </v-card>

          <!-- 4. HUMAN COMPLIANCE LAYER -->
          <v-card class="rounded-2xl pa-5 shadow-md mb-6">
            <h3 class="text-lg font-semibold mb-4">🧾 Findings & Compliance Notes</h3>

            <v-textarea
              v-model="risk.notes"
              label="Analyst Observations"
              rows="5"
              variant="outlined"
            />

            <v-select
              variant="outlined"
              v-model="risk.redFlags"
              :items="redFlags"
              label="Red Flags"
              multiple
              chips
              class="mt-4"
            />

            <v-textarea
              variant="outlined"
              v-model="risk.missingInfo"
              label="Missing Information"
              rows="3"
              class="mt-4"
            />
          </v-card>

          <!-- 5. GAP ANALYSIS -->
          <v-card class="rounded-2xl pa-5 shadow-md border-l-4 border-red-500">
            <h3 class="text-lg font-semibold mb-2">🚨 Gap Analysis</h3>

            <div class="text-sm text-gray-600 mb-4">
              Identified gaps will determine onboarding path and compliance tier.
            </div>

            <v-select
              variant="outlined"
              v-model="risk.caasTier"
              :items="caasOptions"
              label="Suggested CaaS Path"
            />

            <div class="flex gap-3 mt-4">
              <v-btn color="primary" @click="generateGap"> Generate Gap Analysis </v-btn>

              <v-btn color="success" @click="proceed"> Proceed to Recommendation </v-btn>
            </div>
          </v-card>
        </v-col>

        <!-- RIGHT PANEL -->
        <v-col cols="12" md="4">
          <v-card class="rounded-2xl pa-6 shadow-lg sticky top-6">
            <!-- SCORE -->
            <div class="text-center mb-6">
              <div class="text-4xl font-bold" :class="riskTextColor">
                {{ totalScore }}
              </div>
              <div class="text-sm text-gray-500">Total Risk Score</div>
            </div>

            <!-- RISK LEVEL -->
            <v-alert :type="riskAlert" class="mb-4"> {{ riskLevel }} Risk Profile </v-alert>

            <!-- BREAKDOWN -->
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span>Industry</span><b>{{ scores.industry }}</b>
              </div>
              <div class="flex justify-between">
                <span>Regulatory</span><b>{{ scores.regulatory }}</b>
              </div>
              <div class="flex justify-between">
                <span>Geography</span><b>{{ scores.geography }}</b>
              </div>
              <div class="flex justify-between">
                <span>Activity</span><b>{{ scores.activity }}</b>
              </div>
            </div>

            <v-divider class="my-4" />

            <!-- WHY RISK -->
            <h4 class="font-semibold mb-2">⚠️ Risk Drivers</h4>
            <ul class="text-xs text-gray-600 space-y-1">
              <li v-for="r in riskDrivers" :key="r">• {{ r }}</li>
            </ul>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </MainLayout>
</template>

<script setup>
import { reactive, computed } from 'vue'
import MainLayout from '@/components/Layouts/MainLayout.vue'
/**
 * CLIENT SNAPSHOT (READ ONLY)
 */
const client = reactive({
  name: 'Example FinTech Ltd',
  regNo: 'RC-123456',
  country: 'Nigeria',
  industry: 'Crypto Business',
  businessModel: 'Digital asset exchange and cross-border transfers',
  status: 'Under Review'
})

/**
 * RISK INPUT ENGINE
 */
const risk = reactive({
  industry: '',
  regulatory: '',
  geography: '',
  activities: [],
  monthlyVolume: '',
  avgTxn: '',
  notes: '',
  redFlags: [],
  missingInfo: '',
  caasTier: ''
})

/**
 * OPTIONS
 */
const industryOptions = [
  'FinTech startup',
  'Payment firm',
  'IMTO (Foreign)',
  'IMTO (Local)',
  'Crypto business',
  'FX firm',
  'High-risk non-financial entity'
]

const regulatoryOptions = [
  'Fully regulated',
  'Near regulated',
  'Not regulated (strong interest)',
  'Not regulated (no interest)',
  'Operating via regulated partner'
]

const geoOptions = [
  'Low-risk jurisdiction',
  'Medium-risk jurisdiction',
  'High-risk jurisdiction',
  'Sanctioned / monitored region'
]

const activityOptions = [
  'Cash-intensive operations',
  'Cross-border cash movement',
  'Crypto / digital assets',
  'High-value asset exchange',
  'Payment processing',
  'FX trading exposure'
]

const redFlags = [
  'Unverified ownership',
  'Sanctions exposure',
  'Opaque transaction flow',
  'Regulatory mismatch',
  'High-risk jurisdiction dependency'
]

const caasOptions = ['Starter', 'Growth', 'Tailored Enterprise']

/**
 * SCORING ENGINE
 */
const industryScoreMap = {
  'FinTech startup': 10,
  'Payment firm': 20,
  'IMTO (Foreign)': 25,
  'IMTO (Local)': 20,
  'Crypto business': 35,
  'FX firm': 30,
  'High-risk non-financial entity': 15
}

const regulatoryScoreMap = {
  'Fully regulated': 5,
  'Near regulated': 10,
  'Not regulated (strong interest)': 25,
  'Not regulated (no interest)': 30,
  'Operating via regulated partner': 15
}

const geoScoreMap = {
  'Low-risk jurisdiction': 5,
  'Medium-risk jurisdiction': 15,
  'High-risk jurisdiction': 25,
  'Sanctioned / monitored region': 40
}

const activityScoreMap = {
  'Cash-intensive operations': 15,
  'Cross-border cash movement': 20,
  'Crypto / digital assets': 30,
  'High-value asset exchange': 20,
  'Payment processing': 10,
  'FX trading exposure': 25
}

/**
 * SCORES
 */
const scores = computed(() => {
  const industry = industryScoreMap[risk.industry] || 0
  const regulatory = regulatoryScoreMap[risk.regulatory] || 0
  const geography = geoScoreMap[risk.geography] || 0

  const activity = risk.activities.reduce((a, b) => a + (activityScoreMap[b] || 0), 0)

  return { industry, regulatory, geography, activity }
})

const totalScore = computed(
  () =>
    scores.value.industry + scores.value.regulatory + scores.value.geography + scores.value.activity
)

/**
 * RISK LEVEL
 */
const riskLevel = computed(() => {
  if (totalScore.value > 85) return 'Severe'
  if (totalScore.value > 60) return 'High'
  if (totalScore.value > 35) return 'Medium'
  return 'Low'
})

const riskAlert = computed(() => {
  if (riskLevel.value === 'Severe') return 'error'
  if (riskLevel.value === 'High') return 'warning'
  if (riskLevel.value === 'Medium') return 'info'
  return 'success'
})

const riskTextColor = computed(() => {
  return {
    'text-red-600': riskLevel.value === 'Severe',
    'text-orange-500': riskLevel.value === 'High',
    'text-yellow-500': riskLevel.value === 'Medium',
    'text-green-600': riskLevel.value === 'Low'
  }
})

/**
 * RISK DRIVERS (WHY ENGINE)
 */
const riskDrivers = computed(() => {
  const reasons = []

  if (risk.industry === 'Crypto business') reasons.push('Crypto exposure (+35)')
  if (risk.regulatory.includes('Not regulated')) reasons.push('Weak regulatory oversight')
  if (risk.geography.includes('High-risk')) reasons.push('High-risk jurisdiction exposure')
  if (risk.activities.includes('Cross-border cash movement'))
    reasons.push('Cross-border cash flows')

  return reasons
})

/**
 * ACTIONS
 */
const generateGap = () => {
  console.log('Gap analysis generated', risk)
}

const proceed = () => {
  console.log('Proceeding to recommendation engine')
}
</script>

<style scoped>
.v-btn {
  text-transform: none;
}
</style>
