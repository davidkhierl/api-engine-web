import { AuthProvider } from '@/components/providers/auth-provider'
import { apiEngine } from '@/services/api-engine'
import * as React from 'react'

export const dynamic = 'force-dynamic'

export async function AuthInit({ children }: { children?: React.ReactNode }) {
  const user = await apiEngine.getAuthenticatedUserServerSide()

  return <AuthProvider user={user}>{children}</AuthProvider>
}
