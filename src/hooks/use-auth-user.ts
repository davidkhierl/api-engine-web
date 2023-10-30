import { AuthUserContext, AuthUserContextType } from '@/contexts/auth-user-context'
import { useContext } from 'react'
import { useStore } from 'zustand'

export function useAuthUser<T>(selector: (state: AuthUserContextType) => T) {
  const auth = useContext(AuthUserContext)
  if (!auth) {
    throw new Error('Missing AuthUserProvider')
  }

  return useStore(auth, selector)
}
