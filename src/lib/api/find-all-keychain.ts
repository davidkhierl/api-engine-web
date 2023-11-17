import { ApiEngineEndpoints } from '@/lib/api-engine/api-engine-endpoints'
import { ApiEngineError } from '@/lib/api-engine/api-engine-error'
import { Keychain } from '@/lib/api-engine/api.types'
import { fetchHandler } from '@/lib/api/fetch-handler'

export async function findAllKeychain() {
  return await fetchHandler(async (headers) => {
    const res = await fetch(ApiEngineEndpoints.KEYCHAINS, {
      method: 'get',
      headers,
      credentials: 'include',
      next: {
        tags: ['keychains'],
      },
    })
    const data = await res.json()
    if (!res.ok) throw new ApiEngineError(data)

    return data as Keychain[]
  })
}
