import { Navigation } from '@/components/layouts/navigation'
import { cn } from '@/lib/utils/class-name'
import { Waypoints } from 'lucide-react'
import Link from 'next/link'

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        'flex flex-col gap-4 rounded-md bg-slate-100 shadow-lg dark:bg-slate-800',
        className
      )}>
      <div className="flex h-16 items-center justify-center px-4">
        <Link href="/" className="inline-flex gap-2 text-lg font-bold">
          <Waypoints />
          API Engine
        </Link>
      </div>
      <div className="px-4">
        <Navigation />
      </div>
    </aside>
  )
}
