import { ApiEngineError } from '@/lib/api-engine/api-engine-error'
import { AuthLogin, AuthResponse } from '@/lib/api-engine/api.types'
import { getBaseUrl } from '@/lib/utils/get-base-url'

export async function login(credentials: AuthLogin): Promise<AuthResponse> {
  const res = await fetch(`${getBaseUrl()}/api/auth/login`, {
    method: 'post',
    body: new URLSearchParams({ ...credentials }),
    credentials: 'include',
    cache: 'no-cache',
  })

  const data = await res.json()
  if (!res.ok) throw new ApiEngineError(data)
  return data as AuthResponse
}
