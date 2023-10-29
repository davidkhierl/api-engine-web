import { User } from 'firebase/auth'
import * as React from 'react'
import { StoreApi } from 'zustand'

export interface AuthSessionContextType {
  user?: User
  setUser: (user?: User) => void
  // signIn: (credentials: SignInCredentials) => Promise<UserCredential>
  // authenticate: (errorCallback?: (error: ApiEngineError) => void) => Promise<void>
}

export const AuthSessionContext = React.createContext<StoreApi<AuthSessionContextType> | null>(null)
