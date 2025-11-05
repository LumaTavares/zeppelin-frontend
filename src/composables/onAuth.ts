import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export function onAuth() {
  const router = useRouter()
  const auth = useAuthStore()

  onMounted(() => {
    if (auth.isAuthenticated) {
      router.push('/')
    }
  })
}
