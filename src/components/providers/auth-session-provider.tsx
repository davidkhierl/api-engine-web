'use client'

import { AuthSessionContext, AuthSessionContextType } from '@/contexts/auth-session-context'
import { useAuthSession } from '@/hooks/use-auth-session'
import { onAuthStateChanged } from '@/lib/firebase/firebase-auth'
import { User } from 'firebase/auth'
import * as React from 'react'
import { useEffect } from 'react'
import { StoreApi, createStore } from 'zustand'

export function AuthSessionProvider({
  children,
  user,
}: {
  children?: React.ReactNode
  user?: User
}) {
  const authStoreRef = React.useRef<StoreApi<AuthSessionContextType>>()

  if (!authStoreRef.current) {
    authStoreRef.current = createStore<AuthSessionContextType>((set) => ({
      user: user,
      setUser(user) {
        set({ user })
      },
      // isAuthenticating: false,
      // async signIn(credentials) {
      //   set({ isAuthenticating: true })
      //
      //   const userCredential = await signInWithCredentials(credentials)
      //
      //   set({ user: userCredential.user })
      //
      //   return userCredential
      // },
      // async authenticate(errorCallback) {
      //   try {
      //     // set({ isAuthenticating: true })
      //     // const user = await apiEngine.currentUser()
      //     // set({ user, isAuthenticating: false })
      //   } catch (error) {
      //     set({ isAuthenticating: false })
      //     if (error instanceof ApiEngineError) {
      //       if (errorCallback) errorCallback(error)
      //     }
      //   }
      // },
    }))
  }

  return (
    <AuthSessionContext.Provider value={authStoreRef.current}>
      <AuthSessionStateObserver>{children}</AuthSessionStateObserver>
    </AuthSessionContext.Provider>
  )
}

export function AuthSessionStateObserver({ children }: { children?: React.ReactNode }) {
  const setUser = useAuthSession((state) => state.setUser)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authenticatedUser) => {
      if (authenticatedUser) setUser(authenticatedUser)
      else setUser()
    })

    return () => unsubscribe()
  }, [])

  return <>{children}</>
}
