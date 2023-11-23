enum ApiEngineBaseEndpoints {
  AUTH = 'auth',
  LOGIN = ApiEngineBaseEndpoints.AUTH + '/login',
  LOGOUT = ApiEngineBaseEndpoints.AUTH + '/logout',
  REFRESH_TOKEN = ApiEngineBaseEndpoints.AUTH + '/refresh',
  USERS = 'users',
  CURRENT_USER = ApiEngineBaseEndpoints.USERS + '/me',
  KEYCHAINS = 'keychains',
  ENCRYPTION = 'encryption',
  KEYS = 'keys',
}

export class ApiEngineEndpoints {
  public static readonly LOGIN = `${ApiEngineEndpoints.getBaseUrl()}/${
    ApiEngineBaseEndpoints.LOGIN
  }`
  public static readonly LOGOUT = `${ApiEngineEndpoints.getBaseUrl()}/${
    ApiEngineBaseEndpoints.LOGOUT
  }`
  public static readonly REFRESH = `${ApiEngineEndpoints.getBaseUrl()}/${
    ApiEngineBaseEndpoints.REFRESH_TOKEN
  }`
  public static readonly USERS = `${ApiEngineEndpoints.getBaseUrl()}/${
    ApiEngineBaseEndpoints.USERS
  }`
  public static readonly CURRENT_USER = `${ApiEngineEndpoints.getBaseUrl()}/${
    ApiEngineBaseEndpoints.CURRENT_USER
  }`
  public static readonly KEYCHAINS = `${ApiEngineEndpoints.getBaseUrl()}/${
    ApiEngineBaseEndpoints.KEYCHAINS
  }`
  public static readonly ENCRYPTION = `${ApiEngineEndpoints.getBaseUrl()}/${
    ApiEngineBaseEndpoints.ENCRYPTION
  }`
  public static readonly KEYS = `${ApiEngineEndpoints.getBaseUrl()}/${ApiEngineBaseEndpoints.KEYS}`

  public static getBaseUrl() {
    if (!process.env.NEXT_PUBLIC_API_URL)
      throw Error('Missing environment variable: NEXT_PUBLIC_API_ENDPOINT')
    return `${process.env.NEXT_PUBLIC_API_URL}`
  }
}
