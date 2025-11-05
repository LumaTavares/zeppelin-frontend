<template>
  <FullScreenLayout>
    <div class="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div class="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900">
        <div class="flex flex-col flex-1 w-full lg:w-1/2">
          <div class="w-full max-w-md pt-10 mx-auto">
            <router-link
              to="/"
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
                  New Password
                </h1>
                
              </div>

              <form @submit.prevent="handleSubmit">
                <div class="space-y-5">
                  <!-- Password -->
                  <div>
                    <label for="password" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Password<span class="text-error-500">*</span>
                    </label>
                    <p class="text-xs text-gray-500 mt-1">
                      The password must have at least 8 characters, including uppercase, lowercase, number, and special character.
                    </p>
                    <input
                      v-model="password"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="New Password"
                      class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30"
                      required
                    />
                  </div>

                  <!-- Confirm Password -->
                  <div>
                    <label for="confirmPassword" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Confirm Password<span class="text-error-500">*</span>
                    </label>
                    <input
                      v-model="confirmPassword"
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="New Password"
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
                      Send Reset Link
                    </button>
                  </div>
                </div>
              </form>

              <div class="mt-5 text-center">
                <p class="text-sm font-normal text-gray-700 dark:text-gray-400">
                  Remember your password?
                  <router-link
                    to="/"
                    class="text-brand-950 hover:text-brand-900 dark:text-brand-400"
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
import { useRoute, RouterLink, useRouter } from 'vue-router'

const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const errorMessage = ref('')
const router = useRouter()
const route = useRoute()
const uid = route.query.uid
const token = route.query.token

// funções de validação
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&()*+\-./<=>?@\[\\\]_{}])[A-Za-z\d!#$%&()*+\-./<=>?@\[\\\]_{}]{8,}$/

const handleSubmit = async () => {

  if(!password.value || !confirmPassword.value){
    errorMessage.value= "Por favor, preencha todos os campos."
    return
  }
  if (password.value !== confirmPassword.value) {
    errorMessage.value= 'Os campos não coincidem.'
    return
  }
  if (!strongPasswordRegex.test(password.value)) {
    errorMessage.value=  'Senha fraca! Use pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, um número e um caractere especial.'
    return
  }
  loading.value = true
  try {
    await api.post('auth/password-reset-confirm/', { 
      uid,
      token, 
      new_password: password.value 
    })
    alert('Senha alterada com sucesso!')
    //console.log("Senha alterada com sucesso")
    router.push('/signin')
  } 
  catch (exc: any) {
    //console.log("ERROR: Failed to change the password")
    loading.value = false
  }
}

</script>