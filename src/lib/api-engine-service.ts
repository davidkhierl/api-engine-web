import { api, ApiInitConfig } from '@/lib/api'
import { ApiEngineEndpoints } from '@/lib/api-engine-endpoints'
import { ApiEngineError } from '@/lib/api-engine-error'
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
    const res = await this._responseHandler(() => api.get(this._url.CurrentUser, config))

    return (await res.json()) as User
  }

  private async _responseHandler(fetch: () => Promise<Response>): Promise<Response> {
    const response = await fetch()

    if (!response.ok) {
      const res = await response.json()
      throw new ApiEngineError(res)
    }

    return response
  }
}
