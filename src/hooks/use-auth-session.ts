import { AuthSessionContext, AuthSessionContextType } from '@/contexts/auth-session-context'
import { useContext } from 'react'
import { useStore } from 'zustand'

export function useAuthSession<T>(selector: (state: AuthSessionContextType) => T) {
  const auth = useContext(AuthSessionContext)
  if (!auth) {
    throw new Error('Missing AuthSessionProvider')
  }

  return useStore(auth, selector)
}
