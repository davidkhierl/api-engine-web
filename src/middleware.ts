import { ApiEngineEndpoints } from '@/lib/api-engine/api-engine-endpoints'
import { AuthRefreshResponse } from '@/lib/api-engine/api.types'
import { getBaseUrl } from '@/lib/utils/get-base-url'
import { isAccessTokenExpired } from '@/lib/utils/is-access-token-expired'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const sid = cookies().get('sid')
  const accessToken = cookies().get('access_token')?.value
  const accessTokenExpiry = cookies().get('at_expiry')?.value

  /**
   *
   */
  if (
    sid &&
    (request.nextUrl.pathname.startsWith('/login') ||
      request.nextUrl.pathname.startsWith('/register'))
  )
    return NextResponse.redirect(`${getBaseUrl()}`)

  /**
   * Redirects to log in if all cookies are not set
   * TODO: add a redirect from origin path.
   * http://localhost:3000/login?redirect={users account page}
   */
  if (
    !sid &&
    !accessToken &&
    request.nextUrl.pathname !== '/login' &&
    request.nextUrl.pathname !== '/register' &&
    request.nextUrl.pathname !== '/api/auth/login' &&
    request.nextUrl.pathname !== '/api/auth/logout' &&
    request.nextUrl.pathname !== '/api/auth/register'
  )
    return NextResponse.redirect(`${getBaseUrl()}/login`)

  /**
   * We will try to refresh the tokens if the access token is expired
   */
  if (accessTokenExpiry) {
    if (isAccessTokenExpired(accessTokenExpiry)) {
      const res = await fetch(ApiEngineEndpoints.REFRESH, {
        headers: request.headers,
        credentials: 'include',
      })

      // If refreshing tokens unsuccessful, deletes all cookies
      if (!res.ok) {
        const response = NextResponse.next()
        response.cookies.delete('sid')
        response.cookies.delete('access_token')
        response.cookies.delete('at_expiry')
        return response
      }

      /**
       * On success overwrites the request to apply the new tokens and updates the response to set the new cookies
       */
      const tokens = (await res.json()) as AuthRefreshResponse

      // overwrite the request cookies
      request.cookies.set('access_token', tokens.access_token)
      request.cookies.set('at_expiry', tokens.at_expiry.toString())

      const response = NextResponse.next({
        request: request,
      })

      // update the response cookie
      response.cookies.set('access_token', tokens.access_token)
      response.cookies.set('at_expiry', tokens.at_expiry.toString())
      const newSid = res.headers.get('Set-Cookie')
      if (newSid) {
        response.headers.append('Set-Cookie', newSid)
      }

      return response
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
