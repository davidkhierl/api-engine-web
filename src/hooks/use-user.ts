import { useAuth } from '@/hooks/use-auth'
import { useMemo } from 'react'

export function useUser() {
  const user = useAuth((state) => state.user)

  return useMemo(() => user, [user])
}
