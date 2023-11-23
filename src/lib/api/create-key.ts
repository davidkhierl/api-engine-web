import { ApiEngineEndpoints } from '@/lib/api-engine/api-engine-endpoints'
import { ApiEngineError } from '@/lib/api-engine/api-engine-error'
import { CreateKeyInputs, Key } from '@/lib/api-engine/api.types'
import { fetchHandler } from '@/lib/api/fetch-handler'

export async function createKey(createKeyInputs: CreateKeyInputs) {
  return await fetchHandler(async (headers) => {
    const res = await fetch(ApiEngineEndpoints.KEYS, {
      method: 'post',
      headers,
      credentials: 'include',
      body: new URLSearchParams(createKeyInputs),
    })
    const data = await res.json()
    if (!res.ok) throw new ApiEngineError(data)
    return data as Key
  })
}
