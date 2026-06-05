/**
 * Route guard requiring user-info state (mirrors Brooder's user-info.ts).
 */
export default defineNuxtRouteMiddleware(() => {
  const profile = useCookie('profile')
  if (!profile.value) {
    return navigateTo('/auth/login')
  }
})
