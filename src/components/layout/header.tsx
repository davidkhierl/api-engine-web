import { UserAuthButton } from '@/components/layout/user-auth-button'
import { ThemeModeToggle } from '@/components/theme-mode-toggle'
import Link from 'next/link'

export function Header() {
  return (
    <header className="flex h-20 items-center justify-between gap-4 px-4">
      <Link href="/">API Engine</Link>
      <div className="flex gap-2">
        <ThemeModeToggle variant="ghost" />
        <UserAuthButton />
      </div>
    </header>
  )
}
