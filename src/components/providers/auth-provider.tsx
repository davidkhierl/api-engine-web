'use client'

import { AuthContext, AuthContextType } from '@/contexts/auth-context'
import { ApiEngineError } from '@/lib/api-engine/api-engine-error'
import { signInWithCredentials } from '@/lib/firebase/firebase-auth'
import { User } from 'firebase/auth'
import * as React from 'react'
import { StoreApi, createStore } from 'zustand'

export function AuthProvider({ children, user }: { children?: React.ReactNode; user?: User }) {
  const authStoreRef = React.useRef<StoreApi<AuthContextType>>()

  if (!authStoreRef.current) {
    authStoreRef.current = createStore<AuthContextType>((set) => ({
      user: user,
      setUser(user) {
        set({ user })
      },
      isAuthenticating: false,
      async signIn(credentials) {
        set({ isAuthenticating: true })

        const userCredential = await signInWithCredentials(credentials)

        set({ user: userCredential.user })

        return userCredential
      },
      async authenticate(errorCallback) {
        try {
          // set({ isAuthenticating: true })
          // const user = await apiEngine.currentUser()
          // set({ user, isAuthenticating: false })
        } catch (error) {
          set({ isAuthenticating: false })
          if (error instanceof ApiEngineError) {
            if (errorCallback) errorCallback(error)
          }
        }
      },
    }))
  }

  return <AuthContext.Provider value={authStoreRef.current}>{children}</AuthContext.Provider>
}
