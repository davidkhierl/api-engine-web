'use server'

import { parseResponseCookies } from '@/lib/utils/parse-response-cookies'
import { cookies } from 'next/headers'

export async function setCookies(res: Response) {
  parseResponseCookies(res, (responseCookies) => {
    for (const responseCookie of responseCookies) {
      cookies().set(responseCookie)
    }
  })
}
