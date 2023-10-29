import { ApiEngineError } from '@/lib/api-engine/api-engine-error'
import { SignInCredentials } from '@/lib/firebase/firebase-auth'
import { User, UserCredential } from 'firebase/auth'
import * as React from 'react'
import { StoreApi } from 'zustand'

export interface AuthContextType {
  user?: User
  setUser: (user: User) => void
  isAuthenticating: boolean
  signIn: (credentials: SignInCredentials) => Promise<UserCredential>
  authenticate: (errorCallback?: (error: ApiEngineError) => void) => Promise<void>
}

export const AuthContext = React.createContext<StoreApi<AuthContextType> | null>(null)
