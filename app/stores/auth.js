import { defineStore } from 'pinia'
import { useCookie, useRuntimeConfig } from '#app'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    profile: useCookie('profile').value || {},
    token: useCookie('token').value || null,
    isLoading: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    userName: (state) => state.profile?.name || 'Guest',
  },
  actions: {
    async login(credentials) {
      this.isLoading = true
      try {
        const apiBase = useRuntimeConfig().public.apiBase
        const response = await $fetch(`${apiBase}/auth/login`, {
          method: 'POST',
          body: credentials,
        })
        this.profile = response.user
        this.token = response.token

        const profileCookie = useCookie('profile')
        const tokenCookie = useCookie('token')
        profileCookie.value = response.user
        tokenCookie.value = response.token
        return true
      } catch {
        return false
      } finally {
        this.isLoading = false
      }
    },
    logout() {
      this.profile = {}
      this.token = null
      const profileCookie = useCookie('profile')
      const tokenCookie = useCookie('token')
      profileCookie.value = null
      tokenCookie.value = null
      navigateTo('/auth/login')
    },
    deleteAuthData() {
      const authToken = useCookie('token')
      const authProfile = useCookie('profile')
      authToken.value = null
      authProfile.value = null
      if (import.meta.client) {
        refreshCookie('token')
        refreshCookie('profile')
      }
    },
  },
  persist: true,
})
