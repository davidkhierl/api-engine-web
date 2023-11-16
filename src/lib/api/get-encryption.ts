import { ApiEngineEndpoints } from '@/lib/api-engine/api-engine-endpoints'
import { ApiEngineError } from '@/lib/api-engine/api-engine-error'
import { Encryption } from '@/lib/api-engine/api.types'
import { fetchHandler } from '@/lib/api/fetch-handler'

export async function getEncryption() {
  return await fetchHandler(async (headers) => {
    const res = await fetch(ApiEngineEndpoints.ENCRYPTION, {
      method: 'get',
      headers,
      credentials: 'include',
      next: {
        tags: ['encryption'],
      },
    })
    const data = await res.json()
    if (!res.ok) throw new ApiEngineError(data)
    return data as Encryption
  })
}
