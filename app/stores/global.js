import { defineStore } from 'pinia'
import { useCookie } from '#app'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    authToken: useCookie('token').value,
    profile: useCookie('profile').value || {},
    showAlert: false,
    alertData: {
      message: '',
      success: false,
    },
    alert: {
      message: '',
      status: '',
    },
    apiURL: useRuntimeConfig().public.apiBase || 'http://localhost:8000/api',
    sidebarOpen: false,
  }),
  actions: {
    setAlertData(message, success) {
      this.alertData.message = message
      this.alertData.success = success
      this.showAlert = true
      if (import.meta.client) {
        setTimeout(() => {
          this.showAlert = false
        }, 4000)
      }
    },
    setAlert(message, status = 'error') {
      this.alert.message = message
      this.alert.status = status
      this.showAlert = true
      if (import.meta.client) {
        setTimeout(() => {
          this.showAlert = false
          this.alert.message = ''
          this.alert.status = ''
        }, 6000)
      }
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },
    closeSidebar() {
      this.sidebarOpen = false
    },
  },
  persist: true,
})
