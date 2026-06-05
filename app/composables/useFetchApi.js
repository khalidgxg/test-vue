import { useRuntimeConfig, useCookie } from '#app'

/**
 * Authenticated API composable (mirrors Brooder's useFectchApi pattern).
 * Handles GET/POST/DELETE with Bearer token + automatic 401 redirect.
 */
export function useFetchApi() {
  const baseURL = useRuntimeConfig().public.apiBase
  const globalStore = useGlobalStore()
  const authStore = useAuthStore()

  const getAuthToken = () => {
    return globalStore.authToken || useCookie('token').value || null
  }

  const handleAuthError = () => {
    authStore.deleteAuthData()
    globalStore.authToken = null
    globalStore.profile = {}
    if (import.meta.client) {
      setTimeout(() => {
        navigateTo('/auth/login')
      }, 200)
    }
  }

  const getRequest = async (url = '/', body = {}) => {
    const token = getAuthToken()
    const { data, error, status } = await useFetch(`${baseURL}${url}`, {
      query: { ...body },
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })

    if (status.value === 'success') {
      return data.value
    }
    const err = error.value?.data || {}
    if (err.code === 401) handleAuthError()
    return err
  }

  const postRequest = async (
    url = '/',
    body = { formData: {} },
    headers = {},
  ) => {
    const token = headers.token || getAuthToken()
    const { data, error, status } = await useFetch(`${baseURL}${url}`, {
      body: body.formData,
      method: 'POST',
      headers: {
        accept: '*/*',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })

    if (status.value === 'success') {
      return data.value
    }
    const err = error.value?.data || {}
    if (err.code === 401) handleAuthError()
    return err
  }

  const deleteRequest = async (url = '/') => {
    const token = getAuthToken()
    const { data, error, status } = await useFetch(`${baseURL}${url}`, {
      method: 'DELETE',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })

    if (status.value === 'success') {
      return data.value
    }
    const err = error.value?.data || {}
    if (err.code === 401) handleAuthError()
    return err
  }

  return { getRequest, postRequest, deleteRequest }
}
