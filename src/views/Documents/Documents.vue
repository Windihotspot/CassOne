<template>
  <MainLayout>
    <div class="p-4 space-y-6">
      <!-- HEADER -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-semibold">Documents Workspace</h1>
          <p class="text-sm text-slate-400">
            Centralized compliance document management across all clients
          </p>
        </div>

        <v-btn color="#1e88e5" prepend-icon="mdi-upload" @click="uploadDialog = true">
          Upload Document
        </v-btn>
      </div>

      <!-- STATS -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <v-card v-for="s in stats" :key="s.label" class="pa-4 rounded-lg">
          <div class="text-xs text-slate-400">{{ s.label }}</div>
          <div class="text-xl font-bold mt-1">{{ s.value }}</div>
        </v-card>
      </div>

      <!-- FILTER BAR -->
      <div class="flex flex-wrap gap-3 items-center">
        <v-text-field
          v-model="search"
          label="Search documents..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="compact"
          hide-details
        />

        <v-select
          v-model="filterCategory"
          :items="categories"
          label="Category"
          variant="outlined"
          density="compact"
          hide-details
        />

        <v-select
          v-model="filterRisk"
          :items="riskLevels"
          label="Risk Level"
          variant="outlined"
          density="compact"
          hide-details
        />
      </div>

      <!-- DOCUMENT GRID -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <v-card
          v-for="doc in filteredDocs"
          :key="doc.id"
          class="rounded-md pa-4 hover:shadow-lg transition cursor-pointer"
        >
          <!-- HEADER -->
          <div class="flex justify-between items-start">
            <div class="flex items-center gap-2">
              <v-icon icon="mdi-file-document-outline" color="#1e88e5" />
              <div>
                <div class="text-sm font-semibold truncate">{{ doc.name }}</div>
                <div class="text-xs text-slate-400">{{ doc.size }} • {{ doc.type }}</div>
              </div>
            </div>

            <v-chip size="x-small" :color="riskColor(doc.risk)">
              {{ doc.risk }}
            </v-chip>
          </div>

          <!-- META -->
          <div class="mt-3 space-y-1 text-xs text-slate-400">
            <div><b>Client:</b> {{ doc.client }}</div>
            <div><b>Category:</b> {{ doc.category }}</div>
            <div><b>Uploaded:</b> {{ doc.date }}</div>
          </div>

          <!-- TAGS -->
          <div class="mt-3 flex flex-wrap gap-1">
            <v-chip v-for="tag in doc.tags" :key="tag" size="x-small" variant="tonal" color="blue">
              {{ tag }}
            </v-chip>
          </div>

          <!-- ACTIONS -->
          <div class="flex justify-between mt-4">
            <v-btn size="x-small" variant="text" @click="preview(doc)"> Preview </v-btn>

            <div class="flex gap-1">
              <v-btn icon="mdi-download" size="x-small" variant="text" />
              <v-btn icon="mdi-delete-outline" size="x-small" variant="text" />
            </div>
          </div>
        </v-card>
      </div>

      <!-- EMPTY STATE -->
      <div v-if="filteredDocs.length === 0" class="text-center py-10 text-slate-500">
        No documents found matching your filters
      </div>

      <!-- UPLOAD DIALOG -->
      <v-dialog v-model="uploadDialog" max-width="600">
        <v-card class="pa-5">
          <h3 class="text-lg font-semibold mb-4">Upload Document</h3>

          <v-select v-model="upload.client" :items="clients" label="Client" variant="outlined" />

          <v-select
            v-model="upload.category"
            :items="categories"
            label="Category"
            variant="outlined"
            class="mt-3"
          />

          <v-file-input v-model="upload.file" label="Select File" variant="outlined" class="mt-3" />

          <v-text-field v-model="upload.tags" label="Tags (comma separated)" class="mt-3" />

          <div class="flex justify-end gap-2 mt-5">
            <v-btn variant="text" @click="uploadDialog = false">Cancel</v-btn>
            <v-btn color="#1e88e5" @click="submitUpload">Upload</v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import MainLayout from '@/components/Layouts/MainLayout.vue'

/**
 * STATE
 */
const search = ref('')
const filterCategory = ref('All')
const filterRisk = ref('All')

const uploadDialog = ref(false)

const upload = ref({
  client: '',
  category: '',
  file: null,
  tags: ''
})

/**
 * OPTIONS
 */
const categories = ['All', 'KYC', 'AML', 'Legal', 'Compliance', 'Business', 'Contracts']
const riskLevels = ['All', 'Low', 'Medium', 'High', 'Severe']

const clients = ['Zenith Pay Ltd', 'CryptoNova NG', 'FXGlobal Solutions', 'SwiftRemit Africa']

/**
 * MOCK DOCUMENTS (replace with API later)
 */
const documents = ref([
  {
    id: 1,
    name: 'CAC_Certificate.pdf',
    size: '1.2 MB',
    type: 'PDF',
    client: 'Zenith Pay Ltd',
    category: 'Business',
    risk: 'Low',
    date: '2026-01-12',
    tags: ['KYC', 'Verified']
  },
  {
    id: 2,
    name: 'AML_Policy_v2.pdf',
    size: '3.4 MB',
    type: 'PDF',
    client: 'CryptoNova NG',
    category: 'Compliance',
    risk: 'High',
    date: '2026-02-03',
    tags: ['AML', 'Review Required']
  },
  {
    id: 3,
    name: 'FCA_Licence.pdf',
    size: '0.8 MB',
    type: 'PDF',
    client: 'FXGlobal Solutions',
    category: 'Legal',
    risk: 'Medium',
    date: '2026-02-20',
    tags: ['Regulated']
  }
])

/**
 * FILTERED
 */
const filteredDocs = computed(() => {
  return documents.value.filter((d) => {
    const matchSearch =
      !search.value ||
      d.name.toLowerCase().includes(search.value.toLowerCase()) ||
      d.client.toLowerCase().includes(search.value.toLowerCase())

    const matchCategory = filterCategory.value === 'All' || d.category === filterCategory.value
    const matchRisk = filterRisk.value === 'All' || d.risk === filterRisk.value

    return matchSearch && matchCategory && matchRisk
  })
})

/**
 * STATS
 */
const stats = computed(() => [
  { label: 'Total Documents', value: documents.value.length },
  {
    label: 'KYC Docs',
    value: documents.value.filter((d) => d.category === 'KYC').length
  },
  {
    label: 'High Risk Docs',
    value: documents.value.filter((d) => d.risk === 'High' || d.risk === 'Severe').length
  },
  {
    label: 'Clients Covered',
    value: new Set(documents.value.map((d) => d.client)).size
  }
])

/**
 * HELPERS
 */
const riskColor = (risk) => {
  return {
    Low: 'green',
    Medium: 'yellow',
    High: 'orange',
    Severe: 'red'
  }[risk]
}

/**
 * ACTIONS
 */
const preview = (doc) => {
  console.log('preview document', doc)
}

const submitUpload = () => {
  documents.value.unshift({
    id: documents.value.length + 1,
    name: upload.value.file?.name || 'New File',
    size: '1.0 MB',
    type: 'PDF',
    client: upload.value.client,
    category: upload.value.category,
    risk: 'Medium',
    date: new Date().toISOString().split('T')[0],
    tags: upload.value.tags.split(',').map((t) => t.trim())
  })

  uploadDialog.value = false
}
</script>
