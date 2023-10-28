import { ApiEngineError } from '@/lib/api-engine/api-engine-error'
import { User } from '@/lib/api-engine/api.types'
import * as React from 'react'
import { StoreApi } from 'zustand'

export interface AuthContextType {
  user?: User
  isAuthenticating: boolean
  authenticate: (errorCallback?: (error: ApiEngineError) => void) => Promise<void>
}

export const AuthContext = React.createContext<StoreApi<AuthContextType> | null>(null)
