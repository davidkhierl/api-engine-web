import setCookie from 'set-cookie-parser'

/**
 * Parse headers Set-Cookie
 * @param headers
 * @param callback
 */
export function parseHeadersCookies(
  headers: Headers,
  callback?: (cookies: setCookie.parse.Cookie[]) => void
): setCookie.parse.Cookie[] {
  const parsedResponseCookies = setCookie.parse(headers.getSetCookie())
  callback && callback(parsedResponseCookies)

  return parsedResponseCookies
}
