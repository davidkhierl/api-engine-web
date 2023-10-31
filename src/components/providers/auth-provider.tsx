import { AuthUserProvider } from '@/components/providers/auth-user-provider'
import { apiEngine } from '@/services/api-engine'
import * as React from 'react'

export const dynamic = 'force-dynamic'

export async function AuthProvider({ children }: { children?: React.ReactNode }) {
  const user = await apiEngine.nextGetAuthenticatedUser()

  return <AuthUserProvider user={user}>{children}</AuthUserProvider>
}
