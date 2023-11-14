export async function getAuthHeaders() {
  const headers = new Headers()
  const { cookies, headers: nextHeaders } = await import('next/headers')
  const authorization = nextHeaders().get('authorization')
  headers.set('cookie', cookies().toString())
  if (authorization) headers.set('Authorization', authorization)
  const accessToken = cookies().get('access_token')?.value
  const accessTokenExpiry = cookies().get('at_expiry')?.value
  return { headers, accessToken, accessTokenExpiry }
}
