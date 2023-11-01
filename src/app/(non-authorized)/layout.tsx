import { ThemeModeToggle } from '@/components/theme-mode-toggle'
import { Waypoints } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

export default function NonAuthorizedLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <header className="flex h-16 items-center justify-between gap-4 border-b border-slate-200 px-4 dark:border-slate-800">
        <Link href="/" className="inline-flex gap-2 text-lg font-bold">
          <Waypoints />
          API Engine
        </Link>
        <ThemeModeToggle variant="ghost" />
      </header>
      <div className="flex-1">{children}</div>
    </div>
  )
}
