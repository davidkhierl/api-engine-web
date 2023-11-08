import { AuthProvider } from '@/components/providers/auth-provider'
import { ReactQueryProvider } from '@/components/providers/react-query-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { apiEngine } from '@/services/api-engine'
import * as React from 'react'

export const dynamic = 'force-dynamic'

export async function AppProviders({ children }: { children?: React.ReactNode }) {
  const user = await apiEngine.getAuthenticatedUserServerSide()
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ReactQueryProvider>
        <AuthProvider user={user}>{children}</AuthProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  )
}
