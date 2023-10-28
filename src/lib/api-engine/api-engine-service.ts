import { api, ApiInitConfig } from '@/lib/api'
import { ApiEngineEndpoints } from '@/lib/api-engine/api-engine-endpoints'
import { ApiEngineError } from '@/lib/api-engine/api-engine-error'
import { getBaseUrl } from '@/lib/utils/get-base-url'
import { AuthLogin, AuthResponse, User } from '@/types/api.types'

export class ApiEngineService {
  private readonly _url: ApiEngineEndpoints
  constructor() {
    this._url = new ApiEngineEndpoints()
  }

  async login(credentials: AuthLogin, config?: ApiInitConfig): Promise<AuthResponse> {
    const res = await this._responseHandler(() =>
      api.post<AuthLogin, AuthResponse>(this._url.Login, credentials, config)
    )

    return (await res.json()) as AuthResponse
  }

  async currentUser(config?: ApiInitConfig): Promise<User> {
    console.log(config)
    const res = await this._responseHandler(() => api.get(this._url.CurrentUser, config))

    return (await res.json()) as User
  }

  async refreshToken(config: ApiInitConfig = {}): Promise<AuthResponse> {
    // if (typeof window === 'undefined') {
    //   const { cookies } = await import('next/headers')
    //   const headers = new Headers(config?.headers)
    //   headers.set('Cookie', cookies().toString())
    //   config.headers = headers
    //   const res = await api.get(this._url.RefreshToken, config)
    //   // await setCookies(res)
    //   if (!res.ok) {
    //     throw new ApiEngineError(await res.json())
    //   }
    //   return (await res.json()) as AuthResponse
    // }

    const res = await api.get(this._url.RefreshToken, config)
    if (!res.ok) {
      throw new ApiEngineError(await res.json())
    }
    return (await res.json()) as AuthResponse
  }

  async nextRefreshToken() {
    console.log(process.env.NEXT_PUBLIC_API_ENDPOINT)
    return fetch(`${getBaseUrl()}/api/auth/refresh`)
  }

  private async _responseHandler(
    fetchMethod: (config?: ApiInitConfig) => Promise<Response>
  ): Promise<Response> {
    const response = await fetchMethod()

    if (!response.ok) {
      if (response.status === 401) {
        console.log('refreshing token')
        const refreshTokens = await this.refreshToken()

        return await fetchMethod({
          headers: {
            Authorization: `Bearer ${refreshTokens.access_token}`,
          },
        })
      }
      const res = await response.json()
      throw new ApiEngineError(res)
    }

    return response
  }
}
