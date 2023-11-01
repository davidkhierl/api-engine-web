import { AppProviders } from '@/components/providers/app-providers'
import { cn } from '@/lib/utils/class-name'
import type { Metadata } from 'next'
import { Viewport } from 'next'
import { Inter } from 'next/font/google'
import * as React from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'API Engine',
  description: 'Easily manage your api keys',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#020617' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          'min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50'
        )}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
