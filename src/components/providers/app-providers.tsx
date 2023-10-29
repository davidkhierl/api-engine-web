'use client'

import { AuthInitProvider } from '@/components/providers/auth-init-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import * as React from 'react'

export function AppProviders({ children }: { children?: React.ReactNode }) {
  return (
    <AuthInitProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </AuthInitProvider>
  )
}
