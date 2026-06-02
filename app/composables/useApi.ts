export function useApi<T>(url: string, options: Record<string, unknown> = {}) {
  return useFetch<T>(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    },
  })
}
