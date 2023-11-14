import { ApiEngineError } from '@/lib/api-engine/api-engine-error'
import { AuthResponse, RegisterUserInputs } from '@/lib/api-engine/api.types'
import { getBaseUrl } from '@/lib/utils/get-base-url'

export async function registerUser(registerUserInputs: RegisterUserInputs): Promise<AuthResponse> {
  const res = await fetch(`${getBaseUrl()}/api/auth/register`, {
    method: 'post',
    body: new URLSearchParams({ ...registerUserInputs }),
    credentials: 'include',
    cache: 'no-cache',
  })
  const data = await res.json()
  if (!res.ok) {
    throw new ApiEngineError(data)
  }
  return data as AuthResponse
}
