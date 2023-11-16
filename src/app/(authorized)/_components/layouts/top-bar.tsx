import { Navigation } from '@/app/(authorized)/_components/layouts/navigation'
import { ThemeModeToggle } from '@/components/theme/theme-mode-toggle'
import { UserAvatar } from '@/components/user/user-avatar'
import { cn } from '@/lib/utils/class-name'
import { Waypoints } from 'lucide-react'
import Link from 'next/link'

export function TopBar({ className }: { className?: string }) {
  return (
    <div className={cn('border-b border-slate-300 px-6 pb-4 dark:border-slate-800', className)}>
      <div className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex gap-2 rounded-md text-lg font-bold ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300">
          <Waypoints />
          API Engine
        </Link>
        <div className="flex gap-2">
          <ThemeModeToggle variant="ghost" />
          <UserAvatar />
        </div>
      </div>
      <div>
        <Navigation />
      </div>
    </div>
  )
}
