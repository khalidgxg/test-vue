import { useRuntimeConfig } from '#app'

/**
 * Lightweight non-authenticated request helper (for public endpoints).
 * Mirrors Brooder's utils/sendApiRequest pattern.
 */
export default async (url = '/', params = {}) => {
  const baseURL = useRuntimeConfig().public.apiBase
  const globalStore = useGlobalStore()
  const token = globalStore.authToken || useCookie('token').value

  const { data, error, status } = await useFetch(`${baseURL}${url}`, {
    query: { ...params },
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })

  if (status.value === 'success') {
    return data.value
  }
  const err = error.value?.data || {}
  if (err.code === 401) {
    const authToken = useCookie('token')
    const authProfile = useCookie('profile')
    authToken.value = null
    authProfile.value = null
    if (import.meta.client) {
      refreshCookie('token')
      refreshCookie('profile')
      globalStore.authToken = null
      globalStore.profile = {}
      setTimeout(() => navigateTo('/auth/login'), 200)
    }
  }
  return err
}
