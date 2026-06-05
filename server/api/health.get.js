export default defineEventHandler(() => ({
  status: 'ok',
  timestamp: new Date().toISOString(),
  uptime: Math.floor(process.uptime()),
  version: '1.0.0',
}))
