import { getApiUrl } from '@/lib/utils/get-api-url'
import { cookies, headers } from 'next/headers'

export async function GET(request: Request) {
  const userRes = await fetch(`${getApiUrl()}/users/me`, {
    headers: headers(),
  })
  if (!userRes.ok && userRes.status === 401) {
    // console.log('refreshing token')
    // const refreshTokenRes = await fetch(`${getApiUrl()}/auth/refresh`, {
    //   headers: {
    //     Cookie: cookies().toString(),
    //   },
    // })
    // const refreshTokenData = await refreshTokenRes.json()
    // const userRetryRes = await fetch(`${getApiUrl()}/users/me`, {
    //   headers: {
    //     Authorization: `Bearer ${refreshTokenData.access_token}`,
    //   },
    // })
    //
    // console.log(refreshTokenRes.headers.getSetCookie())
    // const userRetryData = userRetryRes.json()
    // return new Response(JSON.stringify(userRetryData))
  }

  const userData = await userRes.json()

  cookies().set('wew', 'wit')
  return Response.json(userData)
}
