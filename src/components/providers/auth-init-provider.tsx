import { AuthStateObserver } from '@/components/auth/auth-state-observer'
import { AuthProvider } from '@/components/providers/auth-provider'
import * as React from 'react'

export async function AuthInitProvider({ children }: { children?: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthStateObserver>{children}</AuthStateObserver>
    </AuthProvider>
  )
}
