import { AuthRefreshResponse } from '@/lib/api-engine/api.types'
import { getAuthHeaders } from '@/lib/auth/get-auth-headers'
import { getBaseUrl } from '@/lib/utils/get-base-url'
import { isAccessTokenExpired } from '@/lib/utils/is-access-token-expired'
import { isServer } from '@/lib/utils/is-server'
import { redirect } from 'next/navigation'

/**
 * fetch handler, provides a header with authorization and access token, it also
 * performs refresh token if the access token is expired and returns a new refreshed access token.
 */
export async function fetchHandler<T>(
  fetcher: (
    headers: Headers,
    auth: { access_token: string; at_expiry?: string | null }
  ) => Promise<T>
) {
  // create new header
  let headers = new Headers()
  let access_token: string | null | undefined
  let at_expiry: string | null | undefined

  /**
   * apply the cookie from request cookie in server to the new header and set the access token
   * from the request cookie or from localstorage in client side
   */
  if (isServer) {
    const { headers: authHeaders, accessToken, accessTokenExpiry } = await getAuthHeaders()
    headers = authHeaders
    access_token = accessToken
    at_expiry = accessTokenExpiry
  } else {
    access_token = localStorage.getItem('access_token')
    at_expiry = localStorage.getItem('at_expiry')
    // set the authorization header
    if (access_token) headers.set('Authorization', `Bearer ${access_token}`)
  }

  /**
   * safeguard redirect to login page if there is no access token found
   * although this is already being handled in middleware.ts
   */
  if (!access_token) redirect('/login')

  if (at_expiry && isAccessTokenExpired(at_expiry)) {
    const res = await fetch(`${getBaseUrl()}/api/auth/refresh`, {
      credentials: 'include',
      cache: 'no-cache',
    })

    if (!res.ok) redirect('/login')

    if (res.ok) {
      const auth = (await res.json()) as AuthRefreshResponse
      // set the authorization header with the new access token
      headers.set('Authorization', `Bearer ${auth.access_token}`)

      // update the values in localstorage
      if (!isServer) {
        localStorage.setItem('access_token', auth.access_token)
        localStorage.setItem('at_expiry', auth.at_expiry.toString())
      }

      return fetcher(headers, {
        access_token: auth.access_token,
        at_expiry: auth.at_expiry.toString(),
      })
    }
  }

  return fetcher(headers, { access_token, at_expiry })
}
