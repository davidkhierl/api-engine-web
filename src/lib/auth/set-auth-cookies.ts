import { cookies } from 'next/headers'

export function setAuthCookies(access_token: string, at_expiry: number) {
  const maxAge = 3 * 30 * 24 * 60 * 60 // 120d
  cookies().set('access_token', access_token, { httpOnly: true, maxAge })
  cookies().set('at_expiry', at_expiry.toString(), { httpOnly: true, maxAge })
}
