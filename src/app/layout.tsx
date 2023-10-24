import { AppProviders } from '@/components/providers/app-providers'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'API Engine',
  description: 'Easily manage your api keys',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>
          <div className="bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50">
            {children}
          </div>
        </AppProviders>
      </body>
    </html>
  )
}
