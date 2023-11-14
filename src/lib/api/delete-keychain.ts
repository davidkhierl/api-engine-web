import { ApiEngineEndpoints } from '@/lib/api-engine/api-engine-endpoints'
import { Keychain } from '@/lib/api-engine/api.types'
import { fetchHandler } from '@/lib/api/fetch-handler'

export async function deleteKeychain(id: string) {
  return await fetchHandler(async (headers) => {
    const res = await fetch(`${ApiEngineEndpoints.KEYCHAINS}/${id}`, {
      method: 'delete',
      headers,
      credentials: 'include',
      cache: 'no-cache',
    })

    if (!res.ok) return
    const data = await res.json()
    return data as Keychain
  })
}
