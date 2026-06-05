/**
 * Global redirect logic for authenticated users.
 * Mirrors Brooder's main.global.ts pattern.
 */
export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  const profile = useCookie('profile')
  const token = useCookie('token')

  if (token.value || authStore.isAuthenticated) {
    if (to.path.startsWith('/auth') && !to.path.startsWith('/auth/')) {
      return navigateTo('/')
    }
  }
  void profile
})
