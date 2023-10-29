'use client'

import { useAuthSession } from '@/hooks/use-auth-session'
import { onAuthStateChanged } from '@/lib/firebase/firebase-auth'
import * as React from 'react'
import { useEffect } from 'react'

export function AuthStateObserver({ children }: { children?: React.ReactNode }) {
  const setUser = useAuthSession((state) => state.setUser)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authenticatedUser) => {
      if (authenticatedUser) setUser(authenticatedUser)
    })

    return () => unsubscribe()
  }, [])

  return <>{children}</>
}
