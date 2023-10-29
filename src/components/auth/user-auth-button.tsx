'use client'

import { Button } from '@/components/ui/button'
import { useUser } from '@/hooks/use-user'
import { signOut } from '@/lib/firebase/firebase-auth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function UserAuthButton({ className }: { className?: string }) {
  const user = useUser()
  const pathName = usePathname()

  if (pathName === '/login' || pathName === '/register') return null

  if (!user)
    return (
      <Button asChild className={className} variant="outline" onClick={() => signOut()}>
        <Link href="/login">Sign in</Link>
      </Button>
    )

  return (
    <Button className={className} variant="outline" onClick={() => signOut()}>
      Sign out
    </Button>
  )
}
