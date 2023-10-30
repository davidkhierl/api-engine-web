import { User } from '@/lib/api-engine/api.types'
import * as React from 'react'
import { StoreApi } from 'zustand'

export interface AuthUserContextType {
  user?: User
  setUser: (user?: User) => void
  // signIn: (credentials: SignInCredentials) => Promise<UserCredential>
  // authenticate: (errorCallback?: (error: ApiEngineError) => void) => Promise<void>
}

export const AuthUserContext = React.createContext<StoreApi<AuthUserContextType> | null>(null)
