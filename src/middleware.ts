import { ApiEngineEndpoints } from '@/lib/api-engine/api-engine-endpoints'
import { AuthRefreshResponse } from '@/lib/api-engine/api.types'
import { isAccessTokenExpired } from '@/lib/utils/is-access-token-expired'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const sid = cookies().get('sid')
  const accessToken = cookies().get('access_token')?.value
  const accessTokenExpiry = cookies().get('at_expiry')?.value

  /**
   * Redirects to home page if tyring to access a non-authorized path if user already signed in
   */
  if (
    sid &&
    accessToken &&
    (request.nextUrl.pathname.startsWith('/login') ||
      request.nextUrl.pathname.startsWith('/register'))
  ) {
    /**
     * TODO(2): check the validity of access token by getting the current user, refresh if needed.
     * TODO: Use the refactored method from TODO(1)
     */
    return NextResponse.redirect(new URL('/', request.url))
  }

  /**
   * Redirects to log in if all cookies are not set
   * TODO: add a redirect from origin path.
   * http://localhost:3000/login?redirect={users account page}
   */
  if (
    (!sid || !accessToken) &&
    request.nextUrl.pathname !== '/login' &&
    request.nextUrl.pathname !== '/register'
  )
    return NextResponse.redirect(new URL('/login', request.url))

  /**
   * We will try to refresh the tokens if the access token is expired
   * TODO(1): refactor to a reusable method
   */
  if (accessTokenExpiry && isAccessTokenExpired(accessTokenExpiry)) {
    const res = await fetch(ApiEngineEndpoints.REFRESH, {
      headers: request.headers,
      credentials: 'include',
    })

    /**
     * If refreshing tokens unsuccessful, deletes all cookies
     */
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
    request.headers.set('Authorization', `Bearer ${tokens.access_token}`)

    const response = NextResponse.next({
      request,
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
  // Set the request authorization header if not yet set, only if the access token is available and not yet expired
  else if (accessToken) {
    const authorization = request.headers.get('Authorization')
    if (!authorization) request.headers.set('Authorization', `Bearer ${accessToken}`)
    return NextResponse.next({
      request,
    })
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - public page
     * - /api/auth/login, /api/auth/logout
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|terms-of-service|privacy-policy|api/auth/login|api/auth/logout).*)',
  ],
}
