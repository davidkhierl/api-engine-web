'use client'

import { AuthContext, AuthContextType } from '@/contexts/auth-context'
import { ApiEngineError } from '@/lib/api-engine/api-engine-error'
import { User } from '@/lib/api-engine/api.types'
import * as React from 'react'
import { StoreApi, createStore } from 'zustand'

export function AuthProvider({ children, user }: { children?: React.ReactNode; user?: User }) {
  const authStoreRef = React.useRef<StoreApi<AuthContextType>>()

  if (!authStoreRef.current) {
    authStoreRef.current = createStore<AuthContextType>((set) => ({
      user,
      isAuthenticating: false,
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
