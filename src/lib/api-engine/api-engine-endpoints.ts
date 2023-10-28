enum ApiEngineBaseEndpoints {
  LOGIN = 'auth/login',
  REFRESH_TOKEN = 'auth/refresh',
  CURRENT_USER = 'users/me',
}

export class ApiEngineEndpoints {
  public static readonly LOGIN = `${ApiEngineEndpoints.getBaseUrl}/${ApiEngineBaseEndpoints.LOGIN}`

  public static getBaseUrl() {
    if (process.env.NODE_ENV === 'development') {
      if (!process.env.NEXT_PUBLIC_URL)
        throw Error('Missing environment variable: NEXT_PUBLIC_API_ENDPOINT')
      return `${process.env.NEXT_PUBLIC_URL}`
    }

    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }
}
