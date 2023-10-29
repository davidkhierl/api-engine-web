enum ApiEngineBaseEndpoints {
  LOGIN = 'auth/login',
  REFRESH_TOKEN = 'auth/refresh',
  USERS = 'users',
  CURRENT_USER = ApiEngineBaseEndpoints.USERS + '/me',
}

export class ApiEngineEndpoints {
  public static readonly LOGIN = `${ApiEngineEndpoints.getBaseUrl()}/${
    ApiEngineBaseEndpoints.LOGIN
  }`
  public static readonly USERS = `${ApiEngineEndpoints.getBaseUrl()}/${
    ApiEngineBaseEndpoints.USERS
  }`

  public static getBaseUrl() {
    if (!process.env.NEXT_PUBLIC_API_URL)
      throw Error('Missing environment variable: NEXT_PUBLIC_API_ENDPOINT')
    return `${process.env.NEXT_PUBLIC_API_URL}`
  }
}
