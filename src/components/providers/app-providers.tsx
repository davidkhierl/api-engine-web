'use client'

import { ThemeProvider } from '@/components/providers/theme-provider'

export function AppProviders({ children }: { children?: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}
