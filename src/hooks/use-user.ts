import { useAuthUser } from '@/hooks/use-auth-user'
import { useMemo } from 'react'

export function useUser() {
  const user = useAuthUser((state) => state.user)

  return useMemo(() => user, [user])
}
