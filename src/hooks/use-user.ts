import { useAuthSession } from '@/hooks/use-auth-session'
import { useMemo } from 'react'

export function useUser() {
  const user = useAuthSession((state) => state.user)

  return useMemo(() => user, [user])
}
