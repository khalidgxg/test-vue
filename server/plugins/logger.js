export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    const start = Date.now()
    event.context.startTime = start
  })

  nitroApp.hooks.hook('afterResponse', (event) => {
    const duration = Date.now() - (event.context.startTime || Date.now())
    console.log(`[Server] ${event.method} ${event.path} - ${duration}ms`)
  })
})
