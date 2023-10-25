import { IncomingMessage } from 'http'
import 'set-cookie-parser'
import { Cookie as ParserCookie } from 'set-cookie-parser'

declare module 'set-cookie-parser' {
  declare function parse(
    input: string | ReadonlyArray<string> | IncomingMessage,
    options: parse.Options & { map: true }
  ): parse.CookieMap
  declare function parse(
    input: string | ReadonlyArray<string> | IncomingMessage,
    options?: parse.Options & { map?: false | undefined }
  ): parse.Cookie[]
  declare function parse(
    input: string | ReadonlyArray<string> | IncomingMessage,
    options?: parse.Options
  ): parse.Cookie[] | parse.CookieMap
  namespace parse {
    interface Cookie extends ParserCookie {
      sameSite?: boolean | 'lax' | 'strict' | 'none'
    }
  }
}
