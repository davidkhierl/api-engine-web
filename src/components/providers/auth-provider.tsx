import { AuthUserProvider } from '@/components/providers/auth-user-provider'
import { apiEngine } from '@/services/api-engine'
import { cookies } from 'next/headers'
import * as React from 'react'

export const dynamic = 'force-dynamic'

export async function AuthProvider({ children }: { children?: React.ReactNode }) {
  console.log(cookies().toString())
  const user = await apiEngine.getAuthenticatedUser({
    headers: {
      Cookie: cookies().toString(),
    },
  })
  console.log(user)
  return <AuthUserProvider user={user}>{children}</AuthUserProvider>
}
