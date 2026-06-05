/**
 * Global auth guard. Mirrors Brooder's auth.global.ts pattern.
 * Redirects unauthenticated users to /auth/login for protected routes.
 */
export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  const token = useCookie('token')

  if (!token.value && !authStore.isAuthenticated) {
    const guestAllowed
      = to.path === '/'
      || to.path === '/auth/login'
      || to.path === '/auth/register'
      || to.path === '/auth/forgot-password'
      || to.path.startsWith('/auth')

    if (!guestAllowed) {
      return navigateTo('/auth/login')
    }
  }
})
