enum ApiEngineBaseEndpoints {
  LOGIN = 'auth/login',
  CURRENT_USER = 'users/me',
}

export class ApiEngineEndpoints {
  readonly baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT!
  constructor() {
    if (!process.env.NEXT_PUBLIC_API_ENDPOINT)
      throw Error('Missing environment variable: NEXT_PUBLIC_API_ENDPOINT')
  }

  readonly Login = `${this.baseUrl}/${ApiEngineBaseEndpoints.LOGIN}`
  readonly CurrentUser = `${this.baseUrl}/${ApiEngineBaseEndpoints.CURRENT_USER}`
}
