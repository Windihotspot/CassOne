<template>
  <!-- NAVBAR -->
  <HeaderView />

  <!-- HERO section -->
  <section id="home" class="pt-20 bg-[#5C2ECD] text-white min-h-screen my-auto mx-auto">
    <div
      class="max-w-7xl mx-auto px-6 py-40 mt-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
    >
      <!-- LEFT CONTENT -->
      <div>
        <h1 class="text-4xl md:text-5xl font-bold leading-tight" data-aos="fade-right">
          Get Instant Loans
        </h1>

        <p class="text-5xl text-purple-200 mt-4">Up to ₦2 Million</p>

        <p class="mt-6 text-purple-100 max-w-xl" data-aos="fade-right" data-aos-delay="150">
          Access personal and business loans with competitive rates. Quick BVN verification, instant
          approval, and same-day disbursement to your account.
        </p>

        <!-- CTA BUTTONS -->
        <div class="flex items-center gap-4 mt-8" data-aos="fade-up" data-aos-delay="300">
          <v-btn color="pink" size="large" class="text-white normal-case" elevation="0">
            Personal Loan
          </v-btn>

          <v-btn variant="outlined" size="large" class="border-white text-white normal-case">
            Business Loan
          </v-btn>
        </div>

        <!-- STATS -->
        <hr class="mt-24 border-t border-white/60" />
        <div
          class="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-4 text-sm"
          data-aos="fade-up"
          data-aos-delay="450"
        >
          <div>
            <p class="font-bold text-lg">₦50B+</p>
            <p class="text-purple-200">Loans Disbursed</p>
          </div>
          <div>
            <p class="font-bold text-lg">100k+</p>
            <p class="text-purple-200">Happy Customers</p>
          </div>
          <div>
            <p class="font-bold text-lg">24hrs</p>
            <p class="text-purple-200">Average Approval</p>
          </div>
          <div>
            <p class="font-bold text-lg">4.9/5</p>
            <p class="text-purple-200">Customer Rating</p>
          </div>
        </div>
      </div>

      <!-- RIGHT TESTIMONIALS -->
      <!-- RIGHT TESTIMONIALS -->
      <div class="space-y-8 relative">
        <div
          v-for="(review, i) in reviews"
          :key="i"
          :class="[
            'bg-[#4b1a21] rounded-2xl p-6 shadow-xl transition-all duration-300',
            i === 1 ? 'ml-12' : '',
            i === 2 ? 'ml-6' : ''
          ]"
        >
          <div class="flex items-start gap-4">
            <!-- Avatar -->
            <img :src="review.img" class="w-10 h-10 rounded-full object-cover" />

            <!-- Text -->
            <div>
              <p class="text-sm text-purple-100 leading-relaxed">
                {{ review.text }}
              </p>

              <!-- Stars -->
              <div class="mt-3 flex items-center gap-1 text-yellow-400">
                <i v-for="n in 5" :key="n" class="fas fa-star text-xs"></i>
              </div>

              <!-- Name -->
              <p class="mt-2 text-xs text-purple-300">
                <strong class="text-white">{{ review.name }}</strong>
                <br />
                {{ review.role }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Why choose credmate -->
  <section id="features" class="bg-white py-24">
    <div class="max-w-7xl mx-auto px-6 py-10 text-center">
      <h2 class="text-2xl font-bold text-gray-800">Why Choose Credmate?</h2>

      <p class="mt-3 text-gray-500 max-w-2xl mx-auto">
        We've simplified the loan process to get you funded faster with transparent terms
      </p>

      <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <!-- Item -->
        <div class="flex flex-col items-center text-center">
          <img src="../assets/icons/fast-approval.png" alt="" />

          <h4 class="mt-6 font-semibold text-gray-800">Fast Approval</h4>

          <p class="mt-2 text-sm text-gray-500 max-w-xs">
            Get your loan approved in less than 24 hours
          </p>
        </div>

        <!-- Item -->
        <div class="flex flex-col items-center text-center">
          <img src="../assets/icons/competitive rates.png" alt="" />

          <h4 class="mt-6 font-semibold text-gray-800">Competitive Rates</h4>

          <p class="mt-2 text-sm text-gray-500 max-w-xs">
            Enjoy interest rates as low as 3.5% monthly with flexible repayment terms.
          </p>
        </div>

        <!-- Item -->
        <div class="flex flex-col items-center text-center">
          <img src="../assets/icons/secure-trusted.png" alt="" />

          <h4 class="mt-6 font-semibold text-gray-800">Secure & Trusted</h4>

          <p class="mt-2 text-sm text-gray-500 max-w-xs">
            Bank-grade security with CBN compliance. Your data is always protected.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- How it works -->
  <section id="loan-types" class="bg-[#ECF0F5] py-24">
    <div class="max-w-7xl mx-auto px-6 py-10 text-center">
      <h2 class="text-2xl font-bold text-gray-800" data-aos="fade-up">How it Works</h2>

      <p class="mt-3 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
        Get your loan in 4 simple steps. Our streamlined process ensures you get funded quickly.
      </p>

      <div class="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Step -->
        <div
          class="bg-white rounded-md p-6 text-left shadow-sm"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <div class="items-center mb-4">
            <span
              class="mb-4 w-7 h-7 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center"
            >
              01
            </span>
            <img src="../assets/icons/fast-approval.png" alt="" />
          </div>

          <h4 class="font-semibold text-gray-800">Create Account</h4>

          <p class="mt-2 text-sm text-gray-500">
            Sign up with your email and phone number. Complete BVN verification in seconds.
          </p>
        </div>

        <!-- Step -->
        <div
          class="bg-white rounded-md p-6 text-left shadow-sm"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div class="items-center mb-4">
            <span
              class="mb-4 w-7 h-7 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center"
            >
              02
            </span>
            <img src="../assets/icons/fast-approval.png" alt="" />
          </div>

          <h4 class="font-semibold text-gray-800">Apply for Loan</h4>

          <p class="mt-2 text-sm text-gray-500">
            Choose your loan type and amount. Fill in the simple application form.
          </p>
        </div>

        <!-- Step -->
        <div
          class="bg-white rounded-md p-6 text-left shadow-sm"
          data-aos="fade-up"
          data-aos-delay="450"
        >
          <div class="items-center mb-4">
            <span
              class="mb-4 w-7 h-7 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center"
            >
              03
            </span>
            <img src="../assets/icons/competitive rates.png" alt="" />
          </div>

          <h4 class="font-semibold text-gray-800">Get Approved</h4>

          <p class="mt-2 text-sm text-gray-500">
            Our system reviews your application. Most loans are approved within 24 hours.
          </p>
        </div>

        <!-- Step -->
        <div
          class="bg-white rounded-md p-6 text-left shadow-sm"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <div class="items-center mb-4">
            <span
              class="mb-4 w-7 h-7 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center"
            >
              04
            </span>
            <img src="../assets/icons/secure-trusted.png" alt="" />
          </div>

          <h4 class="font-semibold text-gray-800">Receive Funds</h4>

          <p class="mt-2 text-sm text-gray-500">
            Once approved, funds are disbursed directly to your bank account.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Loan calculator -->
  <div class="bg-pink-600 px-6 py-20 text-center items-center justify-center my-auto">
    <div clas="">
      <h2 class="text-2xl font-bold text-white">Loan Calculator</h2>

      <p class="text-white mx-auto mt-4">
        See how much you can borrow and what your repayments will be
      </p>
    </div>

    <div class="mt-6 w-full bg-pink-600 flex items-center justify-center p-6">
      <div
        class="w-full max-w-5xl bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row"
      >
        <!-- LEFT SECTION -->
        <div class="flex-1 bg-gray-100 p-10 space-y-8">
          <!-- Loan Type -->
          <div>
            <p class="text-sm text-gray-500 mb-3">Loan Type</p>
            <div class="bg-gray-200 rounded-xl p-1 inline-flex w-72">
              <button
                @click="loanType = 'personal'"
                :class="
                  loanType === 'personal' ? 'bg-[#5C2ECD] text-white' : 'text-black'
                "
                class="flex-1 py-2 rounded-lg text-sm font-medium transition"
              >
                Personal
              </button>
              <button
                @click="loanType = 'business'"
                :class="
                  loanType === 'business' ? 'bg-[#5C2ECD] text-white' : 'text-black'
                "
                class="flex-1 py-2 rounded-lg text-sm font-medium transition"
              >
                Business
              </button>
            </div>
          </div>

          <!-- Loan Amount -->
          <div>
            <p class="text-sm text-gray-500 mb-2">Loan Amount</p>

            <div class="flex justify-between items-center mb-3">
              <span class="text-[#5C2ECD] font-semibold text-lg">
                ₦{{ formattedLoanAmount }}
              </span>
              <span class="text-xs text-gray-400">₦1,000,000</span>
            </div>

            <v-slider
              v-model="loanAmount"
              :min="50000"
              :max="1000000"
              step="5000"
              hide-details
              track-color="grey-lighten-2"
              color="#5C2ECD"
              class="mt-2"
            />
          </div>

          <!-- Repayment Period -->
          <div>
            <p class="text-sm text-gray-500 mb-2">Repayment Period</p>

            <div class="flex justify-between items-center mb-3">
              <span class="text-[#5C2ECD] font-semibold"> {{ repaymentPeriod }} months </span>
              <span class="text-xs text-gray-400">3 months</span>
            </div>

            <v-slider
              v-model="repaymentPeriod"
              :min="1"
              :max="3"
              step="1"
              hide-details
              track-color="grey-lighten-2"
              color="#5C2ECD"
            />
          </div>

          <!-- Interest Rate -->
          <div>
            <p class="text-sm text-gray-500 mb-2">Interest Rate</p>
            <div class="bg-gray-200 text-gray-700 px-4 py-3 rounded-lg text-sm">
              {{ interestRate }}% per month
            </div>
          </div>

          <!-- Apply Button -->
          <button
            @click="applyLoan"
            class="w-full bg-[#5C2ECD] text-white py-3 rounded-xl font-medium transition"
          >
            Apply for This Loan
          </button>
        </div>

        <!-- RIGHT SECTION -->
        <div
          class="flex-1 bg-[#5C2ECD] text-white p-10 space-y-8"
        >
          <h2 class="text-lg font-semibold">Your Loan Summary</h2>

          <div class="space-y-20 text-sm">
            <div class="flex justify-between border-b border-purple-500 pb-3">
              <span class="text-purple-200">Loan Amount</span>
              <span class="font-medium">₦{{ formattedLoanAmount }}</span>
            </div>

            <div class="flex justify-between border-b border-purple-500 pb-3">
              <span class="text-purple-200">Total Interest</span>
              <span class="font-medium">₦{{ totalInterest }}</span>
            </div>

            <div class="flex justify-between border-b border-purple-500 pb-3">
              <span class="text-purple-200">Total Repayment</span>
              <span class="font-semibold">₦{{ totalRepayment }}</span>
            </div>
          </div>

          <!-- Monthly Repayment Card -->
          <div class="bg-[#7E4AFF] text-left rounded-lg p-5">
            <p class="text-xs text-purple-200 mb-1">Monthly Repayment</p>
            <p class="text-2xl font-bold">₦{{ monthlyRepayment }}</p>
          </div>

          <div class="flex gap-4">
            <!-- <div class="rounded-full p-4 border border-white">
              <i class="fa-solid fa-exclamation"></i>
            </div>
             -->
            <p class="text-xs text-purple-300 leading-relaxed">
            This is an estimate. Final terms may vary based on your credit assessment.
          </p>
          </div>
          
        </div>
      </div>
    </div>
  </div>

  <!-- FAQs -->
  <section id="faq" class="bg-white py-20 px-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-2xl font-semibold text-gray-800">Frequently Asked Questions</h2>
        <p class="text-gray-500 mt-4">Everything you need to know about our loan services</p>
      </div>

      <!-- FAQ Accordion -->
      <v-expansion-panels v-model="panel"  class="space-y-4">
        <v-expansion-panel
          v-for="(faq, index) in faqs"
          :key="index"
          class="!rounded-lg border border-gray-200 bg-white"
          elevation="0"
        >
          <v-expansion-panel-title class="py-4 h-20 text-gray-700 font-medium">
            {{ faq.question }}
          </v-expansion-panel-title>

          <v-expansion-panel-text class="text-gray-600">
            {{ faq.answer }}
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <!-- Contact Link -->
      <div class="text-center mt-10 text-gray-600">
        Still have questions?
        <a href="#" class="text-purple-600 font-medium hover:underline ml-2">
          Contact our support team →
        </a>
      </div>
    </div>
  </section>

  <!-- Newsletter -->
  <section class="w-full bg-[#fff7f9] py-24">
    <div class="max-w-3xl mx-auto text-center px-4">
      <!-- Title -->
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">Newsletter</h2>

      <!-- Subtitle -->
      <p class="text-gray-400 mb-10">
        Subscribe to our newsletter and get recent <br />
        updates on our products
      </p>

      <!-- Form -->
      <form @submit.prevent="handleSubscribe" class="flex justify-center items-center gap-3">
        <input
          v-model="email"
          type="email"
          density="compact"
          placeholder="Your email"
          class="w-[320px] px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />

        <button
          type="submit"
          class="bg-pink-600 hover:bg-pink-700 transition text-white font-semibold tracking-wide px-6 py-3 rounded-md uppercase text-sm"
        >
          Subscribe
        </button>
      </form>
    </div>
  </section>

  <!-- Footer -->
  <FooterView />
</template>

<script setup>
import { ref, computed } from 'vue'
import FooterView from '@/components/Layouts/FooterView.vue'
import HeaderView from '@/components/Layouts/HeaderView.vue'
import ceoImg from '@/assets/images/ceo.png'
import devImg from '@/assets/images/tonia.png'
import freelancerImg from '@/assets/images/amadi-allwell.png'
import { useRouter } from 'vue-router'
const router = useRouter()

const email = ref('')

const handleSubscribe = () => {
  console.log('Subscribed with:', email.value)
  // TODO: Call your API here
  email.value = ''
}
const reviews = [
  {
    name: 'Adewale Williams',
    role: 'Business Owner',
    img: ceoImg,
    text: 'Credmate helped me expand my business with a seamless loan process. Got approved in 24 hours!'
  },
  {
    name: 'Anthonia Obili',
    role: 'Enterpreneur',
    img: devImg,
    text: 'The BVN verification was instant and my loan was disbursed the same day. Highly recommended!'
  },
  {
    name: 'Ahmad Bello',
    role: 'Tech Professional',
    img: freelancerImg,
    text: 'Best loan platform in Nigeria. Transparent rates and no hidden charges at all.'
  }
]

const panel = ref(null)

const faqs = ref([
  {
    question: 'What documents do I need to apply for a loan?',
    answer:
      'You will need a valid government-issued ID, proof of income, and a recent bank statement. Additional documents may be required based on your loan type.'
  },
  {
    question: 'How long does loan approval take?',
    answer:
      'Most applications are reviewed within 24–48 hours. Business loans may take slightly longer depending on documentation.'
  },
  {
    question: 'What is the interest rate on loans?',
    answer:
      'Our interest rate starts from 7% per month depending on your credit profile and loan duration.'
  },
  {
    question: 'How do I repay my loan?',
    answer:
      'Loan repayments are made monthly via direct debit, bank transfer, or online payment through your dashboard.'
  },
  {
    question: 'What happens if I miss a payment?',
    answer:
      'Late payments may attract penalties and affect your credit score. Please contact support immediately if you anticipate delays.'
  },
  {
    question: 'Can I repay my loan early?',
    answer:
      'Yes. Early repayment is allowed and may reduce your total interest cost depending on your agreement.'
  },
  {
    question: 'Is my data secure?',
    answer:
      'Absolutely. We use bank-level encryption and strict data protection policies to keep your information secure.'
  }
])

const loanType = ref('personal')
const loanAmount = ref(500000)
const repaymentPeriod = ref(3)
const interestRate = ref(7) // % per month

// Computed values
// Computed values
const totalInterest = computed(() =>
  ((loanAmount.value * interestRate.value * repaymentPeriod.value) / 100).toLocaleString()
)

const totalRepayment = computed(() =>
  (loanAmount.value + (loanAmount.value * interestRate.value * repaymentPeriod.value) / 100).toLocaleString()
)

const monthlyRepayment = computed(() =>
  ((loanAmount.value + (loanAmount.value * interestRate.value * repaymentPeriod.value) / 100) / repaymentPeriod.value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
)
const formattedLoanAmount = computed(() => loanAmount.value.toLocaleString())

const applyLoan = () => {
  router.push('/login')
}
</script>

<style scoped>
.v-btn {
  text-transform: none;
}
.v-expansion-panel {
  border-radius: 12px !important;
  overflow: hidden;
}
:deep(.v-expansion-panel) {
  border-radius: 12px !important;
  overflow: hidden;
}

</style>
