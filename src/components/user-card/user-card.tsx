'use client'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { useUser } from '@/hooks/use-user'

export function UserCard() {
  const user = useUser()
  console.log(user)
  return (
    <Card>
      <CardHeader>
        <CardTitle>{user?.displayName ?? user?.email}</CardTitle>
      </CardHeader>
    </Card>
  )
}
