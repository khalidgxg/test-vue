export interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

export interface HealthCheck {
  status: 'ok' | 'error'
  timestamp: string
  uptime: number
  version: string
}
