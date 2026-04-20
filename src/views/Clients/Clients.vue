<template>
  <MainLayout>
    <div class="">
      <!-- Page Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-xl font-semibold">Clients</h1>
          <p class="text-sm text-slate-400 mt-0.5">Manage and monitor all client engagements</p>
        </div>
        <v-btn
          color="#1e88e5"
          class="new-client-btn"
          prepend-icon="mdi-plus"
          @click="openNewClientDialog"
          elevation="0"
        >
          New Client
        </v-btn>
      </div>

      <!-- Filters & Search -->
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <div class="flex-1 min-w-[220px]">
          <v-text-field
            v-model="search"
            placeholder="Search clients..."
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="compact"
            hide-details
            class=""
          />
        </div>

        <v-select
          v-model="filterStatus"
          :items="statusOptions"
          label="Status"
          variant="outlined"
          density="compact"
          hide-details
          class=""
          style="max-width: 160px"
        />

        <v-select
          v-model="filterIndustry"
          :items="industryOptions"
          label="Industry"
          variant="outlined"
          density="compact"
          hide-details
          class=""
          style="max-width: 180px"
        />

        <v-select
          v-model="filterRisk"
          :items="riskOptions"
          label="Risk Level"
          variant="outlined"
          density="compact"
          hide-details
          class=""
          style="max-width: 160px"
        />

        <v-btn-toggle v-model="viewMode" mandatory density="compact" class="">
          <v-btn value="table" icon="mdi-table" size="small" />
          <v-btn value="grid" icon="mdi-view-grid" size="small" />
        </v-btn-toggle>
      </div>

      <!-- TABLE VIEW -->
      <div v-if="viewMode === 'table'" class="">
        <v-data-table
          :headers="headers"
          :items="filteredClients"
          :search="search"
          class=""
          item-value="id"
          :items-per-page="10"
          hover
        >
          <!-- Company Name -->
          <template #item.companyName="{ item }">
            <div class="flex items-center gap-3 py-1">
              <div class="avatar-circle" :style="{ background: getAvatarColor(item.companyName) }">
                {{ item.companyName.charAt(0) }}
              </div>
              <div>
                <div class="text-sm font-medium">{{ item.companyName }}</div>
                <div class="text-xs text-slate-400">{{ item.registrationNumber }}</div>
              </div>
            </div>
          </template>

          <!-- Industry -->
          <template #item.industry="{ item }">
            <v-chip size="x-small" class="industry-chip" variant="tonal">
              {{ item.industry }}
            </v-chip>
          </template>

          <!-- Risk Level -->
          <template #item.riskLevel="{ item }">
            <div class="flex items-center gap-1.5">
              <span class="risk-dot" :class="`risk-${item.riskLevel.toLowerCase()}`" />
              <span class="text-xs font-medium" :class="riskTextClass(item.riskLevel)">
                {{ item.riskLevel }}
              </span>
            </div>
          </template>

          <!-- Status -->
          <template #item.status="{ item }">
            <v-chip
              size="x-small"
              :color="statusColor(item.status)"
              variant="tonal"
              class="font-medium"
            >
              {{ item.status }}
            </v-chip>
          </template>

          <!-- Regulatory -->
          <template #item.regulatoryStanding="{ item }">
            <span class="text-xs">{{ item.regulatoryStanding }}</span>
          </template>

          <!-- Date -->
          <template #item.createdAt="{ item }">
            <span class="text-xs">{{ item.createdAt }}</span>
          </template>

          <!-- Actions -->
          <template #item.actions="{ item }">
            <div class="flex items-center gap-1">
              <v-btn
                icon="mdi-eye-outline"
                size="x-small"
                variant="text"
                color="slate"
                @click="viewClient(item)"
              />
              <v-btn
                icon="mdi-pencil-outline"
                size="x-small"
                variant="text"
                color="slate"
                @click="editClient(item)"
              />
              <v-btn
                icon="mdi-dots-vertical"
                size="x-small"
                variant="text"
                color="slate"
                @click.stop="openMenu($event, item)"
              />
            </div>
          </template>

          <!-- Bottom -->
          <template #bottom="{ pageCount, page, itemsPerPage, setPage }">
            <div class="flex items-center justify-between px-4 py-3">
              <span class="text-xs"> Showing {{ filteredClients.length }} clients </span>
              <v-pagination
                :model-value="page"
                :length="pageCount"
                density="compact"
                size="small"
                class=""
                @update:model-value="setPage"
              />
            </div>
          </template>
        </v-data-table>
      </div>

      <!-- GRID VIEW -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div
          v-for="client in filteredClients"
          :key="client.id"
          class="cursor-pointer"
          @click="viewClient(client)"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
              <div
                class="avatar-circle-lg"
                :style="{ background: getAvatarColor(client.companyName) }"
              >
                {{ client.companyName.charAt(0) }}
              </div>
              <div>
                <div class="text-sm font-semibold">{{ client.companyName }}</div>
                <div class="text-xs">{{ client.registrationNumber }}</div>
              </div>
            </div>
            <v-chip size="x-small" :color="statusColor(client.status)" variant="tonal">
              {{ client.status }}
            </v-chip>
          </div>

          <div class="grid grid-cols-2 gap-3 mb-4">
            <div class="">
              <div class="text-xs mb-0.5">Industry</div>
              <div class="text-xs font-medium">{{ client.industry }}</div>
            </div>
            <div class="">
              <div class="text-xs mb-0.5">Country</div>
              <div class="text-xs font-medium">{{ client.country }}</div>
            </div>
            <div class="">
              <div class="text-xs mb-0.5">Risk Level</div>
              <div class="flex items-center gap-1.5">
                <span class="risk-dot" :class="`risk-${client.riskLevel.toLowerCase()}`" />
                <span class="text-xs font-medium" :class="riskTextClass(client.riskLevel)">
                  {{ client.riskLevel }}
                </span>
              </div>
            </div>
            <div class="">
              <div class="text-xs mb-0.5">Regulatory</div>
              <div class="text-xs font-medium truncate">
                {{ client.regulatoryStanding }}
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between pt-3 border-t border-slate-700/50">
            <span class="text-xs text-slate-500">{{ client.createdAt }}</span>
            <div class="flex gap-1">
              <v-btn
                icon="mdi-eye-outline"
                size="x-small"
                variant="text"
                color="slate"
                @click.stop="viewClient(client)"
              />
              <v-btn
                icon="mdi-pencil-outline"
                size="x-small"
                variant="text"
                color="slate"
                @click.stop="editClient(client)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Context Menu -->
      <v-menu v-model="menuOpen" :target="menuTarget" location="bottom end">
        <v-list class="" bg-color="#1a2540" density="compact">
          <v-list-item
            prepend-icon="mdi-eye-outline"
            title="View Profile"
            @click="viewClient(menuClient)"
          />
          <v-list-item
            prepend-icon="mdi-pencil-outline"
            title="Edit Client"
            @click="editClient(menuClient)"
          />
          <v-list-item
            prepend-icon="mdi-file-chart-outline"
            title="Risk Assessment"
            @click="goToRisk(menuClient)"
          />
          <v-list-item
            prepend-icon="mdi-file-document-outline"
            title="Gap Analysis"
            @click="goToGap(menuClient)"
          />
          <v-divider class="border-slate-700" />
          <v-list-item
            prepend-icon="mdi-delete-outline"
            title="Delete Client"
            class="text-red-400"
            @click="confirmDelete(menuClient)"
          />
        </v-list>
      </v-menu>

      <!-- ===================== NEW CLIENT DIALOG ===================== -->
      <v-dialog v-model="newClientDialog" max-width="720" persistent scrollable>
        <v-card class="">
          <!-- Dialog Header -->
          <div
            class="dialog-header flex items-center justify-between px-6 py-4 border-b border-slate-700/60"
          >
            <div>
              <h2 class="text-lg font-semibold text-white">New Client</h2>
              <p class="text-xs text-slate-400 mt-0.5">
                Step {{ currentStep }} of 4 — {{ stepLabels[currentStep - 1] }}
              </p>
            </div>
            <v-btn icon="mdi-close" variant="text" size="small" @click="closeNewClientDialog" />
          </div>

          <!-- Step Progress -->
          <div class="px-6 pt-4 pb-2">
            <div class="step-progress flex gap-2">
              <div
                v-for="s in 4"
                :key="s"
                class="step-bar flex-1 h-1 rounded-full transition-all duration-300"
                :class="s <= currentStep ? 'bg-blue-500' : 'bg-blue-100'"
              />
            </div>
            <div class="flex justify-between mt-1.5">
              <span v-for="(label, i) in stepLabels" :key="i" class="text-[10px] text-slate-500">{{
                label
              }}</span>
            </div>
          </div>

          <v-card-text class="px-6 py-4" style="max-height: 520px; overflow-y: auto">
            <!-- STEP 1: Company Profile -->
            <div v-if="currentStep === 1">
              <div class="section-title">Company Information</div>
              <div class="grid grid-cols-2 gap-4 mb-4">
                <v-text-field
                  v-model="form.companyName"
                  label="Company Name *"
                  variant="outlined"
                  density="compact"
                  :rules="[(v) => !!v || 'Required']"
                />
                <v-text-field
                  v-model="form.registrationNumber"
                  label="Registration Number *"
                  variant="outlined"
                  density="compact"
                />
                <v-select
                  v-model="form.country"
                  :items="countryOptions"
                  label="Country of Registration *"
                  variant="outlined"
                  density="compact"
                />
                <v-select
                  v-model="form.industry"
                  :items="industryOptions.slice(1)"
                  label="Industry Classification *"
                  variant="outlined"
                  density="compact"
                />
              </div>
              <div class="section-title mt-2">Business Model</div>
              <v-textarea
                v-model="form.businessModel"
                label="Describe the business model in detail *"
                variant="outlined"
                density="compact"
                rows="4"
                class="mb-4"
              />
              <div class="section-title mt-2">Jurisdictions of Operation</div>
              <v-select
                v-model="form.jurisdictions"
                :items="countryOptions"
                label="Select all applicable jurisdictions"
                variant="outlined"
                density="compact"
                multiple
                chips
                closable-chips
              />
            </div>

            <!-- STEP 2: Intended Operations & Regulatory -->
            <div v-if="currentStep === 2">
              <div class="section-title">Intended Operations</div>
              <p class="text-xs text-slate-400 mb-3">
                Select all activities the business intends to conduct
              </p>
              <div class="grid grid-cols-1 gap-2 mb-5">
                <v-checkbox
                  v-for="op in operationOptions"
                  :key="op.value"
                  v-model="form.intendedOperations"
                  :label="op.label"
                  :value="op.value"
                  density="compact"
                  color="blue"
                  hide-details
                  class="op-checkbox"
                />
              </div>

              <div class="section-title mt-2">Regulatory Standing</div>
              <v-radio-group
                v-model="form.regulatoryStanding"
                class="mt-2"
                density="compact"
                color="blue"
              >
                <v-radio
                  v-for="opt in regulatoryOptions"
                  :key="opt.value"
                  :label="opt.label"
                  :value="opt.value"
                  class="reg-radio"
                />
              </v-radio-group>
            </div>

            <!-- STEP 3: Risk & Documents -->
            <div v-if="currentStep === 3">
              <div class="section-title">Initial Risk Classification</div>
              <p class="text-xs text-slate-400 mb-3">
                The system will auto-calculate risk; you may set an initial classification.
              </p>

              <div class="grid grid-cols-2 gap-3 mb-5">
                <div
                  v-for="level in riskLevelOptions"
                  :key="level.value"
                  class="risk-option-card"
                  :class="{ selected: form.riskLevel === level.value }"
                  @click="form.riskLevel = level.value"
                >
                  <div
                    class="risk-dot mb-2"
                    :class="`risk-${level.value.toLowerCase()}`"
                    style="width: 12px; height: 12px"
                  />
                  <div class="text-sm font-semibold" :class="level.textClass">
                    {{ level.label }}
                  </div>
                  <div class="text-xs text-slate-500 mt-0.5">{{ level.description }}</div>
                </div>
              </div>

              <div class="section-title">Document Upload</div>
              <p class="text-xs text-slate-400 mb-3">
                Upload initial documents. More can be added later.
              </p>
              <div class="upload-zone mb-3" @dragover.prevent @drop.prevent="handleDrop">
                <v-icon icon="mdi-cloud-upload-outline" size="32" color="#4a6fa5" class="mb-2" />
                <p class="text-sm text-slate-300">
                  Drag & drop files here or
                  <span class="text-blue-400 cursor-pointer" @click="triggerFileInput">browse</span>
                </p>
                <p class="text-xs text-slate-500 mt-1">
                  KYC, Business, Compliance docs · Max 10MB each
                </p>
                <input
                  ref="fileInput"
                  type="file"
                  multiple
                  class="hidden"
                  @change="handleFileSelect"
                />
              </div>

              <div v-if="form.documents.length" class="space-y-2">
                <div
                  v-for="(doc, i) in form.documents"
                  :key="i"
                  class="doc-item flex items-center gap-3"
                >
                  <v-icon icon="mdi-file-outline" size="18" color="#4a6fa5" />
                  <span class="text-xs text-slate-300 flex-1 truncate">{{ doc.name }}</span>
                  <v-select
                    v-model="doc.category"
                    :items="docCategories"
                    density="compact"
                    variant="outlined"
                    hide-details
                    style="max-width: 140px"
                  />
                  <v-btn
                    icon="mdi-close"
                    size="x-small"
                    variant="text"
                    @click="form.documents.splice(i, 1)"
                  />
                </div>
              </div>
            </div>

            <!-- STEP 4: Review & Submit -->
            <div v-if="currentStep === 4">
              <div class="section-title">Review Summary</div>
              <p class="text-xs mb-4">Confirm all details before creating the client profile.</p>

              <div class="review-section mb-4">
                <div class="review-section-label">Company Profile</div>
                <div class="grid grid-cols-2 gap-x-6 gap-y-2 mt-2">
                  <div class="review-row">
                    <span class="review-key">Company Name</span
                    ><span class="">{{ form.companyName || '—' }}</span>
                  </div>
                  <div class="review-row">
                    <span class="review-key">Reg. Number</span
                    ><span class="">{{ form.registrationNumber || '—' }}</span>
                  </div>
                  <div class="review-row">
                    <span class="review-key">Country</span
                    ><span class="">{{ form.country || '—' }}</span>
                  </div>
                  <div class="review-row">
                    <span class="review-key">Industry</span
                    ><span class="">{{ form.industry || '—' }}</span>
                  </div>
                </div>
                <div class="review-row mt-2">
                  <span class="review-key">Jurisdictions</span
                  ><span class="">{{ form.jurisdictions.join(', ') || '—' }}</span>
                </div>
              </div>

              <div class="review-section mb-4">
                <div class="review-section-label">Regulatory & Operations</div>
                <div class="review-row mt-2">
                  <span class="review-key">Regulatory Standing</span
                  ><span class="">{{ form.regulatoryStanding || '—' }}</span>
                </div>
                <div class="review-row mt-2">
                  <span class="review-key">Operations</span
                  ><span class="">{{ form.intendedOperations.join(', ') || '—' }}</span>
                </div>
              </div>

              <div class="review-section mb-4">
                <div class="review-section-label">Risk & Documents</div>
                <div class="review-row mt-2">
                  <span class="review-key">Risk Level</span>
                  <span class="flex items-center gap-1.5">
                    <span
                      class="risk-dot"
                      :class="`risk-${(form.riskLevel || '').toLowerCase()}`"
                    />
                    <span class="">{{ form.riskLevel || '—' }}</span>
                  </span>
                </div>
                <div class="review-row mt-2">
                  <span class="review-key">Documents</span
                  ><span class="">{{ form.documents.length }} file(s) attached</span>
                </div>
              </div>

              <div class="section-title mt-4">Initial Status</div>
              <v-radio-group v-model="form.status" row density="compact" color="blue" class="mt-2">
                <v-radio label="New" value="New" />
                <v-radio label="Under Review" value="Under Review" />
              </v-radio-group>

              <div class="section-title mt-3">Internal Notes</div>
              <v-textarea
                v-model="form.notes"
                label="Add any initial notes or observations"
                variant="outlined"
                density="compact"
                rows="3"
                class="mt-2"
              />
            </div>
          </v-card-text>

          <!-- Dialog Actions -->
          <div class="flex items-center justify-between px-6 py-4 border-t border-slate-700/60">
            <v-btn
              variant="text"
              :disabled="currentStep === 1"
              prepend-icon="mdi-arrow-left"
              @click="currentStep--"
            >
              Back
            </v-btn>
            <div class="flex gap-2">
              <v-btn variant="outlined" color="slate" @click="closeNewClientDialog">Cancel</v-btn>
              <v-btn
                v-if="currentStep < 4"
                color="#1e88e5"
                elevation="0"
                append-icon="mdi-arrow-right"
                @click="nextStep"
              >
                Continue
              </v-btn>
              <v-btn
                v-else
                color="#1e88e5"
                elevation="0"
                :loading="submitting"
                prepend-icon="mdi-check"
                @click="submitClient"
              >
                Create Client
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-dialog>

      <!-- VIEW CLIENT DRAWER -->
      <v-navigation-drawer v-model="viewDrawer" location="right" width="480" temporary>
        <div v-if="selectedClient" class="h-full flex flex-col">
          <!-- Drawer Header -->
          <div class="flex items-center justify-between px-6 py-4 border-slate-700/60">
            <div class="flex items-center gap-3">
              <div
                class="avatar-circle-lg"
                :style="{ background: getAvatarColor(selectedClient.companyName) }"
              >
                {{ selectedClient.companyName.charAt(0) }}
              </div>
              <div>
                <h3 class="text-base font-semibold">{{ selectedClient.companyName }}</h3>
                <p class="text-xs text-slate-400">{{ selectedClient.registrationNumber }}</p>
              </div>
            </div>
            <v-btn icon="mdi-close" variant="text" size="small" @click="viewDrawer = false" />
          </div>

          <!-- Status Bar -->
          <div class="flex items-center gap-2 px-6 py-3 border-b border-slate-700/40">
            <v-chip size="x-small" :color="statusColor(selectedClient.status)" variant="tonal">{{
              selectedClient.status
            }}</v-chip>
            <span class="text-slate-600">·</span>
            <div class="flex items-center gap-1.5">
              <span class="risk-dot" :class="`risk-${selectedClient.riskLevel.toLowerCase()}`" />
              <span class="text-xs" :class="riskTextClass(selectedClient.riskLevel)"
                >{{ selectedClient.riskLevel }} Risk</span
              >
            </div>
            <span class="">·</span>
            <span class="text-xs">{{ selectedClient.industry }}</span>
          </div>

          <!-- Drawer Tabs -->
          <v-tabs v-model="drawerTab" class="px-4 pt-2" density="compact" color="blue">
            <v-tab value="overview">Overview</v-tab>
            <v-tab value="documents">Documents</v-tab>
            <v-tab value="notes">Notes</v-tab>
            <v-tab value="activity">Activity</v-tab>
          </v-tabs>

          <v-window v-model="drawerTab" class="flex-1 overflow-auto">
            <!-- Overview Tab -->
            <v-window-item value="overview" class="px-6 py-4">
              <div class="mb-5">
                <div class="info-group-label">Company Details</div>
                <div class="info-row font-semibold">
                  <span>Country</span><span>{{ selectedClient.country }}</span>
                </div>
                <div class="info-row">
                  <span>Industry</span><span>{{ selectedClient.industry }}</span>
                </div>
                <div class="info-row">
                  <span>Regulatory Standing</span
                  ><span>{{ selectedClient.regulatoryStanding }}</span>
                </div>
                <div class="info-row">
                  <span>Created</span><span>{{ selectedClient.createdAt }}</span>
                </div>
              </div>
              <div class="info-group mb-5">
                <div class="info-group-label">Business Model</div>
                <p class="text-xs text-slate-300 leading-relaxed mt-2">
                  {{ selectedClient.businessModel }}
                </p>
              </div>
              <div class="info-group mb-5">
                <div class="info-group-label">Intended Operations</div>
                <div class="flex flex-wrap gap-1.5 mt-2">
                  <v-chip
                    v-for="op in selectedClient.operations"
                    :key="op"
                    size="x-small"
                    variant="tonal"
                    color="blue"
                    >{{ op }}</v-chip
                  >
                </div>
              </div>
              <div class="flex gap-2 mt-4">
                <v-btn
                  variant="outlined"
                  color="blue"
                  size="small"
                  prepend-icon="mdi-file-chart-outline"
                  class="flex-1"
                  @click="goToRisk(selectedClient)"
                  >Risk Assessment</v-btn
                >
                <v-btn
                  variant="outlined"
                  color="blue"
                  size="small"
                  prepend-icon="mdi-file-document-outline"
                  class="flex-1"
                  @click="goToGap(selectedClient)"
                  >Gap Analysis</v-btn
                >
              </div>
            </v-window-item>

            <!-- Documents Tab -->
            <v-window-item value="documents" class="px-6 py-4">
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs">{{ selectedClient.documents?.length || 0 }} documents</span>
                <v-btn size="x-small" variant="tonal" color="blue" prepend-icon="mdi-upload"
                  >Upload</v-btn
                >
              </div>
              <div v-if="selectedClient.documents?.length" class="space-y-2">
                <div
                  v-for="doc in selectedClient.documents"
                  :key="doc.name"
                  class="doc-drawer-item"
                >
                  <v-icon icon="mdi-file-pdf-box" size="20" color="#e53935" />
                  <div class="flex-1 min-w-0">
                    <div class="text-xs truncate">{{ doc.name }}</div>
                    <div class="text-[10px]">{{ doc.category }} · {{ doc.size }}</div>
                  </div>
                  <v-btn icon="mdi-download" size="x-small" variant="text" />
                </div>
              </div>
              <div v-else class="text-center py-8 text-slate-500 text-xs">
                No documents uploaded yet
              </div>
            </v-window-item>

            <!-- Notes Tab -->
            <v-window-item value="notes" class="px-6 py-4">
              <v-textarea
                placeholder="Add a note..."
                variant="outlined"
                density="compact"
                rows="3"
                class="mb-3"
              />
              <v-btn size="small" color="#1e88e5" elevation="0">Save Note</v-btn>
              <div class="mt-4 space-y-3">
                <div v-for="note in selectedClient.notes || []" :key="note.date" class="note-item">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs font-medium text-slate-300">Admin</span>
                    <span class="text-[10px] text-slate-500">{{ note.date }}</span>
                  </div>
                  <p class="text-xs text-slate-400">{{ note.text }}</p>
                </div>
              </div>
            </v-window-item>

            <!-- Activity Tab -->
            <v-window-item value="activity" class="px-6 py-4">
              <div class="space-y-3">
                <div
                  v-for="act in selectedClient.activity || []"
                  :key="act.date"
                  class="activity-item flex gap-3"
                >
                  <div class="activity-line">
                    <div class="activity-dot" :class="`act-${act.type}`" />
                  </div>
                  <div class="flex-1 pb-3">
                    <div class="text-xs">{{ act.action }}</div>
                    <div class="text-[10px] mt-0.5">{{ act.date }}</div>
                  </div>
                </div>
              </div>
            </v-window-item>
          </v-window>
        </div>
      </v-navigation-drawer>

      <!-- Delete Confirmation Dialog -->
      <v-dialog v-model="deleteDialog" max-width="420">
        <v-card class="pa-2">
          <v-card-title class="text-base text-red pt-4 px-5">Delete Client?</v-card-title>
          <v-card-text class="text-sm text-slate-400 px-5">
            This will permanently remove
            <strong class="text-white">{{ deleteTarget?.companyName }}</strong> and all associated
            records. This action cannot be undone.
          </v-card-text>
          <v-card-actions class="px-5 pb-4 gap-2">
            <v-spacer />
            <v-btn variant="outlined" color="slate" size="small" @click="deleteDialog = false"
              >Cancel</v-btn
            >
            <v-btn color="error" size="small" elevation="0" @click="deleteConfirmed">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Snackbar -->
      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        location="bottom right"
        timeout="3000"
      >
        {{ snackbar.text }}
      </v-snackbar>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import MainLayout from '@/components/Layouts/MainLayout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ─── View State ───────────────────────────────────────────────
const viewMode = ref('table')
const search = ref('')
const filterStatus = ref('All')
const filterIndustry = ref('All')
const filterRisk = ref('All')

// ─── Dialogs / Drawers ────────────────────────────────────────
const newClientDialog = ref(false)
const viewDrawer = ref(false)
const deleteDialog = ref(false)
const menuOpen = ref(false)
const menuTarget = ref(null)
const menuClient = ref(null)
const selectedClient = ref(null)
const deleteTarget = ref(null)
const drawerTab = ref('overview')
const submitting = ref(false)
const currentStep = ref(1)
const fileInput = ref(null)

const snackbar = ref({ show: false, text: '', color: 'success' })

// ─── Step wizard ──────────────────────────────────────────────
const stepLabels = ['Company Profile', 'Regulatory & Ops', 'Risk & Documents', 'Review & Submit']

// ─── Form ─────────────────────────────────────────────────────
const defaultForm = () => ({
  companyName: '',
  registrationNumber: '',
  country: '',
  industry: '',
  businessModel: '',
  jurisdictions: [],
  intendedOperations: [],
  regulatoryStanding: '',
  riskLevel: '',
  documents: [],
  status: 'New',
  notes: ''
})
const form = ref(defaultForm())

// ─── Options ──────────────────────────────────────────────────
const statusOptions = ['All', 'New', 'Under Review', 'Assessed', 'Onboarded']
const industryOptions = [
  'All',
  'Payment Firms',
  'FinTech Startups',
  'IMTOs (Local)',
  'IMTOs (Foreign)',
  'Crypto Businesses',
  'FX Firms',
  'Others'
]
const riskOptions = ['All', 'Severe', 'High', 'Medium', 'Low']
const countryOptions = [
  'Nigeria',
  'United Kingdom',
  'Ghana',
  'Kenya',
  'South Africa',
  'United States',
  'United Arab Emirates',
  'Canada'
]
const docCategories = ['KYC', 'Business', 'Compliance', 'SLA', 'NDA']
const operationOptions = [
  { label: 'Cash-based activities', value: 'Cash-based activities' },
  { label: 'High-value asset exchange', value: 'High-value asset exchange' },
  { label: 'Crypto and digital assets', value: 'Crypto and digital assets' },
  { label: 'Health and safety compliance', value: 'Health and safety compliance' },
  { label: 'Cross-border cash movements', value: 'Cross-border cash movements' }
]
const regulatoryOptions = [
  { label: 'Fully regulated', value: 'Fully Regulated' },
  { label: 'Near regulated', value: 'Near Regulated' },
  { label: 'Not regulated (strong interest)', value: 'Not Regulated (Strong Interest)' },
  { label: 'Not regulated (no interest)', value: 'Not Regulated (No Interest)' },
  { label: 'Regulation not required (partnered)', value: 'Regulation Not Required' }
]
const riskLevelOptions = [
  {
    value: 'Severe',
    label: 'Severe',
    textClass: 'text-red-400',
    description: 'Immediate attention required'
  },
  {
    value: 'High',
    label: 'High',
    textClass: 'text-orange-400',
    description: 'Significant exposure'
  },
  {
    value: 'Medium',
    label: 'Medium',
    textClass: 'text-yellow-400',
    description: 'Manageable risk profile'
  },
  { value: 'Low', label: 'Low', textClass: 'text-blue-400', description: 'Minimal regulatory risk' }
]

// ─── Table Headers ────────────────────────────────────────────
const headers = [
  { title: 'Company', key: 'companyName', sortable: true },
  { title: 'Industry', key: 'industry', sortable: true },
  { title: 'Country', key: 'country', sortable: true },
  { title: 'Regulatory', key: 'regulatoryStanding', sortable: true },
  { title: 'Risk', key: 'riskLevel', sortable: true },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Created', key: 'createdAt', sortable: true },
  { title: '', key: 'actions', sortable: false, align: 'end' }
]

// ─── Sample Data ──────────────────────────────────────────────
const clients = ref([
  {
    id: 1,
    companyName: 'Zenith Pay Ltd',
    registrationNumber: 'RC-102345',
    country: 'Nigeria',
    industry: 'Payment Firms',
    regulatoryStanding: 'Fully Regulated',
    riskLevel: 'Low',
    status: 'Onboarded',
    createdAt: '12 Jan 2026',
    businessModel:
      'A licensed payment service provider offering cross-border remittance and local payment processing solutions for SMEs.',
    operations: ['Cash-based activities', 'Cross-border cash movements'],
    documents: [
      { name: 'CAC_Certificate.pdf', category: 'Business', size: '1.2 MB' },
      { name: 'AML_Policy.pdf', category: 'Compliance', size: '3.4 MB' }
    ],
    notes: [{ date: '15 Jan 2026', text: 'All documents verified. Client passed KYC screening.' }],
    activity: [
      { type: 'success', action: 'Client marked as Onboarded', date: '15 Jan 2026' },
      { type: 'info', action: 'Gap analysis completed', date: '13 Jan 2026' },
      { type: 'info', action: 'Risk assessment performed — Low', date: '12 Jan 2026' },
      { type: 'default', action: 'Client profile created', date: '12 Jan 2026' }
    ]
  },
  {
    id: 2,
    companyName: 'CryptoNova NG',
    registrationNumber: 'RC-209812',
    country: 'Nigeria',
    industry: 'Crypto Businesses',
    regulatoryStanding: 'Not Regulated (Strong Interest)',
    riskLevel: 'High',
    status: 'Under Review',
    createdAt: '01 Feb 2026',
    businessModel: 'Crypto asset exchange platform targeting retail investors in West Africa.',
    operations: ['Crypto and digital assets', 'High-value asset exchange'],
    documents: [],
    notes: [],
    activity: [
      { type: 'info', action: 'Risk assessment in progress', date: '03 Feb 2026' },
      { type: 'default', action: 'Client profile created', date: '01 Feb 2026' }
    ]
  },
  {
    id: 3,
    companyName: 'FXGlobal Solutions',
    registrationNumber: 'RC-334521',
    country: 'United Kingdom',
    industry: 'FX Firms',
    regulatoryStanding: 'Fully Regulated',
    riskLevel: 'Medium',
    status: 'Assessed',
    createdAt: '18 Feb 2026',
    businessModel:
      'Retail FX brokerage offering currency exchange services to individual and institutional clients.',
    operations: [
      'Cash-based activities',
      'Cross-border cash movements',
      'High-value asset exchange'
    ],
    documents: [{ name: 'FCA_Licence.pdf', category: 'Compliance', size: '0.8 MB' }],
    notes: [
      {
        date: '20 Feb 2026',
        text: 'FCA licence confirmed. Awaiting internal gap analysis sign-off.'
      }
    ],
    activity: [
      { type: 'info', action: 'Assessed — awaiting onboarding', date: '20 Feb 2026' },
      { type: 'default', action: 'Profile created', date: '18 Feb 2026' }
    ]
  },
  {
    id: 4,
    companyName: 'SwiftRemit Africa',
    registrationNumber: 'RC-451902',
    country: 'Ghana',
    industry: 'IMTOs (Local)',
    regulatoryStanding: 'Near Regulated',
    riskLevel: 'Medium',
    status: 'New',
    createdAt: '05 Mar 2026',
    businessModel:
      'IMTO providing domestic and sub-regional money transfer services across West Africa.',
    operations: ['Cross-border cash movements', 'Cash-based activities'],
    documents: [],
    notes: [],
    activity: [{ type: 'default', action: 'Client profile created', date: '05 Mar 2026' }]
  },
  {
    id: 5,
    companyName: 'DarkPool Trading',
    registrationNumber: 'RC-567341',
    country: 'United Arab Emirates',
    industry: 'Crypto Businesses',
    regulatoryStanding: 'Not Regulated (No Interest)',
    riskLevel: 'Severe',
    status: 'Under Review',
    createdAt: '10 Mar 2026',
    businessModel: 'OTC crypto desk targeting HNWI with large-volume anonymous transactions.',
    operations: [
      'Crypto and digital assets',
      'High-value asset exchange',
      'Cross-border cash movements'
    ],
    documents: [],
    notes: [
      {
        date: '12 Mar 2026',
        text: 'Escalated for senior compliance review. Several red flags identified.'
      }
    ],
    activity: [
      { type: 'warning', action: 'Escalated for senior review', date: '12 Mar 2026' },
      { type: 'default', action: 'Profile created', date: '10 Mar 2026' }
    ]
  },
  {
    id: 6,
    companyName: 'MediFinance Ltd',
    registrationNumber: 'RC-678210',
    country: 'Kenya',
    industry: 'Others',
    regulatoryStanding: 'Regulation Not Required',
    riskLevel: 'Low',
    status: 'Onboarded',
    createdAt: '22 Mar 2026',
    businessModel:
      'Healthcare financing company providing medical payment plans for hospitals and clinics.',
    operations: ['Health and safety compliance'],
    documents: [
      { name: 'NDA_Signed.pdf', category: 'NDA', size: '0.3 MB' },
      { name: 'SLA_Agreement.pdf', category: 'SLA', size: '0.5 MB' }
    ],
    notes: [],
    activity: [
      { type: 'success', action: 'Client onboarded', date: '28 Mar 2026' },
      { type: 'default', action: 'Profile created', date: '22 Mar 2026' }
    ]
  }
])

// ─── Stats ────────────────────────────────────────────────────
const stats = computed(() => [
  {
    label: 'Total Clients',
    value: clients.value.length,
    icon: 'mdi-account-group-outline',
    iconColor: '#4a90d9',
    trend: 18.4
  },
  {
    label: 'Under Review',
    value: clients.value.filter((c) => c.status === 'Under Review').length,
    icon: 'mdi-magnify',
    iconColor: '#f59e0b',
    trend: -5.2
  },
  {
    label: 'Onboarded',
    value: clients.value.filter((c) => c.status === 'Onboarded').length,
    icon: 'mdi-check-circle-outline',
    iconColor: '#10b981',
    trend: 22.1
  },
  {
    label: 'High Risk +',
    value: clients.value.filter((c) => ['High', 'Severe'].includes(c.riskLevel)).length,
    icon: 'mdi-alert-outline',
    iconColor: '#ef4444',
    trend: -8
  }
])

// ─── Filtered Clients ─────────────────────────────────────────
const filteredClients = computed(() => {
  return clients.value.filter((c) => {
    const matchStatus = filterStatus.value === 'All' || c.status === filterStatus.value
    const matchIndustry = filterIndustry.value === 'All' || c.industry === filterIndustry.value
    const matchRisk = filterRisk.value === 'All' || c.riskLevel === filterRisk.value
    const matchSearch =
      !search.value ||
      c.companyName.toLowerCase().includes(search.value.toLowerCase()) ||
      c.registrationNumber.toLowerCase().includes(search.value.toLowerCase())
    return matchStatus && matchIndustry && matchRisk && matchSearch
  })
})

// ─── Helpers ──────────────────────────────────────────────────
const avatarColors = ['#1565c0', '#2e7d32', '#6a1b9a', '#c62828', '#00695c', '#e65100', '#37474f']
const getAvatarColor = (name) => avatarColors[name.charCodeAt(0) % avatarColors.length]

const statusColor = (s) =>
  ({ New: 'blue', 'Under Review': 'warning', Assessed: 'purple', Onboarded: 'success' })[s] ||
  'default'

const riskTextClass = (r) =>
  ({
    Severe: 'text-red-400',
    High: 'text-orange-400',
    Medium: 'text-yellow-400',
    Low: 'text-blue-400'
  })[r] || 'text-slate-400'

// ─── Actions ──────────────────────────────────────────────────
const openNewClientDialog = () => {
  form.value = defaultForm()
  currentStep.value = 1
  newClientDialog.value = true
}
const closeNewClientDialog = () => {
  newClientDialog.value = false
}

const nextStep = () => {
  if (currentStep.value < 4) currentStep.value++
}

const submitClient = async () => {
  submitting.value = true
  await new Promise((r) => setTimeout(r, 1000))
  const newClient = {
    id: clients.value.length + 1,
    ...form.value,
    createdAt: new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    activity: [
      { type: 'default', action: 'Client profile created', date: new Date().toLocaleDateString() }
    ],
    notes: form.value.notes
      ? [{ date: new Date().toLocaleDateString(), text: form.value.notes }]
      : []
  }
  clients.value.unshift(newClient)
  submitting.value = false
  newClientDialog.value = false
  snackbar.value = {
    show: true,
    text: `${form.value.companyName} created successfully!`,
    color: 'success'
  }
}

const viewClient = (client) => {
  selectedClient.value = client
  drawerTab.value = 'overview'
  viewDrawer.value = true
  menuOpen.value = false
}
const editClient = (client) => {
  form.value = {
    ...defaultForm(),
    ...client,
    jurisdictions: client.jurisdictions || [],
    intendedOperations: client.operations || [],
    documents: []
  }
  currentStep.value = 1
  newClientDialog.value = true
  menuOpen.value = false
}
const openMenu = (e, client) => {
  menuTarget.value = e.currentTarget
  menuClient.value = client
  menuOpen.value = true
}
const confirmDelete = (client) => {
  deleteTarget.value = client
  deleteDialog.value = true
  menuOpen.value = false
}
const deleteConfirmed = () => {
  clients.value = clients.value.filter((c) => c.id !== deleteTarget.value.id)
  deleteDialog.value = false
  snackbar.value = { show: true, text: 'Client deleted.', color: 'error' }
}
const goToRisk = (client) => {
  menuOpen.value = false
  viewDrawer.value = false
  console.log('Navigate to Risk Assessment for', client.companyName)
  router.push('risk')
}
const goToGap = (client) => {
  menuOpen.value = false
  viewDrawer.value = false
  console.log('Navigate to Gap Analysis for', client.companyName)
}

const triggerFileInput = () => fileInput.value?.click()
const handleFileSelect = (e) => {
  const files = Array.from(e.target.files || [])
  files.forEach((f) =>
    form.value.documents.push({
      name: f.name,
      category: 'Business',
      size: (f.size / 1024 / 1024).toFixed(1) + ' MB'
    })
  )
}
const handleDrop = (e) => {
  const files = Array.from(e.dataTransfer.files || [])
  files.forEach((f) =>
    form.value.documents.push({
      name: f.name,
      category: 'Business',
      size: (f.size / 1024 / 1024).toFixed(1) + ' MB'
    })
  )
}
</script>

<style scoped>
.v-btn {
  text-transform: none;
}
.clients-page {
  @apply p-6;
  background: #0a1020;
  min-height: 100vh;
}

/* Stat Cards */
.stat-card {
  background: #111827;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 16px;
  transition: border-color 0.2s;
}
.stat-card:hover {
  border-color: rgba(255, 255, 255, 0.12);
}

/* Filter Bar */
.filter-bar :deep(.v-field__outline) {
  border-color: rgba(255, 255, 255, 0.1) !important;
  border-radius: 8px !important;
}
.filter-bar :deep(.v-field__outline:hover) {
  border-color: rgba(255, 255, 255, 0.2) !important;
}
.filter-bar :deep(.v-label) {
  color: #64748b !important;
  font-size: 12px !important;
}
.filter-bar :deep(.v-field__input) {
  color: #cbd5e1 !important;
  font-size: 13px !important;
}
.view-toggle {
  background: #111827 !important;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px !important;
}
.view-toggle :deep(.v-btn) {
  color: #64748b !important;
}
.view-toggle :deep(.v-btn--active) {
  color: #93c5fd !important;
  background: rgba(59, 130, 246, 0.15) !important;
}

/* Table */
.table-card {
  background: #111827;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  overflow: hidden;
}
.caas-table {
  background: transparent !important;
}
.caas-table :deep(.v-data-table__thead) {
  background: #0f1729 !important;
}
.caas-table :deep(.v-data-table__thead th) {
  color: #64748b !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
}
.caas-table :deep(.v-data-table__tr) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.04) !important;
}
.caas-table :deep(.v-data-table__tr:hover) {
  background: rgba(255, 255, 255, 0.03) !important;
}
.caas-table :deep(td) {
  color: #cbd5e1 !important;
  font-size: 13px !important;
}
.table-footer {
  background: #0f1729;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
.caas-pagination :deep(.v-btn) {
  color: #64748b !important;
}
.caas-pagination :deep(.v-btn--active) {
  color: #93c5fd !important;
}

/* Avatar */
.avatar-circle {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
}
.avatar-circle-lg {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
}

/* Risk dots */
.risk-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
}
.risk-severe {
  background: #ef4444;
  box-shadow: 0 0 6px rgba(239, 68, 68, 0.5);
}
.risk-high {
  background: #f97316;
  box-shadow: 0 0 6px rgba(249, 115, 22, 0.4);
}
.risk-medium {
  background: #eab308;
  box-shadow: 0 0 6px rgba(234, 179, 8, 0.4);
}
.risk-low {
  background: #3b82f6;
  box-shadow: 0 0 6px rgba(59, 130, 246, 0.4);
}

/* Industry chip */
.industry-chip {
  font-size: 10px !important;
}

/* Grid cards */
.client-card {
  background: #111827;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 16px;
  transition:
    border-color 0.2s,
    transform 0.15s;
}
.client-card:hover {
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-1px);
}
.info-block {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
  padding: 8px;
}

/* Context menu */
.context-menu {
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 10px !important;
}
.context-menu :deep(.v-list-item) {
  color: #cbd5e1 !important;
  font-size: 13px !important;
  min-height: 36px !important;
}
.context-menu :deep(.v-list-item:hover) {
  background: rgba(255, 255, 255, 0.05) !important;
}

/* New Client Dialog */
.new-client-dialog {
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 16px !important;
}
.dialog-header {
  background: #0f1729;
}
.dialog-footer {
  background: #0f1729;
}
.section-title {
  font-size: 11px;
  font-weight: 700;
  color: #4a6fa5;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
}
.form-field :deep(.v-field__outline) {
  border-color: rgba(255, 255, 255, 0.1) !important;
  border-radius: 8px !important;
}
.form-field :deep(.v-label) {
  color: #64748b !important;
  font-size: 13px !important;
}
.form-field :deep(.v-field__input) {
  color: #cbd5e1 !important;
  font-size: 13px !important;
}
.op-checkbox :deep(.v-label) {
  color: #94a3b8 !important;
  font-size: 13px !important;
}
.reg-radio :deep(.v-label) {
  color: #94a3b8 !important;
  font-size: 13px !important;
}

/* Risk option cards */
.risk-option-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 14px;
  cursor: pointer;
  transition:
    border-color 0.2s,
    background 0.2s;
}
.risk-option-card:hover {
  background: rgba(255, 255, 255, 0.06);
}
.risk-option-card.selected {
  border-color: rgba(59, 130, 246, 0.5);
  background: rgba(59, 130, 246, 0.08);
}

/* Upload zone */
.upload-zone {
  border: 2px dashed rgba(74, 111, 165, 0.4);
  border-radius: 10px;
  padding: 28px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s;
}
.upload-zone:hover {
  border-color: rgba(74, 111, 165, 0.7);
}
.doc-item {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Review */
.review-section {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  padding: 14px;
}
.review-section-label {
  font-size: 10px;
  font-weight: 700;
  color: #4a6fa5;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.review-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}
.review-key {
  font-size: 11px;
  color: #64748b;
  min-width: 120px;
}
.review-val {
  font-size: 12px;
  color: #cbd5e1;
  text-align: right;
}

/* Drawer */
.client-drawer {
  border-left: 1px solid rgba(255, 255, 255, 0.08) !important;
}
.drawer-tabs :deep(.v-tab) {
  color: #64748b !important;
  font-size: 12px !important;
  text-transform: none !important;
  min-width: auto !important;
  padding: 0 12px !important;
}
.drawer-tabs :deep(.v-tab--selected) {
  color: #93c5fd !important;
}
.info-group {
}
.info-group-label {
  font-size: 10px;
  font-weight: 700;
  color: #4a6fa5;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 8px;
}
.info-row {
  display: flex;
  justify-content: space-between;
  padding: 7px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 12px;
  color: #94a3b8;
}
.info-row span:last-child {
  color: #e2e8f0;
  font-weight: 500;
}
.doc-drawer-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  padding: 10px 12px;
}
.note-item {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  padding: 12px;
}
.activity-item {
}
.activity-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3px;
}
.activity-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.act-success {
  background: #10b981;
}
.act-info {
  background: #3b82f6;
}
.act-warning {
  background: #f59e0b;
}
.act-default {
  background: #475569;
}

/* New client btn */
.new-client-btn {
  border-radius: 8px !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  text-transform: none !important;
}
</style>
