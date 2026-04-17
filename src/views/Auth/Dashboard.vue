<template>
  <MainLayout>
    <div v-if="loading" class="space-y-6">
      <!-- SKELETON UI -->
      <div class="animate-pulse space-y-2">
        <div class="h-6 w-64 bg-gray-200 rounded"></div>
        <div class="h-4 w-96 bg-gray-200 rounded"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          v-for="i in 3"
          :key="i"
          class="rounded-2xl p-5 bg-white shadow-md space-y-4 animate-pulse"
        >
          <div class="h-8 w-8 bg-gray-200 rounded"></div>
          <div class="h-4 w-24 bg-gray-200 rounded"></div>
          <div class="h-6 w-32 bg-gray-300 rounded"></div>
          <div class="h-3 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-6 animate-pulse space-y-4">
        <div class="h-5 w-48 bg-gray-200 rounded"></div>
        <div class="h-3 w-32 bg-gray-200 rounded"></div>

        <div class="grid grid-cols-2 gap-4 mt-4">
          <div v-for="i in 6" :key="i" class="h-4 bg-gray-200 rounded"></div>
        </div>

        <div class="h-2 w-full bg-gray-200 rounded"></div>
      </div>

      <div class="bg-white rounded-2xl p-4 animate-pulse space-y-4">
        <div class="h-5 w-40 bg-gray-200 rounded"></div>

        <div v-for="i in 4" :key="i" class="flex justify-between items-center">
          <div class="flex gap-3">
            <div class="w-10 h-10 bg-gray-200 rounded-xl"></div>
            <div class="space-y-2">
              <div class="h-4 w-24 bg-gray-200 rounded"></div>
              <div class="h-3 w-32 bg-gray-100 rounded"></div>
            </div>
          </div>
          <div class="h-6 w-16 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
    <div v-else class="p-4 space-y-6">
      <!-- 🔹 Top Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-lg font-bold">Dashboard</h1>
          <p class="text-sm text-gray-500">Welcome back, Admin — here's what's happening today.</p>
        </div>

        <div class="flex items-center gap-2 flex-wrap">
          <span class="date-chip text-xs">{{ todayDate }}</span>
          <v-btn color="blue">New Client</v-btn>
        </div>
      </div>

      <!-- 🔹 KPI Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div
          v-for="kpi in kpis"
          :key="kpi.label"
          class="kpi-card p-4 rounded-xl w-full"
          :class="kpi.accent"
        >
          <div class="flex items-center justify-between mb-2">
            <span v-html="kpi.icon"></span>
            <span
              class="text-xs px-2 py-1 rounded"
              :class="kpi.trend > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'"
            >
              {{ kpi.trend > 0 ? '↑' : '↓' }} {{ Math.abs(kpi.trend) }}%
            </span>
          </div>

          <div class="text-lg font-semibold">{{ kpi.value }}</div>
          <div class="text-sm text-gray-500">{{ kpi.label }}</div>
        </div>
      </div>

      <!-- 🔹 Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <!-- Area Chart -->
        <div class="chart-card xl:col-span-2 p-4 rounded-xl">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <div>
              <div class="font-semibold">Client Onboarding Activity</div>
              <div class="text-xs text-gray-500">Monthly onboarding</div>
            </div>

            <div class="flex gap-2">
              <button
                v-for="r in ['6M', '1Y', 'All']"
                :key="r"
                class="text-xs px-2 py-1 rounded border"
                :class="{ 'bg-black text-white': activeRange === r }"
                @click="activeRange = r"
              >
                {{ r }}
              </button>
            </div>
          </div>

          <apexchart
            class="w-full"
            type="area"
            height="250"
            :options="areaOptions"
            :series="areaSeries"
          />
        </div>

        <!-- Donut -->
        <div class="chart-card p-4 rounded-xl">
          <div class="mb-3">
            <div class="font-semibold">Risk Distribution</div>
            <div class="text-xs text-gray-500">Client risk levels</div>
          </div>

          <apexchart
            class="w-full"
            type="donut"
            height="250"
            :options="donutOptions"
            :series="donutSeries"
          />

          <div class="mt-4 space-y-2">
            <div v-for="(item, i) in riskLevels" :key="i" class="flex justify-between text-sm">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full" :style="{ background: donutColors[i] }"></span>
                {{ item.label }}
              </div>
              <span>{{ item.count }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 🔹 Middle Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <!-- Bar -->
        <div class="chart-card p-4 rounded-xl">
          <div class="mb-3">
            <div class="font-semibold">Industry Breakdown</div>
            <div class="text-xs text-gray-500">Clients by sector</div>
          </div>

          <apexchart
            class="w-full"
            type="bar"
            height="250"
            :options="barOptions"
            :series="barSeries"
          />
        </div>

        <!-- Radial -->
        <div class="chart-card p-4 rounded-xl">
          <div class="mb-3">
            <div class="font-semibold">Regulatory Standing</div>
            <div class="text-xs text-gray-500">Client classification</div>
          </div>

          <apexchart
            class="w-full"
            type="radialBar"
            height="250"
            :options="radialOptions"
            :series="radialSeries"
          />
        </div>
      </div>

      <!-- 🔹 Bottom Row -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <!-- Table -->
        <div class="xl:col-span-2 p-4 rounded-xl bg-white">
          <div class="flex justify-between items-center mb-4">
            <div class="font-semibold">Recent Clients</div>
            <a href="#" class="text-sm text-blue-500">View all →</a>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full min-w-[600px] text-sm">
              <thead>
                <tr class="text-left text-gray-500">
                  <th class="py-2">Company</th>
                  <th>Industry</th>
                  <th>Risk</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="client in recentClients" :key="client.name" class="border-t">
                  <td class="py-3 flex items-center gap-2">
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
                      :style="{ background: client.color }"
                    >
                      {{ client.initials }}
                    </div>
                    {{ client.name }}
                  </td>

                  <td>{{ client.industry }}</td>
                  <td>{{ client.risk }}</td>
                  <td>{{ client.status }}</td>
                  <td>{{ client.date }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Activity -->
        <div class="p-4 rounded-xl bg-white">
          <div class="font-semibold mb-4">Recent Activity</div>

          <div class="space-y-3">
            <div v-for="(act, i) in activity" :key="i" class="flex gap-3">
              <div class="w-2 h-2 rounded-full mt-2" :class="act.type"></div>
              <div>
                <div class="text-sm">{{ act.text }}</div>
                <div class="text-xs text-gray-400">{{ act.time }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import MainLayout from '@/components/Layouts/MainLayout.vue'
// ── Date ──────────────────────────────────────────────────────────────────────
const todayDate = new Date().toLocaleDateString('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})

const activeRange = ref('6M')

// ── KPI Cards ─────────────────────────────────────────────────────────────────
const kpis = [
  {
    label: 'Total Clients',
    value: '124',
    trend: 18.4,
    accent: 'kpi-green',
    icon: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
  },
  {
    label: 'Under Review',
    value: '31',
    trend: -5.2,
    accent: 'kpi-amber',
    icon: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`
  },
  {
    label: 'Onboarded',
    value: '78',
    trend: 22.1,
    accent: 'kpi-blue',
    icon: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`
  },
  {
    label: 'High Risk Clients',
    value: '14',
    trend: -8.0,
    accent: 'kpi-red',
    icon: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
  }
]

// ── Area Chart ────────────────────────────────────────────────────────────────
const areaSeries = [
  { name: 'Assessed', data: [8, 14, 11, 19, 22, 17] },
  { name: 'Onboarded', data: [5, 9, 8, 13, 16, 12] }
]

const areaOptions = {
  chart: {
    toolbar: { show: false },
    sparkline: { enabled: false },
    background: 'transparent',
    fontFamily: 'inherit'
  },
  colors: ['#0F4C81', '#93C5FD'],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.45,
      opacityTo: 0.05,
      stops: [0, 100]
    }
  },
  stroke: { curve: 'smooth', width: 2.5 },
  xaxis: {
    categories: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
    labels: { style: { colors: '#94a3b8', fontSize: '12px' } },
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: { labels: { style: { colors: '#94a3b8', fontSize: '12px' } } },
  grid: { borderColor: '#f1f5f9', strokeDashArray: 4 },
  tooltip: { theme: 'light' },
  legend: { labels: { colors: '#64748b' } },
  dataLabels: { enabled: false }
}

// ── Donut Chart ───────────────────────────────────────────────────────────────
const donutColors = [
  '#DC2626', // severe
  '#F97316', // high
  '#FACC15', // medium
  '#0F4C81' // low (brand color)
]
const riskLevels = [
  { label: 'Severe', count: 5 },
  { label: 'High', count: 9 },
  { label: 'Medium', count: 38 },
  { label: 'Low', count: 50 }
]
const donutSeries = riskLevels.map((r) => r.count)

const donutOptions = {
  chart: { type: 'donut', background: 'transparent', fontFamily: 'inherit' },
  colors: donutColors,
  labels: riskLevels.map((r) => r.label),
  legend: { show: false },
  dataLabels: { enabled: false },
  plotOptions: {
    pie: {
      donut: {
        size: '68%',
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Total',
            color: '#64748b',
            fontSize: '13px',
            formatter: () => '102'
          }
        }
      }
    }
  },
  stroke: { width: 0 },
  tooltip: { theme: 'light' }
}

// ── Bar Chart ─────────────────────────────────────────────────────────────────
const barSeries = [{ name: 'Clients', data: [28, 22, 18, 15, 12, 9] }]
const barOptions = {
  chart: { toolbar: { show: false }, background: 'transparent', fontFamily: 'inherit' },
  colors: ['#0F4C81', '#93C5FD'],
  plotOptions: {
    bar: { borderRadius: 6, horizontal: true, barHeight: '55%' }
  },
  xaxis: {
    categories: [
      'Payment Firms',
      'FinTech Startups',
      'IMTOs (Local)',
      'Crypto Businesses',
      'FX Firms',
      'Others'
    ],
    labels: { style: { colors: '#94a3b8', fontSize: '11px' } },
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: { labels: { style: { colors: '#64748b', fontSize: '11px' } } },
  grid: {
    borderColor: '#f1f5f9',
    strokeDashArray: 4,
    xaxis: { lines: { show: true } },
    yaxis: { lines: { show: false } }
  },
  dataLabels: { enabled: false },
  tooltip: { theme: 'light' }
}

// ── Radial Chart ──────────────────────────────────────────────────────────────
const radialSeries = [72, 18, 6, 4]
const radialOptions = {
  chart: { type: 'radialBar', background: 'transparent', fontFamily: 'inherit' },
  colors: ['#22c55e', '#3b82f6', '#f97316', '#ef4444'],
  labels: ['Fully Regulated', 'Near Regulated', 'Not Regulated', 'N/A'],
  plotOptions: {
    radialBar: {
      offsetY: 0,
      startAngle: 0,
      endAngle: 270,
      hollow: { margin: 5, size: '30%' },
      dataLabels: {
        name: { show: false },
        value: { show: false }
      },
      track: { background: '#f1f5f9' }
    }
  },
  legend: {
    show: true,
    floating: true,
    fontSize: '11px',
    position: 'left',
    offsetX: 0,
    offsetY: 60,
    labels: { useSeriesColors: true },
    itemMargin: { vertical: 3 }
  },
  stroke: { lineCap: 'round' },
  tooltip: { theme: 'light' }
}

// ── Recent Clients ────────────────────────────────────────────────────────────
const recentClients = [
  {
    name: 'Apex Pay Ltd',
    initials: 'AP',
    color: '#dcfce7',
    industry: 'Payment Firm',
    risk: 'Low',
    status: 'Onboarded',
    date: '10 Apr 2026'
  },
  {
    name: 'NovaCrypto NG',
    initials: 'NC',
    color: '#fee2e2',
    industry: 'Crypto',
    risk: 'High',
    status: 'Under Review',
    date: '08 Apr 2026'
  },
  {
    name: 'SwiftFX Global',
    initials: 'SF',
    color: '#dbeafe',
    industry: 'FX Firm',
    risk: 'Medium',
    status: 'Assessed',
    date: '05 Apr 2026'
  },
  {
    name: 'TranzIt IMTO',
    initials: 'TI',
    color: '#fef9c3',
    industry: 'IMTO (Local)',
    risk: 'Medium',
    status: 'Under Review',
    date: '03 Apr 2026'
  },
  {
    name: 'FinEdge Labs',
    initials: 'FL',
    color: '#f3e8ff',
    industry: 'FinTech',
    risk: 'Low',
    status: 'Onboarded',
    date: '01 Apr 2026'
  },
  {
    name: 'DeltaFund Inc',
    initials: 'DF',
    color: '#ffedd5',
    industry: 'Payment Firm',
    risk: 'Severe',
    status: 'New',
    date: '28 Mar 2026'
  }
]

// ── Activity Feed ─────────────────────────────────────────────────────────────
const activity = [
  { text: 'NovaCrypto NG flagged as High Risk', time: '2 hours ago', type: 'act-red' },
  { text: 'Gap analysis completed for SwiftFX', time: '4 hours ago', type: 'act-green' },
  { text: 'DeltaFund Inc profile created', time: '6 hours ago', type: 'act-blue' },
  { text: 'SLA uploaded for FinEdge Labs', time: 'Yesterday', type: 'act-green' },
  { text: 'TranzIt IMTO moved to Under Review', time: 'Yesterday', type: 'act-amber' },
  { text: 'Apex Pay Ltd fully onboarded', time: '2 days ago', type: 'act-green' },
  { text: 'Risk matrix updated for Q2 2026', time: '3 days ago', type: 'act-blue' }
]
</script>

<style scoped>
/* ── Root ─────────────────────────────────────────────────────────────────── */

/* ── Top Bar ──────────────────────────────────────────────────────────────── */
.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.02em;
}
.page-sub {
  font-size: 0.875rem;
  color: #94a3b8;
  margin-top: 2px;
}
.date-chip {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;
}
.btn-create {
  background: var(--secondary);
  color: #fff;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 8px 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition:
    background 0.18s,
    transform 0.12s;
}
.btn-create:hover {
  background: var(--primary);
  transform: translateY(-1px);
}

/* ── KPI Cards ────────────────────────────────────────────────────────────── */
.kpi-card {
  background: #fff;
  border-radius: 16px;
  padding: 1.4rem 1.5rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  transition:
    box-shadow 0.2s,
    transform 0.2s;
}
.kpi-card:hover {
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.07);
  transform: translateY(-2px);
}
.kpi-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.9rem;
}
.kpi-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
.kpi-green .kpi-icon,
.kpi-blue .kpi-icon,
.kpi-red .kpi-icon,
.kpi-amber .kpi-icon {
  background: rgba(15, 76, 129, 0.08);
  color: var(--secondary);
}
.kpi-badge {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
}
.badge-up {
  background: #dcfce7;
  color: #16a34a;
}
.badge-down {
  background: #fee2e2;
  color: #dc2626;
}

.kpi-value {
  color: #0f172a;
  letter-spacing: -0.03em;
  line-height: 1;
}
.kpi-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
  margin-top: 4px;
}
.kpi-sub {
  font-size: 0.75rem;
  color: #94a3b8;
  margin-top: 2px;
}

/* ── Chart Cards ──────────────────────────────────────────────────────────── */
.chart-card {
  background: #fff;
  border-radius: 16px;
  padding: 1.4rem 1.5rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}
.chart-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.chart-title {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
}
.chart-sub {
  font-size: 0.78rem;
  color: #94a3b8;
  margin-top: 2px;
}

/* Range buttons */
.range-btn {
  background: #f1f5f9;
  border: none;
  border-radius: 7px;
  padding: 4px 12px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.15s;
}
.range-btn.active,
.range-btn:hover {
  background: #22c55e;
  color: #fff;
}

/* Donut legend */
.donut-legend {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 0.5rem;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.legend-label {
  font-size: 0.8rem;
  color: #475569;
  flex: 1;
}
.legend-val {
  font-size: 0.8rem;
  font-weight: 700;
  color: #0f172a;
}

/* ── Table Card ───────────────────────────────────────────────────────────── */
.table-card {
  background: #fff;
  border-radius: 16px;
  padding: 1.4rem 1.5rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}
.view-all-link {
  font-size: 0.8rem;
  font-weight: 600;
  color: #22c55e;
  text-decoration: none;
}
.view-all-link:hover {
  color: #16a34a;
}

.client-table {
  border-collapse: collapse;
}
.client-table th {
  text-align: left;
  font-size: 0.72rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0 12px 10px 0;
  white-space: nowrap;
}
.client-table td {
  padding: 10px 12px 10px 0;
  font-size: 0.855rem;
  color: #334155;
  border-top: 1px solid #f8fafc;
  white-space: nowrap;
}
.client-table tr:hover td {
  background: #f8fafc;
}

.client-name-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}
.client-avatar {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 800;
  color: #334155;
  flex-shrink: 0;
}

.industry-tag {
  background: #f1f5f9;
  color: #475569;
  border-radius: 6px;
  padding: 3px 10px;
  font-size: 0.75rem;
  font-weight: 600;
}

.risk-pill,
.status-pill {
  border-radius: 20px;
  padding: 3px 12px;
  font-size: 0.75rem;
  font-weight: 700;
}
.risk-severe {
  background: #fee2e2;
  color: #991b1b;
}
.risk-high {
  background: #ffedd5;
  color: #9a3412;
}
.risk-medium {
  background: #fef9c3;
  color: #713f12;
}
.risk-low {
  background: #dcfce7;
  color: #14532d;
}

.status-new {
  background: #f1f5f9;
  color: #475569;
}
.status-under-review {
  background: #dbeafe;
  color: #1e40af;
}
.status-assessed {
  background: #fef9c3;
  color: #854d0e;
}
.status-onboarded {
  background: #dcfce7;
  color: #14532d;
}

.date-cell {
  color: #94a3b8 !important;
  font-size: 0.78rem !important;
}

/* ── Activity Feed ────────────────────────────────────────────────────────── */
.activity-feed {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.activity-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 10px 0;
  border-bottom: 1px solid #f8fafc;
}
.activity-item:last-child {
  border-bottom: none;
}

.activity-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  margin-top: 5px;
  flex-shrink: 0;
}
.act-red {
  background: #ef4444;
}
.act-green {
  background: #22c55e;
}
.act-blue {
  background: #3b82f6;
}
.act-amber {
  background: #f59e0b;
}

.activity-text {
  font-size: 0.825rem;
  color: #334155;
  font-weight: 500;
  line-height: 1.4;
}
.activity-time {
  font-size: 0.72rem;
  color: #94a3b8;
  margin-top: 2px;
}
.v-btn {
  text-transform: none;
}
</style>
