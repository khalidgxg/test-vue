import type { HealthCheck } from '#shared/types'

export default defineEventHandler(
  (): HealthCheck => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    version: '1.0.0',
  }),
)
