export class ApiResponse<T> {
  success: boolean
  message?: string | undefined
  data?: T | undefined

  constructor(data?: T, message?: string) {
    this.success = true
    this.data = data
    this.message = message
  }
}