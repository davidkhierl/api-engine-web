'use client'

import { AuthContext, AuthUserContextType } from '@/contexts/auth-context'

import { User } from '@/lib/api-engine/api.types'
import { apiEngine } from '@/services/api-engine'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { StoreApi, createStore } from 'zustand'

export function AuthProvider({ children, user }: { children?: React.ReactNode; user?: User }) {
  const authStoreRef = React.useRef<StoreApi<AuthUserContextType>>()
  const router = useRouter()

  if (!authStoreRef.current) {
    authStoreRef.current = createStore<AuthUserContextType>((set) => ({
      user: user,
      setUser(user) {
        set({ user })
      },
      async login(credentials) {
        const auth = await apiEngine.login(credentials)
        set({ user: auth.user })
        localStorage.setItem('access_token', auth.access_token)
        localStorage.setItem('at_expiry', auth.at_expiry.toString())
        router.push('/')
        return auth
      },
      async logout() {
        await apiEngine.logout()
        localStorage.removeItem('access_token')
        localStorage.removeItem('at_expiry')
        router.push('/login')
      },
      async register(credentials) {
        const auth = await apiEngine.registerUser(credentials)
        set({ user: auth.user })
        localStorage.setItem('access_token', auth.access_token)
        localStorage.setItem('at_expiry', auth.at_expiry.toString())
        router.push('/')
        return auth
      },
    }))
  }

  return <AuthContext.Provider value={authStoreRef.current}>{children}</AuthContext.Provider>
}
