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
                  New Password
                </h1>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Não esqueça: use uma senha forte (com letras, números e símbolos) e guarde-a em um lugar seguro!
                </p>
              </div>

              <form @submit.prevent="handleSubmit">
                <div class="space-y-5">
                  <!-- Password -->
                  <div>
                    <label for="password" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Password<span class="text-error-500">*</span>
                    </label>
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
                    <button
                      type="submit"
                      class="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
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
                    to="/signin"
                    class="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    >Sign In</router-link
                  >
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="relative items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div class="flex items-center justify-center z-1">
            <CommonGridShape />
            <div class="flex flex-col items-center max-w-xs">
              <router-link to="/" class="block mb-4">
                <img width="231" height="48" src="/images/logo/auth-logo.svg" alt="Logo" />
              </router-link>
              <p class="text-center text-gray-400 dark:text-white/60">
                Free and Open-Source Tailwind CSS Admin Dashboard Template
              </p>
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
import { useRoute, RouterLink, useRouter } from 'vue-router'
import axios from 'axios'

const password = ref('')
const confirmPassword = ref('') // campo para confirmação do email
const loading = ref(false)
const error = ref<string | null>(null)
const router = useRouter()
const route = useRoute()
const uid = route.query.uid
const token = route.query.token

// funções de validação
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&()*+\-./<=>?@\[\\\]_{}])[A-Za-z\d!#$%&()*+\-./<=>?@\[\\\]_{}]{8,}$/

const handleSubmit = async () => {
  error.value = null
  if (password.value !== confirmPassword.value) {
    error.value = 'As senhas não coincidem'
    return
  }
  if (!strongPasswordRegex.test(password.value)) {
    error.value = 'Password inválido'
    alert('Password inválido')
    return
  }
  loading.value = true
  try {
    await axios.post('http://localhost:8000/auth/password-reset-confirm/', { uid ,token , new_password: password.value })
    alert('Senha alterada com sucesso')
    console.log("Senha alterada com sucesso")
    router.push('/signin')
  } 
  catch (exc: any) {
    console.log("ERROR : Erro ao alterar a senha")
    console.log(error.value = exc.response?.data?.detail || 'Erro ao alterar a senha')
    loading.value = false
  }
}

</script>
