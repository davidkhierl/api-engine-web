export interface ApiEngineErrorProperty {
  property: string
  value: string
  constraints: ErrorPropertyConstraint
}

export interface ErrorPropertyConstraint {
  [key: string]: string
}

export class ApiEngineError extends Error {
  readonly error: string | undefined
  readonly statusCode: number
  readonly errors?: ApiEngineErrorProperty[]
  readonly name = ApiEngineError.name

  constructor({
    message,
    error,
    statusCode,
    errors,
  }: {
    message: string
    statusCode: number
    error?: string
    errors: ApiEngineErrorProperty[]
  }) {
    super(message)
    this.error = error
    this.statusCode = statusCode
    this.errors = errors
    Object.setPrototypeOf(this, ApiEngineError.prototype)
  }

  getConstraints() {
    if (!this.errors) return
    return this.errors.map((error) => {
      return {
        property: error.property,
        message: Object.values(error.constraints)[0],
      }
    })
  }
}
