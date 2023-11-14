'use client'

import { Frown } from 'lucide-react'
import { FallbackProps } from 'react-error-boundary'

export function UserAvatarFallbackComponent(props: FallbackProps) {
  return (
    <div
      title={`${props.error.message}`}
      className="flex h-10 w-10 items-center justify-center rounded-md bg-red-100 text-red-700">
      <Frown />
      <span className="sr-only">Error loading user</span>
    </div>
  )
}
