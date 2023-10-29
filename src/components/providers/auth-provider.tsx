import { AuthSessionProvider } from '@/components/providers/auth-session-provider'
import * as React from 'react'

export async function AuthProvider({ children }: { children?: React.ReactNode }) {
  return <AuthSessionProvider>{children}</AuthSessionProvider>
}
