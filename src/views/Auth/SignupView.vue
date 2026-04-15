<script setup>
import HeaderView from '@/components/Layouts/HeaderView.vue'
import UserHeader from '@/components/Layouts/UserHeader.vue'
import SignupStepper from '@/components/signup/SignupStepper.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
import logo from '@/assets/images/new-logo.jpeg'
</script>

<template>
  <header class="bg-white shadow-sm">
    <div class="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
      <div @click="goHome" class="flex items-center gap-2">
        <img :src="logo" alt="" class="h-10" />
      </div>

      <div class="flex items-center gap-4">
        <v-btn to="/login" class="text-white normal-case custom-btn" elevation="0"> Sign in </v-btn>
      </div>
    </div>
  </header>
  <SignupStepper />
</template>

<style scoped>
.v-btn {
  background-color: #5c2ecd;
  text-transform: none;
}
</style>
