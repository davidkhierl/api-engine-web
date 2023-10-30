'use client'

import { AuthUserContext, AuthUserContextType } from '@/contexts/auth-user-context'

import { User } from '@/lib/api-engine/api.types'
import * as React from 'react'
import { StoreApi, createStore } from 'zustand'

export function AuthUserProvider({ children, user }: { children?: React.ReactNode; user?: User }) {
  const authStoreRef = React.useRef<StoreApi<AuthUserContextType>>()

  if (!authStoreRef.current) {
    authStoreRef.current = createStore<AuthUserContextType>((set) => ({
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
    <AuthUserContext.Provider value={authStoreRef.current}>{children}</AuthUserContext.Provider>
  )
}
