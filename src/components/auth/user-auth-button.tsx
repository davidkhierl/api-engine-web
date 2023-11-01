'use client'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { useUser } from '@/hooks/use-user'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function UserAuthButton({ className }: { className?: string }) {
  const logout = useAuth((state) => state.logout)
  const user = useUser()
  const pathName = usePathname()

  if (pathName === '/login' || pathName === '/register') return null

  if (!user)
    return (
      <Button asChild className={className} variant="outline">
        <Link href="/login">Sign in</Link>
      </Button>
    )

  return (
    <Button className={className} variant="outline" onClick={() => logout()}>
      Sign out
    </Button>
  )
}
