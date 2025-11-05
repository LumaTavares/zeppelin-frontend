<template>
  <FullScreenLayout>
    <div class="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div class="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900">
        <div class="flex flex-col flex-1 w-full lg:w-1/2">
          <div class="w-full max-w-md pt-10 mx-auto">
            <router-link
              to="/signin"
              class="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <svg
                class="stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M12.7083 5L7.5 10.2083L12.7083 15.4167"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Back to Sign In
            </router-link>
          </div>

          <div class="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div>
              <div class="mb-5 sm:mb-8 text-center">
                <h1 class="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                  Forgot Password
                </h1>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Enter your email to receive password reset instructions.
                </p>
              </div>

              <form @submit.prevent="handleSubmit">
                <div class="space-y-5">
                  <!-- Email -->
                  <div>
                    <label for="email" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Email<span class="text-error-500">*</span>
                    </label>
                    <input
                      v-model="email"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your@email.com"
                      class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30"
                      required
                    />
                  </div>

                  <!-- Confirm Email -->
                  <div>
                    <label for="confirmEmail" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Confirm Email<span class="text-error-500">*</span>
                    </label>
                    <input
                      v-model="confirmEmail"
                      type="email"
                      id="confirmEmail"
                      name="confirmEmail"
                      placeholder="confirm@email.com"
                      class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30"
                      required
                    />
                  </div>

                    <!-- Button -->
                    <div>
                      <div v-if="errorMessage" class="p-3 mb-4 text-sm text-red-600 bg-red-100 border border-red-300 rounded-lg">
                          {{ errorMessage }}
                      </div>
                      
                      <button
                        type="submit"
                        class="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-950 shadow-theme-xs hover:bg-brand-900"
                      >
                        Sign In
                      </button>
                    </div>
                </div>
              </form>

              <div class="mt-5 text-center">
                <p class="text-sm font-normal text-gray-700 dark:text-gray-400">
                  Remember your password?
                  <router-link
                    to="/signin"
                    class="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    >Sign In</router-link
                  >
                </p>
              </div>
            </div>
          </div>
        </div>

        <!--foto da tela principal-->
        <div
          class="grid relative items-center w-200 h-220 bg-brand-950 dark:bg-white/5 rounded-2xl mt-10 mr-10"
        >
          <div class="">
            <common-grid-shape />
            <div class="">
              <h1 class="zeppelin-nome">
                ZEPPELIN
              </h1>
              <div class="mt-25">
              <img class="imagem-inicio" src="/images/site/1656.png"/>
              </div>
          
              <div class="flex items-center gap-10 mt-20 ml-20">
                <img src="/images/logo/leds_logo.png" class="h-17"/>
                <img src="/images/logo/ifes_logo.png" class="h-23 "/>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </div>
  </FullScreenLayout>
</template>

<script setup lang="ts">
import FullScreenLayout from '@/components/layout/FullScreenLayout.vue'
import CommonGridShape from '@/components/common/CommonGridShape.vue'

import { ref } from 'vue'
import { api } from '@/services/api'
import { RouterLink } from 'vue-router'

const email = ref('')
const confirmEmail = ref('') // campo para confirmação do email
const loading = ref(false)
const error = ref<string | null>(null)
  
// funções de validação
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}$/

const handleSubmit = async () => {
  error.value = null
  if (email.value !== confirmEmail.value) {
    error.value = 'Os emails não coincidem'
    return
  }
  if (!emailRegex.test(email.value)) {
    error.value = 'Email inválido'
    alert('Email inválido')
    return
  }
  loading.value = true
  try {
    const { data } = await api.post('/auth/password-reset/', {
      email: email.value,
    })
    alert('Email de reset enviado se a conta existir')
    console.log("Email de reset enviado se a conta existir") // redireciona para página de confirmação
  } 
  catch (exc: any) {
    console.log("ERROR : Email de reset enviado se a conta existir")
    error.value = exc.response?.data?.detail || 'Erro ao enviar email'
    loading.value = false
  }
}

</script>