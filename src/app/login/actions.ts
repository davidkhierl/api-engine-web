'use server'

import { api } from '@/lib/api'
import { parseResponseCookies } from '@/lib/utils/parse-response-cookies'
import libCookie from 'cookie'
import { cookies } from 'next/headers'

export async function loginAction(formData: FormData) {
  const requestCookie = cookies().get('sid')

  let sid = ''

  if (requestCookie) {
    sid = libCookie.serialize(requestCookie.name, requestCookie.value, {
      httpOnly: true,
      path: '/',
      secure: false,
      sameSite: 'lax',
      domain: 'localhost',
    })
    console.log(sid)
  }

  const res = await api.post('/auth/login', formData, {
    headers: {
      cookies: sid,
    },
  })

  parseResponseCookies(res, (responseCookies) => {
    for (const responseCookie of responseCookies) {
      cookies().set(responseCookie)
    }
  })

  return res.json()
}
