import { ThemeProvider } from '@/components/providers/theme-provider'
import * as React from 'react'

export async function AppProviders({ children }: { children?: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}
