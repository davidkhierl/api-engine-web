export class ApiEngineError extends Error {
  readonly error: string | undefined
  readonly statusCode: number
  constructor({
    message,
    error,
    statusCode,
  }: {
    message: string
    error?: string
    statusCode: number
  }) {
    super(message)
    this.error = error
    this.statusCode = statusCode
    Object.setPrototypeOf(this, ApiEngineError.prototype)
  }
}
