export function useApi<T>(url: string, options: Record<string, unknown> = {}) {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase || 'http://localhost:8000/api'
  
  const normalizedUrl = url.startsWith('http://') || url.startsWith('https://')
    ? url
    : `${apiBase}${url.startsWith('/') ? '' : '/'}${url}`

  return useFetch<T>(normalizedUrl, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    },
  })
}
