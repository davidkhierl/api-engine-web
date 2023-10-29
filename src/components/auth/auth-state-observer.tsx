'use client'

import { useAuth } from '@/hooks/use-auth'
import { onAuthStateChanged } from '@/lib/firebase/firebase-auth'
import { usePathname, useRouter } from 'next/navigation'
import * as React from 'react'
import { useEffect } from 'react'

export function AuthStateObserver({ children }: { children?: React.ReactNode }) {
  const setUser = useAuth((state) => state.setUser)
  const pathName = usePathname()
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) setUser(user)
      //@ts-ignore
      else if (pathName !== '/login' || pathName !== '/register') router.push('/login')
    })

    return () => unsubscribe()
  }, [pathName, router, setUser])

  return <>{children}</>
}
