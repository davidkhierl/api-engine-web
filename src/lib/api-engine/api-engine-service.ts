import { ApiInitConfig, api } from '@/lib/api-engine/api'
import { ApiEngineEndpoints } from '@/lib/api-engine/api-engine-endpoints'
import { ApiEngineError } from '@/lib/api-engine/api-engine-error'
import { AuthLogin, AuthResponse, RegisterUserInputs } from '@/lib/api-engine/api.types'

export class ApiEngineService {
  async login(credentials: AuthLogin, config?: ApiInitConfig): Promise<AuthResponse> {
    const res = await api.post<AuthLogin, AuthResponse>(
      ApiEngineEndpoints.LOGIN,
      credentials,
      config
    )

    return (await res.json()) as AuthResponse
  }

  async registerUser(registerUserInputs: RegisterUserInputs) {
    const res = await api.post(ApiEngineEndpoints.USERS, registerUserInputs)
    const data = await res.json()
    if (!res.ok) {
      throw new ApiEngineError(data)
    }

    return data
  }
}
