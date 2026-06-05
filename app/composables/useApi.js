/**
 * Composable for making API requests with the configured base URL.
 * SSR-safe: uses useFetch on the server and respects Nuxt's payload.
 *
 * @template T
 * @param {string} url
 * @param {Record<string, unknown>} options
 */
export function useApi(url, options = {}) {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase || 'http://localhost:8000/api'

  const normalizedUrl = url.startsWith('http://') || url.startsWith('https://')
    ? url
    : `${apiBase}${url.startsWith('/') ? '' : '/'}${url}`

  return useFetch(normalizedUrl, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })
}
