enum ApiEngineBaseEndpoints {
  LOGIN = 'auth/login',
  REFRESH_TOKEN = 'auth/refresh',
  CURRENT_USER = 'users/me',
}

export class ApiEngineEndpoints {
  readonly baseUrl = process.env.NEXT_PUBLIC_API_URL!
  constructor() {
    if (!process.env.NEXT_PUBLIC_API_URL)
      throw Error('Missing environment variable: NEXT_PUBLIC_API_ENDPOINT')
  }

  readonly Login = `${this.baseUrl}/${ApiEngineBaseEndpoints.LOGIN}`
  readonly RefreshToken = `${this.baseUrl}/${ApiEngineBaseEndpoints.REFRESH_TOKEN}`
  readonly CurrentUser = `${this.baseUrl}/${ApiEngineBaseEndpoints.CURRENT_USER}`
}
