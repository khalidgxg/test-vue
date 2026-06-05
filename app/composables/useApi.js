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
