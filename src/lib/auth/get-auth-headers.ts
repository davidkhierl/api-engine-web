import { cookies, headers as nextHeaders } from 'next/headers'

export function getAuthHeaders() {
  const headers = new Headers()
  const authorization = nextHeaders().get('authorization')
  headers.set('cookie', cookies().toString())
  if (authorization) headers.set('Authorization', authorization)
  return headers
}
