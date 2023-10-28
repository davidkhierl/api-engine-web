import { AuthProvider } from '@/components/providers/auth-provider'
import * as React from 'react'

export async function AuthorizedRoute({ children }: { children?: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
