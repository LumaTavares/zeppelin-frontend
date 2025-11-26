<template>
  <div>
    <div class="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div class="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div class="flex flex-col items-center w-full gap-6 xl:flex-row">
          <div
            class="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800"
          >
            <img src="/images/user/owner.jpg" alt="user" />
          </div>
          <div class="order-3 xl:order-2">
            <h4
              class="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left"
            >
              {{ email }}
            </h4>
            </div>
        </div>
      </div>
    </div>
    
          
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

// pegar store
const auth = useAuthStore()

// email do usuário (reativo)
const userEmail = computed(() => auth.user?.email || 'email@exemplo.com')

// expor para o template
const email = userEmail

// carregar usuário ao montar
onMounted(async () => {
  if (auth.token && !auth.user) {
    try {
      await auth.fetchUser()
    } catch (error) {
      console.error('Erro ao carregar usuário:', error)
    }
  }
})

// modal
const isProfileInfoModal = ref(false)

// salvar "mock"
const saveProfile = () => {
  console.log("Profile saved")
  isProfileInfoModal.value = false
}
</script>
