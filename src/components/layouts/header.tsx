import { UserAuthButton } from '@/components/auth/user-auth-button'
import { ThemeModeToggle } from '@/components/theme-mode-toggle'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils/class-name'

export function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        'flex h-16 items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800',
        className
      )}>
      <Input placeholder="Search" className="border-none" />
      <div className="flex gap-2">
        <ThemeModeToggle variant="ghost" />
        <UserAuthButton />
      </div>
    </header>
  )
}
