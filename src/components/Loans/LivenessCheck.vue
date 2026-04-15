<template>
  <div class="smileid-container">
    <button v-if="!cameraStarted" @click="startCamera">Start Camera</button>

    <smart-camera-web v-if="cameraStarted" theme-color="#7AAAFA"></smart-camera-web>

    <!-- <div v-if="capturedData" class="captured-data">
      <h3>Captured SDK Data:</h3>
      <pre>{{ JSON.stringify(capturedData, null, 2) }}</pre>
    </div> -->

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import '@smileid/web-components/smart-camera-web'
import { ElLoading, ElMessage } from 'element-plus'
const emit = defineEmits(['uploadStart', 'uploadSuccess', 'uploadError'])
import { LoanService } from '@/services/Loan/loanServices'

const cameraStarted = ref(false)
const errorMessage = ref('')
const capturedData = ref(null)
const loading = ref(false) // <-- added loading ref

const handlePublish = async (e) => {
  console.log('=== SMART-CAMERA-WEB PUBLISH EVENT ===')
  console.log('Event detail:', e.detail)

  if (!e.detail) return

  let loadingInstance = null

  try {
    capturedData.value = e.detail
    emit('uploadStart')

    const images = e.detail?.images || []

    loading.value = true

    loadingInstance = ElLoading.service({
      lock: true,
      text: 'Verifying biometric data...',
      background: 'rgba(0, 0, 0, 0.5)'
    })

    const response = await LoanService.initiateBiometricKyc(images)

    emit('uploadSuccess', response)
    ElMessage.success('Face verification successful')
  } catch (err) {
    console.error('❌ Biometric verification failed:', err)
    cameraStarted.value = false
    emit('uploadError', err)
    ElMessage.error('Biometric verification failed')
  } finally {
    // ✅ ALWAYS RUNS
    if (loadingInstance) loadingInstance.close()
    loading.value = false
  }
}

const startCamera = async () => {
  errorMessage.value = ''
  capturedData.value = null
  cameraStarted.value = true

  await nextTick()

  const el = document.querySelector('smart-camera-web')
  if (!el) {
    errorMessage.value = 'Failed to initialize camera'
    return
  }

  el.addEventListener('smart-camera-web.publish', handlePublish)

  el.addEventListener('smart-camera-web.cancelled', (e) => {
    console.log('=== SMART-CAMERA-WEB CANCELLED ===', e)
  })

  el.addEventListener('smart-camera-web.back', (e) => {
    console.log('=== SMART-CAMERA-WEB BACK ===', e)
  })

  console.log('Smart camera element found and event listeners added')
}
</script>

<style scoped>
.smileid-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
button {
  padding: 10px 20px;
  margin-bottom: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.error {
  color: red;
  margin-top: 12px;
  text-align: center;
}
</style>
