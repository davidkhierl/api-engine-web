import { AuthLogin, AuthResponse, User } from '@/lib/api-engine/api.types'
import * as React from 'react'
import { StoreApi } from 'zustand'

export interface AuthUserContextType {
  user?: User
  setUser: (user?: User) => void
  login: (credentials: AuthLogin) => Promise<AuthResponse>
  logout: () => Promise<void>
}

export const AuthContext = React.createContext<StoreApi<AuthUserContextType> | null>(null)
