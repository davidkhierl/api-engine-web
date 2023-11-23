import { ApiEngineEndpoints } from '@/lib/api-engine/api-engine-endpoints'
import { ApiEngineError } from '@/lib/api-engine/api-engine-error'
import { Key } from '@/lib/api-engine/api.types'
import { fetchHandler } from '@/lib/api/fetch-handler'

export async function findAllKeys() {
  return await fetchHandler(async (headers) => {
    const res = await fetch(ApiEngineEndpoints.KEYS, {
      method: 'get',
      headers,
      credentials: 'include',
      next: {
        tags: ['keys'],
      },
    })
    const data = await res.json()
    if (!res.ok) throw new ApiEngineError(data)

    return data as Key[]
  })
}
