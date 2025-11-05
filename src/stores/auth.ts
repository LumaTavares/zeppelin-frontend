import { defineStore } from 'pinia'
import { env } from '@/stores/env'
import { api } from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('access_token') || '',
    refreshToken: localStorage.getItem('refresh_token') || '',
    user: null as any
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
    fullName: (state) => {
      if (!state.user) return 'Usuário'
      return `${state.user.first_name} ${state.user.last_name}`.trim()
    }
  },

  actions: {
    // Função para buscar dados do usuário
    async fetchUser() {
      if (!this.token) {
        throw new Error('Token não encontrado')
      }

      try {
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        const response = await api.get('/auth/api/me/')
        this.user = response.data
        return response.data
      } catch (error) {
        console.error('Erro ao buscar usuário:', error)
        // Se o token for inválido, faz logout
        this.logout()
        throw error
      }
    },

    // Inicializa o store (chamar no App.vue)
    async initialize() {
      if (this.token) {
        try {
          await this.fetchUser()
        } catch (error) {
          console.error('Erro ao inicializar auth:', error)
        }
      }
    },

    async login(email: string, password: string) {
      //Client_id and client_secret from app OAuth need create and change in code
      try {
        const data = new URLSearchParams()
        data.append('grant_type', 'password')
        data.append('username', email)
        data.append('password', password)
        data.append('client_id', env.CLIENT_ID)
        data.append('client_secret', env.CLIENT_SECRET)

        const res = await api.post('/o/token/', data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })

        this.token = res.data.access_token
        this.refreshToken = res.data.refresh_token

        localStorage.setItem('access_token', this.token)
        localStorage.setItem('refresh_token', this.refreshToken)

        // Buscar dados do usuário após login
        await this.fetchUser()

      } catch (error: any) {
        console.error('Erro no login:', error.response?.data || error.message)
        throw error
      }
    },

    logout() {
      this.token = ''
      this.refreshToken = ''
      this.user = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      delete api.defaults.headers.common['Authorization']
    }
  }
})