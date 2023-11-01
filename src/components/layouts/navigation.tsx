import { NavLink } from '@/components/ui/nav-link'
import { cn } from '@/lib/utils/class-name'
import { Home, KeyRound } from 'lucide-react'

export function Navigation({ className }: { className?: string }) {
  return (
    <nav className={cn('flex flex-col gap-2', className)}>
      <NavLink href="/" icon={<Home className="h-4 w-4" />}>
        Home
      </NavLink>
      <NavLink href="/keychains" icon={<KeyRound className="h-4 w-4" />}>
        Keychains
      </NavLink>
    </nav>
  )
}
