import { ApiInitConfig, api } from '@/lib/api-engine/api'
import { ApiEngineEndpoints } from '@/lib/api-engine/api-engine-endpoints'
import { AuthLogin, AuthResponse } from '@/lib/api-engine/api.types'

export class ApiEngineService {
  async login(credentials: AuthLogin, config?: ApiInitConfig): Promise<AuthResponse> {
    const res = await api.post<AuthLogin, AuthResponse>(
      ApiEngineEndpoints.LOGIN,
      credentials,
      config
    )

    return (await res.json()) as AuthResponse
  }
}
