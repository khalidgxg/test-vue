export default defineNuxtRouteMiddleware((_to) => {
  // Add auth guard logic here
  // Example: const auth = useAuthStore()
  // if (!auth.isAuthenticated && to.path.startsWith('/dashboard')) {
  //   return navigateTo('/login')
  // }
})
