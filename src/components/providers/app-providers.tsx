import { AuthInit } from '@/components/auth/auth-init'
import { ThemeProvider } from '@/components/providers/theme-provider'
import * as React from 'react'

export function AppProviders({ children }: { children?: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthInit>{children}</AuthInit>
    </ThemeProvider>
  )
}
