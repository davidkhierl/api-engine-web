import { ApiEngineEndpoints } from '@/lib/api-engine/api-engine-endpoints'
import { ApiEngineError } from '@/lib/api-engine/api-engine-error'
import { User } from '@/lib/api-engine/api.types'
import { fetchHandler } from '@/lib/api/fetch-handler'

export async function getCurrentUser() {
  return await fetchHandler(async (headers) => {
    const res = await fetch(ApiEngineEndpoints.CURRENT_USER, {
      method: 'get',
      headers,
      credentials: 'include',
      next: {
        tags: ['current-user'],
      },
    })
    const data = await res.json()
    if (!res.ok) throw new ApiEngineError(data)

    return data as User
  })
}
