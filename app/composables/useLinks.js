/**
 * Computed platform/deep links (mirrors Brooder's useLinks pattern).
 * Currently no-op safe — extend with actual production URLs when known.
 */
export const useLinks = () => {
  const config = useRuntimeConfig()
  const origin = import.meta.client
    ? window.location.origin
    : config.public.apiBase || 'http://localhost:3000'

  const platformLink = computed(() => origin)
  const startNowLink = computed(() => `${origin}/auth/signup`)
  const servicesLink = computed(() => `${origin}/services`)

  return {
    platformLink,
    startNowLink,
    servicesLink,
  }
}
