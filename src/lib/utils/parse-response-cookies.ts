import setCookie from 'set-cookie-parser'

export function parseResponseCookies(
  response: Response,
  callback?: (cookies: setCookie.parse.Cookie[]) => void
) {
  const responseCookies = response.headers.getSetCookie()
  // console.log(setCookie.parseString(response.headers.get('set-cookie')!))
  const parsedResponseCookies = setCookie.parse(responseCookies)
  callback && callback(parsedResponseCookies)
  return parsedResponseCookies
}
