import { AuthProvider } from '@/components/providers/auth-provider'
import { getBaseUrl } from '@/lib/utils/get-base-url'
import { cookies } from 'next/headers'
import * as React from 'react'

async function getCurrentUser() {
  const accessToken = cookies().get('access_token')

  const user = await fetch(`${getBaseUrl()}/api/auth`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      Cookie: cookies().toString(),
    },
  })

  return user.json()
}

export async function AuthorizedRoute({ children }: { children?: React.ReactNode }) {
  const accessToken = cookies().get('access_token')
  const user = await fetch(`${getBaseUrl()}/api/auth`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      Cookie: cookies().toString(),
    },
    cache: 'no-cache',
  })

  if (user.ok) {
    const userData = await user.json()

    console.log(userData)
  }

  return <AuthProvider>{children}</AuthProvider>
}
