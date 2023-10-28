import { AuthContext, AuthContextType } from '@/contexts/auth-context'
import { useContext } from 'react'
import { useStore } from 'zustand'

export function useAuth<T>(selector: (state: AuthContextType) => T) {
  const auth = useContext(AuthContext)
  if (!auth) {
    throw new Error('Missing AuthProvider')
  }

  return useStore(auth, selector)
}
