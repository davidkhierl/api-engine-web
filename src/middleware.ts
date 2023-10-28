import { getApiUrl } from '@/lib/utils/get-api-url'
import dayjs from 'dayjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ],
}

export async function middleware(request: NextRequest) {
  const cookieStore = cookies().getAll()
  const response = NextResponse.next()

  if (!cookies().has('sid') || !cookies().has('access_token') || !cookies().has('at_expiry')) {
    return response
  }

  const at_expiry = cookies().get('at_expiry')!

  const accessTokenValid = dayjs().isBefore(dayjs(parseInt(at_expiry.value) * 1000))

  if (accessTokenValid) return response

  const refreshRes = await fetch(`${getApiUrl()}/auth/refresh`, {
    headers: { Cookie: request.cookies.toString() },
    cache: 'no-cache',
  })
  console.log(refreshRes.headers.getSetCookie())
  // const refreshData = await refreshRes.json()
  // console.log(refreshRes.headers.getSetCookie())

  // parseResponseCookies(refreshRes, (responseCookies) => {
  //   for (const responseCookie of responseCookies) {
  //     console.log(responseCookie)
  //     response.cookies.set(responseCookie)
  //   }
  // })

  return response
}
